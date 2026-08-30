import pytest
import os
import json
import jsonschema

# Paths for the JSON file
json_output_path = 'data/seo_audit.json'
schema_path = 'tests/seo_audit_schema.json'

def load_json_file(path):
    with open(path, 'r') as f:
        return json.load(f)

def test_seo_audit_output_exists():
    assert os.path.isfile(json_output_path), f"File {json_output_path} does not exist"

def test_seo_audit_has_correct_keys():
    audit_data = load_json_file(json_output_path)
    assert "on_page" in audit_data
    assert "technical" in audit_data
    assert "structured_data" in audit_data

def test_on_page_seo_data():
    audit_data = load_json_file(json_output_path)
    on_page = audit_data["on_page"]

    assert "meta_tags" in on_page
    assert "header_structure" in on_page
    assert "url_structure" in on_page

    meta_tags = on_page["meta_tags"]
    assert "title_tag" in meta_tags
    assert "meta_description" in meta_tags
    assert "open_graph" in meta_tags
    assert "twitter_card" in meta_tags

    headers = on_page["header_structure"]
    assert "h1_count" in headers
    assert "h1_text" in headers
    assert "h2_used_for_sections" in headers
    assert "content_hierarchy" in headers

    urls = on_page["url_structure"]
    assert "total_internal_links" in urls
    assert "urls_descriptive" in urls
    assert "urls_contain_keywords" in urls
    assert "no_duplicate_content_urls" in urls

def test_technical_seo_data():
    audit_data = load_json_file(json_output_path)
    technical = audit_data["technical"]

    assert "site_speed" in technical
    assert "mobile_responsiveness" in technical
    assert "crawl_errors" in technical
    assert "security" in technical

    assert technical["site_speed"]["core_web_vitals_passing"] is not None
    assert technical["site_speed"]["https_enabled"] is not None

def test_structured_data_reporting():
    audit_data = load_json_file(json_output_path)
    structured_data = audit_data["structured_data"]

    assert "organization_schema" in structured_data
    assert "local_business_schema" in structured_data
    assert "breadcrumb_schema" in structured_data
    assert "article_schema" in structured_data
    assert "product_schema" in structured_data

    assert isinstance(structured_data["organization_schema"]["present"], bool)
    assert isinstance(structured_data["product_schema"]["properties_complete"], bool)