import os
import re

print("Analisis Status Komponen Library UI")
print("=" * 60)

# Periksa komponen
components = os.listdir("packages/ui/src/components")
styles_analysis = {}

for comp in components:
    css_path = f"packages/ui/src/components/{comp}/{comp}.css"
    if os.path.exists(css_path):
        with open(css_path, "r") as f:
            content = f.read()
        
        # Analisis CSS
        line_count = len([line for line in content.split("\n") if line.strip() and not line.strip().startswith("#")])
        has_bem = bool(re.search(r"\\.fv-[a-z0-9_-]+\\s*\\{", content))
        has_positioning = bool(re.search(r"position:\\s*fixed|transform:\\s*|opacity:\\s*0", content))
        
        styles_analysis[comp] = {
            "lines": line_count,
            "has_bem": has_bem,
            "has_positioning": has_positioning,
            "looks_complete": line_count > 10 and has_bem and has_positioning
        }

print("\nRingkasan Analisis CSS Komponen:")
print("-" * 60)

# Kelompok berdasarkan kualitas
total = len(styles_analysis)
complete = sum(1 for v in styles_analysis.values() if v["looks_complete"])
partial = sum(1 for v in styles_analysis.values() if not v["looks_complete"])

print(f"Total komponen: {total}")
print(f"✅ Lengkap dengan struktur tepat: {complete}")
print(f"⚠️ Perlu perhatian: {partial}")
print()

# Tampilkan contoh berdasarkan kualitas
quality_categories = {
    "complete": [],
    "minimal": [],
    "needs_work": []
}

for comp, data in styles_analysis.items():
    if data["looks_complete"]:
        quality_categories["complete"].append(comp)
    elif data["lines"] < 20:
        quality_categories["minimal"].append(comp)
    else:
        quality_categories["needs_work"].append(comp)

print("=== KOMPONEN LENGKAP ===")
for c in quality_categories["complete"][:15]:
    print(f"  {c}")
if len(quality_categories["complete"]) > 15:
    print(f"  ... dan {len(quality_categories["complete"]) - 15} lagi")

print(f"\n=== PERLU PERHATIANAN ({len(quality_categories["needs_work"])}) ===")
for c in quality_categories["needs_work"][:10]:
    print(f"  {c}")
if len(quality_categories["needs_work"]) > 10:
    print(f"  ... dan {len(quality_categories["needs_work"]) - 10} lagi")

print("\n=== CSS MINIMAL (< 20 baris) ({len(quality_categories["minimal"])}) ===")
for c in quality_categories["minimal"][:10]:
    print(f"  {c}")
if len(quality_categories["minimal"]) > 10:
    print(f"  ... dan {len(quality_categories["minimal"]) - 10} lagi")

print("\n" + "=" * 60)
print("RANGKASAN KUNCI:")
print(f"✅ {complete}/{total} komponen memiliki struktur CSS yang baik")
print(f"⚠️ {partial}/{total} komponen perlu peningkatan CSS")
print()
print("Library UI sedang berjalan dengan baik, tetapi butuh peningkatan CSS untuk")
print("beberapa komponen, terutama untuk konsistensi visual dan gaya")
print("di seluruh komponen Categories Mobile, AI, E-commerce, Dashboard.")
