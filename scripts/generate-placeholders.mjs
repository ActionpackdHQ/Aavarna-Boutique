import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "..", "public", "images");
fs.mkdirSync(dir, { recursive: true });

/** Keep in sync with README image list */
export const files = [
  "hero-campaign-silk-drape.jpg",
  "collection-sarees.jpg",
  "collection-bridal-blouses.jpg",
  "collection-dresses.jpg",
  "lookbook-bridal-silk.jpg",
  "lookbook-blouse-atelier.jpg",
  "lookbook-evening-drape.jpg",
  "lookbook-festive-colour.jpg",
  "lookbook-fitting-studio.jpg",
  "product-kanchipuram-temple-border.jpg",
  "product-kanchipuram-temple-border-hover.jpg",
  "product-soft-silk-pastel-peach.jpg",
  "product-soft-silk-pastel-peach-hover.jpg",
  "product-banarasi-midnight-blue.jpg",
  "product-banarasi-midnight-blue-hover.jpg",
  "product-bridal-blouse-heavy-zari.jpg",
  "product-bridal-blouse-heavy-zari-hover.jpg",
  "product-bridal-blouse-elbow-sleeve.jpg",
  "product-bridal-blouse-elbow-sleeve-hover.jpg",
  "product-anarkali-ivory-gold.jpg",
  "product-anarkali-ivory-gold-hover.jpg",
  "product-gown-rose-wine.jpg",
  "product-gown-rose-wine-hover.jpg",
  "product-lehenga-blouse-set.jpg",
  "product-lehenga-blouse-set-hover.jpg",
  "category-silk-sarees.jpg",
  "category-bridal-blouses.jpg",
  "brand-statement-zari-closeup.jpg",
];

const MINI_JPEG = Buffer.from(
  "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBUQDxAVFRUVFRUVFRUVFRUVFRUWFxUXFhUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAAEAAQMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAECBAUGB//EABURAQEAAAAAAAAAAAAAAAAAAAAB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k=",
  "base64"
);

const psScript = `
Add-Type -AssemblyName System.Drawing
$dir = '${dir.replace(/\\/g, "\\\\")}'
$files = @(${files.map((f) => `'${f}'`).join(",")})
$colors = @(
  @(13,11,9), @(142,44,58), @(40,18,28), @(26,61,46),
  @(92,58,26), @(107,31,58), @(60,40,20), @(30,20,40)
)
# Clear old stubs
Get-ChildItem $dir -Filter *.jpg -ErrorAction SilentlyContinue | Remove-Item -Force
for ($i = 0; $i -lt $files.Length; $i++) {
  $c = $colors[$i % $colors.Length]
  $bmp = New-Object System.Drawing.Bitmap 900, 1200
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, $c[0], $c[1], $c[2]))
  $g.FillRectangle($brush, 0, 0, 900, 1200)
  $gold = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(180, 201, 163, 92))
  $font = New-Object System.Drawing.Font 'Georgia', 16
  $name = ($files[$i] -replace '\\.jpg$','' -replace '-',' ')
  $g.DrawString($name, $font, $gold, 40, 560)
  $g.DrawString("NANDHITHA'S BOUTIQUE", (New-Object System.Drawing.Font 'Arial', 11), $gold, 40, 600)
  $pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(120, 201, 163, 92), 1)
  $g.DrawRectangle($pen, 30, 30, 840, 1140)
  $path = Join-Path $dir $files[$i]
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Jpeg)
  $g.Dispose(); $bmp.Dispose(); $brush.Dispose(); $gold.Dispose(); $font.Dispose(); $pen.Dispose()
}
Write-Output ("Wrote " + $files.Length + " JPEGs")
`;

const psPath = path.join(dir, "_gen.ps1");
try {
  fs.writeFileSync(psPath, psScript);
  execFileSync(
    "powershell.exe",
    ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", psPath],
    { stdio: "inherit" }
  );
  fs.unlinkSync(psPath);
} catch (err) {
  console.warn("System.Drawing fallback failed, writing mini JPEGs:", err.message);
  files.forEach((f) => fs.writeFileSync(path.join(dir, f), MINI_JPEG));
}

console.log("Placeholders ready in public/images");
