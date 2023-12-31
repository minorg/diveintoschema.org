import {Parser, Store} from "n3";
import Papa from "papaparse";
import {Memoize} from "typescript-memoize";
import WebDataCommonsClassGeneralStats from "./WebDataCommonsClassGeneralStats";
import WebDataCommonsRelatedClass from "./WebDataCommonsRelatedClass";
import WebDataCommonsClassPayLevelDomainStats from "./WebDataCommonsClassPayLevelDomainStats";
import HttpClient from "@/lib/HttpClient";
import WebDataCommonsCorpusPageSubset from "./WebDataCommonsCorpusPageSubset";
import slugify from "../slugify";

const parsePldStatsPropertiesAndDensity = (
  json: string | undefined
): Record<string, number> => {
  if (!json) {
    return {};
  }

  try {
    return JSON.parse(json.replaceAll("'", '"'));
  } catch {
    return {};
  }
};

export default class WebDataCommonsCorpusClassSpecificSubset {
  readonly className: string;
  private readonly downloadHref: string;
  readonly generalStats: WebDataCommonsClassGeneralStats;
  private readonly httpClient: HttpClient;
  private readonly pldStatsHref: string;
  readonly relatedClasses: readonly WebDataCommonsRelatedClass[];
  private readonly sampleDownloadHref: string;
  readonly size: string;

  constructor({
    className,
    downloadHref,
    generalStats,
    httpClient,
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
    httpClient: HttpClient;
    pldStatsHref: string;
    relatedClasses: readonly WebDataCommonsRelatedClass[];
    sampleDownloadHref: string;
    size: string;
  }) {
    this.className = className;
    this.downloadHref = downloadHref;
    this.generalStats = generalStats;
    this.httpClient = httpClient;
    this.pldStatsHref = pldStatsHref;
    this.relatedClasses = relatedClasses;
    this.sampleDownloadHref = sampleDownloadHref;
    this.size = size;
  }

  @Memoize()
  async pldStats(): Promise<readonly WebDataCommonsClassPayLevelDomainStats[]> {
    return Papa.parse(await this.pldStatsCsvString(), {
      delimiter: "\t",
      header: true,
    }).data.flatMap((row: any) =>
      row["Domain"].length > 0
        ? [
            {
              domain: row["Domain"] as string,
              entitiesOfClass: parseInt(row["#Entities of class"]),
              propertiesAndDensity: parsePldStatsPropertiesAndDensity(
                row["Properties and Density"]
              ),
              quadsOfSubset: parseInt(row["#Quads of Subset"]),
            },
          ]
        : []
    );
  }

  async pldStatsCsvString(): Promise<string> {
    switch (this.className) {
      case "CreativeWork":
      case "LocalBusiness":
      case "Organization":
      case "Person":
      case "Product":
        // Skip large PLD stats files
        return "";
    }

    return (
      await this.httpClient.get(this.pldStatsHref, {
        //   cache: {
        //     ttl: 31556952000, // 1 year
        //   },
        // })
      })
    ).toString("utf8");
  }

  async sampleNquadsString(): Promise<string> {
    return (
      await this.httpClient.get(this.sampleDownloadHref, {
        // cache: {
        //   ttl: 31556952000, // 1 year
        // },
      })
    ).toString("utf8");
  }

  @Memoize()
  async samplePagesByIri(): Promise<
    Record<string, WebDataCommonsCorpusPageSubset>
  > {
    const result: Record<string, WebDataCommonsCorpusPageSubset> = {};
    const parser = new Parser({format: "N-Quads"});
    parser.parse(await this.sampleNquadsString(), (error, quad) => {
      if (error) {
        return;
        // throw error;
      } else if (!quad) {
        return;
      }
      const pageIri = quad.graph;
      if (pageIri.termType !== "NamedNode") {
        return;
      }
      let page = result[pageIri.value];
      if (!page) {
        page = result[pageIri.value] = new WebDataCommonsCorpusPageSubset({
          dataset: new Store(),
          pageIri,
        });
      }
      (page.dataset as Store).addQuad(quad);
    });
    return result;
  }

  @Memoize()
  async samplePagesByIriSlug(): Promise<
    Record<string, WebDataCommonsCorpusPageSubset>
  > {
    const samplePagesByIri = await this.samplePagesByIri();
    const result: Record<string, WebDataCommonsCorpusPageSubset> = {};
    for (const samplePageIri in samplePagesByIri) {
      result[slugify(samplePageIri)] = samplePagesByIri[samplePageIri];
    }
    return result;
  }
}
