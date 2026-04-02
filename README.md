# Labs — badreddineek.com

Interactive explainers and visual essays on data science, ML, and AI.

## Live at

[labs.badreddineek.com](https://labs.badreddineek.com)

## How to add a new site

1. Create a subfolder: `your-site-slug/`
2. Add `index.html` (+ assets) inside that folder
3. Add an entry in `labs.config.json` at the root:

```json
{
  "slug": "your-site-slug",
  "title": "Your Site Title",
  "description": "One sentence explaining what this piece covers.",
  "tags": ["Tag1", "Tag2"],
  "date": "YYYY-MM-DD",
  "color": "#hexcolor",
  "status": "live"
}
```

4. Push — Cloudflare Pages redéploie automatiquement.
5. Le site est accessible à `labs.badreddineek.com/your-site-slug`
6. La card apparaît automatiquement sur la page index.

## Status values

- `live` — site accessible et linkable
- `coming-soon` — card affichée mais non cliquable

## Structure

```
labs/
├── labs.config.json        ← Source de vérité pour toutes les cards
├── index.html              ← Page d'accueil auto-générée
├── forecasting-explained/
│   └── index.html
├── agent-loop/
│   └── index.html
└── ...
```
