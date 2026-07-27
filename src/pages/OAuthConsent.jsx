import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Loader, ShieldCheck, X, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get('authorization_id') ?? '';
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [session, setSession] = useState(undefined); // undefined = loading

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) { setError('Identifiant d\'autorisation manquant.'); return; }
      const { data: s } = await supabase.auth.getSession();
      if (!active) return;
      if (!s.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = '/login?next=' + encodeURIComponent(next);
        return;
      }
      setSession(s.session);
      try {
        const { data, error } = await supabase.auth.oauth.getAuthorizationDetails(authorizationId);
        if (!active) return;
        if (error) { setError(error.message); return; }
        const immediate = data?.redirect_url ?? data?.redirect_to;
        if (immediate && !data?.client) { window.location.href = immediate; return; }
        setDetails(data);
      } catch (err) {
        setError(err?.message || 'Impossible de charger la demande d\'autorisation.');
      }
    })();
    return () => { active = false; };
  }, [authorizationId]);

  async function decide(approve) {
    setBusy(true);
    setError(null);
    try {
      const { data, error } = approve
        ? await supabase.auth.oauth.approveAuthorization(authorizationId)
        : await supabase.auth.oauth.denyAuthorization(authorizationId);
      if (error) { setError(error.message); setBusy(false); return; }
      const target = data?.redirect_url ?? data?.redirect_to;
      if (!target) { setError('Aucune redirection renvoyée par le serveur d\'autorisation.'); setBusy(false); return; }
      window.location.href = target;
    } catch (err) {
      setError(err?.message || 'Erreur lors de la décision.');
      setBusy(false);
    }
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-card border border-line p-8 text-center">
          <h1 className="text-lg font-bold text-ink mb-2">Autorisation impossible</h1>
          <p className="text-sm text-ink-muted mb-4">{error}</p>
          <Link to="/" className="text-sm text-brand-blue hover:underline">Retour au site</Link>
        </div>
      </div>
    );
  }

  if (!details || session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Loader size={32} className="animate-spin text-brand-blue" />
      </div>
    );
  }

  const clientName = details?.client?.name || details?.client?.client_name || 'une application';
  const scopes = Array.isArray(details?.scopes) ? details.scopes : String(details?.scope || '').split(/\s+/).filter(Boolean);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-card border border-line p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-brand-blue text-white flex items-center justify-center mb-3">
            <ShieldCheck size={22} />
          </div>
          <h1 className="text-xl font-bold text-ink">
            Connecter {clientName} à Rufus Akande
          </h1>
          <p className="text-sm text-ink-muted mt-2">
            {clientName} pourra utiliser les outils de cette application en votre nom.
          </p>
        </div>

        <div className="rounded-xl bg-brand-blue-soft/50 border border-line p-4 mb-6">
          <p className="text-[11px] uppercase tracking-wider text-ink-muted font-bold mb-1">Connecté en tant que</p>
          <p className="text-sm font-semibold text-ink truncate">{session?.user?.email}</p>
        </div>

        {scopes.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-semibold text-ink mb-2">Permissions demandées</p>
            <ul className="space-y-1.5">
              {scopes.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-ink-body">
                  <Check size={16} className="text-brand-blue flex-shrink-0 mt-0.5" />
                  <span>{s === 'openid' ? 'Identifier votre compte' : s === 'email' ? 'Partager votre adresse email' : s === 'profile' ? 'Partager votre profil de base' : s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-[11px] text-ink-muted mb-6 leading-relaxed">
          Cela n'accorde aucun accès supplémentaire au-delà de vos permissions actuelles dans l'application.
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            disabled={busy}
            onClick={() => decide(false)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-line text-ink font-semibold hover:bg-surface transition-colors disabled:opacity-60"
          >
            <X size={16} /> Refuser
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => decide(true)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-brand-blue text-white font-semibold hover:bg-brand-blue-accent transition-colors disabled:opacity-60"
          >
            {busy ? <Loader size={16} className="animate-spin" /> : <Check size={16} />}
            Autoriser
          </button>
        </div>
      </div>
    </div>
  );
}
