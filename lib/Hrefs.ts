import encodeFileName from "./encodeFileName";

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
    pageIri,
    typeName,
  }: {
    pageIri: string;
    typeName: string;
  }) {
    return Hrefs.type({name: typeName}) + "/sample/" + encodeFileName(pageIri);
  }

  static get types() {
    return "/types";
  }
}
