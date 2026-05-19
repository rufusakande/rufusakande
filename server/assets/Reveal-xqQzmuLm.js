import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BHvB3YZE.js";
function Reveal({ children, delay = 0, className = "" }) {
  const ref = reactExports.useRef(null);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: `reveal ${visible ? "is-visible" : ""} ${className}`,
      style: { transitionDelay: `${delay}ms` },
      children
    }
  );
}
export {
  Reveal as R
};
