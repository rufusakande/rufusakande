import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BHvB3YZE.js";
import { c as createLucideIcon, u as useNavigate, b as Link, s as supabase } from "./router-OebqS9je.js";
import { u as useAuth, B as Button } from "./button-wGftFUPd.js";
import { L as Label, I as Input } from "./label-DBXjaAP-.js";
import { L as LoaderCircle } from "./loader-circle-2Tychkij.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
function AdminLoginPage() {
  const navigate = useNavigate();
  const {
    session,
    isAdmin,
    loading
  } = useAuth();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState(null);
  const [submitting, setSubmitting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!loading && session && isAdmin) {
      navigate({
        to: "/admin/dashboard"
      });
    }
  }, [loading, session, isAdmin, navigate]);
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const {
      error: signInError
    } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });
    setSubmitting(false);
    if (signInError) {
      setError("Identifiants incorrects.");
      return;
    }
    const {
      data: {
        session: s
      }
    } = await supabase.auth.getSession();
    if (s?.user) {
      const {
        data: roleRow
      } = await supabase.from("user_roles").select("role").eq("user_id", s.user.id).eq("role", "admin").maybeSingle();
      if (!roleRow) {
        await supabase.auth.signOut();
        setError("Ce compte n'est pas administrateur.");
        return;
      }
    }
    navigate({
      to: "/admin/dashboard"
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-muted/30 px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "mb-8 block text-center text-sm text-muted-foreground hover:text-primary", children: "← Retour au site" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-8 shadow-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-5 w-5 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-center font-serif text-2xl text-foreground", children: "Espace administration" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-center text-sm text-muted-foreground", children: "Connectez-vous pour gérer votre site." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "mt-8 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, autoComplete: "email" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "Mot de passe" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, autoComplete: "current-password" })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: submitting, children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Se connecter" })
      ] })
    ] })
  ] }) });
}
export {
  AdminLoginPage as component
};
