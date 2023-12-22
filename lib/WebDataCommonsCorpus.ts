import cachingAxios from "./cachingAxios";

class ClassSpecificSubset {
  readonly className: string;
}

export default class WebDataCommonsCorpus {
  readonly version: string;

  constructor({version}: {version?: string}) {
    this.version = version ?? "2022-12";
  }

  async getClassSpecificSubsets(): Promise<readonly ClassSpecificSubset[]> {
    const metadatHtml = (
      await cachingAxios.get(
        `https://webdatacommons.org/structureddata/${this.version}/stats/schema_org_subsets.html`
      )
    ).data;
  }
}
