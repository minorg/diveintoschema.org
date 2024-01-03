import Hrefs from "@/lib/Hrefs";
import PageMetadata from "@/lib/PageMetadata";
import JsonLdSyntaxHighlighter from "@/lib/components/JsonLdSyntaxHighlighter";
import Link from "@/lib/components/Link";
import datasetToJsonLdString from "@/lib/datasetToJsonLdString";
import slugify from "@/lib/slugify";
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

function JsonLdSyntaxHighlighterContainer({
  jsonLdString,
}: {
  jsonLdString: string;
}) {
  return (
    <div className="opacity-75 hidden xl:block md:text-lg lg:text-xl">
      <JsonLdSyntaxHighlighter jsonLdString={jsonLdString} />
    </div>
  );
}

export default async function RootPage() {
  const questionDatasetJsonLdString =
    await datasetToJsonLdString(questionDataset);
  const selfDatasetJsonLdString = await datasetToJsonLdString(selfDataset);

  return (
    <div className="flex flex-col px-4 gap-4 md:gap-8 lg:gap-16">
      <div className="flex flex-row">
        <div className="flex flex-col flex-grow gap-8 text-lg md:text-xl lg:text-2xl">
          <div>You&apos;ve read the tutorials.</div>
          <div>You&apos;ve tried the builders and the wizards.</div>
          <div>
            You know what structured data is and why it&apos;s useful, and
            you&apos;re not afraid of JSON-LD.
          </div>
          <div>Now what?</div>
        </div>
        <JsonLdSyntaxHighlighterContainer
          jsonLdString={selfDatasetJsonLdString}
        />
      </div>
      <div
        className="mx-auto text-black md:text-lg lg:text-xl"
        style={{maxWidth: "80%"}}
      >
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
        <JsonLdSyntaxHighlighterContainer
          jsonLdString={questionDatasetJsonLdString}
        />
        <div className="flex-grow md:text-lg lg:text-xl">
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
      <div className=" flex flex-col gap-2 text-black text-center md:text-lg lg:text-xl">
        <p>Ready to dive in?</p>
        <p>
          Try <Link href={Hrefs.types}>browsing the list of types</Link>, or
        </p>
        <div>
          Check out these examples:
          <ul>
            <li>
              <Link
                href={Hrefs.typeSamplePage({
                  samplePageIriSlug: slugify(
                    "http://www.hotelwytheville.com/things-to-do"
                  ),
                  typeName: "Hotel",
                })}
              >
                Hotel
              </Link>
            </li>
            <li>
              <Link
                href={Hrefs.typeSamplePage({
                  samplePageIriSlug: slugify(
                    "https://barr-nunntruckingjobs.com/team-over-the-road-truck-driving-job-11-day-fleet.asp"
                  ),
                  typeName: "JobPosting",
                })}
              >
                JobPosting
              </Link>
            </li>
            <li>
              <Link
                href={Hrefs.typeSamplePage({
                  samplePageIriSlug: slugify(
                    "https://1776steakhouse.com/menuitems/surf-and-turf-burger/"
                  ),
                  typeName: "Restaurant",
                })}
              >
                Restaurant
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
