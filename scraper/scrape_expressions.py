import requests
from bs4 import BeautifulSoup
import re
import json
import time

def clean_title(title):
    # Remove common Korean descriptors and special characters to extracting the English phrase
    
    # 1. Remove brackets and content within them
    title = re.sub(r'\[.*?\]', '', title)
    title = re.sub(r'\(.*?\)', '', title)
    
    # 2. Split by common delimiters used in this blog to separate expression from meaning
    # Removed 'vs' and '/' to preserve comparison topics like "A vs B"
    delimiters = ['의미', '뜻', '예문', '해석', '표현', ':', '—', '-']
    for delimiter in delimiters:
        if delimiter in title:
            # Check if separating by this delimiter leaves us with something substantial
            # This prevents splitting "on sale vs for sale" if unnecessary, 
            # but usually "vs" implies the Korean title explains the difference.
            # However, for preserving "A vs B" English topics, we might want to be careful.
            # But the user asked to clean "Korean included".
            # For "vs", usually the English part is "A vs B". 
            # If the title is "A vs B 의미", valid English is "A vs B".
            title = title.split(delimiter)[0]
    
    # 3. Remove all non-ASCII characters (This removes Korean effectively)
    # converting to ascii, ignoring errors removes all non-ascii chars
    title = re.sub(r'[^\x00-\x7F]+', ' ', title)
    
    # Clean up whitespace
    title = title.strip()
    
    # Remove trailing/leading non-alphanumeric chars (like quotes, punctuation)
    # Allow internal punctuation like ' in "don't" or & in "A & B"
    title = re.sub(r'^[^a-zA-Z0-9]+', '', title)
    title = re.sub(r'[^a-zA-Z0-9]+$', '', title)
    
    return title.strip()

def scrape_blog_expressions(blog_id, category_name="영어회화 표현"):
    base_url = f"https://m.blog.naver.com/api/blogs/{blog_id}/post-list"
    
    # First, we need to find the categoryNo for "영어회화 표현"
    # Since finding category ID automatically can be tricky without rendering, 
    # we will try to fetch the category list or just start crawling a known category if possible.
    # For now, let's try to fetch recent posts and see if we can filter or just walk through.
    # Actually, the mobile API endpoint filtering by category requires categoryNo.
    # Let's try to get it from the main page categories.
    
    print("Fetching categories...")
    category_url = f"https://m.blog.naver.com/api/blogs/{blog_id}/category-list"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': f'https://m.blog.naver.com/{blog_id}'
    }
    
    try:
        resp = requests.get(category_url, headers=headers)
        data = resp.json()
        # The debug output showed that 'result' contains 'mylogCategoryList'
        result = data.get('result', {})
        if isinstance(result, dict):
             categories = result.get('mylogCategoryList', [])
        else:
             categories = [] 
    except Exception as e:
        print(f"Failed to fetch categories: {e}")
        return []

    target_category_no = None
    for cat in categories:
        if category_name in cat.get('categoryName', ''):
            target_category_no = cat.get('categoryNo')
            print(f"Found category '{cat.get('categoryName')}': ID {target_category_no}")
            break
    
    if not target_category_no:
        print(f"Could not find category '{category_name}'. Fetching all posts instead.")
        # Optional: prompt user or default to all
    
    expressions = []
    page = 1
    per_page = 20 # Mobile API usually supports pagination
    
    # Note: Naver Mobile API post-list params might vary. 
    # Let's use a simpler approach: crawling the HTML list if API fails, 
    # but let's try the standard mobile asynchronous load URL logic or just standard scraping.
    
    # Strategy 2: Use the standard list URL and parsing JSON response usually sent to mobile.
    # URL: https://m.blog.naver.com/api/blogs/{blogId}/post-list?categoryNo={no}&page={page}
    
    while True:
        print(f"Scraping page {page}...")
        # URL already contains blogId: https://m.blog.naver.com/api/blogs/{blogId}/post-list
        # Redundant params might cause issues, so we only send what's needed for the list.
        params = {
            'page': page,
            'count': 30
        }
        if target_category_no:
            params['categoryNo'] = target_category_no
            
        try:
            # Match debug_api.py exactly: construct URL manually
            list_url = f"https://m.blog.naver.com/api/blogs/{blog_id}/post-list?categoryNo={target_category_no}&page={page}&count=20"
            
            # Remove params argument since we are encoding in URL
            r = requests.get(list_url, headers=headers)
            data = r.json()
            
            if not data.get('isSuccess') and 'result' not in data:
                print(f"Request failed: {data}")
                break
                
            # Based on debug output, the key is 'items', not 'list'
            post_list = data.get('result', {}).get('items', [])
            
            if not post_list:
                print(f"No posts found on page {page}. Response data keys: {list(data.keys())}")
                break
                
            # DEBUG: Print keys of the first post to ensure we use correct fields
            if page == 1:
                print(f"First post keys: {list(post_list[0].keys())}")
                print(f"First post titleWithCt: {post_list[0].get('titleWithCt')}")
                print(f"First post title: {post_list[0].get('title')}")

            for post in post_list:
                # Based on debug output, the key is 'titleWithInspectMessage'
                raw_title = post.get('titleWithInspectMessage', post.get('titleWithCt', post.get('title', '')))
                
                # Naver titles in JSON might contain HTML entities or escaping
                # Use simple replace if bs4 is overkill or failing, but keep bs4 for now
                try:
                    title_text = BeautifulSoup(raw_title, "html.parser").get_text()
                except Exception as e:
                    title_text = raw_title
                
                expr = clean_title(title_text)
                
                # Filter out titles that are just empty after cleaning
                if not expr:
                    print(f"  [Skip] Empty after clean: '{title_text}'")
                    continue
                
                # Relaxed filter: check if it contains at least one English word (2+ letters)
                if not re.search(r'[a-zA-Z]{2,}', expr):
                    print(f"  [Skip] No English word found: {expr}")
                    continue
                    
                print(f"  Extracted: {expr} (from '{title_text}')")
                
                expressions.append({
                    "original_title": title_text,
                    "expression": expr,
                    "url": f"https://m.blog.naver.com/{blog_id}/{post.get('logNo')}"
                })
            
            # Pagination logic: Check if we have reached the end
            # Using 'totalCount' from API response if available, or just relies on empty list check above
            # The previous break 'if len(post_list) < 30' might be premature if the API returns fewer items per page
            # We will rely on 'if not post_list' break at the top of the loop
            
            page += 1
            time.sleep(0.3) # Be polite
            
        except Exception as e:
            print(f"Error on page {page}: {e}")
            break

    return expressions

if __name__ == "__main__":
    # TODO: Replace with your target blog ID
    blog_id = "YOUR_BLOG_ID" 
    print(f"Starting scraper for {blog_id}...")
    
    if blog_id == "YOUR_BLOG_ID":
        print("Error: Please set a valid 'blog_id' in scraper/scrape_expressions.py")
        exit(1)
    
    results = scrape_blog_expressions(blog_id)
    
    import os
    
    # ... (existing imports handled at top, just showing logic change)
    # Ensure output directory exists and path is correct relative to this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_dir = os.path.join(script_dir, "output")
    output_file = os.path.join(output_dir, "scraped_data.json")
    
    # Create output/ if not exists
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
        
    print(f"\nScraping complete. Found {len(results)} expressions.")
    print(f"Saved to {output_file}")
