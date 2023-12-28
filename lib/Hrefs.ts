export default class Hrefs {
  static get contact() {
    return "https://minorgordon.net/contact";
  }

  static type({name}: {name: string}) {
    return Hrefs.types + "/" + name;
  }

  static get types() {
    return "/types";
  }
}
