import json
import csv
import os

# Paths
script_dir = os.path.dirname(os.path.abspath(__file__))
input_file = os.path.join(script_dir, "output/scraped_data.json")
output_csv = os.path.join(script_dir, "output/expressions.csv")
output_n8n = os.path.join(script_dir, "output/n8n_code_input.json")

def export_data():
    if not os.path.exists(input_file):
        print(f"Error: {input_file} not found.")
        return

    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # 1. Export to CSV (for Google Sheets option)
    # Header: expression | source_url | status
    with open(output_csv, 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(["expression", "source_url", "status"])
        for item in data:
            writer.writerow([item['expression'], item['url'], "Pending"])
    
    print(f"Exported {len(data)} items to CSV: {output_csv}")

    # 2. Export to n8n Code Node format (JSON)
    # Format: Array of objects, which n8n likes better if wrapped or just raw list
    # If using Code Node: return [ {json: {expression: "...", url: "..."}}, ... ]
    
    n8n_list = []
    for item in data:
        n8n_list.append({
            "expression": item['expression'],
            "url": item['url']
        })
        
    with open(output_n8n, 'w', encoding='utf-8') as f:
        # We output just the list. The user can assign this to a variable in n8n.
        json.dump(n8n_list, f, ensure_ascii=False, indent=2)

    print(f"Exported {len(data)} items to JSON for n8n: {output_n8n}")

if __name__ == "__main__":
    export_data()
