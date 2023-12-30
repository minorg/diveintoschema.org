import {DatasetCore} from "@rdfjs/types";
import datasetToJsonLdString from "./datasetToJsonLdString";
import datasetToTurtleString from "./datasetToTurtleString";

export default async function datasetToStrings(dataset: DatasetCore): Promise<{
  jsonLd: string;
  turtle: string;
}> {
  return {
    jsonLd: await datasetToJsonLdString(dataset),
    turtle: await datasetToTurtleString(dataset),
  };
}
