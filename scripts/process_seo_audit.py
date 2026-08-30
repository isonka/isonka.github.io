import os
import json
import re
from bs4 import BeautifulSoup

def extract_primary_keyword(file_path):
    """
    Extracts primary keyword from the title tag of the HTML file.
    Assumes the first few words of the title are the primary keyword.
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    soup = BeautifulSoup(content, 'html.parser')
    title_tag = soup.find('title')
    
    if not title_tag or not title_tag.get_text().strip():
        return None
        
    title_text = title_tag.get_text().strip()
    # Use first 3-5 words as primary keyword
    words = title_text.split()
    if len(words) <= 4:
        primary_keyword = ' '.join(words)
    else:
        primary_keyword = ' '.join(words[:4])
        
    return primary_keyword.lower()

def validate_and_fix_headers(soup, primary_keyword):
    """
    Validates and fixes header structure in BeautifulSoup object.
    Returns a dict with validation results and whether file was modified.
    """
    original_content = str(soup)
    
    # Find all headings
    h1_tags = soup.find_all('h1')
    h2_tags = soup.find_all('h2')
    h3_tags = soup.find_all('h3')
    all_headings = soup.find_all(re.compile(r'^h[1-6]$'))
    
    issues = []
    modified = False
    
    # Validate H1
    if len(h1_tags) == 0:
        issues.append("Missing H1 tag")
        # Create an H1 with primary keyword if missing
        if primary_keyword:
            new_h1 = soup.new_tag("h1")
            new_h1.string = primary_keyword.title()
            # Insert at the beginning of body or after header
            body = soup.find('body')
            if body:
                # Try to place after navbar/header if exists, otherwise at start
                first_element = body.find_next()
                if first_element:
                    first_element.insert_before(new_h1)
                else:
                    body.insert(0, new_h1)
                modified = True
    elif len(h1_tags) > 1:
        issues.append(f"Multiple H1 tags found ({len(h1_tags)})")
        # Keep only the first H1, remove the rest
        for h1 in h1_tags[1:]:
            h1.decompose()
        modified = True
        
    # Check if primary keyword exists in H1
    h1_tag = soup.find('h1')
    if h1_tag:
        h1_text = h1_tag.get_text().strip().lower()
        if primary_keyword and primary_keyword not in h1_text:
            issues.append("Primary keyword not in H1")
            # Update H1 to include primary keyword
            h1_tag.string = primary_keyword.title()
            modified = True

    # Validate heading hierarchy
    previous_level = 1  # Start with H1 level
    for tag in all_headings:
        level = int(tag.name[1])  # Get number from h1,h2,h3...
        
        # Check for skipped levels 
        if level > previous_level + 1 and previous_level != 0:
            issues.append(f"Skipped heading level from H{previous_level} to H{level}")
            # Fix by adjusting tag to next level
            new_tag_name = f"h{previous_level + 1}"
            new_tag = soup.new_tag(new_tag_name)
            new_tag.string = tag.get_text()
            tag.replace_with(new_tag)
            modified = True
            previous_level = previous_level + 1
        else:
            previous_level = level
            
    # Additional validation: avoid too many H1s (already handled), empty headers
    for tag in [h1_tag] if h1_tag else []:
        if not tag.get_text().strip():
            issues.append("Empty H1 tag")
            if primary_keyword:
                tag.string = primary_keyword.title()
                modified = True
                
    for tag in h2_tags + h3_tags:
        if not tag.get_text().strip():
            issues.append(f"Empty {tag.name} tag")
            tag.decompose()
            modified = True
            
    return {
        "h1_count": len(soup.find_all('h1')),
        "h2_count": len(soup.find_all('h2')),
        "h3_count": len(soup.find_all('h3')),
        "issues": issues,
        "modified": modified,
        "content_changed": original_content != str(soup)
    }

def process_html_file(file_path):
    """
    Processes an HTML file to validate and fix headers.
    Returns validation results.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        soup = BeautifulSoup(content, 'html.parser')
        primary_keyword = extract_primary_keyword(file_path)
        result = validate_and_fix_headers(soup, primary_keyword)
        
        # Save fixed version if modifications were made
        if result["modified"] and result["content_changed"]:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(str(soup))
        
        return {
            "file": file_path,
            **result
        }
    except Exception as e:
        return {
            "file": file_path,
            "error": str(e),
            "h1_count": 0,
            "h2_count": 0,
            "h3_count": 0,
            "issues": ["Processing error"],
            "modified": False
        }

def main():
    seo_pages_dir = "seo_optimized_pages"
    report_file = "header_validation_report.json"
    
    # Load existing report if it exists
    if os.path.exists(report_file):
        with open(report_file, 'r') as f:
            try:
                report_data = json.load(f)
            except json.JSONDecodeError:
                report_data = {"corrected_pages": [], "validation_errors": [], "fixed_pages": []}
    else:
        report_data = {"corrected_pages": [], "validation_errors": [], "fixed_pages": []}
    
    # Get list of HTML files
    html_files = []
    if os.path.exists(seo_pages_dir):
        for root, _, files in os.walk(seo_pages_dir):
            for file in files:
                if file.endswith(".html"):
                    html_files.append(os.path.join(root, file))
    
    # Process each file
    corrected_pages = []
    validation_errors = []
    fixed_pages = []
    
    for html_file in html_files:
        result = process_html_file(html_file)
        
        if "error" in result:
            validation_errors.append(result)
        elif result["issues"]:
            # Track validations that had issues but could be fixed
            if result["modified"]:
                fixed_pages.append({k: v for k, v in result.items() if k != "content_changed"})
            else:
                validation_errors.append(result)
        else:
            # Fully valid pages without issues
            corrected_pages.append({
                "file": result["file"],
                "h1_count": result["h1_count"],
                "h2_count": result["h2_count"],
                "h3_count": result["h3_count"]
            })
    
    # Update report
    report_data["corrected_pages"] = corrected_pages
    report_data["validation_errors"] = validation_errors
    report_data["fixed_pages"] = fixed_pages
    
    # Write updated report
    with open(report_file, 'w') as f:
        json.dump(report_data, f, indent=2)

if __name__ == "__main__":
    main()