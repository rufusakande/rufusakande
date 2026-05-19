import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BHvB3YZE.js";
import { X, s as supabase } from "./router-OebqS9je.js";
import { L as LoaderCircle } from "./loader-circle-2Tychkij.js";
import { U as Upload } from "./ImageUpload-0gOtUiZu.js";
function GalleryUpload({ value, onChange, label = "Galerie" }) {
  const [uploading, setUploading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const inputRef = reactExports.useRef(null);
  async function handleFiles(files) {
    setError(null);
    const arr = Array.from(files);
    for (const f of arr) {
      if (!f.type.startsWith("image/")) {
        setError(`"${f.name}" n'est pas une image.`);
        return;
      }
      if (f.size > 5 * 1024 * 1024) {
        setError(`"${f.name}" dépasse 5 Mo.`);
        return;
      }
    }
    setUploading(true);
    const newUrls = [];
    for (const file of arr) {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage.from("media").upload(path, file, { cacheControl: "31536000", upsert: false });
      if (upErr) {
        setError(upErr.message);
        setUploading(false);
        return;
      }
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      newUrls.push(data.publicUrl);
    }
    onChange([...value, ...newUrls]);
    setUploading(false);
  }
  function removeAt(i) {
    onChange(value.filter((_, idx) => idx !== i));
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground", children: [
      label,
      " ",
      value.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
        "(",
        value.length,
        ")"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-3", children: [
      value.map((url, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden rounded-lg border border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: url, alt: "", className: "h-28 w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => removeAt(i),
            className: "absolute right-1 top-1 rounded-full bg-background/90 p-1 opacity-0 shadow transition-opacity group-hover:opacity-100",
            "aria-label": "Retirer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5 text-destructive" })
          }
        )
      ] }, url + i)),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => inputRef.current?.click(),
          disabled: uploading,
          className: "flex h-28 flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-border bg-muted/30 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-muted/50",
          children: uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Ajouter" })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: inputRef,
        type: "file",
        accept: "image/*",
        multiple: true,
        className: "hidden",
        onChange: (e) => {
          if (e.target.files && e.target.files.length > 0) void handleFiles(e.target.files);
          e.target.value = "";
        }
      }
    ),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: error })
  ] });
}
export {
  GalleryUpload as G
};
