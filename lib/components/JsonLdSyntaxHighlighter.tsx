import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import syntaxHighlighterStyle from "./syntaxHighlighterStyle";

export default function JsonLdSyntaxHighlighter({
  jsonLdString,
}: {
  jsonLdString: string;
}) {
  return (
    <SyntaxHighlighter language="json" style={syntaxHighlighterStyle}>
      {jsonLdString}
    </SyntaxHighlighter>
  );
}
