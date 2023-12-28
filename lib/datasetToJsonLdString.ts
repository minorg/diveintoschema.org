import {DatasetCore} from "@rdfjs/types";
import * as jsonld from "jsonld";
import sdoJsonLdContext from "../data/schema.org-jsonldcontext.json";

export default async function datasetToJsonLdString(
  dataset: DatasetCore,
  options?: {deleteId?: boolean}
): Promise<string> {
  const jsonLd = await jsonld.compact(
    await jsonld.fromRDF(dataset, {
      useNativeTypes: true,
    }),
    sdoJsonLdContext["@context"]
  );

  delete jsonLd["@context"];

  if (options?.deleteId) {
    delete jsonLd["id"];
  }

  //   const graphs: any[] = compactJsonLd["@graph"];
  //   console.info(JSON.stringify(graphs));
  //   invariant(graphs.length === 1);

  return JSON.stringify(jsonLd, undefined, 4);
}
