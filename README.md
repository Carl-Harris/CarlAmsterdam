# Carls 30-årshelg i Amsterdam

En snabb, responsiv och tillgänglig statisk webbplats för födelsedagshelgen
16–18 oktober 2026. Uttrycket hämtar inspiration från Amsterdams kanalhus,
broar, cyklar, tulpaner och vatten. Webbplatsen är byggd utan externa
JavaScript-beroenden och publiceras med GitHub Pages.

## Kör lokalt

Node.js 20 eller senare behövs.

```bash
npm run dev
```

Öppna sedan `http://127.0.0.1:4173`.

## Kontrollera och bygg

```bash
npm run check
npm run build
```

Den färdiga webbplatsen hamnar i `dist/`.

## Publicering

Arbetsflödet `.github/workflows/pages.yml` bygger och publicerar webbplatsen
automatiskt till GitHub Pages vid push till `main` eller projektets
arbetsbranch. GitHub Pages måste använda **GitHub Actions** som källa under
repositoryts **Settings → Pages**.

## Struktur

- `index.html` – semantiskt innehåll och program
- `assets/amsterdam.css` – layout, färger, responsivitet och reducerad rörelse
- `assets/main.js` – tangentbordsstyrda programflikar
- `assets/photos/` – de fyra oförändrade originalbilderna
- `assets/venues/` – oförändrade lokalbilder och optimerade webbderivat
- `scripts/` – lokal server, innehållskontroll och statisk bygg
