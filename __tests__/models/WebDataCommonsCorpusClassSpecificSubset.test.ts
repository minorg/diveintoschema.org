import WebDataCommonsCorpus from "@/lib/models/WebDataCommonsCorpus";
import WebDataCommonsCorpusClassSpecificSubset from "@/lib/models/WebDataCommonsCorpusClassSpecificSubset";

describe("WebDataCommonsCorpusClassSpecificSubset", () => {
  let sut: WebDataCommonsCorpusClassSpecificSubset;

  beforeAll(async () => {
    sut = (await new WebDataCommonsCorpus({}).classSpecificSubsets())[0];
  });

  it("gets the sample dataset", async () => {
    const dataset = await sut.sampleDataset();
    expect(dataset.size).toBeGreaterThan(0);
  });

  it("gets PLD stats", async () => {
    const pldStats = await sut.pldStats();
    expect(pldStats.length).toBeGreaterThan(0);
    for (const pldStatsRow of pldStats) {
      expect(pldStatsRow.domain).not.toBe("");
      expect(pldStatsRow.entitiesOfClass).toBeGreaterThan(0);
      expect(pldStatsRow.quadsOfSubset).toBeGreaterThan(0);
    }
  });

  it(
    "get all PLD stats in parallel",
    async () => {
      await Promise.all(
        (await new WebDataCommonsCorpus({}).classSpecificSubsets()).map(
          (classSpecificSubset) => classSpecificSubset.pldStatsCsvString()
        )
      );
    },
    30 * 60 * 1000
  );

  // it(
  //   "get all sample datasets in parallel",
  //   async () => {
  //     await Promise.all(
  //       (await new WebDataCommonsCorpus({}).classSpecificSubsets()).map(
  //         (classSpecificSubset) => classSpecificSubset.sampleNquadsString()
  //       )
  //     );
  //   },
  //   30 * 60 * 1000
  // );
});
