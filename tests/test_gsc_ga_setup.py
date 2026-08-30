import unittest
import requests
import json
import os
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

class TestGSCGASetup(unittest.TestCase):
    def setUp(self):
        # Base URL of the website to test
        self.base_url = "https://www.pt7.nl"  # Update if different
        
        # List of pages to check (at least 10)
        self.test_pages = [
            "/",
            "/reformer-pilates-amsterdam/",
            "/pricing/",
            "/trainers/",
            "/schedule/",
            "/blog/",
            "/about/",
            "/contact/",
            "/corporate/",
            "/healthcare-providers/"
        ]
        
        # Expected Google Analytics GA4 measurement ID
        self.expected_ga_id = "G-7Y3JQWC4KL"
    
    def test_ga_tracking_on_pages(self):
        """Test that GA tracking code is present on all specified pages"""
        pages_with_missing_ga = []
        
        for page_path in self.test_pages:
            url = urljoin(self.base_url, page_path)
            try:
                response = requests.get(url)
                response.raise_for_status()
                
                soup = BeautifulSoup(response.text, 'html.parser')
                
                # Check for GA script tag
                ga_script_tags = soup.find_all('script', {'src': lambda x: x and 'googletagmanager.com/gtag/js' in x})
                
                # Also check inline scripts for config calls
                inline_scripts = soup.find_all('script')
                ga_configured = False
                
                for script in inline_scripts:
                    if script.string and f"gtag('config', '{self.expected_ga_id}')" in script.string:
                        ga_configured = True
                        break
                
                if not (ga_script_tags and ga_configured):
                    pages_with_missing_ga.append(url)
                    
            except Exception as e:
                print(f"Error checking {url}: {str(e)}")
                pages_with_missing_ga.append(url)
        
        self.assertEqual(
            len(pages_with_missing_ga), 
            0, 
            f"GA tracking missing on {len(pages_with_missing_ga)} pages: {pages_with_missing_ga}"
        )
    
    def test_gsc_verification_present(self):
        """Test that GSC verification meta tag is present on homepage"""
        url = self.base_url
        response = requests.get(url)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        gsc_tag = soup.find('meta', {'name': 'google-site-verification'})
        
        self.assertIsNotNone(
            gsc_tag, 
            "Google Search Console verification meta tag not found"
        )
        
        # Check if content attribute exists
        self.assertTrue(
            gsc_tag.has_attr('content') and len(gsc_tag['content']) > 0,
            "GSC verification tag missing content attribute or value"
        )

if __name__ == '__main__':
    unittest.main()