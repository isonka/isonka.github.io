import json
import csv
import os
from urllib.parse import urlparse

def extract_path_from_url(url):
    """Extract path component from a URL"""
    parsed = urlparse(url)
    return parsed.path

def process_broken_links(
    seo_audit_path='data/seo_audit.json', 
    redirects_csv_path='redirects.csv',
    htaccess_path='public/.htaccess'
):
    """
    Process broken internal links from seo_audit.json and create redirect rules.
    
    Args:
        seo_audit_path (str): Path to the SEO audit JSON file
        redirects_csv_path (str): Path where redirects CSV should be saved
        htaccess_path (str): Path to .htaccess file for Apache redirects
    """
    # Check if SEO audit file exists
    if not os.path.exists(seo_audit_path):
        print(f"SEO audit file not found at {seo_audit_path}")
        return
    
    # Load the SEO audit data
    with open(seo_audit_path, 'r') as f:
        seo_data = json.load(f)
    
    # Extract broken internal links
    broken_links = []
    if 'internal_errors' in seo_data:
        broken_links = seo_data['internal_errors']
    
    # Define redirect mappings based on content structure
    # These should map broken/dead URLs to their most relevant replacements
    redirect_mappings = {
        "/pricing-old": "/pricing",
        "/classes/old-schedule": "/schedule",
        "/trainers/profile/john-doe": "/trainers",
        "/blog/archive/2020": "/blog",
        "/equipment/legacy-item": "/equipment",
        "/pilates-basics": "/reformer-pilates-amsterdam",
        "/about-us-team": "/trainers",
        "/contact-old": "/",
        "/private-sessions-legacy": "/private-pilates",
        "/workshops/past-events": "/",
        "/membership-options": "/pricing",
        "/corporate-wellness-old": "/corporate"
    }
    
    # List of valid existing paths that can be redirect targets
    valid_paths = [
        "/", "/pricing", "/schedule", "/trainers", "/blog", "/equipment",
        "/reformer-pilates-amsterdam", "/private-pilates", "/corporate",
        "/pregnancy-pilates", "/strength-training-amsterdam", "/trx-training-amsterdam",
        "/healthcare-providers", "/class-pass-offer", "/academy"
    ]
    
    # Generate redirect rules
    redirect_rules = []
    for broken_url in broken_links:
        # Normalize URL to just path part
        broken_path = extract_path_from_url(broken_url)
        
        # Try direct mapping first
        target_url = redirect_mappings.get(broken_path)
        
        # If no direct mapping, find best match among valid paths
        if not target_url:
            # Simple fuzzy matching logic - in a real scenario you might want more sophisticated matching
            if "trainer" in broken_path.lower():
                target_url = "/trainers"
            elif "schedule" in broken_path.lower() or "class" in broken_path.lower():
                target_url = "/schedule"
            elif "price" in broken_path.lower() or "member" in broken_path.lower():
                target_url = "/pricing"
            elif "equip" in broken_path.lower():
                target_url = "/equipment"
            elif "blog" in broken_path.lower():
                target_url = "/blog"
            elif "pilate" in broken_path.lower():
                target_url = "/reformer-pilates-amsterdam"
            elif "corporate" in broken_path.lower():
                target_url = "/corporate"
            else:
                target_url = "/"  # Fallback to home page
                
        # Final validation that target is a valid path
        if target_url not in valid_paths:
            target_url = "/"
            
        redirect_rules.append({
            'old_url': broken_path,
            'new_url': target_url,
            'status_code': 301
        })
    
    # Write redirects to CSV
    with open(redirects_csv_path, 'w', newline='') as csvfile:
        fieldnames = ['old_url', 'new_url', 'status_code']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        
        writer.writeheader()
        for rule in redirect_rules:
            writer.writerow(rule)
    
    # Also write to .htaccess for Apache server
    with open(htaccess_path, 'w') as f:
        f.write("# Generated 301 redirects for broken internal links\n")
        f.write("<IfModule mod_rewrite.c>\n")
        f.write("RewriteEngine On\n")
        for rule in redirect_rules:
            f.write(f"RewriteRule ^{rule['old_url'].lstrip('/')}(.*)$ {rule['new_url']} [R=301,L]\n")
        f.write("</IfModule>\n")
    
    print(f"Processed {len(redirect_rules)} redirect rules")
    print(f"Redirects saved to {redirects_csv_path}")
    print(f"Apache redirects saved to {htaccess_path}")

if __name__ == "__main__":
    process_broken_links()