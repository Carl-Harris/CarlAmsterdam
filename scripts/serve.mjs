import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { createServer } from "node:http";

const root = new URL("../", import.meta.url).pathname;
const port = Number(process.env.PORT ?? 4173);
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
};

createServer(async (request, response) => {
  const requestedPath = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  const relativePath = requestedPath === "/" ? "index.html" : requestedPath.slice(1);
  const filePath = normalize(join(root, relativePath));

  if (!filePath.startsWith(root)) {
    response.writeHead(403).end("Otillåten sökväg");
    return;
  }

  try {
    const file = await stat(filePath);
    if (!file.isFile()) throw new Error("Inte en fil");
    response.writeHead(200, {
      "Content-Type": contentTypes[extname(filePath)] ?? "application/octet-stream",
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Sidan hittades inte");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Webbplatsen kör på http://127.0.0.1:${port}`);
});
