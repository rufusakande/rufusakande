import { U as jsxRuntimeExports, r as reactExports } from "./worker-entry-BHvB3YZE.js";
import { s as supabase } from "./router-OebqS9je.js";
import { A as AdminLayout } from "./AdminLayout-ZrbzTygq.js";
import { B as Button } from "./button-wGftFUPd.js";
import { L as Label, I as Input } from "./label-DBXjaAP-.js";
import { P as Plus, a as Pencil, T as Textarea, I as ImageUpload, S as Select, b as SelectTrigger, c as SelectValue, d as SelectContent, e as SelectItem } from "./ImageUpload-0gOtUiZu.js";
import { B as Badge, T as Trash2, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter, A as AlertDialog, e as AlertDialogContent, f as AlertDialogHeader, g as AlertDialogTitle, h as AlertDialogDescription, i as AlertDialogFooter, j as AlertDialogCancel, k as AlertDialogAction } from "./badge-CmC8VRpJ.js";
import { G as GalleryUpload } from "./GalleryUpload-CkjMjhK1.js";
import { L as LoaderCircle } from "./loader-circle-2Tychkij.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./chevron-down-tLzjVgD8.js";
import "./check-BolrorGU.js";
const EMPTY = {
  title: "",
  short_description: "",
  long_description: "",
  image_url: "",
  project_url: "",
  category: "Coaching",
  tags: [],
  gallery: [],
  status: "draft"
};
function AdminPortfolioPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PortfolioContent, {}) });
}
function PortfolioContent() {
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [editing, setEditing] = reactExports.useState(null);
  const [creating, setCreating] = reactExports.useState(false);
  const [deleteId, setDeleteId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY);
  const [tagsInput, setTagsInput] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  async function load() {
    setLoading(true);
    const {
      data
    } = await supabase.from("portfolio").select("*").order("created_at", {
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
    setTagsInput("");
    setCreating(true);
  }
  function openEdit(p) {
    setForm({
      title: p.title,
      short_description: p.short_description ?? "",
      long_description: p.long_description ?? "",
      image_url: p.image_url ?? "",
      project_url: p.project_url ?? "",
      category: p.category ?? "Coaching",
      tags: p.tags ?? [],
      gallery: p.gallery ?? [],
      status: p.status
    });
    setTagsInput((p.tags ?? []).join(", "));
    setEditing(p);
  }
  async function handleSave() {
    setSaving(true);
    const payload = {
      ...form,
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean)
    };
    if (editing) {
      await supabase.from("portfolio").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("portfolio").insert(payload);
    }
    setSaving(false);
    setEditing(null);
    setCreating(false);
    await load();
  }
  async function togglePublish(p) {
    const next = p.status === "published" ? "draft" : "published";
    await supabase.from("portfolio").update({
      status: next
    }).eq("id", p.id);
    await load();
  }
  async function confirmDelete() {
    if (!deleteId) return;
    await supabase.from("portfolio").delete().eq("id", deleteId);
    setDeleteId(null);
    await load();
  }
  const isOpen = creating || editing !== null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-3xl text-foreground", children: "Portfolio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Gérez vos projets de réalisations." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openCreate, className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Nouveau projet"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-sm", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center p-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }) }) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 text-center text-muted-foreground", children: "Aucun projet." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border bg-muted/40 text-xs uppercase text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left", children: "Image" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left", children: "Titre" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "hidden p-3 text-left md:table-cell", children: "Catégorie" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left", children: "Statut" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border last:border-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: p.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image_url, alt: "", className: "h-12 w-16 rounded object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-16 rounded bg-muted" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 font-medium text-foreground", children: p.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "hidden p-3 text-muted-foreground md:table-cell", children: p.category }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => togglePublish(p), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: p.status === "published" ? "default" : "secondary", children: p.status === "published" ? "Publié" : "Brouillon" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => openEdit(p), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => setDeleteId(p.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
        ] }) })
      ] }, p.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: isOpen, onOpenChange: (o) => {
      if (!o) {
        setEditing(null);
        setCreating(false);
      }
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] max-w-2xl overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? "Modifier le projet" : "Nouveau projet" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Titre" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.title, onChange: (e) => setForm({
            ...form,
            title: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description courte" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 2, value: form.short_description ?? "", onChange: (e) => setForm({
            ...form,
            short_description: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description longue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 4, value: form.long_description ?? "", onChange: (e) => setForm({
            ...form,
            long_description: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUpload, { label: "Image de couverture", value: form.image_url ?? "", onChange: (url) => setForm({
          ...form,
          image_url: url
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(GalleryUpload, { label: "Galerie d'images supplémentaires", value: form.gallery ?? [], onChange: (urls) => setForm({
          ...form,
          gallery: urls
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "URL du projet (optionnel)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.project_url ?? "", onChange: (e) => setForm({
            ...form,
            project_url: e.target.value
          }), placeholder: "https://..." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Catégorie" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.category ?? "Coaching", onValueChange: (v) => setForm({
              ...form,
              category: v
            }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Coaching", children: "Coaching" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Formation", children: "Formation" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Consulting", children: "Consulting" })
              ] })
            ] })
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
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tags (séparés par virgule)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: tagsInput, onChange: (e) => setTagsInput(e.target.value), placeholder: "Coach, Site Vitrine, Calendly" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => {
          setEditing(null);
          setCreating(false);
        }, children: "Annuler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSave, disabled: saving || !form.title.trim(), children: saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Enregistrer" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: deleteId !== null, onOpenChange: (o) => !o && setDeleteId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Supprimer ce projet ?" }),
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
  AdminPortfolioPage as component
};
