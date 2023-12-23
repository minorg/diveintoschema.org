export default class Hrefs {
  static get classes() {
    return "/classes/";
  }

  static class_({className}: {className: string}) {
    return Hrefs.classes + className;
  }
}
