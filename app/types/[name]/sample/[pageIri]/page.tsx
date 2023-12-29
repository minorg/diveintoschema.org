import webDataCommonsCorpus from "@/app/webDataCommonsCorpus";
import DatasetSyntaxHighlighters from "@/lib/components/DatasetSyntaxHighlighters";
import datasetToStrings from "@/lib/datasetToStrings";

interface SamplePageParams {
  pageIri: string;
  typeName: string;
}

export default async function SamplePage({
  pageIri,
  typeName,
}: SamplePageParams) {
  const classSpecificSubset = (
    await webDataCommonsCorpus.classSpecificSubsetsByClassName()
  )[typeName];
  const samplePage = (await classSpecificSubset.samplePagesByIri())[pageIri];

  return (
    <DatasetSyntaxHighlighters
      dataset={await datasetToStrings(samplePage.dataset)}
    />
  );
}
