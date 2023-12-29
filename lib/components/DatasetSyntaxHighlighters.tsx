"use client";

import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JsonLdSyntaxHighlighter from "./JsonLdSyntaxHighlighter";
import TurtleSyntaxHighlighter from "./TurtleSyntaxHighlighter";

export default function DatasetSyntaxHighlighters({
  dataset,
}: {
  dataset: {
    jsonLd: string;
    turtle: string;
  };
}) {
  return (
    <Tabs>
      <TabList>
        <Tab>JSON-LD</Tab>
        <Tab>Turtle</Tab>
      </TabList>

      <TabPanel>
        <JsonLdSyntaxHighlighter jsonLdString={dataset.jsonLd} />
      </TabPanel>
      <TabPanel>
        <TurtleSyntaxHighlighter turtleString={dataset.turtle} />
      </TabPanel>
    </Tabs>
  );
}
