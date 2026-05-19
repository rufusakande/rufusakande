import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BHvB3YZE.js";
import { R as Route, b as Link, C as CalendlyCTA, X } from "./router-OebqS9je.js";
import { A as ArrowLeft } from "./arrow-left-BIYCyRA8.js";
import { A as ArrowUpRight } from "./arrow-up-right-CCJKUlf9.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function ProjectDetailPage() {
  const {
    project
  } = Route.useLoaderData();
  const [lightbox, setLightbox] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pt-32 pb-10 md:pt-40 md:pb-12 bg-surface", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-prose", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/portfolio", className: "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
        " Retour au portfolio"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 max-w-3xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary", children: project.category }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-foreground", children: project.title }),
        project.short_description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-lg text-muted-foreground", children: project.short_description }),
        project.tags && project.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex flex-wrap gap-1.5", children: project.tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-card px-2.5 py-1 text-[11px] font-medium text-muted-foreground border border-border", children: t }, t)) }),
        project.project_url && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: project.project_url, target: "_blank", rel: "noopener noreferrer", className: "mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5", children: [
          "Voir le projet en ligne ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 14 })
        ] })
      ] })
    ] }) }),
    project.image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-prose", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setLightbox(project.image_url), className: "block w-full overflow-hidden rounded-2xl border border-border shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: project.image_url, alt: project.title, className: "w-full object-cover transition-transform duration-500 hover:scale-[1.02]" }) }) }) }),
    project.long_description && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-prose max-w-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "prose-content", children: project.long_description.split(/\n\n+/).map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "my-5 leading-relaxed text-foreground/85", children: p }, i)) }) }) }),
    project.gallery && project.gallery.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "section pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-prose", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-foreground", children: "Galerie" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: project.gallery.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setLightbox(src), className: "group overflow-hidden rounded-xl border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: "", className: "aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" }) }, src + i)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-prose section text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "!text-white", children: "Un projet similaire en tête ?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-5 max-w-xl text-white/75", children: "Réservons 30 minutes pour parler de votre site et voir si on peut faire mieux ensemble." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendlyCTA, { variant: "gold", children: "Réserver mon appel" }) })
    ] }) }),
    lightbox && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick: () => setLightbox(null), className: "fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20", "aria-label": "Fermer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: lightbox, alt: "", className: "max-h-[90vh] max-w-[95vw] rounded-lg object-contain", onClick: (e) => e.stopPropagation() })
    ] })
  ] });
}
export {
  ProjectDetailPage as component
};
