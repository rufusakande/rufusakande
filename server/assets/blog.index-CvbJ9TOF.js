import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BHvB3YZE.js";
import { s as supabase, b as Link, C as CalendlyCTA } from "./router-OebqS9je.js";
import { R as Reveal } from "./Reveal-xqQzmuLm.js";
import { L as LoaderCircle } from "./loader-circle-2Tychkij.js";
import { C as Clock } from "./clock-guwTwxUA.js";
import { A as ArrowRight } from "./arrow-right-7l35XYtj.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function BlogPage() {
  const [posts, setPosts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    void (async () => {
      setLoading(true);
      const {
        data
      } = await supabase.from("blog_posts").select("id, slug, title, excerpt, cover_image_url, category, reading_time, published_at, created_at").eq("status", "published").order("published_at", {
        ascending: false,
        nullsFirst: false
      });
      setPosts(data ?? []);
      setLoading(false);
    })();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pt-36 pb-12 md:pt-44 md:pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-prose max-w-4xl text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow justify-center", children: "Le journal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 text-foreground", children: "Conseils & ressources pour développer votre activité en ligne" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-6 max-w-2xl text-lg text-muted-foreground", children: "Des articles concrets sur la conversion, le SEO et la stratégie web — écrits pour les coachs, consultants et formateurs." })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-prose", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }) }) : posts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-16 text-center text-muted-foreground", children: "Aucun article pour le moment. Revenez bientôt !" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8 md:grid-cols-2 lg:grid-cols-3", children: posts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i % 3 * 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog/$slug", params: {
      slug: post.slug
    }, className: "group block h-full overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary via-primary to-gold", children: [
        post.cover_image_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: post.cover_image_url, alt: post.title, className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" }),
        post.category && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary", children: post.category })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-xl leading-tight text-foreground transition-colors group-hover:text-gold-dark", children: post.title }),
        post.excerpt && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground", children: post.excerpt }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center justify-between text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(post.published_at ?? post.created_at).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric"
          }) }),
          post.reading_time && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12 }),
            " ",
            post.reading_time,
            " min"
          ] })
        ] })
      ] })
    ] }) }, post.id)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-prose section text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "!text-white", children: "Un projet en tête ?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-5 max-w-xl text-white/75", children: "Lire c'est bien. Agir c'est mieux. Réservons 30 minutes pour parler de votre site." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CalendlyCTA, { variant: "gold", children: [
        "Réserver un appel ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16 })
      ] }) })
    ] }) }) })
  ] });
}
export {
  BlogPage as component
};
