import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Mail, 
  Star, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import './AdminLayout.css';

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/admin/dashboard" className="sidebar-logo">
            <h2>Rufus Akande</h2>
            <p>Administration</p>
          </Link>
          <button 
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <Link 
            to="/" 
            target="_blank"
            className="sidebar-link-external"
          >
            Voir le site
          </Link>
          <button 
            onClick={handleLogout}
            className="sidebar-logout"
          >
            <LogOut size={18} />
            <span>Déconnexion</span>
          </button>
          {user && (
            <p className="sidebar-user">{user.email}</p>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-header">
          <button 
            className="mobile-menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        <div className="admin-content">
          {children}
        </div>
      </main>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
