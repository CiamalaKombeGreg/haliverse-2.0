import type {
  HeadingLevel,
  InlineNode,
  MarkdownBlock,
  MarkdownColor,
} from "./types";

const allowedColors: MarkdownColor[] = [
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
  "slate",
  "gray",
  "zinc",
  "mauve",
  "taupe",
  "mist",
  "olive",
  "stone",
];

export function parseModifiedMarkdown(input: string): MarkdownBlock[] {
  const normalizedInput = input.replace(/\r\n/g, "\n");
  const lines = normalizedInput.split("\n");

  const blocks: MarkdownBlock[] = [];
  let paragraphBuffer: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) {
      return;
    }

    const text = paragraphBuffer.join(" ").trim();

    if (text.length > 0) {
      blocks.push({
        type: "paragraph",
        content: parseInline(text),
      });
    }

    paragraphBuffer = [];
  };

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    const trimmed = line.trim();

    if (trimmed.length === 0) {
      flushParagraph();
      continue;
    }

    const heading = parseHeading(trimmed);
    if (heading) {
      flushParagraph();
      blocks.push(heading);
      continue;
    }

    if (isHorizontalRule(trimmed)) {
      flushParagraph();
      blocks.push({ type: "horizontal-rule" });
      continue;
    }

    const blockquote = parseSimpleBlockquote(lines, index);
    if (blockquote) {
      flushParagraph();
      blocks.push(blockquote.block);
      index = blockquote.nextIndex - 1;
      continue;
    }

    const orderedList = parseOrderedList(lines, index);
    if (orderedList) {
      flushParagraph();
      blocks.push(orderedList.block);
      index = orderedList.nextIndex - 1;
      continue;
    }

    const unorderedList = parseUnorderedList(lines, index);
    if (unorderedList) {
      flushParagraph();
      blocks.push(unorderedList.block);
      index = unorderedList.nextIndex - 1;
      continue;
    }

    paragraphBuffer.push(trimmed);
  }

  flushParagraph();

  return blocks;
}

function parseHeading(line: string): MarkdownBlock | null {
  const match = /^(#{1,4})\s+(.+)$/.exec(line);

  if (!match) {
    return null;
  }

  return {
    type: "heading",
    level: match[1].length as HeadingLevel,
    content: parseInline(match[2].trim()),
  };
}

function isHorizontalRule(line: string): boolean {
  return /^(\*{3,}|-{3,}|_{3,})$/.test(line);
}

function parseSimpleBlockquote(
  lines: string[],
  startIndex: number,
): { block: MarkdownBlock; nextIndex: number } | null {
  const firstLine = lines[startIndex].trim();

  if (!firstLine.startsWith(">")) {
    return null;
  }

  const quoteLines: string[] = [];
  let depth = 1;
  let index = startIndex;

  while (index < lines.length) {
    const currentLine = lines[index].trim();

    if (currentLine.length === 0) {
      quoteLines.push("");
      index++;
      continue;
    }

    const match = /^(>+)\s?(.*)$/.exec(currentLine);

    if (!match) {
      break;
    }

    depth = Math.max(depth, match[1].length);
    quoteLines.push(match[2]);
    index++;
  }

  return {
    block: {
      type: "blockquote",
      depth,
      blocks: parseModifiedMarkdown(quoteLines.join("\n")),
    },
    nextIndex: index,
  };
}

function parseOrderedList(
  lines: string[],
  startIndex: number,
): { block: MarkdownBlock; nextIndex: number } | null {
  const firstLine = lines[startIndex];

  if (!/^\d+\.\s+/.test(firstLine.trim())) {
    return null;
  }

  const items = [];
  let index = startIndex;

  while (index < lines.length) {
    const line = lines[index].trim();
    const match = /^\d+\.\s+(.+)$/.exec(line);

    if (!match) {
      break;
    }

    items.push({
      content: parseInline(match[1]),
    });

    index++;
  }

  return {
    block: {
      type: "ordered-list",
      items,
    },
    nextIndex: index,
  };
}

function parseUnorderedList(
  lines: string[],
  startIndex: number,
): { block: MarkdownBlock; nextIndex: number } | null {
  const firstLine = lines[startIndex].trim();
  const firstMatch = /^([-*+])\s+(.+)$/.exec(firstLine);

  if (!firstMatch) {
    return null;
  }

  const marker = firstMatch[1] as "-" | "*" | "+";
  const items = [];
  let index = startIndex;

  while (index < lines.length) {
    const line = lines[index].trim();
    const match = /^([-*+])\s+(.+)$/.exec(line);

    if (!match || match[1] !== marker) {
      break;
    }

    items.push({
      content: parseInline(match[2]),
    });

    index++;
  }

  return {
    block: {
      type: "unordered-list",
      marker,
      items,
    },
    nextIndex: index,
  };
}

export function parseInline(input: string): InlineNode[] {
  const nodes: InlineNode[] = [];
  let cursor = 0;

  while (cursor < input.length) {
    const remaining = input.slice(cursor);

    if (remaining.startsWith("<br>")) {
      nodes.push({ type: "line-break" });
      cursor += 4;
      continue;
    }

    const colorMatch = /^color\("([^"]+)"\)\[([a-z]+)\]/.exec(remaining);
    if (colorMatch && isAllowedColor(colorMatch[2])) {
      nodes.push({
        type: "color",
        color: colorMatch[2],
        content: parseInline(colorMatch[1]),
      });
      cursor += colorMatch[0].length;
      continue;
    }

    const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)/.exec(remaining);
    if (linkMatch) {
      nodes.push({
        type: "link",
        label: parseInline(linkMatch[1]),
        href: linkMatch[2],
      });
      cursor += linkMatch[0].length;
      continue;
    }

    const autoLinkMatch = /^<((https?:\/\/|mailto:)?[^<>\s]+@[^<>\s]+|https?:\/\/[^<>\s]+)>/.exec(
      remaining,
    );
    if (autoLinkMatch) {
      nodes.push({
        type: "auto-link",
        value: autoLinkMatch[1],
      });
      cursor += autoLinkMatch[0].length;
      continue;
    }

    const boldItalicMatch = /^\*\*\*([^*]+)\*\*\*/.exec(remaining);
    if (boldItalicMatch) {
      nodes.push({
        type: "bold-italic",
        content: parseInline(boldItalicMatch[1]),
      });
      cursor += boldItalicMatch[0].length;
      continue;
    }

    const boldMatch = /^\*\*([^*]+)\*\*/.exec(remaining);
    if (boldMatch) {
      nodes.push({
        type: "bold",
        content: parseInline(boldMatch[1]),
      });
      cursor += boldMatch[0].length;
      continue;
    }

    const italicMatch = /^\*([^*]+)\*/.exec(remaining);
    if (italicMatch) {
      nodes.push({
        type: "italic",
        content: parseInline(italicMatch[1]),
      });
      cursor += italicMatch[0].length;
      continue;
    }

    if (remaining.startsWith("\\")) {
      const escapedCharacter = remaining[1];

      if (escapedCharacter) {
        nodes.push({
          type: "text",
          value: escapedCharacter,
        });

        cursor += 2;
        continue;
      }
    }

    nodes.push({
      type: "text",
      value: input[cursor],
    });

    cursor++;
  }

  return mergeAdjacentTextNodes(nodes);
}

function mergeAdjacentTextNodes(nodes: InlineNode[]): InlineNode[] {
  const mergedNodes: InlineNode[] = [];

  for (const node of nodes) {
    const previous = mergedNodes[mergedNodes.length - 1];

    if (previous?.type === "text" && node.type === "text") {
      previous.value += node.value;
    } else {
      mergedNodes.push(node);
    }
  }

  return mergedNodes;
}

function isAllowedColor(value: string): value is MarkdownColor {
  return allowedColors.includes(value as MarkdownColor);
}