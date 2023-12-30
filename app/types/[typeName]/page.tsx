import webDataCommonsCorpus from "@/app/webDataCommonsCorpus";
import Hrefs from "@/lib/Hrefs";
import PageMetadata from "@/lib/PageMetadata";
import Link from "@/lib/components/Link";
import TypeDomainsTable from "@/lib/components/TypeDomainsTable";
import TypeGeneralStatsTable from "@/lib/components/TypeGeneralStatsTable";
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
  const pldStats = await classSpecificSubset.pldStats();
  const samplePages = Object.values(
    await classSpecificSubset.samplePagesByIri()
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="font-bold text-2xl">{typeName}</div>
      <Link href={`https://schema.org/{name}`}>Schema.org documentation</Link>
      <div>
        <div className="font-bold">General statistics</div>
        <div className="ml-2 mt-2">
          <TypeGeneralStatsTable {...generalStats} />
        </div>
      </div>
      {pldStats.length > 0 ? (
        <div>
          <div className="font-bold">Domain statistics</div>
          <div className="ml-2 mt-2">
            <TypeDomainsTable
              rows={pldStats.map((pldStatsRow) => ({
                domain: pldStatsRow.domain,
                stats: {
                  entitiesOfClass: pldStatsRow.entitiesOfClass,
                  propertiesAndDensity: pldStatsRow.propertiesAndDensity,
                  quadsOfSubset: pldStatsRow.quadsOfSubset,
                },
              }))}
            />
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
                      samplePageIri: samplePage.pageIri.value,
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
