import webDataCommonsCorpus from "@/app/webDataCommonsCorpus";
import Hrefs from "@/lib/Hrefs";
import PageMetadata from "@/lib/PageMetadata";
import BreadcrumbsLayout from "@/lib/components/BreadcrumbsLayout";
import DatasetSyntaxHighlighters from "@/lib/components/DatasetSyntaxHighlighters";
import Link from "@/lib/components/Link";
import datasetToStrings from "@/lib/datasetToStrings";
import WebDataCommonsCorpusPageSubset from "@/lib/models/WebDataCommonsCorpusPageSubset";
import slugify from "@/lib/slugify";
import {Metadata} from "next";
import invariant from "ts-invariant";

interface TypeSamplePageParams {
  samplePageIriSlug: string;
  typeName: string;
}

async function getSamplePage({
  samplePageIriSlug,
  typeName,
}: TypeSamplePageParams): Promise<WebDataCommonsCorpusPageSubset> {
  const classSpecificSubset = (
    await webDataCommonsCorpus.classSpecificSubsetsByClassName()
  )[typeName];
  invariant(classSpecificSubset, typeName);
  const samplePage = (await classSpecificSubset.samplePagesByIriSlug())[
    samplePageIriSlug
  ];
  invariant(samplePage, samplePageIriSlug);
  return samplePage;
}

export default async function TypeSamplePage({
  params: {samplePageIriSlug, typeName},
}: {
  params: TypeSamplePageParams;
}) {
  const samplePage = await getSamplePage({samplePageIriSlug, typeName});

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
          href: Hrefs.typeSamplePage({samplePageIriSlug, typeName}),
          text: samplePage.pageIri.value,
        },
      ]}
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div>
            <Link href={samplePage.pageIri.value}>Source page</Link>
          </div>
          <div>
            <Link
              href={`https://validator.schema.org/#url=${encodeURIComponent(
                samplePage.pageIri.value
              )}`}
            >
              Schema.org Schema Markup Validator
            </Link>
          </div>
          <div>
            <Link
              href={`https://search.google.com/test/rich-results?url=${encodeURIComponent(
                samplePage.pageIri.value
              )}`}
            >
              Google Rich Results Test
            </Link>
          </div>
        </div>
        <DatasetSyntaxHighlighters
          dataset={await datasetToStrings(samplePage.dataset)}
        />
      </div>
    </BreadcrumbsLayout>
  );
}

export async function generateMetadata({
  params,
}: {
  params: TypeSamplePageParams;
}): Promise<Metadata> {
  const samplePage = await getSamplePage(params);
  return PageMetadata.typeSamplePage({
    samplePageIri: samplePage.pageIri.value,
    typeName: params.typeName,
  });
}

export async function generateStaticParams(): Promise<TypeSamplePageParams[]> {
  const params = (
    await Promise.all(
      (await webDataCommonsCorpus.classSpecificSubsets()).map(
        (classSpecificSubset) =>
          classSpecificSubset.samplePagesByIri().then((samplePagesByIri) =>
            Object.values(samplePagesByIri).map((samplePage) => ({
              samplePageIriSlug: slugify(samplePage.pageIri.value),
              typeName: classSpecificSubset.className,
            }))
          )
      )
    )
  ).flat();
  return params;
}
