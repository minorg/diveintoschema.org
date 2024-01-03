import majesticMillionReport from "@/app/majesticMillionReport";
import webDataCommonsCorpus from "@/app/webDataCommonsCorpus";
import Hrefs from "@/lib/Hrefs";
import PageMetadata from "@/lib/PageMetadata";
import BreadcrumbsLayout from "@/lib/components/BreadcrumbsLayout";
import Link from "@/lib/components/Link";
import TypeDomainsTable, {TypeDomain} from "@/lib/components/TypeDomainsTable";
import TypeGeneralStatsTable from "@/lib/components/TypeGeneralStatsTable";
import slugify from "@/lib/slugify";
import {Metadata} from "next";

interface TypePageParams {
  typeName: string;
}

export default async function TypePage({
  params: {typeName},
}: {
  params: TypePageParams;
}) {
  const classSpecificSubset = (
    await webDataCommonsCorpus.classSpecificSubsetsByClassName()
  )[typeName];

  const generalStats = classSpecificSubset.generalStats;

  const domains: TypeDomain[] = [];
  for (const pldStats of await classSpecificSubset.pldStats()) {
    domains.push({
      domain: pldStats.domain,
      stats: {
        entitiesOfClass: pldStats.entitiesOfClass,
        majesticMillionGlobalRank:
          await majesticMillionReport.getDomainGlobalRank(pldStats.domain),
        propertiesAndDensity: pldStats.propertiesAndDensity,
        quadsOfSubset: pldStats.quadsOfSubset,
      },
    });
  }

  const samplePages = Object.values(
    await classSpecificSubset.samplePagesByIri()
  );

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
      ]}
    >
      <div className="flex flex-col gap-8">
        <div>
          <Link href={`https://schema.org/${typeName}`}>
            Schema.org documentation
          </Link>
        </div>
        <div>
          <div className="font-bold">General statistics</div>
          <div className="ml-2 mt-2">
            <TypeGeneralStatsTable {...generalStats} />
          </div>
        </div>
        {domains.length > 0 ? (
          <div>
            <div className="font-bold">Domain statistics</div>
            <div className="ml-2 mt-2">
              <TypeDomainsTable rows={domains} />
            </div>
          </div>
        ) : null}
        {samplePages.length > 0 ? (
          <div>
            <div className="font-bold">Sample pages</div>
            <div className="ml-2 mt-2">
              <ul className="list-inside list-disc">
                {samplePages.map((samplePage) => (
                  <li key={samplePage.pageIri.value}>
                    <Link
                      href={Hrefs.typeSamplePage({
                        samplePageIriSlug: slugify(samplePage.pageIri.value),
                        typeName,
                      })}
                    >
                      {samplePage.pageIri.value}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </BreadcrumbsLayout>
  );
}

export function generateMetadata({params}: {params: TypePageParams}): Metadata {
  return PageMetadata.type({name: params.typeName});
}

export async function generateStaticParams(): Promise<TypePageParams[]> {
  return (await webDataCommonsCorpus.classSpecificSubsets()).map(
    (classSpecificSubset) => ({
      typeName: classSpecificSubset.className,
    })
  );
}
