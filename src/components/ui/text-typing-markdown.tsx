"use client";

import React, { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export default function TextTypingMarkdown({
  text,
  isTruncate = false,
}: {
  text: string;
  isTruncate?: boolean;
}) {
  const [typedText, setTypedText] = useState("");

  // efek typing kata per kata
  useEffect(() => {
    setTypedText("");
    const words = text?.split(" ") ?? [];
    let index = 0;

    const timer = setInterval(() => {
      setTypedText((prev) => (prev ? `${prev} ${words[index]}` : words[index]));
      index += 1;
      if (index >= words.length) {
        clearInterval(timer);
      }
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, [text]);

  const finalMarkdown = useMemo(() => {
    const base = typedText || text;

    if (!isTruncate) return base;

    const regex = /(?=- \*\*)/g;
    const split = base.split(regex);

    if (split.length >= 3) {
      return (
        split[0].trim() +
        "\n\n" +
        split[1].trim() +
        "\n\n" +
        split[2].trim() +
        " ..."
      );
    }

    return base;
  }, [typedText, text, isTruncate]);

  return (
    <article className="prose prose-sm">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {finalMarkdown}
      </ReactMarkdown>
    </article>
  );
}
