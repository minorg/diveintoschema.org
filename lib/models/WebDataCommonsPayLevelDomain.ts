import WebShrinkerApi from "../WebShrinkerApi";
import WebShrinkerCategory from "./WebShrinkerCategory";
import {Memoize} from "typescript-memoize";

export default class WebDataCommonsPayLevelDomain {
  constructor(readonly name: string) {}

  @Memoize()
  async categories(): Promise<readonly WebShrinkerCategory[]> {
    return await new WebShrinkerApi().lookupCategories(this.name);
  }
}
