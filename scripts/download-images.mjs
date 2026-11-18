import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "..", "public", "images");
fs.mkdirSync(dir, { recursive: true });

/** High-res Unsplash sources — Indian fashion, silk, embroidery, atelier mood */
const q = "auto=format&fit=crop&w=2400&h=3000&q=90";
const qWide = "auto=format&fit=crop&w=2400&h=1600&q=90";
const qHero = "auto=format&fit=crop&w=3200&h=2000&q=92";
const qClose = "auto=format&fit=crop&w=2400&h=2400&q=92";

function u(id, params = q) {
  return `https://images.unsplash.com/${id}?${params}`;
}

const map = {
  // Hero — dramatic saree / bridal fashion
  "hero-campaign-silk-drape.jpg": u(
    "photo-1756483492198-8ca91227489b",
    qHero
  ),
  // Collections
  "collection-bridal-blouses.jpg": u("photo-1610030469983-98e550d6193c"),
  "collection-sarees.jpg": u("photo-1583391733982-8ace9a3c6548"),
  "collection-dresses.jpg": u("photo-1756483509162-b92ea967a884"),
  // Lookbook
  "lookbook-bridal-silk.jpg": u("photo-1594744803329-e58b31de5bf5"),
  "lookbook-blouse-atelier.jpg": u("photo-1594938298603-c8148c4dae35"),
  "lookbook-evening-drape.jpg": u("photo-1617627143750-d86bc21e42bb"),
  "lookbook-festive-colour.jpg": u("photo-1610030469629-dc4743a8f7c2"),
  "lookbook-fitting-studio.jpg": u("photo-1558618666-fcd25c85cd64"),
  // Products (primary)
  "product-kanchipuram-temple-border.jpg": u(
    "photo-1610030469629-dc4743a8f7c2"
  ),
  "product-soft-silk-pastel-peach.jpg": u("photo-1595777457583-95e059d581b8"),
  "product-bridal-blouse-heavy-zari.jpg": u(
    "photo-1610030469983-98e550d6193c"
  ),
  "product-bridal-blouse-elbow-sleeve.jpg": u(
    "photo-1607345366928-199ea26cfe3e"
  ),
  "product-banarasi-midnight-blue.jpg": u("photo-1583391733982-8ace9a3c6548"),
  "product-lehenga-blouse-set.jpg": u("photo-1594744803329-e58b31de5bf5"),
  "product-anarkali-ivory-gold.jpg": u("photo-1756483509162-b92ea967a884"),
  "product-gown-rose-wine.jpg": u("photo-1594938298603-c8148c4dae35"),
  // Hover variants — alternate crops / related shots
  "product-kanchipuram-temple-border-hover.jpg": u(
    "photo-1617627143750-d86bc21e42bb"
  ),
  "product-soft-silk-pastel-peach-hover.jpg": u(
    "photo-1515886657613-9f3515b0c78f"
  ),
  "product-bridal-blouse-heavy-zari-hover.jpg": u(
    "photo-1756376748048-d51f2f2e87bc"
  ),
  "product-bridal-blouse-elbow-sleeve-hover.jpg": u(
    "photo-1496747611176-843222e1e57c"
  ),
  "product-banarasi-midnight-blue-hover.jpg": u(
    "photo-1572804013309-59a2831b21ca"
  ),
  "product-lehenga-blouse-set-hover.jpg": u(
    "photo-1610030469983-98e550d6193c"
  ),
  "product-anarkali-ivory-gold-hover.jpg": u(
    "photo-1566174053879-31528523f8ae"
  ),
  "product-gown-rose-wine-hover.jpg": u("photo-1558171813-4c088753af8f"),
  // Categories
  "category-bridal-blouses.jpg": u("photo-1610030469983-98e550d6193c", qWide),
  "category-silk-sarees.jpg": u("photo-1558171813-4c088753af8f", qWide),
  // Brand statement — zari / embroidery close-up
  "brand-statement-zari-closeup.jpg": u(
    "photo-1594938298603-c8148c4dae35",
    qClose
  ),
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(
      url,
      {
        headers: {
          "User-Agent": "NandhithasBoutique/1.0 (image fetch for local demo)",
          Accept: "image/jpeg,image/*,*/*",
        },
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          fs.unlinkSync(dest);
          return download(res.headers.location, dest).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlinkSync(dest);
          return reject(new Error(`${res.statusCode} ${url}`));
        }
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve(dest)));
      }
    );
    req.on("error", (err) => {
      file.close();
      try {
        fs.unlinkSync(dest);
      } catch {}
      reject(err);
    });
  });
}

const entries = Object.entries(map);
let ok = 0;
for (const [name, url] of entries) {
  const dest = path.join(dir, name);
  process.stdout.write(`↓ ${name} ... `);
  try {
    await download(url, dest);
    const kb = Math.round(fs.statSync(dest).size / 1024);
    console.log(`${kb} KB`);
    if (kb < 40) console.warn(`  ⚠ small file — may be stub/error`);
    ok++;
  } catch (e) {
    console.log(`FAIL: ${e.message}`);
  }
}
console.log(`\nDone: ${ok}/${entries.length}`);
