import {DatasetCore} from "@rdfjs/types";
import * as jsonld from "jsonld";
import {JsonLd} from "jsonld/jsonld-spec";

export default async function datasetToJsonLd(
  dataset: DatasetCore
): Promise<JsonLd> {
  const jsonLd = await jsonld.fromRDF(dataset, {
    useNativeTypes: true,
  });

  const compactJsonLd = await jsonld.compact(jsonLd, {
    "@base": "https://schema.org/",
    sdo: "http://schema.org/",
  });

  return compactJsonLd;
}
