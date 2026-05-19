import { U as jsxRuntimeExports, r as reactExports } from "./worker-entry-BHvB3YZE.js";
import { R as Reveal } from "./Reveal-xqQzmuLm.js";
import { c as createLucideIcon, a as CALENDLY_URL, M as Mail, L as Linkedin, s as supabase } from "./router-OebqS9je.js";
import { C as Check } from "./check-BolrorGU.js";
import { C as Calendar } from "./calendar-DIwi-GbD.js";
import { L as LoaderCircle } from "./loader-circle-2Tychkij.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode);
function ContactPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pt-36 pb-12 md:pt-44 md:pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-prose max-w-4xl text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow justify-center", children: "Contact" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 text-foreground", children: "Parlons de votre projet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-6 max-w-2xl text-lg text-muted-foreground", children: "Réservez un appel gratuit de 30 minutes ou envoyez-moi un message directement. Je vous réponds sous 24h." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "inline-flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 16, className: "text-gold" }),
          " Réponse sous 24h"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "inline-flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 16, className: "text-gold" }),
          " Appel 100 % gratuit"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "inline-flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 16, className: "text-gold" }),
          " Sans engagement"
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-prose grid gap-8 lg:grid-cols-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { className: "lg:col-span-7", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-8 md:p-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark", children: "Option 01" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-serif text-2xl md:text-3xl text-foreground", children: "Réservez votre appel découverte" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Le moyen le plus rapide d'avancer. 30 minutes pour faire le point sur votre projet, en visio." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 overflow-hidden rounded-xl border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { src: `${CALENDLY_URL}?hide_gdpr_banner=1&primary_color=0206B7`, title: "Calendrier Calendly de Rufus Akande", className: "h-[680px] w-full", loading: "lazy" }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 150, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ContactForm, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 250, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-lg text-foreground", children: "Autres moyens de me joindre" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-5 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:akanderufus51@gmail.com", className: "flex items-center gap-3 text-sm text-foreground/85 hover:text-gold-dark", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-md bg-gold/15 text-gold-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 16 }) }),
              "akanderufus51@gmail.com"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://linkedin.com", target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-3 text-sm text-foreground/85 hover:text-gold-dark", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-md bg-gold/15 text-gold-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { size: 16 }) }),
              "LinkedIn — Rufus Akande"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: CALENDLY_URL, target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-3 text-sm text-foreground/85 hover:text-gold-dark", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-9 w-9 place-items-center rounded-md bg-gold/15 text-gold-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 16 }) }),
              "Calendly — Réserver 30 min"
            ] }) })
          ] })
        ] }) })
      ] })
    ] }) })
  ] });
}
function ContactForm() {
  const [status, setStatus] = reactExports.useState("idle");
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    message: ""
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const {
      error
    } = await supabase.from("contact_messages").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim()
    });
    if (error) {
      setStatus("error");
      return;
    }
    setStatus("sent");
    setForm({
      name: "",
      email: "",
      message: ""
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "card-elevated p-7", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark", children: "Option 02" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-serif text-2xl text-foreground", children: "Envoyez-moi un message" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "name", className: "block text-xs font-medium text-foreground/80", children: "Votre nom" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "name", required: true, value: form.name, onChange: (e) => setForm({
          ...form,
          name: e.target.value
        }), className: "mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/20", placeholder: "Camille Lefèvre" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "block text-xs font-medium text-foreground/80", children: "Votre email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "email", type: "email", required: true, value: form.email, onChange: (e) => setForm({
          ...form,
          email: e.target.value
        }), className: "mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/20", placeholder: "vous@exemple.com" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "message", className: "block text-xs font-medium text-foreground/80", children: "Votre message" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "message", required: true, rows: 5, value: form.message, onChange: (e) => setForm({
          ...form,
          message: e.target.value
        }), className: "mt-1.5 w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/20", placeholder: "Parlez-moi rapidement de votre projet…" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: status === "sending" || status === "sent", className: "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 disabled:opacity-70", children: [
      status === "sending" && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }),
      status === "sent" && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 16 }),
      (status === "idle" || status === "error") && "Envoyer mon message",
      status === "sending" && "Envoi…",
      status === "sent" && "Message envoyé"
    ] }),
    status === "sent" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-center text-xs text-muted-foreground", children: "Merci ! Je vous réponds sous 24h." }),
    status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 inline-flex w-full items-center justify-center gap-2 text-center text-xs text-destructive", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 14 }),
      " Une erreur s'est produite. Réessayez ou écrivez-moi par email."
    ] })
  ] });
}
export {
  ContactPage as component
};
