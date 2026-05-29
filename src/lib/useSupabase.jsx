import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Hook pour récupérer les portfolios publiés
export function usePortfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from('portfolio')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (supabaseError) {
          throw supabaseError;
        }

        setPortfolios(data || []);
      } catch (err) {
        console.error('Erreur lors de la récupération des portfolios:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  return { portfolios, loading, error };
}

// Hook pour récupérer les articles de blog publiés
export function useBlogPosts() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .order('published_at', { ascending: false });

        if (supabaseError) {
          throw supabaseError;
        }

        setBlogPosts(data || []);
      } catch (err) {
        console.error('Erreur lors de la récupération des articles:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return { blogPosts, loading, error };
}

// Hook pour récupérer un article spécifique par slug
export function useBlogPostBySlug(slug) {
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .maybeSingle();

        if (supabaseError) {
          throw supabaseError;
        }

        setBlogPost(data);
      } catch (err) {
        console.error('Erreur lors de la récupération de l\'article:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug]);

  return { blogPost, loading, error };
}
