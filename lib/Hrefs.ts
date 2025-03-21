export default class Hrefs {
  static get about() {
    return `${Hrefs.root}about`;
  }

  static get root() {
    return "/diveintoschema.org/";
  }

  static type({name}: {name: string}) {
    return `${Hrefs.types}/${name}`;
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
    return `${Hrefs.root}types`;
  }
}
