export type MarkdownBlock =
  | HeadingBlock
  | ParagraphBlock
  | BlockquoteBlock
  | OrderedListBlock
  | UnorderedListBlock
  | HorizontalRuleBlock;

export type InlineNode =
  | TextInline
  | BoldInline
  | ItalicInline
  | BoldItalicInline
  | LineBreakInline
  | LinkInline
  | AutoLinkInline
  | ColorInline;

export type HeadingLevel = 1 | 2 | 3 | 4;

export type HeadingBlock = {
  type: "heading";
  level: HeadingLevel;
  content: InlineNode[];
};

export type ParagraphBlock = {
  type: "paragraph";
  content: InlineNode[];
};

export type BlockquoteBlock = {
  type: "blockquote";
  depth: number;
  blocks: MarkdownBlock[];
};

export type OrderedListBlock = {
  type: "ordered-list";
  items: ListItem[];
};

export type UnorderedListBlock = {
  type: "unordered-list";
  marker: "-" | "*" | "+";
  items: ListItem[];
};

export type ListItem = {
  content: InlineNode[];
  children?: MarkdownBlock[];
};

export type HorizontalRuleBlock = {
  type: "horizontal-rule";
};

export type TextInline = {
  type: "text";
  value: string;
};

export type BoldInline = {
  type: "bold";
  content: InlineNode[];
};

export type ItalicInline = {
  type: "italic";
  content: InlineNode[];
};

export type BoldItalicInline = {
  type: "bold-italic";
  content: InlineNode[];
};

export type LineBreakInline = {
  type: "line-break";
};

export type LinkInline = {
  type: "link";
  label: InlineNode[];
  href: string;
};

export type AutoLinkInline = {
  type: "auto-link";
  value: string;
};

export type ColorInline = {
  type: "color";
  color: MarkdownColor;
  content: InlineNode[];
};

export type MarkdownColor =
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose"
  | "slate"
  | "gray"
  | "zinc"
  | "mauve"
  | "taupe"
  | "mist"
  | "olive"
  | "stone";