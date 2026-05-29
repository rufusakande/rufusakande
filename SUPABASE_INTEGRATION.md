# 🚀 Intégration Supabase - Rufus Akande Portfolio

Ce document explique comment l'intégration Supabase a été configurée dans le projet Rufus Akande.

## 📋 Table des matières

1. [Installation & Configuration](#installation--configuration)
2. [Structure des données](#structure-des-données)
3. [Comment ajouter des portfolios](#comment-ajouter-des-portfolios)
4. [Comment ajouter des articles de blog](#comment-ajouter-des-articles-de-blog)
5. [Utiliser les hooks personnalisés](#utiliser-les-hooks-personnalisés)
6. [Déploiement](#déploiement)

---

## Installation & Configuration

### Variables d'environnement

Le fichier `.env` contient vos clés Supabase :

```env
VITE_SUPABASE_URL="https://mkirvbgiirmxigrtwzqz.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="votre_clé_publique"
```

**⚠️ IMPORTANT:** 
- Ne jamais commiter le fichier `.env` sur GitHub
- Le fichier `.gitignore` est configuré pour ignorer les fichiers `.env`
- Partager ces clés uniquement en privé avec votre équipe

### Installation des dépendances

Les dépendances Supabase ont été ajoutées à `package.json`:

```bash
npm install
# ou
yarn install
```

---

## Structure des données

### Table: `portfolio`

Contient tous vos projets/réalisations.

| Champ | Type | Description |
|-------|------|-------------|
| `id` | UUID | Identifiant unique (auto-généré) |
| `title` | TEXT | Titre du projet |
| `short_description` | TEXT | Description courte (affichée dans les cartes) |
| `long_description` | TEXT | Description longue (pour page détail future) |
| `image_url` | TEXT | URL de l'image de couverture |
| `project_url` | TEXT | URL du projet live |
| `category` | TEXT | Catégorie (coaching, formation, consulting, ecommerce, webapp) |
| `tags` | TEXT[] | Tags/technologies utilisées |
| `status` | TEXT | `published` ou `draft` (seuls les published s'affichent) |
| `created_at` | TIMESTAMP | Date de création |
| `updated_at` | TIMESTAMP | Date de dernière modification |

### Table: `blog_posts`

Contient tous vos articles de blog.

| Champ | Type | Description |
|-------|------|-------------|
| `id` | UUID | Identifiant unique (auto-généré) |
| `title` | TEXT | Titre de l'article |
| `slug` | TEXT | URL-friendly slug (unique) |
| `excerpt` | TEXT | Résumé de l'article |
| `content` | TEXT | Contenu complet (HTML supporté) |
| `cover_image_url` | TEXT | URL de l'image de couverture |
| `category` | TEXT | Catégorie de l'article |
| `tags` | TEXT[] | Tags associés |
| `reading_time` | INTEGER | Temps de lecture estimé (en minutes) |
| `status` | TEXT | `published` ou `draft` |
| `published_at` | TIMESTAMP | Date de publication |
| `created_at` | TIMESTAMP | Date de création |
| `updated_at` | TIMESTAMP | Date de dernière modification |

---

## Comment ajouter des portfolios

### Via le dashboard Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Connectez-vous avec votre compte
3. Ouvrez le projet `mkirvbgiirmxigrtwzqz`
4. Allez dans l'onglet `Editor` → `portfolio`
5. Cliquez sur `Insert row`
6. Remplissez les champs:
   - **title**: "Nom de votre projet"
   - **short_description**: "Description courte (max 200 caractères)"
   - **image_url**: "https://example.com/image.jpg"
   - **project_url**: "https://votreprojet.com"
   - **category**: "coaching" | "formation" | "consulting" | "webapp" | "ecommerce"
   - **tags**: `["React", "Node.js", "MongoDB"]` (tableau JSON)
   - **status**: `published` (pour afficher le projet) ou `draft` (masqué)

7. Cliquez sur `Save`

### Exemple de données

```json
{
  "title": "Académie Sereine",
  "short_description": "Site vitrine + tunnel de prise de rendez-vous. +180 % de demandes d'appel en 3 mois.",
  "long_description": "Description plus détaillée du projet...",
  "image_url": "https://example.com/academie-sereine.jpg",
  "project_url": "https://academie-sereine.com",
  "category": "coaching",
  "tags": ["Coach", "Site Vitrine", "Calendly", "React"],
  "status": "published"
}
```

---

## Comment ajouter des articles de blog

### Via le dashboard Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Ouvrez le projet `mkirvbgiirmxigrtwzqz`
3. Allez dans l'onglet `Editor` → `blog_posts`
4. Cliquez sur `Insert row`
5. Remplissez les champs:
   - **title**: "Titre de l'article"
   - **slug**: "titre-de-larticle" (URL-friendly, doit être unique)
   - **excerpt**: "Résumé court de l'article"
   - **content**: "Contenu HTML de l'article" (vous pouvez utiliser du HTML complet)
   - **cover_image_url**: "https://example.com/article-cover.jpg"
   - **category**: "Web", "Entrepreneuriat", "Design", etc.
   - **tags**: `["React", "Tutoriel", "Débutant"]`
   - **reading_time**: 5 (temps estimé en minutes)
   - **status**: `published` (pour afficher) ou `draft` (masqué)
   - **published_at**: "2024-01-15T10:00:00.000Z"

6. Cliquez sur `Save`

### Format du contenu HTML

Le champ `content` accepte du HTML complet. Exemples:

```html
<h2>Section 1</h2>
<p>Paragraphe de texte...</p>
<ul>
  <li>Point 1</li>
  <li>Point 2</li>
</ul>
<h3>Sous-section</h3>
<p>Plus de texte...</p>
<code>const example = true;</code>
```

### Exemple complet

```json
{
  "title": "Comment créer un site web performant",
  "slug": "comment-creer-site-web-performant",
  "excerpt": "Les meilleures pratiques pour créer un site web rapide et optimisé pour les moteurs de recherche.",
  "content": "<h2>Introduction</h2><p>Dans cet article, nous allons explorer...</p>",
  "cover_image_url": "https://example.com/blog-cover.jpg",
  "category": "Web",
  "tags": ["Web", "Performance", "SEO"],
  "reading_time": 7,
  "status": "published",
  "published_at": "2024-01-15T10:00:00.000Z"
}
```

---

## Utiliser les hooks personnalisés

### Hook `usePortfolio()`

Récupère tous les portfolios publiés:

```jsx
import { usePortfolio } from '@/lib/useSupabase';

function MyComponent() {
  const { portfolios, loading, error } = usePortfolio();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <div>
      {portfolios.map(p => (
        <div key={p.id}>
          <h3>{p.title}</h3>
          <p>{p.short_description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Hook `useBlogPosts()`

Récupère tous les articles publiés:

```jsx
import { useBlogPosts } from '@/lib/useSupabase';

function Blog() {
  const { blogPosts, loading, error } = useBlogPosts();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <div>
      {blogPosts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <a href={`/blog/${post.slug}`}>Lire plus</a>
        </div>
      ))}
    </div>
  );
}
```

### Hook `useBlogPostBySlug(slug)`

Récupère un article spécifique par son slug:

```jsx
import { useBlogPostBySlug } from '@/lib/useSupabase';

function BlogPostPage({ slug }) {
  const { blogPost, loading, error } = useBlogPostBySlug(slug);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;
  if (!blogPost) return <p>Article non trouvé</p>;

  return (
    <article>
      <h1>{blogPost.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
    </article>
  );
}
```

---

## Déploiement

### Sur GitHub Pages

1. Assurez-vous que votre fichier `.env` est dans `.gitignore`
2. Commitez vos changements:

```bash
git add .
git commit -m "Intégration Supabase pour portfolios et blog"
git push origin main
```

3. Déployez sur GitHub Pages:

```bash
npm run deploy
```

### Variables d'environnement en production

**Important:** Vous devez ajouter les variables d'environnement dans les paramètres de GitHub Pages:

1. Allez sur GitHub → Votre repo → Settings → Secrets and variables → Actions
2. Cliquez sur "New repository secret"
3. Ajoutez:
   - `VITE_SUPABASE_URL`: `https://mkirvbgiirmxigrtwzqz.supabase.co`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`: Votre clé publique

Cependant, GitHub Pages ne supporte pas directement les variables d'environnement. La meilleure approche est:

1. Créer un fichier `.env.production` dans le repository (sans données sensibles)
2. Les clés Supabase publiques peuvent être considérées comme sûres car elles sont de toute façon exposées côté client

---

## 🔐 Sécurité

### Ce qui est sécurisé

- Les clés **VITE_** sont utilisées par Vite et exposées au client (c'est normal)
- Supabase gère l'authentification et l'autorisation via les Row Level Security (RLS)
- Seuls les portfolios/articles avec `status: 'published'` sont visibles publiquement

### Ce qui ne l'est pas

- Ne jamais partager votre clé secrète Supabase
- Ne jamais commiter le fichier `.env` avec des données sensibles
- Les clés publiques (VITE_) sont visibles dans le navigateur (c'est prévu)

---

## 🆘 Troubleshooting

### "Missing Supabase environment variables"

**Solution:** Vérifiez que votre fichier `.env` existe et contient:
```env
VITE_SUPABASE_URL="..."
VITE_SUPABASE_PUBLISHABLE_KEY="..."
```

### Les données ne s'affichent pas

1. Vérifiez que les enregistrements ont `status: 'published'`
2. Vérifiez la console du navigateur pour les erreurs
3. Vérifiez que les images_url sont valides
4. Testez directement dans le dashboard Supabase

### Erreur CORS

Supabase gère automatiquement les CORS. Si vous avez une erreur:
1. Allez dans Settings → Supabase Studio
2. Vérifiez que votre domaine est autorisé

---

## 📞 Support

Pour plus d'aide:
- [Documentation Supabase](https://supabase.com/docs)
- [Forum Supabase](https://github.com/supabase/supabase/discussions)
- Contactez Rufus Akande directement

---

**Dernière mise à jour:** 22 mai 2024
