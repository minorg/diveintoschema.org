import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import syntaxHighlighterStyle from "./syntaxHighlighterStyle";

export default function TurtleSyntaxHighlighter({
  turtleString,
}: {
  turtleString: string;
}) {
  return (
    <SyntaxHighlighter language="turtle" style={syntaxHighlighterStyle}>
      {turtleString}
    </SyntaxHighlighter>
  );
}
