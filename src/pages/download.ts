import PDFDocument from 'pdfkit'
import type { APIRoute } from 'astro'
import type { MdastNode } from 'satteri'
import { markdownToMdast } from 'satteri'

type Root = Extract<MdastNode, { type: 'root' }>
type Content = Extract<MdastNode, { type: 'root' }>['children'][number]

const SPACING = {
  afterHeading: 0.5,
  afterParagraph: 1.5,
  afterList: 1
} as const

const FONT_SIZE = {
  h1: 24,
  h2: 18,
  body: 11
} as const

const FONT = {
  regular: 'Helvetica',
  bold: 'Helvetica-Bold',
  oblique: 'Helvetica-Oblique'
} as const

function getNodeText(node: MdastNode): string {
  if ('value' in node && typeof node.value === 'string') return node.value
  if ('children' in node && Array.isArray(node.children)) {
    return node.children.map(getNodeText).join('')
  }
  return ''
}

function normalizeWhitespace(text: string): string {
  return text.replace(/\s+/g, ' ')
}

function renderInline(nodes: Content[], doc: PDFDocument): void {
  for (const child of nodes) {
    switch (child.type) {
      case 'text':
      case 'inlineCode': {
        const text = normalizeWhitespace(getNodeText(child))
        if (text) doc.text(text, { continued: true })
        break
      }

      case 'strong': {
        doc.font(FONT.bold).text(getNodeText(child), { continued: true }).font(
          FONT.regular
        )
        break
      }

      case 'emphasis': {
        doc.font(FONT.oblique).text(getNodeText(child), { continued: true })
          .font(FONT.regular)
        break
      }

      case 'link': {
        const linkText = normalizeWhitespace(getNodeText(child))
        if (linkText) {
          doc.fillColor('blue').text(linkText, {
            continued: true,
            link: 'url' in child ? child.url : undefined,
            underline: true
          }).fillColor('black').text('', { continued: true, underline: false })
        }
        break
      }

      case 'break': {
        doc.text('\n', { continued: false })
        break
      }

      default: {
        const text = normalizeWhitespace(getNodeText(child))
        if (text) {
          doc.text(text, { continued: true })
          doc.moveDown(SPACING.afterParagraph)
        }
        break
      }
    }
  }
}

function renderNode(node: Content, doc: PDFDocument): void {
  switch (node.type) {
    case 'heading': {
      doc
        .font(FONT.bold)
        .fontSize(node.depth === 1 ? FONT_SIZE.h1 : FONT_SIZE.h2)
        .text(normalizeWhitespace(getNodeText(node)))
      doc.font(FONT.regular).fontSize(FONT_SIZE.body)
      doc.moveDown(SPACING.afterHeading)
      break
    }

    case 'paragraph': {
      renderInline(node.children, doc)
      doc.text('', { continued: false })
      doc.moveDown(SPACING.afterParagraph)
      break
    }

    case 'list': {
      for (const item of node.children) {
        doc.text('• ', { continued: true })
        const inlineNodes: Content[] = item.children.flatMap((child) =>
          child.type === 'paragraph' ? child.children : [child]
        )
        renderInline(inlineNodes, doc)
        doc.text('', { continued: false })
        doc.moveDown(SPACING.afterList)

        for (const child of item.children) {
          if (child.type === 'list') {
            renderNode(child, doc)
          }
        }
      }
      doc.moveDown(SPACING.afterList)
      break
    }
  }
}

async function generatePDF(markdown: string): Promise<Uint8Array> {
  const tree = markdownToMdast(markdown) as Root
  const doc = new PDFDocument({ margin: 16, size: 'A4', pdfVersion: '1.7' })

  for (const node of tree.children) {
    renderNode(node, doc)
  }
  doc.end()

  const chunks: Uint8Array[] = []
  const encoder = new TextEncoder()
  for await (const chunk of doc) {
    chunks.push(typeof chunk === 'string' ? encoder.encode(chunk) : chunk)
  }

  const total = chunks.reduce((sum, c) => sum + c.length, 0)
  const out = new Uint8Array(total)
  let offset = 0
  for (const chunk of chunks) {
    out.set(chunk, offset)
    offset += chunk.length
  }
  return out
}

export const GET: APIRoute = async (): Promise<Response> => {
  const resumeMarkdown = await Deno.readTextFile(
    new URL('./resume.md', import.meta.url)
  )
  const pdf = await generatePDF(resumeMarkdown)

  return new Response(pdf as BodyInit, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="resume.pdf"'
    }
  })
}
