export default class Hrefs {
  static get about() {
    return "/about";
  }

  static get contact() {
    return "https://minorgordon.net/contact";
  }

  static type({name}: {name: string}) {
    return Hrefs.types + "/" + name;
  }

  static typeSamplePage({
    samplePageIri,
    typeName,
  }: {
    samplePageIri: string;
    typeName: string;
  }) {
    return (
      Hrefs.type({name: typeName}) +
      "/samples/" +
      Buffer.from(samplePageIri, "utf-8").toString("base64url")
    );
  }

  static get types() {
    return "/types";
  }
}
