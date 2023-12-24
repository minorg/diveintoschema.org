import webDataCommonsCorpus from "../webDataCommonsCorpus";
import ClassesTable from "@/lib/components/ClassesTable";

export default async function ClassesPage() {
  return (
    <ClassesTable
      classes={(await webDataCommonsCorpus.classSpecificSubsets()).map(
        (classSpecificSubset) => ({
          generalStats: classSpecificSubset.generalStats,
          name: classSpecificSubset.className,
          relatedClasses: classSpecificSubset.relatedClasses,
        })
      )}
    />
  );
}
