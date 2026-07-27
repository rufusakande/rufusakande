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
  name: "list_portfolio",
  title: "List portfolio projects",
  description:
    "List portfolio projects. Non-admins only see published projects; admins see all.",
  inputSchema: {
    status: z
      .enum(["published", "draft", "any"]) 
      .optional()
      .describe("Filter by status. Defaults to published."),
    limit: z.number().int().min(1).max(100).optional().describe("Max rows to return (default 50)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const sb = supabaseForUser(ctx);
    let query = sb
      .from("portfolio")
      .select("id, title, category, short_description, project_url, image_url, status, created_at")
      .order("created_at", { ascending: false })
      .limit(limit ?? 50);
    if (status && status !== "any") query = query.eq("status", status);
    else if (!status) query = query.eq("status", "published");
    const { data, error } = await query;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { projects: data ?? [] },
    };
  },
});
