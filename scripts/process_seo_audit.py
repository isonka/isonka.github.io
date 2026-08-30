import json
import os

def categorize_issue(severity):
    """Map audit severity to priority levels."""
    severity_mapping = {
        "critical": "urgent",
        "high": "high",
        "medium": "medium",
        "low": "low"
    }
    return severity_mapping.get(severity.lower(), "medium")

def process_seo_audit():
    """Process seo_audit.json and generate seo_improvement_priorities.json"""
    # Read the audit data
    with open("data/seo_audit.json", "r") as f:
        audit_data = json.load(f)
    
    # Process issues
    priorities = []
    for item in audit_data:
        priority_item = {
            "category": item.get("category", "Uncategorized"),
            "issue": item.get("issue", "Unspecified issue"),
            "severity": categorize_issue(item.get("severity", "medium")),
            "description": item.get("description", ""),
            "recommendation": item.get("recommendation", "")
        }
        priorities.append(priority_item)
    
    # Write to output file
    with open("data/seo_improvement_priorities.json", "w") as f:
        json.dump(priorities, f, indent=2)

if __name__ == "__main__":
    process_seo_audit()