import {Parser, Store} from "n3";
import {DatasetCore} from "@rdfjs/types";
import Papa from "papaparse";
import {Memoize} from "typescript-memoize";
import {AxiosCacheInstance} from "axios-cache-interceptor";
import WebDataCommonsClassGeneralStats from "./WebDataCommonsClassGeneralStats";
import WebDataCommonsRelatedClass from "./WebDataCommonsRelatedClass";
import WebDataCommonsClassPayLevelDomainStats from "./WebDataCommonsClassPayLevelDomainStats";

export default class WebDataCommonsCorpusClassSpecificSubset {
  private readonly axios: AxiosCacheInstance;
  readonly className: string;
  private readonly downloadHref: string;
  readonly generalStats: WebDataCommonsClassGeneralStats;
  private readonly pldStatsHref: string;
  readonly relatedClasses: readonly WebDataCommonsRelatedClass[];
  private readonly sampleDownloadHref: string;
  readonly size: string;

  constructor({
    axios,
    className,
    downloadHref,
    generalStats,
    relatedClasses,
    pldStatsHref,
    sampleDownloadHref,
    size,
  }: {
    axios: AxiosCacheInstance;
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
    this.axios = axios;
    this.className = className;
    this.downloadHref = downloadHref;
    this.generalStats = generalStats;
    this.pldStatsHref = pldStatsHref;
    this.relatedClasses = relatedClasses;
    this.sampleDownloadHref = sampleDownloadHref;
    this.size = size;
  }

  @Memoize()
  async pldStats(): Promise<readonly WebDataCommonsClassPayLevelDomainStats[]> {
    const pldStatsCsv: string = (
      await this.axios.get(this.pldStatsHref, {
        cache: {
          ttl: 31556952000, // 1 year
        },
      })
    ).data;
    return Papa.parse(pldStatsCsv, {
      delimiter: "\t",
      header: true,
    }).data.flatMap((row: any) =>
      row["Domain"].length > 0
        ? [
            {
              domain: row["Domain"] as string,
              entitiesOfClass: parseInt(row["#Entities of class"]),
              propertiesAndDensity: row["Properties and Density"]
                ? JSON.parse(row["Properties and Density"].replaceAll("'", '"'))
                : {},
              quadsOfSubset: parseInt(row["#Quads of Subset"]),
            },
          ]
        : []
    );
  }

  async sampleDataset(): Promise<DatasetCore> {
    const sampleNquadsString: string = (
      await this.axios.get(this.sampleDownloadHref, {
        cache: {
          ttl: 31556952000, // 1 year
        },
      })
    ).data;
    const store = new Store();
    const parser = new Parser({format: "N-Quads"});
    store.addQuads(parser.parse(sampleNquadsString));
    return store;
  }
}
