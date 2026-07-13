import os

backup_path = "D:/finversion/backup/src/css/fv-ui.css"
components_dir = "D:/finversion/packages/ui/src/components"
output_path = "D:/finversion/src/css/fv-ui.css"

# Read backup
with open(backup_path, "r", encoding="utf-8") as f:
    base = f.read()

# Collect all component CSS
component_css = []
for comp in sorted(os.listdir(components_dir)):
    css_file = os.path.join(components_dir, comp, f"{comp}.css")
    if os.path.exists(css_file):
        with open(css_file, "r", encoding="utf-8") as f:
            css = f.read().strip()
            if css:
                component_css.append(f"/* === {comp} === */\n{css}")

# Write combined
with open(output_path, "w", encoding="utf-8") as f:
    f.write(base)
    f.write("\n\n/* ============================================\n   NEW COMPONENTS\n   ============================================ */\n\n")
    f.write("\n\n".join(component_css))
    f.write("\n")

total_lines = len(open(output_path, "r", encoding="utf-8").readlines())
print(f"Done! {output_path} = {total_lines} lines")
