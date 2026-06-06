import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../components/layout/Header/Header';
import Footer from '../components/layout/Footer/Footer';
import { supabase } from '@/integrations/supabase/client';
import { Loader, ArrowLeft, ExternalLink } from 'lucide-react';

function PortfolioDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const { data, error: e } = await supabase.from('portfolio').select('*').eq('id', id).eq('status', 'published').maybeSingle();
        if (e) throw e;
        if (!data) setError('Portfolio non trouvé');
        else setPortfolio(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex justify-center items-center min-h-[600px]">
          <Loader size={40} className="animate-spin text-brand-blue" />
        </main>
        <Footer />
      </>
    );
  }

  if (error || !portfolio) {
    return (
      <>
        <Header />
        <main className="pt-32 pb-20 px-6">
          <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-red-50 text-red-800 border border-red-100">
            <button onClick={() => navigate('/realisations')} className="inline-flex items-center gap-2 text-red-800 font-semibold mb-4">
              <ArrowLeft size={18} /> Retour aux réalisations
            </button>
            <p>{error || 'Portfolio non trouvé'}</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-32 pb-20 bg-white">
        <article>
          <div className="max-w-[1200px] mx-auto px-6">
            <button onClick={() => navigate('/realisations')} className="inline-flex items-center gap-2 text-brand-blue font-semibold hover:gap-3 transition-all mb-8">
              <ArrowLeft size={18} /> Retour aux réalisations
            </button>

            {portfolio.image_url && (
              <div className="rounded-3xl overflow-hidden shadow-card mb-10">
                <img src={portfolio.image_url} alt={portfolio.title} className="w-full max-h-[600px] object-cover" />
              </div>
            )}
          </div>

          <div className="max-w-[1200px] mx-auto px-6 grid lg:grid-cols-[1fr_320px] gap-10">
            <div>
              {portfolio.category && (
                <span className="inline-flex px-3 py-1 rounded-full bg-gradient-to-r from-brand-gold-light to-brand-gold text-[#1a1108] text-xs font-bold uppercase mb-4">{portfolio.category}</span>
              )}
              <h1 className="text-[clamp(2rem,4.5vw,3.25rem)] font-bold text-ink tracking-[-0.02em] leading-[1.15]">{portfolio.title}</h1>

              {portfolio.project_url && (
                <div className="mt-6">
                  <Link to={portfolio.project_url} target="_blank" rel="noopener noreferrer" className="btn-gold premium-shine">
                    <ExternalLink size={16} /> Voir le projet
                  </Link>
                </div>
              )}

              <section className="mt-12 pb-10 border-b border-line">
                <h2 className="text-2xl font-bold text-ink mb-5">À propos du projet</h2>
                {portfolio.short_description && (
                  <p className="p-5 rounded-2xl bg-gradient-to-br from-brand-blue-soft/60 to-white border-l-4 border-brand-blue serif-italic text-ink text-lg">
                    {portfolio.short_description}
                  </p>
                )}
                {portfolio.long_description && (
                  <div className="mt-5 space-y-3 text-ink-body leading-relaxed">
                    {portfolio.long_description.split('\n').map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                )}
              </section>

              {portfolio.tags?.length > 0 && (
                <section className="mt-10 pb-10 border-b border-line">
                  <h2 className="text-2xl font-bold text-ink mb-5">Technologies utilisées</h2>
                  <div className="flex flex-wrap gap-2">
                    {portfolio.tags.map((tag, i) => (
                      <span key={i} className="px-4 py-2 rounded-xl bg-brand-blue-soft text-brand-blue font-semibold hover:bg-brand-blue hover:text-white transition-colors cursor-pointer">{tag}</span>
                    ))}
                  </div>
                </section>
              )}

              <section className="mt-10">
                <h2 className="text-2xl font-bold text-ink mb-5">Détails du projet</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    ['Type de projet', portfolio.category || 'Non spécifié'],
                    ['État', portfolio.status === 'published' ? 'Publié' : 'Brouillon'],
                    ['Date de création', new Date(portfolio.created_at).toLocaleDateString('fr-FR')],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-surface rounded-2xl p-5 border-l-4 border-brand-blue">
                      <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-brand-blue">{k}</h3>
                      <p className="mt-1 text-ink">{v}</p>
                    </div>
                  ))}
                  {portfolio.project_url && (
                    <div className="bg-surface rounded-2xl p-5 border-l-4 border-brand-blue">
                      <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-brand-blue">Lien du projet</h3>
                      <Link to={portfolio.project_url} target="_blank" rel="noopener noreferrer" className="mt-1 text-brand-blue break-all hover:underline">{portfolio.project_url}</Link>
                    </div>
                  )}
                </div>
              </section>
            </div>

            <aside className="space-y-5">
              <div className="bg-white rounded-2xl p-5 border border-line shadow-card border-l-4 border-l-brand-blue">
                <h3 className="font-bold text-ink mb-3">Partager ce projet</h3>
                <div className="flex flex-col gap-2">
                  <Link to={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${portfolio.title}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-[#1DA1F2] text-white text-sm font-semibold text-center hover:opacity-90 transition-opacity">Twitter</Link>
                  <Link to={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-[#0A66C2] text-white text-sm font-semibold text-center hover:opacity-90 transition-opacity">LinkedIn</Link>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-line shadow-card border-l-4 border-l-brand-gold">
                <h3 className="font-bold text-ink mb-2">Plus de projets</h3>
                <p className="text-sm text-ink-body">Découvrez mes autres réalisations.</p>
                <Link to="/realisations" className="mt-3 inline-block text-brand-blue font-semibold text-sm">Voir tous les projets →</Link>
              </div>
              <div className="bg-gradient-to-br from-brand-blue-deep to-brand-blue text-white rounded-2xl p-5 shadow-floating">
                <h3 className="font-bold mb-2">Intéressé ?</h3>
                <p className="text-sm text-white/80">Vous avez un projet similaire ?</p>
                <Link to="/contact" className="mt-4 inline-flex btn-gold premium-shine !py-2.5">Me contacter →</Link>
              </div>
            </aside>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

export default PortfolioDetail;
