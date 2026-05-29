import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/Theme.css';
import Home from './pages/Home'
import PageNoteFound from './pages/PageNoteFound'
import About from './pages/About'
import Realisations from './pages/Realisations'
import Services from './pages/Services'
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import PortfolioDetail from './pages/PortfolioDetail';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPortfolio from './pages/admin/AdminPortfolio';
import AdminBlog from './pages/admin/AdminBlog';
import AdminMessages from './pages/admin/AdminMessages';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import { ProtectedAdminRoute } from './components/admin/ProtectedAdminRoute';
import { useAdminAuth } from './hooks/useAdminAuth';

function App() {
  const { isAdmin, loading } = useAdminAuth();

  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/services' element={<Services/>} />
      <Route path='/apropos' element={<About/>} />
      <Route path='/realisations' element={<Realisations/>} />
      <Route path='/portfolio/:id' element={<PortfolioDetail/>} />
      <Route path='/blog' element={<Blog/>} />
      <Route path='/blog/:slug' element={<BlogPost/>} />
      <Route path='/contact' element={<Contact/>} />
      
      {/* Admin Routes */}
      <Route path='/admin/login' element={<AdminLogin/>} />
      <Route path='/admin/dashboard' element={
        <ProtectedAdminRoute isAdmin={isAdmin} loading={loading}>
          <AdminDashboard/>
        </ProtectedAdminRoute>
      } />
      <Route path='/admin/portfolio' element={
        <ProtectedAdminRoute isAdmin={isAdmin} loading={loading}>
          <AdminPortfolio/>
        </ProtectedAdminRoute>
      } />
      <Route path='/admin/blog' element={
        <ProtectedAdminRoute isAdmin={isAdmin} loading={loading}>
          <AdminBlog/>
        </ProtectedAdminRoute>
      } />
      <Route path='/admin/messages' element={
        <ProtectedAdminRoute isAdmin={isAdmin} loading={loading}>
          <AdminMessages/>
        </ProtectedAdminRoute>
      } />
      <Route path='/admin/testimonials' element={
        <ProtectedAdminRoute isAdmin={isAdmin} loading={loading}>
          <AdminTestimonials/>
        </ProtectedAdminRoute>
      } />
      <Route path='/admin' element={
        <ProtectedAdminRoute isAdmin={isAdmin} loading={loading}>
          <AdminDashboard/>
        </ProtectedAdminRoute>
      } />
      
      <Route path='*' element={<PageNoteFound/>} />
    </Routes>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router basename="/rufusakande">
      <App/>
    </Router>
  </StrictMode>,
)
