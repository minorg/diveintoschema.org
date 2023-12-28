import webDataCommonsCorpus from "@/app/webDataCommonsCorpus";
import Link from "@/lib/components/Link";
import TypeDomainsTable from "@/lib/components/TypeDomainsTable";
import TypeGeneralStatsTable from "@/lib/components/TypeGeneralStatsTable";

interface TypePageParams {
  name: string;
}

export default async function TypePage({
  params: {name},
}: {
  params: TypePageParams;
}) {
  const classSpecificSubset = (
    await webDataCommonsCorpus.classSpecificSubsetsByClassName()
  )[name];

  const generalStats = classSpecificSubset.generalStats;
  const pldStats = await classSpecificSubset.pldStats();

  return (
    <div className="flex flex-col gap-8">
      <div className="font-bold text-2xl">{name}</div>
      <Link href={`https://schema.org/{name}`}>Schema.org documentation</Link>
      <div>
        <div className="font-bold">General statistics</div>
        <div className="ml-2 mt-2">
          <TypeGeneralStatsTable {...generalStats} />
        </div>
      </div>
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
    </div>
  );
}

export async function generateStaticParams(): Promise<TypePageParams[]> {
  return (await webDataCommonsCorpus.classSpecificSubsets()).map(
    (classSpecificSubset) => ({
      name: classSpecificSubset.className,
    })
  );
}
