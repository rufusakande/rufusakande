import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function supabaseForUser(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "create_blog_post",
  title: "Create blog post",
  description: "Create a blog post. Requires admin (enforced by RLS).",
  inputSchema: {
    title: z.string().min(1),
    slug: z.string().min(1).describe("URL slug. Must be unique."),
    excerpt: z.string().optional(),
    content: z.string().optional(),
    category: z.string().optional(),
    cover_image_url: z.string().url().optional(),
    tags: z.array(z.string()).optional(),
    gallery: z.array(z.string().url()).optional(),
    reading_time: z.number().int().positive().optional(),
    status: z.enum(["draft", "published"]).optional(),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated())
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const payload: Record<string, unknown> = { ...input };
    if (input.status === "published") payload.published_at = new Date().toISOString();
    const { data, error } = await supabaseForUser(ctx)
      .from("blog_posts")
      .insert(payload)
      .select()
      .single();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: `Created blog post ${data.id}` }],
      structuredContent: { post: data },
    };
  },
});
