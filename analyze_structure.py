import re

def analyze_structure():
    with open('favorites.html', 'r', encoding='utf-8', errors='ignore') as f:
        lines = f.readlines()

    current_folders = []
    items = []
    
    for line in lines:
        line_s = line.strip()
        # Check folder start
        h3_match = re.search(r'<H3[^>]*>(.*?)</H3>', line, re.IGNORECASE)
        if h3_match:
            folder_name = h3_match.group(1).strip()
            current_folders.append(folder_name)
            continue
        
        # Check folder end
        if '</DL>' in line_s or '</dl>' in line_s:
            if current_folders:
                current_folders.pop()
            continue
            
        # Check link
        a_match = re.search(r'<A\s+HREF="([^"]+)"[^>]*>(.*?)</A>', line, re.IGNORECASE)
        if a_match:
            url = a_match.group(1).strip()
            title = a_match.group(2).strip()
            folder_path = " / ".join(current_folders)
            items.append({
                'title': title,
                'url': url,
                'folder': folder_path,
                'line': line_s
            })

    print(f"Total bookmarks found: {len(items)}")
    
    # Check folder counts
    from collections import Counter
    folder_counts = Counter(item['folder'] for item in items)
    print("\n--- FOLDERS ---")
    for f, count in folder_counts.most_common():
        print(f"[{f}]: {count} bookmarks")

    # Near duplicate detection:
    # 1. Normalized github repos (owner/repo)
    # 2. URLs with query strings stripped or /tree/main stripped
    # 3. Same domains / services
    print("\n--- DUPLICATES & NEAR-DUPLICATES ---")
    github_repos = {}
    for item in items:
        m = re.match(r'https?://github\.com/([^/]+)/([^/#?]+)', item['url'])
        if m:
            repo = f"{m.group(1).lower()}/{m.group(2).lower()}"
            github_repos.setdefault(repo, []).append(item)

    for repo, entries in github_repos.items():
        if len(entries) > 1:
            print(f"GitHub Repo Duplicate: {repo}")
            for e in entries:
                print(f"  - Folder: [{e['folder']}] Title: '{e['title']}' URL: {e['url']}")

    # Check same domain or similar title
    base_urls = {}
    for item in items:
        # strip trailing slash, tree/main, utm params
        clean_url = re.sub(r'[?#].*$', '', item['url']).rstrip('/')
        clean_url = re.sub(r'/tree/main$', '', clean_url)
        clean_url = re.sub(r'/tree/master$', '', clean_url)
        base_urls.setdefault(clean_url.lower(), []).append(item)

    for b_url, entries in base_urls.items():
        if len(entries) > 1 and not b_url.startswith('https://github.com'):
            print(f"Clean URL Duplicate: {b_url}")
            for e in entries:
                print(f"  - Folder: [{e['folder']}] Title: '{e['title']}' URL: {e['url']}")

    # Check same services / platforms saved under different URLs
    # e.g., Neon, Databricks, Discord, Google Cloud, etc.
    print("\n--- PLATFORM / DOMAIN CONCURRENCES ---")
    domain_map = {}
    for item in items:
        m = re.match(r'https?://([^/]+)', item['url'])
        if m:
            dom = m.group(1).lower()
            # strip subdomains like www., docs., console.
            parts = dom.split('.')
            if len(parts) >= 2:
                root_dom = '.'.join(parts[-2:])
            else:
                root_dom = dom
            domain_map.setdefault(root_dom, []).append(item)
            
    for dom, entries in domain_map.items():
        if len(entries) > 1 and dom not in ['github.com', 'dev.to', 'gumroad.com', 'joshwcomeau.com']:
            print(f"Domain {dom} ({len(entries)} items):")
            for e in entries:
                print(f"  - [{e['folder']}] '{e['title']}': {e['url']}")

if __name__ == '__main__':
    analyze_structure()
