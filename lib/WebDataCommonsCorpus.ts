import pino from "pino";
import cachingAxios from "./cachingAxios";
import {
  NodeType,
  HTMLElement,
  TextNode,
  parse as parseHtml,
} from "node-html-parser";

const logger = pino();

class ClassSpecificSubset {
  readonly className: string;
  readonly downloadHref: string;
  readonly generalStats: {
    hosts: number;
    quads: number;
    urls: number;
  };
  readonly pldStatsHref: string;
  readonly relatedClasses: readonly {count: number; name: string}[];
  readonly sampleDownloadHref: string;
  readonly size: string;

  constructor({
    className,
    downloadHref,
    generalStats,
    relatedClasses,
    pldStatsHref,
    sampleDownloadHref,
    size,
  }: {
    className: string;
    downloadHref: string;
    generalStats: {
      hosts: number;
      quads: number;
      urls: number;
    };
    pldStatsHref: string;
    relatedClasses: readonly {count: number; name: string}[];
    sampleDownloadHref: string;
    size: string;
  }) {
    this.className = className;
    this.downloadHref = downloadHref;
    this.generalStats = generalStats;
    this.pldStatsHref = pldStatsHref;
    this.relatedClasses = relatedClasses;
    this.sampleDownloadHref = sampleDownloadHref;
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

  async classSpecificSubsets(): Promise<readonly ClassSpecificSubset[]> {
    const metadataHtmlResponse = await cachingAxios.get(
      `https://webdatacommons.org/structureddata/${this.version}/stats/schema_org_subsets.html`
    );
    if ((metadataHtmlResponse as any).cached) {
      logger.info("metadata HTML file was cached");
    }

    const metadataHtml: string = metadataHtmlResponse.data;

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

        const pldStatsHref =
          tableCells[4].getElementsByTagName("a")[1].attributes["href"];

        return new ClassSpecificSubset({
          className: tableRow.getElementsByTagName("th")[0].text,
          downloadHref: downloadHrefs[0],
          generalStats: {
            hosts: generalStatsHosts,
            quads: generalStatsQuads,
            urls: generalStatsUrls,
          },
          pldStatsHref,
          relatedClasses,
          sampleDownloadHref: downloadHrefs[1],
          size: sizeCell.text,
        });
      });
  }
}
