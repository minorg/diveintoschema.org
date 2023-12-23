export default class Hrefs {
  static get classes() {
    return "/classes/";
  }

  static class_({name}: {name: string}) {
    return Hrefs.classes + name;
  }
}
