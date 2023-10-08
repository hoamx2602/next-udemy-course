"use client";

import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import ReactMarkdown from "react-markdown";
import { TPost } from "@/types/posts/post.type";
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import {
  NormalComponents,
  SpecialComponents,
} from "react-markdown/src/ast-to-react";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";

type TPostContent = {
  post: TPost;
};

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);

const PostContent = (props: TPostContent) => {
  const { slug, image, title, content } = props.post;
  const imagePath = `/images/posts/${slug}/${image}`;

  const components: Partial<NormalComponents & SpecialComponents> = {
    p: ({ node, ...props }) => {
      if ("tagName" in node.children[0]) {
        const image = node.children[0];
        return (
          <div className={classes.image}>
            {
              <Image
                src={`/images/posts/getting-started-with-nextjs/${
                  image.properties!.src as string
                }`}
                alt={image.properties!.alt as string}
                width={600}
                height={300}
              />
            }
          </div>
        );
      }
      return <p>{props.children}</p>;
    },
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");

      return !inline && match ? (
        <SyntaxHighlighter
          style={atomDark}
          PreTag="div"
          language={match[1]}
          children={String(children).replace(/\n$/, "")}
          {...props}
        />
      ) : (
        <code className={className ? className : ""} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={title} image={imagePath} />
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
