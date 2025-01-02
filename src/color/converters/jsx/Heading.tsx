import React from "react";
import { JSXConverters } from "@payloadcms/richtext-lexical/react";
import { CustomHeadingNode } from "../../nodes/CustomHeadingNode";

export const HeadingJSXConverter: JSXConverters<CustomHeadingNode> = {
  "custom-heading": ({ node, nodesToJSX }) => {
    const children = nodesToJSX({
      nodes: node.children,
    });

    const style: React.CSSProperties = { paddingTop: ".5rem", paddingBottom: ".5rem" };
    const match = node.style.match(/background-color: ([^;]+)/);

    match && (style.backgroundColor = match[1]);
    if (node.tag === "h1") {
      if (!children?.length) {
        return (
          <h1>
            <br />
          </h1>
        );
      }
      return <h1 style={style}>{children}</h1>;
    }
    if (node.tag === "h2") {
      if (!children?.length) {
        return (
          <h2>
            <br />
          </h2>
        );
      }
      return <h2 style={style}>{children}</h2>;
    }
    if (node.tag === "h3") {
      if (!children?.length) {
        return (
          <h3>
            <br />
          </h3>
        );
      }
      return <h3 style={style}>{children}</h3>;
    }
    if (node.tag === "h4") {
      if (!children?.length) {
        return (
          <h4>
            <br />
          </h4>
        );
      }
      return <h4 style={style}>{children}</h4>;
    }
    if (node.tag === "h5") {
      if (!children?.length) {
        return (
          <h5>
            <br />
          </h5>
        );
      }
      return <h5 style={style}>{children}</h5>;
    }
    if (node.tag === "h6") {
      if (!children?.length) {
        return (
          <h6>
            <br />
          </h6>
        );
      }
      return <h6 style={style}>{children}</h6>;
    }
  },
};
