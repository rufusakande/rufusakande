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
  name: "create_portfolio",
  title: "Create portfolio project",
  description:
    "Create a portfolio project. Requires an admin account (enforced by row-level security).",
  inputSchema: {
    title: z.string().min(1),
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
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated())
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const { data, error } = await supabaseForUser(ctx)
      .from("portfolio")
      .insert(input)
      .select()
      .single();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: `Created portfolio ${data.id}` }],
      structuredContent: { project: data },
    };
  },
});
