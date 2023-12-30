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
      title: titlePrefix + "Type: " + name,
    };
  }

  static get types(): Metadata {
    return {
      description,
      title: titlePrefix + "Types",
    };
  }

  static typeSamplePage({
    samplePageIri,
    typeName,
  }: {
    samplePageIri: string;
    typeName: string;
  }) {
    return {
      description,
      title: titlePrefix + `Type: ${typeName} > Sample: ${samplePageIri}`,
    };
  }
}
