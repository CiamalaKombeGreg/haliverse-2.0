import type { InlineNode, MarkdownBlock } from "./types";
import { colorClasses, headingClasses, markdownClasses } from "./styles";

type ModifiedMarkdownProps = {
  blocks: MarkdownBlock[];
};

export function ModifiedMarkdown({ blocks }: ModifiedMarkdownProps) {
  return (
    <div className={markdownClasses.root}>
      {blocks.map((block, index) => (
        <MarkdownBlockRenderer key={index} block={block} />
      ))}
    </div>
  );
}

type MarkdownBlockRendererProps = {
  block: MarkdownBlock;
};

function MarkdownBlockRenderer({ block }: MarkdownBlockRendererProps) {
  switch (block.type) {
    case "heading": {
      const content = <InlineRenderer nodes={block.content} />;

      if (block.level === 1) {
        return <h1 className={headingClasses[1]}>{content}</h1>;
      }

      if (block.level === 2) {
        return <h2 className={headingClasses[2]}>{content}</h2>;
      }

      if (block.level === 3) {
        return <h3 className={headingClasses[3]}>{content}</h3>;
      }

      return <h4 className={headingClasses[4]}>{content}</h4>;
    }

    case "paragraph":
      return (
        <p className={markdownClasses.paragraph}>
          <InlineRenderer nodes={block.content} />
        </p>
      );

    case "blockquote":
      return (
        <blockquote
          className={markdownClasses.blockquote}
          style={{
            marginLeft: `${(block.depth - 1) * 1.25}rem`,
          }}
        >
          {block.blocks.map((childBlock, index) => (
            <MarkdownBlockRenderer key={index} block={childBlock} />
          ))}
        </blockquote>
      );

    case "ordered-list":
      return (
        <ol className={markdownClasses.orderedList}>
          {block.items.map((item, index) => (
            <li key={index}>
              <InlineRenderer nodes={item.content} />
            </li>
          ))}
        </ol>
      );

    case "unordered-list":
      return (
        <ul className={markdownClasses.unorderedList}>
          {block.items.map((item, index) => (
            <li key={index}>
              <InlineRenderer nodes={item.content} />
            </li>
          ))}
        </ul>
      );

    case "horizontal-rule":
      return <hr className={markdownClasses.horizontalRule} />;
  }
}

type InlineRendererProps = {
  nodes: InlineNode[];
};

function InlineRenderer({ nodes }: InlineRendererProps) {
  return (
    <>
      {nodes.map((node, index) => {
        switch (node.type) {
          case "text":
            return node.value;

          case "line-break":
            return <br key={index} />;

          case "bold":
            return (
              <strong key={index} className={markdownClasses.bold}>
                <InlineRenderer nodes={node.content} />
              </strong>
            );

          case "italic":
            return (
              <em key={index} className={markdownClasses.italic}>
                <InlineRenderer nodes={node.content} />
              </em>
            );

          case "bold-italic":
            return (
              <strong key={index} className={markdownClasses.boldItalic}>
                <em>
                  <InlineRenderer nodes={node.content} />
                </em>
              </strong>
            );

          case "link":
            return (
              <a
                key={index}
                href={node.href}
                className={markdownClasses.link}
                target="_blank"
                rel="noreferrer"
              >
                <InlineRenderer nodes={node.label} />
              </a>
            );

          case "auto-link": {
            const href = node.value.includes("@")
              ? `mailto:${node.value}`
              : node.value;

            return (
              <a
                key={index}
                href={href}
                className={markdownClasses.link}
                target="_blank"
                rel="noreferrer"
              >
                {node.value}
              </a>
            );
          }

          case "color":
            return (
              <span key={index} className={colorClasses[node.color]}>
                <InlineRenderer nodes={node.content} />
              </span>
            );
        }
      })}
    </>
  );
}