import WebDataCommonsCorpus from "@/lib/models/WebDataCommonsCorpus";

describe("WebDataCommonsCorpus", () => {
  const sut = new WebDataCommonsCorpus({});

  it("gets the class-specific subsets", async () => {
    const classSpecificSubsets = await sut.classSpecificSubsets();
    expect(classSpecificSubsets).toHaveLength(48);
    for (const classSpecificSubset of classSpecificSubsets) {
      expect(classSpecificSubset.className).not.toBe("");
      expect(classSpecificSubset.generalStats.hosts).toBeGreaterThan(0);
      expect(classSpecificSubset.generalStats.quads).toBeGreaterThan(0);
      expect(classSpecificSubset.generalStats.urls).toBeGreaterThan(0);
      expect(classSpecificSubset.relatedClasses).not.toHaveLength(0);
      expect(classSpecificSubset.size).not.toBe("");
    }
  });
});
