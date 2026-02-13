# Jescy Gratton -- Portfolio Marketing Digital

Site portfolio professionnel pour Jescy Gratton, specialiste en marketing digital base a Montreal.

## Stack Technique

- **HTML5** semantique + accessible (WCAG AA)
- **CSS3** -- Design system custom (dark theme, accent cyan #0f969c)
- **JavaScript** Vanilla -- Zero dependances, IIFE pattern
- **Formspree** -- Backend formulaire de contact
- **Vercel** -- Deploiement + CDN + Headers securite

## Structure

```
├── index.html          # Page principale (SPA)
├── 404.html            # Page erreur personnalisee
├── css/
│   ├── style.css       # Styles principaux
│   ├── animations.css  # Animations et transitions
│   └── responsive.css  # Media queries mobile-first
├── js/
│   └── main.js         # Logique site (nav, carousel, form, counters)
├── images/             # Assets visuels optimises
├── vercel.json         # Config deploiement + headers securite
├── sitemap.xml         # Plan du site pour SEO
├── robots.txt          # Directives crawlers
└── README.md           # Ce fichier
```

## Fonctionnalites

- Design dark mode moderne et responsive
- Mobile-first avec breakpoints 480/768/1024/1200px
- Accessible (ARIA labels, skip-to-content, keyboard nav)
- Headers securite (CSP, HSTS, X-Frame-Options)
- Compteurs animes avec IntersectionObserver
- Carousel temoignages avec autoplay
- Formulaire contact via Formspree
- SEO optimise (Schema.org, OG tags, sitemap)

## Developpement

```bash
# Cloner le repo
git clone https://github.com/jescy/JescyGratton-Site.git

# Servir localement
npx serve .
# ou
python -m http.server 8000
```

## Licence

(c) 2026 Jescy Gratton. Tous droits reserves.
