import {DatasetCore} from "@rdfjs/types";
import {schema} from "@tpluscode/rdf-ns-builders";
import {Writer} from "n3";

export default async function datasetToTurtleString(
  dataset: DatasetCore
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new Writer({prefixes: {"": schema[""].value}});
    for (const quad of dataset) {
      writer.addQuad(quad);
    }
    writer.end((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}
