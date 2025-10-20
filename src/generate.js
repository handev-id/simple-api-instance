import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const templatesDir = new URL("./templates", import.meta.url).pathname;

function ensureAxiosInstalled() {
  try {
    require.resolve("axios");
    console.log("✅ Axios already installed");
  } catch {
    console.log("📦 Installing axios...");
    execSync("npm install axios", { stdio: "inherit" });
  }
}

export function generateApiStructure() {
  const root = process.cwd();
  const apiDir = path.join(root, "api");

  ensureAxiosInstalled();

  // Buat folder utama
  if (!fs.existsSync(apiDir)) fs.mkdirSync(apiDir);

  // Buat subfolder
  const folders = ["endpoints", "models"];
  folders.forEach((folder) => {
    const dir = path.join(apiDir, folder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  // Copy file template
  const filesToCopy = [
    { src: "service.ts", dest: "service.ts" },
    { src: "endpoints/example.ts", dest: "endpoints/example.ts" },
    { src: "models/example.ts", dest: "models/example.ts" },
  ];

  filesToCopy.forEach(({ src, dest }) => {
    const srcPath = path.join(templatesDir, src);
    const destPath = path.join(apiDir, dest);

    if (!fs.existsSync(destPath)) {
      const content = fs.readFileSync(srcPath, "utf-8");
      fs.writeFileSync(destPath, content);
      console.log(`✅ Created: ${destPath}`);
    } else {
      console.log(`⚠️  Skipped (already exists): ${destPath}`);
    }
  });

  console.log(`
    ✨ Done! API structure generated.

    Next steps:
    --------------------
    ✅ Import helper function:
      import { useApi } from "@handev-id/simple-api-instance";

    ✅ Example usage:
      const example = useApi({
        api: exampleApi,
      })
`);
}
