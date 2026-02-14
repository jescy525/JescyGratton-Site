# CLAUDE.md — JescyGratton-Site

## Projet

Site portfolio professionnel de **Jescy Gratton**, expert en prompt engineering IA pour PME québécoises.
Site statique SPA (Single Page Application), tout dans `index.html`. Aucun framework JS. Aucun bundler.

- **Domaine :** `jescygratton.com`
- **Hébergement :** Vercel (config dans `vercel.json`)
- **Formulaire :** Formspree (`https://formspree.io/f/xpqjplne`)
- **Langue :** Français canadien (`fr-CA`)

---

## Stack technique

| Couche | Technologie | Notes |
|--------|-------------|-------|
| HTML | HTML5 sémantique | WCAG AA, ARIA labels, skip-to-content |
| CSS | CSS3 custom properties | Dark theme only, mobile-first |
| JS | Vanilla JS (IIFE) | Zero dépendances, pas de framework |
| Fonts | Google Fonts (Inter) | Preconnect + preload |
| Icons | SVG inline | Pas de librairie d'icônes |
| Déploiement | Vercel | CDN + headers sécurité |
| Formulaire | Formspree | POST JSON + honeypot anti-spam |

---

## Structure des fichiers

```
index.html             # SPA principale (toutes les sections)
404.html               # Page erreur (CSS inline autonome)
css/
  style.css            # Design system + composants (source of truth pour les variables)
  animations.css       # Scroll reveal, hover effects, prefers-reduced-motion
  responsive.css       # Mobile-first, breakpoints: 480/768/1024/1200/1440px
js/
  main.js              # Toute la logique (IIFE, zero deps)
images/                # JPG optimisés (pas de WebP pour l'instant)
  stories/             # Sous-dossier stories
vercel.json            # Headers sécurité + cache + cleanUrls
robots.txt             # Directives crawlers
sitemap.xml            # Plan du site SEO
tmp-tab-ecommerce.html # WIP: tab e-commerce enrichie (pas intégré)
```

---

## Design system

### Couleurs (CSS custom properties dans `:root` de style.css)

| Variable | Valeur | Usage |
|----------|--------|-------|
| `--bg-primary` | `#0a0a14` | Fond principal (très sombre) |
| `--bg-secondary` | `#111125` | Fond sections alternées |
| `--bg-card` | `#161631` | Fond cartes |
| `--accent` | `#0f969c` | Couleur accent principale (cyan/teal) |
| `--accent-light` | `#6edcd9` | Accent clair (liens, hover) |
| `--accent-dark` | `#0a7075` | Accent foncé (dégradés boutons) |
| `--text-primary` | `#f0f0f5` | Texte principal (quasi-blanc) |
| `--text-secondary` | `#a0a0b8` | Texte secondaire |
| `--text-muted` | `#6b6b82` | Texte tertiaire/labels |
| `--success` | `#22c55e` | Feedback positif, métriques vertes |

### Typographie

- **Font unique :** Inter (300–900)
- **Headings :** `font-weight: 700–900`, `line-height: 1.08–1.15`
- **Body :** `16px`, `line-height: 1.6`
- **Sizing :** `clamp()` pour les titres (fluid)

### Espacements & radius

- **Section padding :** `120px` (desktop) → `60px` (mobile)
- **Container max :** `1200px` (1300px à 1440px+)
- **Radius :** `sm=8px`, `md=12px`, `lg=16px`, `xl=24px`, `full=9999px`

### Boutons

- `.btn-primary` : dégradé accent, glow shadow
- `.btn-secondary` : bg-card, border hover accent
- `.btn-outline` : transparent, border accent
- Tous : `translateY(-2px)` au hover

---

## Sections du site (ordre dans index.html)

1. **Navigation** — Fixed, transparent → blur on scroll, hamburger mobile
2. **Hero** — Photo + titre + badge "Disponible" + CTA "Audit IA GRATUIT"
3. **Services & Tarifs** — 6 packs (Restos 297$, B2B 497$, E-com 397$, Santé 347$, Immobilier 397$, Construction 347$)
4. **Portfolio** — Tabs par industrie (Restaurant, Juridique, E-Commerce, Santé, Immobilier, Construction)
5. **Stats** — 4 compteurs animés (30h, 5min, 340%, 100%)
6. **Témoignages** — Carousel 3 cards avec autoplay 7s
7. **À propos** — Photo + bio + valeurs + outils maîtrisés
8. **Contact** — Formulaire Formspree + liens directs (email, X, LinkedIn, Facebook)
9. **Footer** — Logo + liens + social

---

## Patterns JS (main.js)

Le fichier est une seule IIFE `(function() { 'use strict'; ... })()`.

| Feature | Pattern | Notes |
|---------|---------|-------|
| Scroll reveal | `IntersectionObserver` + class `.reveal--visible` | threshold 0.15, unobserve après |
| Compteurs | `requestAnimationFrame` + ease-out cubic | Déclenchés par IntersectionObserver |
| Témoignages | `setInterval(7000)` + pause quand hors viewport | Dots cliquables |
| Carousel photos | CSS `scroll-snap-type: x mandatory` + JS dots/counter | Multi-photo Instagram-style |
| Portfolio tabs | `showTab()` toggle display + re-observe reveals | Pas de routing, juste show/hide |
| Formulaire | `fetch()` POST vers Formspree | Loading state + success message 8s |
| Nav mobile | Class toggle `.active` + `overflow: hidden` body | Ferme sur Escape |
| Active nav | `scroll` listener + `offsetTop` comparaison | Passive listener |

---

## SEO & métadonnées

- **Schema.org :** `ProfessionalService` (JSON-LD dans `<head>`)
- **Open Graph :** Titre, description, image (`jescy-suit.jpg`), locale `fr_CA`
- **Twitter Card :** `summary_large_image`
- **Canonical :** `https://www.jescygratton.com/`
- **Keywords :** Prompt engineering Québec, marketing IA PME, 6+ industries
- **Robots :** `index, follow` (sauf 404 : `noindex, nofollow`)

---

## Sécurité (vercel.json)

Headers configurés sur toutes les routes `/(.**)` :
- `Content-Security-Policy` : `default-src 'self'`, `script-src 'self' 'unsafe-inline'`, `style-src 'self' 'unsafe-inline' fonts.googleapis.com`, `font-src fonts.gstatic.com`, `connect-src formspree.io`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security` : 2 ans, includeSubDomains, preload
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` : camera/microphone/geolocation désactivés

**Si tu ajoutes un script/style externe, MAJ obligatoire du CSP dans `vercel.json`.**

---

## Accessibilité

- Skip-to-content link (`.skip-to-content`)
- Tous les SVG : `aria-hidden="true"`
- Images : `alt` descriptifs, `width`/`height` explicites
- Formulaire : `<label>` associés, `required`, `autocomplete`
- Nav : `role="navigation"`, `role="menubar"`, `aria-label`, `aria-expanded`
- Keyboard nav : focus-visible, class `.keyboard-nav` (Tab detection)
- `prefers-reduced-motion` : toutes les animations désactivées (dans animations.css)

---

## Responsive design

Architecture mobile-first. Les styles de base dans `responsive.css` sont pour mobile, les media queries ajoutent progressivement :

| Breakpoint | Layout |
|------------|--------|
| Base (<480px) | 1 col, photo 220px, hamburger menu |
| 480px+ | CTAs côte à côte, photo 260px |
| 768px | Services 2 col, social posts 2 col, tabs wrap |
| 1024px | Nav desktop horizontal, hero 2 col, services 3 col, posts 3 col |
| 1200px | Spacing max, photo 380px, stat numbers 3rem |
| 1440px | Container 1300px |

---

## Images

Toutes en JPG, pas de WebP. Nommage sémantique :
- `jescy-suit.jpg` — Photo hero (OG image)
- `jescy-peaky.jpg` — Photo section À propos
- `jescy-portrait.jpg` — Avatar dans les social posts mockup
- `portfolio-resto-{1-5}.jpg` — Photos portfolio restaurant
- `resto-*.jpg` — Photos additionnelles carousel restaurant

---

## Travail en cours (WIP)

- `tmp-tab-ecommerce.html` : Version enrichie de l'onglet E-Commerce (5 produits + descriptions SEO). Pas encore intégré dans `index.html`.
- **Tabs portfolio incomplets :** Les onglets Juridique, Santé, Immobilier, Construction ont des placeholders `<!-- PLACEHOLDER_* -->` dans `index.html` — contenu pas encore créé.

---

## Conventions de code

### HTML
- Commentaires de section : `<!-- ====== SECTION NAME ====== -->`
- Classes BEM-inspired : `.component`, `.component-element`, `.component--modifier`
- `data-*` attributes pour le JS (`data-tab`, `data-target`, `data-carousel`, `data-delay`)

### CSS
- Organisation par section (dans l'ordre du HTML)
- Variables dans `:root` de `style.css` uniquement (SSOT)
- `responsive.css` override les variables `:root` pour mobile
- `animations.css` = single source pour `prefers-reduced-motion`
- Pas de `!important` sauf `.nav-cta` color (hack nécessaire)

### JS
- IIFE strict mode, pas de globales
- `var` et `function` déclarations (pas de const/let partout — style ES5-compatible)
- Event listeners avec `{ passive: true }` pour scroll
- Fallback si `IntersectionObserver` non supporté

---

## Commandes utiles

```bash
# Servir localement
npx serve .
# ou
python -m http.server 8000

# Déployer (via Vercel CLI)
vercel --prod
```

---

## Checklist avant déploiement

- [ ] Tester tous les tabs portfolio (pas de contenu manquant visible)
- [ ] Vérifier le CSP si ajout de ressource externe
- [ ] Images avec `alt`, `width`, `height`, `loading="lazy"` (sauf hero = `eager`)
- [ ] Formulaire Formspree fonctionnel (tester en prod)
- [ ] `prefers-reduced-motion` respecté (tester dans DevTools)
- [ ] Mobile : hamburger menu, scroll, tabs horizontaux
