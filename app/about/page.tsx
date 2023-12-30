import Hrefs from "@/lib/Hrefs";
import PageMetadata from "@/lib/PageMetadata";
import JsonLdSyntaxHighlighter from "@/lib/components/JsonLdSyntaxHighlighter";
import LicenseLink from "@/lib/components/LicenseLink";
import Link from "@/lib/components/Link";
import MainLayout from "@/lib/components/MainLayout";
import datasetToJsonLdString from "@/lib/datasetToJsonLdString";
import {DatasetCore} from "@rdfjs/types";
import {rdf, schema} from "@tpluscode/rdf-ns-builders";
import {DataFactory, Store} from "n3";

export const metadata = PageMetadata.about;

const selfDataset = ((): DatasetCore => {
  const store = new Store();

  const subject = DataFactory.blankNode();
  store.addQuad(subject, rdf.type, schema.Person);
  store.addQuad(
    subject,
    schema.description,
    DataFactory.literal("Author of Dive Into Schema.org")
  );
  store.addQuad(subject, schema.familyName, DataFactory.literal("Gordon"));
  store.addQuad(subject, schema.givenName, DataFactory.literal("Minor"));
  store.addQuad(
    subject,
    schema.knowsAbout,
    DataFactory.namedNode("https://schema.org")
  );
  store.addQuad(subject, schema.name, DataFactory.literal("Minor Gordon"));
  store.addQuad(
    subject,
    schema.url,
    DataFactory.namedNode("https://minorgordon.net")
  );

  return store;
})();

export default async function AboutPage() {
  const selfDatasetJsonLdString = await datasetToJsonLdString(selfDataset, {
    deleteId: true,
  });

  return (
    <MainLayout>
      <div className="flex flex-row gap-6">
        <div className="flex flex-col gap-6 text-xl" style={{flex: 2}}>
          <p>
            Schema.org types are well-documented on schema.org itself, and there
            are plenty of basic examples of good markup there and in tutorials
            across the web.
          </p>
          <p>
            Studying advanced examples of structured data &quot;in the
            wild&quot; is more challenging. I developed Dive Into Schema.org to
            fill the gap between start-from-zero tutorials and the weeds of raw
            RDF. There is a need for unbiased information, presented well.
          </p>
          <p>
            I&apos;ve needed a reference like Dive Into Schema.org in several of
            my own projects, such as{" "}
            <Link href="https://paradicms.github.io">Paradicms</Link>. Before I
            use a property or type I want to understand the nuances of how other
            people are using them. I don&apos;t want to guess at semantics. The
            official documentation is a great starting point, but it&apos;s not
            the whole story.
          </p>
          <p>
            Dive Into Schema.org is built using{" "}
            <Link href="https://nextjs.org/">Next.js</Link> static site
            generation and hosted on{" "}
            <Link href="https://pages.github.com/">GitHub Pages</Link>. The site
            incorporates extracts and metadata from the{" "}
            <Link href="https://webdatacommons.org">
              Web Data Commons corpus
            </Link>{" "}
            and rankings from{" "}
            <Link href="https://majestic.com/reports/majestic-million">
              The Majestic Million
            </Link>
            .
          </p>
          <p>
            Original content on this site is licensed under the <LicenseLink />.
          </p>
          <p>
            Comments or questions about the site?{" "}
            <Link href={Hrefs.contact}>Contact me</Link>.
          </p>
        </div>
        <div className="flex flex-row justify-center text-xl" style={{flex: 1}}>
          <JsonLdSyntaxHighlighter jsonLdString={selfDatasetJsonLdString} />
        </div>
      </div>
    </MainLayout>
  );
}
