import { access, readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const html = await readFile(new URL("index.html", root), "utf8");
const photoFiles = Array.from(
  { length: 4 },
  (_, index) => `assets/photos/amsterdam-0${index + 1}.jpg`,
);
const requiredFiles = [
  "assets/styles.css",
  "assets/main.js",
  "assets/favicon.svg",
  ...photoFiles,
  "assets/venues/karavaan.png",
  "assets/venues/karavaan-web.jpg",
  "assets/venues/cafe-restaurant-amsterdam.png",
  "assets/venues/cafe-restaurant-amsterdam-web.jpg",
];

await Promise.all(requiredFiles.map((file) => access(new URL(file, root))));

const checks = [
  ["svenskt dokument", html.includes('<html lang="sv">')],
  ["sidtitel", html.includes("Carls 30-årshelg i Amsterdam")],
  ["korrekta datum", html.includes("16–18 oktober 2026")],
  ["alla programdagar", ["Fredag", "Lördag", "Söndag"].every((day) => html.includes(day))],
  ["alla bilder", photoFiles.every((file) => html.includes(file))],
  ["lokalbilder", ["karavaan-web.jpg", "cafe-restaurant-amsterdam-web.jpg"].every((file) => html.includes(file))],
  ["huvudinnehåll", /<main[\s>]/.test(html)],
  ["navigationsetikett", html.includes('aria-label="Huvudmeny"')],
];

const failures = checks.filter(([, passed]) => !passed).map(([label]) => label);

if (failures.length > 0) {
  console.error(`Kontrollen misslyckades: ${failures.join(", ")}`);
  process.exit(1);
}

console.log(`Alla ${checks.length} innehållskontroller passerade.`);
