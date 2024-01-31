import PageMetadata from "@/lib/PageMetadata";
import schemaDotOrgDataSet from "../schemaDotOrgDataSet";
import TypesTable from "@/lib/components/TypesTable";
import Hrefs from "@/lib/Hrefs";
import BreadcrumbsLayout from "@/lib/components/BreadcrumbsLayout";

export const metadata = PageMetadata.types;

export default async function TypesPage() {
  return (
    <BreadcrumbsLayout
      breadcrumbs={[
        {
          href: Hrefs.types,
          text: "Types",
        },
      ]}
    >
      <TypesTable
        rows={(await schemaDotOrgDataSet.classSubsets()).map((classSubset) => ({
          generalStats: classSubset.generalStats,
          name: classSubset.className,
          relatedTypes: classSubset.relatedClasses,
        }))}
      />
    </BreadcrumbsLayout>
  );
}
