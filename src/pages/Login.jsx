import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Lock, Loader } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// Same-origin relative path validator.
function safeNext(raw) {
  if (!raw) return '/';
  try {
    if (raw.startsWith('/') && !raw.startsWith('//')) return raw;
  } catch {}
  return '/';
}

export default function Login() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = safeNext(params.get('next'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      if (data.session) {
        navigate(next, { replace: true });
      } else {
        setChecking(false);
      }
    })();
    return () => { cancelled = true; };
  }, [navigate, next]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error: err } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (err) throw err;
      navigate(next, { replace: true });
    } catch (err) {
      setError(err.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Loader size={32} className="animate-spin text-brand-blue" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-card border border-line p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-brand-blue text-white flex items-center justify-center mb-3">
            <Lock size={22} />
          </div>
          <h1 className="text-xl font-bold text-ink">Connexion</h1>
          <p className="text-sm text-ink-muted mt-1">Connectez-vous pour continuer</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-ink mb-1.5">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-3 py-2.5 rounded-lg border border-line focus:border-brand-blue focus:outline-none text-sm"
              placeholder="votre@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-ink mb-1.5">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-3 py-2.5 rounded-lg border border-line focus:border-brand-blue focus:outline-none text-sm"
              placeholder="••••••••"
            />
          </div>
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-brand-blue text-white font-semibold hover:bg-brand-blue-accent transition-colors disabled:opacity-60"
          >
            {loading ? <><Loader size={16} className="animate-spin" /> Connexion…</> : 'Se connecter'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-ink-muted hover:text-brand-blue">← Retour au site</Link>
        </div>
      </div>
    </div>
  );
}
