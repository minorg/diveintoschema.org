import webDataCommonsCorpus from "@/app/webDataCommonsCorpus";
import WebDataCommonsClassGeneralStats from "@/lib/models/WebDataCommonsClassGeneralStats";
import WebDataCommonsClassPayLevelDomainStats from "@/lib/models/WebDataCommonsClassPayLevelDomainStats";

interface ClassPageParams {
  className: string;
  generalStats: WebDataCommonsClassGeneralStats;
  payLevelDomainStats: readonly WebDataCommonsClassPayLevelDomainStats[];
  relatedClasses: readonly {count: number; name: string}[];
}

export default function ClassPage({
  className,
  generalStats,
  payLevelDomainStats,
  relatedClasses,
}: ClassPageParams) {
  return <div></div>;
}

export async function generateStaticParams(): Promise<ClassPageParams[]> {
  const classSpecificSubsets =
    await webDataCommonsCorpus.classSpecificSubsets();

  const classPayLevelDomainStats = await Promise.all(
    classSpecificSubsets.map((classSpecificSubset) =>
      classSpecificSubset.pldStats()
    )
  );

  return classSpecificSubsets.map((classSpecificSubset, classI) => ({
    className: classSpecificSubset.className,
    generalStats: classSpecificSubset.generalStats,
    payLevelDomainStats: classPayLevelDomainStats[classI],
    relatedClasses: classSpecificSubset.relatedClasses,
  }));
}
