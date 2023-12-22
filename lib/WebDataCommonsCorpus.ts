import invariant from "ts-invariant";
import cachingAxios from "./cachingAxios";
import {
  NodeType,
  HTMLElement,
  TextNode,
  parse as parseHtml,
} from "node-html-parser";

class ClassSpecificSubset {
  readonly className: string;
  readonly downloadHref: string;
  readonly downloadSampleHref: string;
  readonly generalStats: {
    hosts: number;
    quads: number;
    urls: number;
  };
  readonly relatedClasses: readonly {count: number; name: string}[];
  readonly size: string;

  constructor({
    className,
    downloadHref,
    downloadSampleHref,
    generalStats,
    relatedClasses,
    size,
  }: {
    className: string;
    downloadHref: string;
    downloadSampleHref: string;
    generalStats: {
      hosts: number;
      quads: number;
      urls: number;
    };
    relatedClasses: readonly {count: number; name: string}[];
    size: string;
  }) {
    this.className = className;
    this.downloadHref = downloadHref;
    this.downloadSampleHref = downloadSampleHref;
    this.generalStats = generalStats;
    this.relatedClasses = relatedClasses;
    this.size = size;
  }
}

// Utility functions
const getChildTextNodes = (htmlElement: HTMLElement) =>
  htmlElement.childNodes.filter(
    (childNode) => childNode.nodeType === NodeType.TEXT_NODE
  ) as TextNode[];

const parseGeneralStatsTextNode = (textNode: TextNode) =>
  parseInt(textNode.text.trim().split(" ", 2)[1].replaceAll(",", ""));

const parseRelatedClassTextNode = (textNode: TextNode) => {
  const [iri, count] = textNode.text.trim().split(" ", 2);

  let name: string;
  if (iri.startsWith("http://schema.org/")) {
    name = iri.substring("http://schema.org/".length);
  } else if (iri.startsWith("https://schema.org/")) {
    name = iri.substring("https://schema.org/".length);
  } else {
    throw new RangeError(iri);
  }

  return {
    count: parseInt(count.substring(1, count.length - 1).replaceAll(",", "")),
    name,
  };
};

export default class WebDataCommonsCorpus {
  readonly version: string;

  constructor({version}: {version?: string}) {
    this.version = version ?? "2022-12";
  }

  async getClassSpecificSubsets(): Promise<readonly ClassSpecificSubset[]> {
    const metadataHtml = (
      await cachingAxios.get(
        `https://webdatacommons.org/structureddata/${this.version}/stats/schema_org_subsets.html`
      )
    ).data;

    return parseHtml(metadataHtml)
      .querySelector("body > div > h2")!
      .parentNode.getElementsByTagName("tr")
      .slice(1)
      .map((tableRow) => {
        const tableCells = tableRow.getElementsByTagName("td");

        const generalStatsTextNodes: TextNode[] = getChildTextNodes(
          tableCells[0]
        );
        const generalStatsQuads = parseGeneralStatsTextNode(
          generalStatsTextNodes[0]
        );
        const generalStatsUrls = parseGeneralStatsTextNode(
          generalStatsTextNodes[1]
        );
        const generalStatsHosts = parseGeneralStatsTextNode(
          generalStatsTextNodes[2]
        );

        const relatedClasses = getChildTextNodes(tableCells[1]).map(
          (textNode) => parseRelatedClassTextNode(textNode)
        );

        const sizeCell = tableCells[2];

        const downloadHrefs = tableCells[3]
          .getElementsByTagName("a")
          .map((anchorElement) => anchorElement.attributes["href"]);

        return new ClassSpecificSubset({
          className: tableRow.getElementsByTagName("th")[0].text,
          downloadHref: downloadHrefs[0],
          downloadSampleHref: downloadHrefs[1],
          generalStats: {
            hosts: generalStatsHosts,
            quads: generalStatsQuads,
            urls: generalStatsUrls,
          },
          relatedClasses,
          size: sizeCell.text,
        });
      });
  }
}
