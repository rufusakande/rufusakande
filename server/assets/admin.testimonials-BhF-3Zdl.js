import { U as jsxRuntimeExports, r as reactExports } from "./worker-entry-BHvB3YZE.js";
import { s as supabase } from "./router-OebqS9je.js";
import { A as AdminLayout } from "./AdminLayout-ZrbzTygq.js";
import { B as Button } from "./button-wGftFUPd.js";
import { L as Label, I as Input } from "./label-DBXjaAP-.js";
import { P as Plus, a as Pencil, T as Textarea, I as ImageUpload, S as Select, b as SelectTrigger, c as SelectValue, d as SelectContent, e as SelectItem } from "./ImageUpload-0gOtUiZu.js";
import { B as Badge, T as Trash2, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter, A as AlertDialog, e as AlertDialogContent, f as AlertDialogHeader, g as AlertDialogTitle, h as AlertDialogDescription, i as AlertDialogFooter, j as AlertDialogCancel, k as AlertDialogAction } from "./badge-CmC8VRpJ.js";
import { L as LoaderCircle } from "./loader-circle-2Tychkij.js";
import { S as Star } from "./star-BH42-u_J.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./chevron-down-tLzjVgD8.js";
import "./check-BolrorGU.js";
const EMPTY = {
  client_name: "",
  client_role: "",
  content: "",
  rating: 5,
  avatar_url: "",
  status: "published",
  display_order: 0
};
function AdminTestimonialsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Content, {}) });
}
function Content() {
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [editing, setEditing] = reactExports.useState(null);
  const [creating, setCreating] = reactExports.useState(false);
  const [deleteId, setDeleteId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY);
  const [saving, setSaving] = reactExports.useState(false);
  async function load() {
    setLoading(true);
    const {
      data
    } = await supabase.from("testimonials").select("*").order("display_order", {
      ascending: true
    }).order("created_at", {
      ascending: false
    });
    setItems(data ?? []);
    setLoading(false);
  }
  reactExports.useEffect(() => {
    void load();
  }, []);
  function openCreate() {
    setForm(EMPTY);
    setCreating(true);
  }
  function openEdit(t) {
    setForm({
      client_name: t.client_name,
      client_role: t.client_role ?? "",
      content: t.content,
      rating: t.rating,
      avatar_url: t.avatar_url ?? "",
      status: t.status,
      display_order: t.display_order
    });
    setEditing(t);
  }
  async function handleSave() {
    setSaving(true);
    if (editing) {
      await supabase.from("testimonials").update(form).eq("id", editing.id);
    } else {
      await supabase.from("testimonials").insert(form);
    }
    setSaving(false);
    setEditing(null);
    setCreating(false);
    await load();
  }
  async function togglePublish(t) {
    const next = t.status === "published" ? "draft" : "published";
    await supabase.from("testimonials").update({
      status: next
    }).eq("id", t.id);
    await load();
  }
  async function confirmDelete() {
    if (!deleteId) return;
    await supabase.from("testimonials").delete().eq("id", deleteId);
    setDeleteId(null);
    await load();
  }
  const isOpen = creating || editing !== null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-3xl text-foreground", children: "Avis clients" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Gérez les témoignages affichés sur le site." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openCreate, className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Nouvel avis"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-sm", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center p-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }) }) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 text-center text-muted-foreground", children: "Aucun avis." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border bg-muted/40 text-xs uppercase text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left", children: "Client" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "hidden p-3 text-left md:table-cell", children: "Avis" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left", children: "Note" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left", children: "Statut" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border last:border-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          t.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: t.avatar_url, alt: "", className: "h-9 w-9 rounded-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-full bg-muted" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: t.client_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t.client_role })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "hidden max-w-md truncate p-3 text-muted-foreground md:table-cell", children: t.content }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex", children: Array.from({
          length: 5
        }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `h-3.5 w-3.5 ${i < t.rating ? "fill-gold text-gold" : "text-muted-foreground/30"}` }, i)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => togglePublish(t), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: t.status === "published" ? "default" : "secondary", children: t.status === "published" ? "Publié" : "Brouillon" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => openEdit(t), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => setDeleteId(t.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
        ] }) })
      ] }, t.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isOpen, onOpenChange: (o) => {
      if (!o) {
        setEditing(null);
        setCreating(false);
      }
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] max-w-xl overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? "Modifier l'avis" : "Nouvel avis" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nom du client" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.client_name, onChange: (e) => setForm({
              ...form,
              client_name: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Rôle / Entreprise" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.client_role, onChange: (e) => setForm({
              ...form,
              client_role: e.target.value
            }), placeholder: "Coach en développement personnel" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Avis" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 5, value: form.content, onChange: (e) => setForm({
            ...form,
            content: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUpload, { label: "Photo du client (optionnel)", value: form.avatar_url, onChange: (url) => setForm({
          ...form,
          avatar_url: url
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Note" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: String(form.rating), onValueChange: (v) => setForm({
              ...form,
              rating: Number(v)
            }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: [5, 4, 3, 2, 1].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(n), children: [
                n,
                " étoile",
                n > 1 ? "s" : ""
              ] }, n)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Ordre" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.display_order, onChange: (e) => setForm({
              ...form,
              display_order: Number(e.target.value)
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Statut" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.status, onValueChange: (v) => setForm({
              ...form,
              status: v
            }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "draft", children: "Brouillon" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "published", children: "Publié" })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => {
          setEditing(null);
          setCreating(false);
        }, children: "Annuler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSave, disabled: saving || !form.client_name.trim() || !form.content.trim(), children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Enregistrer" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: deleteId !== null, onOpenChange: (o) => !o && setDeleteId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Supprimer cet avis ?" }),
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
  AdminTestimonialsPage as component
};
