import {Metadata} from "next";

const description = "Exploring uses of schema.org types across the web";
const titlePrefix = "Dive Into Schema.org: ";

export default class PageMetadata {
  static get about(): Metadata {
    return {
      description,
      title: titlePrefix + "About",
    };
  }

  static get index(): Metadata {
    return {
      description,
      title: "Dive Into Schema.org",
    };
  }

  static type({name}: {name: string}): Metadata {
    return {
      description,
      title: titlePrefix + "Types: " + name,
    };
  }

  static get types(): Metadata {
    return {
      description,
      title: titlePrefix + "Types",
    };
  }
}
