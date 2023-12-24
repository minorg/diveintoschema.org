import webDataCommonsCorpus from "../webDataCommonsCorpus";
import TypesTable from "@/lib/components/TypesTable";

export default async function TypesPage() {
  return (
    <TypesTable
      rows={(await webDataCommonsCorpus.classSpecificSubsets()).map(
        (classSpecificSubset) => ({
          generalStats: classSpecificSubset.generalStats,
          name: classSpecificSubset.className,
          relatedTypes: classSpecificSubset.relatedClasses,
        })
      )}
    />
  );
}
