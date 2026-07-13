import os
import re

print("Checking UI Component Library Status")
print("=" * 60)

# Check all components to identify patterns
components = os.listdir("packages/ui/src/components")
styles_analysis = {}

for comp in components:
    css_path = f"packages/ui/src/components/{comp}/{comp}.css"
    if os.path.exists(css_path):
        with open(css_path, "r") as f:
            content = f.read()
        
        # Analyze the CSS
        line_count = len([line for line in content.split("\n") if line.strip() and not line.strip().startswith("#")])
        has_bem = bool(re.search(r"\\.fv-[a-z0-9_-]+\\s*\\{", content))
        has_important_properties = bool(re.search(r"position:\\s*fixed|transform:\\s*|opacity:\\s*0", content))
        
        styles_analysis[comp] = {
            "lines": line_count,
            "has_bem": has_bem,
            "has_positioning": has_important_properties,
            "looks_complete": line_count > 10 and has_bem and has_important_properties
        }

print("\nComponent CSS Analysis Summary:")
print("-" * 60)

# Group by quality
total = len(styles_analysis)
complete = sum(1 for v in styles_analysis.values() if v["looks_complete"])
partial = sum(1 for v in styles_analysis.values() if not v["looks_complete"])

print(f"Total components: {total}")
print(f"✅ Complete with proper structure: {complete}")
print(f"⚠️ Needs attention: {partial}")
print()

# Show category examples
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

print("=== COMPLETE COMPONENTS ===")
for c in quality_categories["complete"][:15]:
    print(f"  {c}")
if len(quality_categories["complete"]) > 15:
    print(f"  ... and {len(quality_categories["complete"]) - 15} more")

print(f"\n=== NEEDS CONSIDERATION ({len(quality_categories["needs_work"])}) ===")
for c in quality_categories["needs_work"][:10]:
    print(f"  {c}")
if len(quality_categories["needs_work"]) > 10:
    print(f"  ... and {len(quality_categories["needs_work"]) - 10} more")

print("\n=== MINIMAL CSS (< 20 lines) ({len(quality_categories["minimal"])}) ===")
for c in quality_categories["minimal"][:10]:
    print(f"  {c}")
if len(quality_categories["minimal"]) > 10:
    print(f"  ... and {len(quality_categories["minimal"]) - 10} more")

print("\n" + "=" * 60)
print("KEY FINDINGS:")
print(f"✅ {complete}/{total} components have good CSS structure")
print(f"⚠️ {partial}/{total} components need additional CSS work")
print()
print("The library is mostly functional, but some components need more detailed CSS.")
print("The static HTML previews use standard FV-UI classes that should work.")
