import WebDataCommonsCorpus from "@/lib/WebDataCommonsCorpus";

describe("WebDataCommonsCorpus", () => {
  const sut = new WebDataCommonsCorpus({});

  it("gets the class-specific subsets", async () => {
    const actual = await sut.getClassSpecificSubsets();
    expect(actual).toHaveLength(5);
  });
});
