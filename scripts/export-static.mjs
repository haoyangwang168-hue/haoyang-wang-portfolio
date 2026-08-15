import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("static-export", `${process.pid}-${Date.now()}`);

const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("https://portfolio.example/", {
    headers: { accept: "text/html" },
  }),
  {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  },
  {
    waitUntil() {},
    passThroughOnException() {},
  },
);

if (!response.ok) {
  throw new Error(`Static export failed with HTTP ${response.status}.`);
}

const outputDirectory = resolve("dist/client");
await mkdir(outputDirectory, { recursive: true });
await writeFile(resolve(outputDirectory, "index.html"), await response.text(), "utf8");

console.log("Exported dist/client/index.html for Vercel.");
