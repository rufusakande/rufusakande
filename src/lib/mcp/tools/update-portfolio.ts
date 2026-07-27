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
  name: "update_portfolio",
  title: "Update portfolio project",
  description: "Update fields on a portfolio project. Requires admin (enforced by RLS).",
  inputSchema: {
    id: z.string().uuid(),
    title: z.string().optional(),
    category: z.string().optional(),
    short_description: z.string().optional(),
    long_description: z.string().optional(),
    project_url: z.string().url().optional(),
    image_url: z.string().url().optional(),
    tags: z.array(z.string()).optional(),
    gallery: z.array(z.string().url()).optional(),
    videos: z.array(z.string().url()).optional(),
    status: z.enum(["draft", "published"]).optional(),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ id, ...patch }, ctx) => {
    if (!ctx.isAuthenticated())
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const { data, error } = await supabaseForUser(ctx)
      .from("portfolio")
      .update(patch)
      .eq("id", id)
      .select()
      .single();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: `Updated portfolio ${id}` }],
      structuredContent: { project: data },
    };
  },
});
