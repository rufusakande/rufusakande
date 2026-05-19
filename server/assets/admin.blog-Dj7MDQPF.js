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
  slug: "",
  excerpt: "",
  content: "",
  cover_image_url: "",
  category: "Conversion",
  tags: [],
  gallery: [],
  reading_time: 5,
  status: "draft",
  published_at: null
};
function slugify(s) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function AdminBlogPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BlogContent, {}) });
}
function BlogContent() {
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [editing, setEditing] = reactExports.useState(null);
  const [creating, setCreating] = reactExports.useState(false);
  const [deleteId, setDeleteId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY);
  const [tagsInput, setTagsInput] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  async function load() {
    setLoading(true);
    const {
      data
    } = await supabase.from("blog_posts").select("*").order("created_at", {
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
    setError(null);
    setCreating(true);
  }
  function openEdit(p) {
    setForm({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt ?? "",
      content: p.content ?? "",
      cover_image_url: p.cover_image_url ?? "",
      category: p.category ?? "Conversion",
      tags: p.tags ?? [],
      gallery: p.gallery ?? [],
      reading_time: p.reading_time ?? 5,
      status: p.status,
      published_at: p.published_at
    });
    setTagsInput((p.tags ?? []).join(", "));
    setError(null);
    setEditing(p);
  }
  async function handleSave() {
    setError(null);
    setSaving(true);
    const slug = form.slug.trim() || slugify(form.title);
    const payload = {
      ...form,
      slug,
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
      published_at: form.status === "published" && !form.published_at ? (/* @__PURE__ */ new Date()).toISOString() : form.published_at
    };
    const {
      error: err
    } = editing ? await supabase.from("blog_posts").update(payload).eq("id", editing.id) : await supabase.from("blog_posts").insert(payload);
    setSaving(false);
    if (err) {
      setError(err.message);
      return;
    }
    setEditing(null);
    setCreating(false);
    await load();
  }
  async function togglePublish(p) {
    const next = p.status === "published" ? "draft" : "published";
    await supabase.from("blog_posts").update({
      status: next,
      published_at: next === "published" && !p.published_at ? (/* @__PURE__ */ new Date()).toISOString() : p.published_at
    }).eq("id", p.id);
    await load();
  }
  async function confirmDelete() {
    if (!deleteId) return;
    await supabase.from("blog_posts").delete().eq("id", deleteId);
    setDeleteId(null);
    await load();
  }
  const isOpen = creating || editing !== null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-3xl text-foreground", children: "Blog" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Gérez vos articles." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openCreate, className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " Nouvel article"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl border border-border bg-card shadow-sm", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center p-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }) }) : items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 text-center text-muted-foreground", children: "Aucun article." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border bg-muted/40 text-xs uppercase text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left", children: "Image" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left", children: "Titre" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "hidden p-3 text-left md:table-cell", children: "Catégorie" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-left", children: "Statut" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: items.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border last:border-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: p.cover_image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.cover_image_url, alt: "", className: "h-12 w-16 rounded object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-16 rounded bg-muted" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "p-3 font-medium text-foreground", children: [
          p.title,
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-normal text-muted-foreground", children: [
            "/blog/",
            p.slug
          ] })
        ] }),
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
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] max-w-3xl overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? "Modifier l'article" : "Nouvel article" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Titre" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.title, onChange: (e) => {
            const title = e.target.value;
            setForm({
              ...form,
              title,
              slug: editing ? form.slug : slugify(title)
            });
          } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Slug" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.slug, onChange: (e) => setForm({
            ...form,
            slug: slugify(e.target.value)
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Extrait" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 2, value: form.excerpt ?? "", onChange: (e) => setForm({
            ...form,
            excerpt: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Contenu (Markdown supporté)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 10, value: form.content ?? "", onChange: (e) => setForm({
            ...form,
            content: e.target.value
          }), placeholder: "## Sous-titre\n\nVotre paragraphe..." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUpload, { label: "Image de couverture", value: form.cover_image_url ?? "", onChange: (url) => setForm({
          ...form,
          cover_image_url: url
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(GalleryUpload, { label: "Galerie d'images supplémentaires", value: form.gallery ?? [], onChange: (urls) => setForm({
          ...form,
          gallery: urls
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Catégorie" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.category ?? "", onChange: (e) => setForm({
              ...form,
              category: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Temps de lecture (min)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: form.reading_time ?? 5, onChange: (e) => setForm({
              ...form,
              reading_time: Number(e.target.value)
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
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tags (séparés par virgule)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: tagsInput, onChange: (e) => setTagsInput(e.target.value) })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive", children: error })
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Supprimer cet article ?" }),
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
  AdminBlogPage as component
};
