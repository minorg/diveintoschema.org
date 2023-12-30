import Hrefs from "@/lib/Hrefs";
import PageMetadata from "@/lib/PageMetadata";
import JsonLdSyntaxHighlighter from "@/lib/components/JsonLdSyntaxHighlighter";
import Link from "@/lib/components/Link";
import datasetToJsonLdString from "@/lib/datasetToJsonLdString";
import {DatasetCore} from "@rdfjs/types";
import {rdf, schema} from "@tpluscode/rdf-ns-builders";
import {DataFactory, Store} from "n3";

export const metadata = PageMetadata.index;

const questionDataset = ((): DatasetCore => {
  const store = new Store();

  const subject = DataFactory.namedNode("https://diveintoschema.org/question");
  store.addQuad(subject, rdf.type, schema.Question);
  store.addQuad(
    subject,
    schema.text,
    DataFactory.literal("Which popular websites are using the Dataset type?")
  );

  return store;
})();

const selfDataset = ((): DatasetCore => {
  const store = new Store();

  const subject = DataFactory.namedNode("https://diveintoschema.org");
  store.addQuad(subject, rdf.type, schema.WebSite);
  store.addQuad(
    subject,
    schema.license,
    DataFactory.namedNode("https://creativecommons.org/licenses/by-sa/4.0/")
  );
  store.addQuad(
    subject,
    schema.name,
    DataFactory.literal("Dive Into Schema.org")
  );

  // const publisher = DataFactory.namedNode("https://minorgordon.net");
  // store.addQuad(publisher, rdf.type, schema.Person);
  // store.addQuad(publisher, schema.name, DataFactory.literal("Minor Gordon"));
  // store.addQuad(subject, schema.publisher, publisher);

  return store;
})();

export default async function RootPage() {
  const questionDatasetJsonLdString =
    await datasetToJsonLdString(questionDataset);
  const selfDatasetJsonLdString = await datasetToJsonLdString(selfDataset);

  return (
    <div className="flex flex-col gap-24">
      <div className="flex flex-row">
        <div className="flex flex-col flex-grow gap-8 text-4xl">
          <div>You&apos;ve read the tutorials.</div>
          <div>You&apos;ve tried the builders and the wizards.</div>
          <div>
            You know what structured data is and why it&apos;s useful, and
            you&apos;re not afraid of JSON-LD.
          </div>
          <div>Now what?</div>
        </div>
        <div className="text-xl">
          <JsonLdSyntaxHighlighter jsonLdString={selfDatasetJsonLdString} />
        </div>
      </div>
      <div className="mx-auto text-black text-2xl" style={{maxWidth: "80%"}}>
        Whether you&apos;re doing search engine optimization or building an
        ontology, Dive Into Schema.org will help you move beyond toy examples
        and understand how <Link href="https://schema.org">schema.org</Link>
        &nbsp; markup is used in the wild. We&apos;ve curated articles from
        around the web, cross-referenced data from{" "}
        <Link href="https://webdatacommons.org/">Web Data Commons</Link>
        &nbsp; and other sources, and presented it in a form that&apos;s easy to
        browse and search.
      </div>
      <div className="flex flex-row gap-16">
        <div className="text-xl">
          <JsonLdSyntaxHighlighter jsonLdString={questionDatasetJsonLdString} />
        </div>
        <div className="flex-grow text-2xl">
          With Dive Into Schema.org, you can answer questions like:
          <ul className="list-disc list-inside">
            <li>
              Which popular websites are using the{" "}
              <Link href={Hrefs.type({name: "Dataset"})}>Dataset</Link> type?
            </li>
            <li>
              What are some real-world examples of the{" "}
              <Link href={Hrefs.type({name: "GovernmentOrganization"})}>
                GovernmentOrganization
              </Link>
              &nbsp; type?
            </li>
            <li>Which schema.org types are used on sites about gardening?</li>
          </ul>
        </div>
      </div>
      <div className="text-black text-center text-2xl">
        Ready to dive in? Try{" "}
        <Link href={Hrefs.types}>browsing the list of types</Link>.
      </div>
    </div>
  );
}
