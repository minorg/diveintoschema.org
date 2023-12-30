import webDataCommonsCorpus from "@/app/webDataCommonsCorpus";
import PageMetadata from "@/lib/PageMetadata";
import DatasetSyntaxHighlighters from "@/lib/components/DatasetSyntaxHighlighters";
import datasetToStrings from "@/lib/datasetToStrings";
import {Metadata} from "next";

interface TypeSamplePageParams {
  samplePageIri: string;
  typeName: string;
}

export default async function TypeSamplePage({
  params: {samplePageIri, typeName},
}: {
  params: TypeSamplePageParams;
}) {
  const classSpecificSubset = (
    await webDataCommonsCorpus.classSpecificSubsetsByClassName()
  )[typeName];
  const samplePage = (await classSpecificSubset.samplePagesByIri())[
    Buffer.from(samplePageIri, "base64url").toString("utf-8")
  ];

  return (
    <DatasetSyntaxHighlighters
      dataset={await datasetToStrings(samplePage.dataset)}
    />
  );
}

export function generateMetadata({
  params,
}: {
  params: TypeSamplePageParams;
}): Metadata {
  return PageMetadata.typeSamplePage(params);
}

export async function generateStaticParams(): Promise<TypeSamplePageParams[]> {
  const params = (
    await Promise.all(
      (await webDataCommonsCorpus.classSpecificSubsets()).map(
        (classSpecificSubset) =>
          classSpecificSubset.samplePagesByIri().then((samplePagesByIri) =>
            Object.values(samplePagesByIri).map((samplePage) => ({
              samplePageIri: Buffer.from(
                samplePage.pageIri.value,
                "utf-8"
              ).toString("base64url"),
              typeName: classSpecificSubset.className,
            }))
          )
      )
    )
  ).flat();
  return params;
}
