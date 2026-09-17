# Carrousel LinkedIn

Carrousel éditorial en 9 slides pour présenter le Lab sur la lecture des sondages. Les valeurs 16 %, 14 % et 1 000 sont explicitement pédagogiques et synthétiques.

## Structure

- `carousel.html` : source éditable de la composition et du contenu.
- `carousel.css` : styles dédiés au carrousel, indépendants du Lab principal.
- `export-fallback.mjs` : export local déterministe en PNG et PDF via SVG, Sharp et pdf-lib.
- `export.mjs` : export HTML Playwright prévu lorsque Chromium est disponible.
- `package.json` / `package-lock.json` : dépendances et commande d’export.
- `png/slide-1.png` à `png/slide-9.png` : exports individuels en 1080 × 1350 px.
- `previews/slide-1.png` à `previews/slide-9.png` : prévisualisations réduites en 350 × 438 px.
- `montage-control.png` : montage 3 × 3 pour le contrôle du rythme global.
- `linkedin-carousel.pdf` : document de 9 pages, une slide par page.

## Régénérer les exports

Depuis ce dossier :

```powershell
npm install
npm run export
```

La commande produit les neuf PNG et le PDF dans ce même dossier. Elle n’écrit aucun fichier dans le Lab principal.

## Identité visuelle

Le carrousel reprend le vert profond, le papier chaud, l’orange d’alerte, le jaune de signal, la serif éditoriale et la mono technique du Lab. Les graphiques utilisent des formes simples pour représenter l’échantillonnage, le bruit, le biais et l’incertitude sans reproduire une capture d’écran du site.

## URL finale

La dernière slide affiche « Lien dans le premier commentaire » et conserve discrètement `labs.badreddineek.com` comme repère secondaire.
