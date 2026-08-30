import json
import os
from bs4 import BeautifulSoup

# Load SEO audit data and improvement priorities
with open('data/seo_audit.json') as f:
    seo_audit_data = json.load(f)

with open('data/seo_improvement_priorities.json') as f:
    improvement_list = json.load(f)

# Directory to save optimized pages
output_dir = 'seo_optimized_pages'
os.makedirs(output_dir, exist_ok=True)

# Process each page in improvement list
for item in improvement_list:
    url_path = item["url_path"]
    suggested_title = item["suggested_title"]
    suggested_description = item["suggested_meta_description"]

    # Only process the top 10 most relevant or visited underperforming pages
    if item.get("priority_rank", 99) > 10:
        continue

    # Determine source file path based on URL path
    if url_path == "/":
        source_file = "index.html"
    else:
        # Normalize path for filesystem access
        clean_path = url_path.strip("/")
        source_file = f"public/{clean_path}/index.html" if clean_path else "public/index.html"

    # Read original HTML
    try:
        with open(source_file, 'r', encoding='utf-8') as f:
            html_content = f.read()
    except FileNotFoundError:
        print(f"[Warning] Source file not found: {source_file}")
        continue

    # Parse and modify HTML
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Update title tag
    title_tag = soup.find('title')
    if title_tag:
        title_tag.string = suggested_title
    else:
        new_title = soup.new_tag("title")
        new_title.string = suggested_title
        soup.head.append(new_title)
    
    # Update meta description
    meta_desc = soup.find("meta", attrs={"name": "description"})
    if meta_desc:
        meta_desc["content"] = suggested_description
    else:
        new_meta = soup.new_tag("meta", attrs={"name": "description", "content": suggested_description})
        soup.head.append(new_meta)

    # Save optimized version
    output_filename = os.path.basename(source_file).replace(".html", "_optimized.html")
    if url_path == "/":
        output_filename = "index_optimized.html"
    else:
        path_segments = url_path.strip("/").split("/")
        if len(path_segments) > 1:
            subfolder = os.path.join(output_dir, *path_segments[:-1])
            os.makedirs(subfolder, exist_ok=True)
            output_filename = os.path.join(subfolder, path_segments[-1] + "_optimized.html")
        else:
            output_filename = os.path.join(output_dir, path_segments[0] + "_optimized.html")

    full_output_path = os.path.join(output_dir, output_filename) if isinstance(output_filename, str) else output_filename
    with open(full_output_path, 'w', encoding='utf-8') as f:
        f.write(str(soup))

print("[Process Complete] Optimized SEO metadata saved in 'seo_optimized_pages/' directory.")