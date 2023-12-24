export default class Hrefs {
  static type({name}: {name: string}) {
    return Hrefs.types + name;
  }

  static get types() {
    return "/types/";
  }
}
