import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BHvB3YZE.js";
import { s as supabase, b as Link, C as CalendlyCTA } from "./router-OebqS9je.js";
import { R as Reveal } from "./Reveal-xqQzmuLm.js";
import { L as LoaderCircle } from "./loader-circle-2Tychkij.js";
import { A as ArrowUpRight } from "./arrow-up-right-CCJKUlf9.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const FILTERS = ["Tous", "Coaching", "Formation", "Consulting"];
function PortfolioPage() {
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [filter, setFilter] = reactExports.useState("Tous");
  reactExports.useEffect(() => {
    void (async () => {
      setLoading(true);
      const {
        data
      } = await supabase.from("portfolio").select("id, title, short_description, image_url, category, tags").eq("status", "published").order("created_at", {
        ascending: false
      });
      setItems(data ?? []);
      setLoading(false);
    })();
  }, []);
  const filtered = reactExports.useMemo(() => filter === "Tous" ? items : items.filter((p) => p.category === filter), [items, filter]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pt-36 pb-12 md:pt-44 md:pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-prose max-w-4xl text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow justify-center", children: "Portfolio" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 text-foreground", children: "Mes Réalisations" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-6 max-w-2xl text-lg text-muted-foreground", children: "Des sites construits pour convertir — voici quelques exemples de mon travail avec des coachs, formateurs et consultants." })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-prose", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-12 flex flex-wrap justify-center gap-2", children: FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFilter(f), className: `rounded-full px-5 py-2 text-sm font-medium transition-all ${filter === f ? "bg-primary text-primary-foreground shadow-soft" : "border border-border bg-card text-foreground/75 hover:border-gold/50 hover:text-foreground"}`, children: f }, f)) }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-16 text-center text-muted-foreground", children: "Aucun projet dans cette catégorie pour l'instant." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8 md:grid-cols-2 lg:grid-cols-3", children: filtered.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i % 3 * 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/portfolio/$id", params: {
        id: item.id
      }, className: "group block h-full overflow-hidden rounded-xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary via-primary to-gold", children: [
          item.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image_url, alt: item.title, className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center p-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-serif text-2xl font-semibold text-white drop-shadow-lg", children: item.title }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-end justify-end bg-primary/40 p-5 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-xs font-semibold text-gold-foreground", children: [
            "Voir le projet ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 14 })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-gold-dark", children: item.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-serif text-xl text-foreground transition-colors group-hover:text-gold-dark", children: item.title }),
          item.short_description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 line-clamp-3 text-sm leading-relaxed text-foreground/80", children: item.short_description }),
          item.tags && item.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-1.5", children: item.tags.slice(0, 3).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-surface px-2.5 py-1 text-[11px] font-medium text-muted-foreground", children: t }, t)) })
        ] })
      ] }) }, item.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-prose section text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "!text-white", children: "Vous voulez un site comme ça ? Parlons-en." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-5 max-w-xl text-white/75", children: "30 minutes pour comprendre votre projet et vous dire franchement ce que je recommande." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendlyCTA, { variant: "gold", children: "Réserver mon appel gratuit" }) })
    ] }) }) })
  ] });
}
export {
  PortfolioPage as component
};
