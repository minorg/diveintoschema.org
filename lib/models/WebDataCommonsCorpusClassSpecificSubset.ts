import {Parser, Store} from "n3";
import {DatasetCore} from "@rdfjs/types";
import Papa from "papaparse";
import {Memoize} from "typescript-memoize";
import WebDataCommonsClassGeneralStats from "./WebDataCommonsClassGeneralStats";
import WebDataCommonsRelatedClass from "./WebDataCommonsRelatedClass";
import WebDataCommonsClassPayLevelDomainStats from "./WebDataCommonsClassPayLevelDomainStats";
import {Got} from "got";

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
  private readonly httpClient: Got;
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
    httpClient: Got;
    pldStatsHref: string;
    relatedClasses: readonly {count: number; name: string}[];
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
    const pldStatsCsv: string = (
      await this.httpClient.get(this.pldStatsHref, {
        //   cache: {
        //     ttl: 31556952000, // 1 year
        //   },
        // })
      })
    ).body;
    return Papa.parse(pldStatsCsv, {
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

  async sampleDataset(): Promise<DatasetCore> {
    const sampleNquadsString: string = (
      await this.httpClient.get(this.sampleDownloadHref, {
        // cache: {
        //   ttl: 31556952000, // 1 year
        // },
      })
    ).body;
    const store = new Store();
    const parser = new Parser({format: "N-Quads"});
    store.addQuads(parser.parse(sampleNquadsString));
    return store;
  }
}
