import webDataCommonsCorpus from "@/app/webDataCommonsCorpus";
import Hrefs from "@/lib/Hrefs";
import PageMetadata from "@/lib/PageMetadata";
import BreadcrumbsLayout from "@/lib/components/BreadcrumbsLayout";
import DatasetSyntaxHighlighters from "@/lib/components/DatasetSyntaxHighlighters";
import datasetToStrings from "@/lib/datasetToStrings";
import {Metadata} from "next";

interface TypeSamplePageParams {
  samplePageIri: string;
  typeName: string;
}

export default async function TypeSamplePage({
  params: {samplePageIri: samplePageIriEncoded, typeName},
}: {
  params: TypeSamplePageParams;
}) {
  const classSpecificSubset = (
    await webDataCommonsCorpus.classSpecificSubsetsByClassName()
  )[typeName];
  const samplePageIri = Buffer.from(samplePageIriEncoded, "base64url").toString(
    "utf-8"
  );
  const samplePage = (await classSpecificSubset.samplePagesByIri())[
    samplePageIri
  ];

  return (
    <BreadcrumbsLayout
      breadcrumbs={[
        {
          href: Hrefs.types,
          text: "Types",
        },
        {
          href: Hrefs.type({name: typeName}),
          text: typeName,
        },
        {
          text: "Sample pages",
        },
        {
          href: Hrefs.typeSamplePage({samplePageIri, typeName}),
          text: samplePageIri,
        },
      ]}
    >
      <DatasetSyntaxHighlighters
        dataset={await datasetToStrings(samplePage.dataset)}
      />
    </BreadcrumbsLayout>
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
