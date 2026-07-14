import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Mail,
  Star,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronLeft,
} from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const NAV_ITEMS = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/portfolio', label: 'Portfolio', icon: Briefcase },
  { path: '/admin/blog', label: 'Blog', icon: FileText },
  { path: '/admin/testimonials', label: 'Avis clients', icon: Star },
  { path: '/admin/messages', label: 'Messages', icon: Mail },
];

export function AdminLayout({ children }) {
  const location = useLocation();
  const { user, logout } = useAdminAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const currentItem = NAV_ITEMS.find((i) => location.pathname.startsWith(i.path));

  const NavLink = ({ item, mini = false }) => {
    const Icon = item.icon;
    const active = location.pathname.startsWith(item.path);
    return (
      <Link
        to={item.path}
        className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
          active
            ? 'bg-gradient-to-r from-brand-blue to-brand-blue-accent text-white shadow-blue-glow'
            : 'text-white/70 hover:text-white hover:bg-white/5'
        }`}
        title={mini ? item.label : undefined}
      >
        <Icon size={18} className="flex-shrink-0" />
        {!mini && <span className="truncate">{item.label}</span>}
        {active && !mini && (
          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-gold shadow-gold-glow" />
        )}
      </Link>
    );
  };

  const SidebarInner = ({ mini = false }) => (
    <div className="flex h-full flex-col text-white">
      {/* Brand */}
      <div className={`flex items-center gap-3 px-4 pt-6 pb-6 border-b border-white/10 ${mini ? 'justify-center px-2' : ''}`}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-gold-light to-brand-gold flex items-center justify-center text-[#1a1108] font-black shadow-gold-glow flex-shrink-0">
          RA
        </div>
        {!mini && (
          <div className="min-w-0">
            <p className="font-bold leading-tight truncate">Rufus Akande</p>
            <p className="text-[11px] uppercase tracking-[0.16em] text-brand-gold-light/80 truncate">Administration</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className={`flex-1 overflow-y-auto py-4 space-y-1 ${mini ? 'px-2' : 'px-3'}`}>
        {NAV_ITEMS.map((item) => <NavLink key={item.path} item={item} mini={mini} />)}
      </nav>

      {/* Footer */}
      <div className={`border-t border-white/10 space-y-2 ${mini ? 'p-2' : 'p-3'}`}>
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white/70 hover:text-white hover:bg-white/5 transition-colors ${mini ? 'justify-center' : ''}`}
          title="Voir le site"
        >
          <ExternalLink size={16} />
          {!mini && <span>Voir le site</span>}
        </Link>
        <button
          onClick={logout}
          className={`w-full flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-red-300 hover:text-white hover:bg-red-500/20 transition-colors ${mini ? 'justify-center' : ''}`}
          title="Déconnexion"
        >
          <LogOut size={16} />
          {!mini && <span>Déconnexion</span>}
        </button>
        {!mini && user && (
          <div className="mt-3 px-3 pt-3 border-t border-white/5">
            <p className="text-[11px] uppercase tracking-wider text-white/40">Connecté</p>
            <p className="text-xs text-white/70 truncate mt-0.5">{user.email}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface text-ink">
      {/* Desktop sidebar (fixed) */}
      <aside
        className={`hidden lg:flex fixed inset-y-0 left-0 z-40 flex-col bg-brand-blue-deep shadow-floating transition-[width] duration-300 ${collapsed ? 'w-[76px]' : 'w-[260px]'}`}
      >
        <SidebarInner mini={collapsed} />
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? 'Étendre la barre latérale' : 'Réduire la barre latérale'}
          className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-white text-brand-blue shadow-card border border-line flex items-center justify-center hover:scale-110 transition-transform"
        >
          <ChevronLeft size={14} className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </aside>

      {/* Mobile drawer */}
      <div className={`lg:hidden fixed inset-0 z-50 pointer-events-none ${mobileOpen ? 'pointer-events-auto' : ''}`}>
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-brand-blue-deep/60 backdrop-blur-sm transition-opacity ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
        />
        <aside
          className={`absolute inset-y-0 left-0 w-[280px] max-w-[85%] bg-brand-blue-deep shadow-floating transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Fermer le menu"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center"
          >
            <X size={18} />
          </button>
          <SidebarInner />
        </aside>
      </div>

      {/* Main */}
      <div className={`min-h-screen transition-[padding] duration-300 ${collapsed ? 'lg:pl-[76px]' : 'lg:pl-[260px]'}`}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-xl border-b border-line">
          <div className="flex items-center justify-between gap-3 px-4 sm:px-6 h-16">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Ouvrir le menu"
                className="lg:hidden w-10 h-10 rounded-xl border border-line bg-white flex items-center justify-center hover:border-brand-blue hover:text-brand-blue transition-colors"
              >
                <Menu size={20} />
              </button>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.16em] text-brand-blue font-bold">Administration</p>
                <h1 className="text-sm sm:text-base font-bold text-ink truncate">
                  {currentItem?.label || 'Espace admin'}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-ink-body hover:text-brand-blue hover:bg-brand-blue-soft/60 transition-colors"
              >
                <ExternalLink size={14} />
                Voir le site
              </Link>
              {user && (
                <div className="flex items-center gap-2 pl-2 sm:pl-3 sm:border-l border-line">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-blue to-brand-blue-accent text-white text-xs font-bold flex items-center justify-center shadow-blue-glow flex-shrink-0">
                    {(user.email?.[0] || 'A').toUpperCase()}
                  </div>
                  <div className="hidden md:block leading-tight">
                    <p className="text-xs font-semibold text-ink truncate max-w-[180px]">{user.email}</p>
                    <p className="text-[11px] text-ink-muted">Administrateur</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10 max-w-[1400px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
