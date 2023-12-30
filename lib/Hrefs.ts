export default class Hrefs {
  static get about() {
    return "/about";
  }

  static get contact() {
    return "https://minorgordon.net/contact";
  }

  static get root() {
    return "/";
  }

  static type({name}: {name: string}) {
    return Hrefs.types + "/" + name;
  }

  static typeSamplePage({
    samplePageIriSlug,
    typeName,
  }: {
    samplePageIriSlug: string;
    typeName: string;
  }) {
    return Hrefs.type({name: typeName}) + "/samples/" + samplePageIriSlug;
  }

  static get types() {
    return "/types";
  }
}
