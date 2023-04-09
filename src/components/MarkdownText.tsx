import { type ChangeEventHandler, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you
import ReactTextareaAutosize from "react-textarea-autosize";

interface Props {
  text: string;
}

const MarkdownText: React.FC<Props> = (props) => {
  return (
    <div key="markdown" className="text-xl">
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {props.text}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownText;
