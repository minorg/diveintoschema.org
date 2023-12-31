import MajesticMillionReport from "@/lib/models/MajesticMillionReport";

describe("MajesticMillionReport", () => {
  const sut = new MajesticMillionReport();

  it("gets a known domain global rank", async () => {
    expect(await sut.getDomainGlobalRank("google.com")).toStrictEqual(1);
  });

  it("gets an unknown domain global rank", async () => {
    expect(await sut.getDomainGlobalRank("nonextantdomain.net")).toBeNull();
  });
});
