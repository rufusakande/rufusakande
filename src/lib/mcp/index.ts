import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listPortfolio from "./tools/list-portfolio";
import getPortfolio from "./tools/get-portfolio";
import createPortfolio from "./tools/create-portfolio";
import updatePortfolio from "./tools/update-portfolio";
import listBlogPosts from "./tools/list-blog-posts";
import createBlogPost from "./tools/create-blog-post";
import listTestimonials from "./tools/list-testimonials";
import listContactMessages from "./tools/list-contact-messages";
import markMessageRead from "./tools/mark-message-read";

// Build the OAuth issuer from the project ref (a build-time literal via Vite).
// The issuer MUST be the direct supabase.co host — never the runtime SUPABASE_URL,
// which may be a .lovable.cloud proxy.
const projectRef =
  (import.meta as unknown as { env: Record<string, string | undefined> }).env
    ?.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "rufus-akande-mcp",
  title: "Rufus Akande Portfolio MCP",
  version: "0.1.0",
  instructions:
    "Tools to read and manage the Rufus Akande portfolio, blog posts, client testimonials, and contact messages. Non-admin accounts can only read published content; admins can create/update content and view contact messages.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [
    listPortfolio,
    getPortfolio,
    createPortfolio,
    updatePortfolio,
    listBlogPosts,
    createBlogPost,
    listTestimonials,
    listContactMessages,
    markMessageRead,
  ],
});
