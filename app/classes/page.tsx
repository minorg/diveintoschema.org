import webDataCommonsCorpus from "../webDataCommonsCorpus";
import ClassesDataGrid from "@/lib/components/ClassesDataGrid";

export default async function ClassesPage() {
  return (
    <ClassesDataGrid
      classes={(await webDataCommonsCorpus.classSpecificSubsets()).map(
        (classSpecificSubset) => ({
          name: classSpecificSubset.className,
        })
      )}
    />
  );
}
