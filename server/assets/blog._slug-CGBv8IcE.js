import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BHvB3YZE.js";
import { d as Route, b as Link, C as CalendlyCTA, X } from "./router-OebqS9je.js";
import { A as ArrowLeft } from "./arrow-left-BIYCyRA8.js";
import { C as Clock } from "./clock-guwTwxUA.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function BlogPostPage() {
  const {
    post,
    related
  } = Route.useLoaderData();
  const [lightbox, setLightbox] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative pt-36 pb-16 md:pt-44 md:pb-20 bg-gradient-to-br from-primary via-primary to-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-prose max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", className: "inline-flex items-center gap-2 text-sm font-medium text-white/85 hover:text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
        " Retour au blog"
      ] }),
      post.category && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-6 inline-block rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary", children: post.category }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 !text-white", children: post.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-5 text-sm text-white/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(post.published_at ?? post.created_at).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric"
        }) }),
        post.reading_time && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 14 }),
          " ",
          post.reading_time,
          " min de lecture"
        ] })
      ] })
    ] }) }),
    post.cover_image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "-mt-10 md:-mt-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-prose max-w-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setLightbox(post.cover_image_url), className: "block w-full overflow-hidden rounded-2xl border border-border bg-card shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: post.cover_image_url, alt: post.title, className: "aspect-[16/9] w-full object-cover" }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-prose max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "prose-content", children: renderMarkdown(post.content ?? "") }),
      post.gallery && post.gallery.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-foreground", children: "Galerie" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid gap-4 sm:grid-cols-2", children: post.gallery.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setLightbox(src), className: "group overflow-hidden rounded-xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: "", className: "aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" }) }, src + i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-14 rounded-2xl border border-border bg-surface p-8 md:p-10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-2xl text-foreground", children: "Vous avez aimé cet article ?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Parlons de votre projet. 30 minutes, gratuites, sans engagement." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendlyCTA, { variant: "gold", children: "Réserver mon appel" }) })
      ] })
    ] }) }),
    related.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "section pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-prose", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-foreground", children: "Articles liés" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-6 md:grid-cols-3", children: related.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog/$slug", params: {
        slug: p.slug
      }, className: "card-elevated group overflow-hidden p-0", children: [
        p.cover_image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.cover_image_url, alt: p.title, className: "aspect-[16/10] w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          p.category && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-gold-dark", children: p.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-serif text-lg leading-tight text-foreground transition-colors group-hover:text-gold-dark", children: p.title }),
          p.excerpt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 line-clamp-2 text-sm text-muted-foreground", children: p.excerpt })
        ] })
      ] }, p.id)) })
    ] }) }),
    lightbox && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => setLightbox(null), className: "fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20", "aria-label": "Fermer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: lightbox, alt: "", className: "max-h-[90vh] max-w-[95vw] rounded-lg object-contain", onClick: (e) => e.stopPropagation() })
    ] })
  ] });
}
function renderMarkdown(md) {
  const blocks = md.split(/\n\n+/);
  return blocks.map((b, i) => {
    if (b.startsWith("## ")) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-10 mb-4 font-serif text-2xl md:text-3xl text-foreground", children: b.replace(/^##\s+/, "") }, i);
    }
    if (b.startsWith("> ")) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: "my-8 border-l-4 border-gold pl-5 quote-serif text-xl text-foreground/85", children: b.replace(/^>\s+/, "") }, i);
    }
    if (b.startsWith("- ")) {
      const items = b.split("\n").map((l) => l.replace(/^-\s+/, ""));
      return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "my-5 space-y-2 pl-5 list-disc text-foreground/85", children: items.map((it, j) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: renderInline(it) }, j)) }, i);
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "my-5 leading-relaxed text-foreground/85", children: renderInline(b) }, i);
  });
}
function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-semibold text-foreground", children: part.slice(2, -2) }, i);
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: part }, i);
  });
}
export {
  BlogPostPage as component
};
