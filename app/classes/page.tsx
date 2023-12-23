import webDataCommonsCorpus from "../webDataCommonsCorpus";
import ClassesTable from "@/lib/components/ClassesTable";

export default async function ClassesPage() {
  return (
    <ClassesTable
      classes={(await webDataCommonsCorpus.classSpecificSubsets()).map(
        (classSpecificSubset) => ({
          name: classSpecificSubset.className,
          relatedClasses: classSpecificSubset.relatedClasses,
          stats: classSpecificSubset.generalStats,
        })
      )}
    />
  );
}
