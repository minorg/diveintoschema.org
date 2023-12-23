import WebDataCommonsCorpus from "@/lib/models/WebDataCommonsCorpus";
import WebDataCommonsCorpusClassSpecificSubset from "@/lib/models/WebDataCommonsCorpusClassSpecificSubset";
import {WebDataCommonsPayLevelDomain} from "@/lib/models/WebDataCommonsPayLevelDomain";

describe("WebDataCommonsPayLevelDomain", () => {
  let sut: WebDataCommonsPayLevelDomain;

  beforeAll(async () => {
    sut = (
      await (
        await new WebDataCommonsCorpus({}).classSpecificSubsets()
      )[0].pldStats()
    )[0].domain;
  });

  it("gets IAB categories", async () => {
    const dataset = await sut.sampleDataset();
    expect(dataset.size).toBeGreaterThan(0);
  });

  // it("gets PLD stats", async () => {
  //   const pldStats = await sut.pldStats();
  //   expect(pldStats.length).toBeGreaterThan(0);
  //   for (const pldStatsRow of pldStats) {
  //     expect(pldStatsRow.domain).not.toBe("");
  //     expect(pldStatsRow.entitiesOfClass).toBeGreaterThan(0);
  //     expect(pldStatsRow.quadsOfSubset).toBeGreaterThan(0);
  //   }
  // });
});
