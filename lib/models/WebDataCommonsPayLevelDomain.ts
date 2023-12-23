import WebShrinkerApi from "../WebShrinkerApi";
import WebShrinkerCategory from "./WebShrinkerCategory";

export default class WebDataCommonsPayLevelDomain {
  constructor(readonly name: string) {}

  async categories(): Promise<readonly WebShrinkerCategory[]> {
    return await new WebShrinkerApi().lookupCategories(this.name);
  }
}
