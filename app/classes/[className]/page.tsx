import webDataCommonsCorpus from "@/app/webDataCommonsCorpus";

interface ClassPageParams {
  className: string;
}

export default async function ClassPage({
  params: {className},
}: {
  params: ClassPageParams;
}) {
  const classSpecificSubset = (
    await webDataCommonsCorpus.classSpecificSubsetsByClassName()
  )[className];
}

export async function generateStaticParams(): Promise<ClassPageParams[]> {
  return (await webDataCommonsCorpus.classSpecificSubsets()).map(
    (classSpecificSubset) => ({
      className: classSpecificSubset.className,
    })
  );
}
