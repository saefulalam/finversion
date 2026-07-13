import re

with open("D:/finversion/index.html", "r", encoding="utf-8") as f:
    content = f.read()

# Fix chart tooltip classes (single underscore to double)
content = content.replace("fv-chart_Tooltip", "fv-chart__tooltip")

# Fix lineTooltip
content = content.replace("linTooltip", "lineTooltip")

# Fix secTooltip
content = content.replace('id="secTooltip"', 'id="sec-tooltip"')
content = content.replace('href="#sec-tooltip"', 'href="#sec-tooltip"')
content = content.replace("sec-tooltip-tooltip", "sec-tooltip")

# Fix fvTooltip class
content = content.replace('fvTooltip', 'fv-tooltip')
content = content.replace('data-fv-tooltip-', 'data-fv-tooltip=')

# Fix broken heading <h3Tooltip
content = content.replace('<h3-tooltip', '<h3>Tooltip')
content = content.replace('<h3>Tooltip</h3>', '<h3>Tooltip</h3>')

# Fix HoverTooltip
content = content.replace('HoverTooltip', 'Hover Tooltip')

# Fix IniTooltip
content = content.replace('IniTooltip', 'Ini Tooltip')

# Fix broken text: "Tooltip Atas</button> (missing > before text)
content = content.replace('"Tooltip Atas</button>', '">Tooltip Atas</button>')

# Fix data-fv-tooltip=Tooltip text (missing opening quote)
content = content.replace('data-fv-tooltip=Tooltip text', 'data-fv-tooltip="Tooltip text')

with open("D:/finversion/index.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Done! Fixed all tooltip corruption.")
