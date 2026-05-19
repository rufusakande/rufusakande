import { U as jsxRuntimeExports, r as reactExports } from "./worker-entry-BHvB3YZE.js";
import { c as createLucideIcon, M as Mail, s as supabase } from "./router-OebqS9je.js";
import { A as AdminLayout } from "./AdminLayout-ZrbzTygq.js";
import { B as Button } from "./button-wGftFUPd.js";
import { B as Badge, T as Trash2, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, A as AlertDialog, e as AlertDialogContent, f as AlertDialogHeader, g as AlertDialogTitle, h as AlertDialogDescription, i as AlertDialogFooter, j as AlertDialogCancel, k as AlertDialogAction } from "./badge-CmC8VRpJ.js";
import { L as LoaderCircle } from "./loader-circle-2Tychkij.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  [
    "path",
    {
      d: "M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z",
      key: "1jhwl8"
    }
  ],
  ["path", { d: "m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10", key: "1qfld7" }]
];
const MailOpen = createLucideIcon("mail-open", __iconNode);
function AdminMessagesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessagesContent, {}) });
}
function MessagesContent() {
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [open, setOpen] = reactExports.useState(null);
  const [deleteId, setDeleteId] = reactExports.useState(null);
  async function load() {
    setLoading(true);
    const {
      data
    } = await supabase.from("contact_messages").select("*").order("created_at", {
      ascending: false
    });
    setItems(data ?? []);
    setLoading(false);
  }
  reactExports.useEffect(() => {
    void load();
  }, []);
  async function openMessage(m) {
    setOpen(m);
    if (!m.is_read) {
      await supabase.from("contact_messages").update({
        is_read: true
      }).eq("id", m.id);
      await load();
    }
  }
  async function toggleRead(m, e) {
    e.stopPropagation();
    await supabase.from("contact_messages").update({
      is_read: !m.is_read
    }).eq("id", m.id);
    await load();
  }
  async function confirmDelete() {
    if (!deleteId) return;
    await supabase.from("contact_messages").delete().eq("id", deleteId);
    setDeleteId(null);
    await load();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-3xl text-foreground", children: "Messages reçus" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Messages envoyés via le formulaire de contact." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-sm", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center p-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }) }) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 text-center text-muted-foreground", children: "Aucun message." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border bg-muted/40 text-xs uppercase text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left", children: "Nom" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "hidden p-3 text-left md:table-cell", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left", children: "Aperçu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "hidden p-3 text-left sm:table-cell", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { onClick: () => openMessage(m), className: `cursor-pointer border-b border-border last:border-0 hover:bg-muted/40 ${!m.is_read ? "bg-primary/5 font-medium" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          !m.is_read && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "default", className: "text-[10px]", children: "Nouveau" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: m.name })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "hidden p-3 text-muted-foreground md:table-cell", children: m.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", children: m.message }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "hidden p-3 text-xs text-muted-foreground sm:table-cell", children: new Date(m.created_at).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "short"
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: (e) => toggleRead(m, e), children: m.is_read ? /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MailOpen, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: (e) => {
            e.stopPropagation();
            setDeleteId(m.id);
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
        ] }) })
      ] }, m.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: open !== null, onOpenChange: (o) => !o && setOpen(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        "Message de ",
        open?.name
      ] }) }),
      open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Email : " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${open.email}`, className: "text-primary hover:underline", children: open.email })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "Reçu le",
            " ",
            new Date(open.created_at).toLocaleString("fr-FR", {
              dateStyle: "long",
              timeStyle: "short"
            })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border border-border bg-muted/30 p-4 text-sm leading-relaxed text-foreground whitespace-pre-wrap", children: open.message }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `mailto:${open.email}?subject=Re: votre message`, children: "Répondre par email" }) }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: deleteId !== null, onOpenChange: (o) => !o && setDeleteId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Supprimer ce message ?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Cette action est irréversible." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Annuler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: confirmDelete, children: "Supprimer" })
      ] })
    ] }) })
  ] });
}
export {
  AdminMessagesPage as component
};
