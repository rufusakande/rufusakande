import { U as jsxRuntimeExports } from "./worker-entry-BHvB3YZE.js";
import { R as Reveal } from "./Reveal-xqQzmuLm.js";
import { c as createLucideIcon, C as CalendlyCTA } from "./router-OebqS9je.js";
import { S as Sparkles, T as Target } from "./target-CIZRDBS8.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode);
const rufusPhoto = "/rufusakande/assets/rufus-sM5Qn0Xx.jpg";
const VALUES = [{
  icon: Sparkles,
  title: "Simplicité",
  text: "Pas de jargon, pas de complexité inutile. Je traduis le technique en résultats concrets pour votre activité."
}, {
  icon: Target,
  title: "Résultats",
  text: "Un site qui ne génère rien n'a pas de valeur. Je conçois pour la conversion, pas pour l'esthétique seule."
}, {
  icon: Heart,
  title: "Confiance",
  text: "Sans engagement, transparence totale, communication claire. La relation prime sur le contrat."
}];
function AboutPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pt-36 pb-16 md:pt-44 md:pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-prose grid gap-14 md:grid-cols-12 md:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto w-full max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": true, className: "absolute -inset-4 -z-10 rounded-[2rem] bg-gold/15 blur-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: rufusPhoto, alt: "Portrait de Rufus Akande", className: "h-full w-full object-cover" }) })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-7", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { delay: 120, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "À propos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-5 text-foreground", children: [
          "Je suis Rufus Akande —",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "quote-serif text-muted-foreground", children: [
            " ",
            "je crée des sites web qui ramènent des clients."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gold-rule" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 space-y-5 text-foreground/85 leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "J'ai commencé le développement web parce que j'aimais résoudre des problèmes concrets. Très vite, j'ai compris que livrer un beau site ne suffisait pas : il fallait qu'il rapporte quelque chose à la personne qui l'avait commandé." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Je ne cible pas un secteur précis. Je travaille avec toute entreprise — TPE, indépendant, agence, e-commerce, service — qui veut un site qui lui ramène réellement des clients, pas une carte de visite numérique." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Ma philosophie tient en une phrase : je vous parle de clients générés, pas de framework. De visibilité, pas de balises HTML. De rentabilité, pas de pixels parfaits. Le reste, je m'en occupe." })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "section bg-surface", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-prose", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Mes valeurs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 max-w-2xl text-foreground", children: "Trois piliers qui guident chaque projet" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-6 md:grid-cols-3", children: VALUES.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 100, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated h-full p-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-11 w-11 place-items-center rounded-lg bg-gold/15 text-gold-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsx(v.icon, { size: 20 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 font-serif text-xl text-foreground", children: v.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: v.text })
      ] }) }, v.title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-prose section text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "!text-white", children: "Vous voulez en savoir plus ? Réservons un appel." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-5 max-w-xl text-white/75", children: "Le meilleur moyen de savoir si on est faits pour travailler ensemble : 30 minutes en visio, sans engagement." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendlyCTA, { variant: "gold", children: "Réserver mon appel" }) })
    ] }) }) })
  ] });
}
export {
  AboutPage as component
};
