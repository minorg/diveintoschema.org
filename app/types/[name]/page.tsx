import webDataCommonsCorpus from "@/app/webDataCommonsCorpus";

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
}

export async function generateStaticParams(): Promise<TypePageParams[]> {
  return (await webDataCommonsCorpus.classSpecificSubsets()).map(
    (classSpecificSubset) => ({
      name: classSpecificSubset.className,
    })
  );
}
