import {DatasetCore} from "@rdfjs/types";
import {schema} from "@tpluscode/rdf-ns-builders";
// @ts-expect-error No types
import Serializer from "@rdfjs/serializer-turtle";

export default function datasetToTurtleString(dataset: DatasetCore): string {
  const serializer = new Serializer();
  serializer.options.prefixes = [["", schema[""]]];
  return serializer.transform([...dataset]);
}
