import { unified } from "unified";
import markdownPDF from "remark-pdf";
import markdownParser from "remark-parse";
import type { APIRoute } from 'astro';

const remarkPDFOptions = {
  margin: 16,
  spacing: 8,
}

type MarkdownNode = {
  type: string;
  children?: MarkdownNode[];
  value?: string;
  ordered?: boolean;
  start?: number;
  checked?: boolean | null;
};

const getText = (node: MarkdownNode): string => {
  if (typeof node.value === "string") {
    return node.value;
  }

  if (!Array.isArray(node.children)) {
    return "";
  }

  return node.children.map(getText).join("");
};

const flattenLists = (node: MarkdownNode): void => {
  if (!Array.isArray(node.children)) {
    return;
  }

  const nextChildren: MarkdownNode[] = [];

  for (const child of node.children) {
    if (child.type === "list" && Array.isArray(child.children)) {
      child.children.forEach((item, index) => {
        const prefix = child.ordered
          ? `${(child.start ?? 1) + index}.`
          : item.checked === true
            ? "[x]"
            : item.checked === false
              ? "[ ]"
              : "•";

        nextChildren.push({
          type: "paragraph",
          children: [
            {
              type: "text",
              value: `${prefix}${getText(item)}`
            }
          ]
        });
      });
      continue;
    }

    flattenLists(child);
    nextChildren.push(child);
  }

  node.children = nextChildren;
};

const flattenListPlugin = () => (tree: MarkdownNode): void => {
  flattenLists(tree);
};

export const GET: APIRoute = async (): Promise<Response> => {
  const resumeMarkdown = await Deno.readTextFile(
    new URL("./resume.md", import.meta.url)
  );

  const file = await unified()
    .use(markdownParser)
    .use(flattenListPlugin)
    .use(markdownPDF, remarkPDFOptions)
    .process(resumeMarkdown);
  const pdfBytes = new Uint8Array(await file.result);

  return new Response(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="resume.pdf"'
    }
  });
}