import WebDataCommonsCorpus from "@/lib/models/WebDataCommonsCorpus";
import WebDataCommonsPayLevelDomain from "@/lib/models/WebDataCommonsPayLevelDomain";

describe("WebDataCommonsPayLevelDomain", () => {
  let sut: WebDataCommonsPayLevelDomain;

  beforeAll(async () => {
    sut = (
      await (
        await new WebDataCommonsCorpus({}).classSpecificSubsets()
      )[0].pldStats()
    )
      .concat()
      .sort(
        (left, right) => (left.entitiesOfClass - right.entitiesOfClass) * -1
      )[0].domain;
  });

  it("gets IAB categories", async () => {
    const categories = await sut.categories();
    expect(categories).not.toHaveLength(0);
  });
});
