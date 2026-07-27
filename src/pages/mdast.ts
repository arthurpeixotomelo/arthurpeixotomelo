import type { APIRoute } from 'astro'
import { markdownToMdast } from 'satteri'

export const GET: APIRoute = async (): Promise<Response> => {
  const resumeMarkdown = await Deno.readTextFile(
    new URL('./resume.md', import.meta.url)
  )
  const mdast = markdownToMdast(resumeMarkdown)

  return new Response(JSON.stringify(mdast), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
