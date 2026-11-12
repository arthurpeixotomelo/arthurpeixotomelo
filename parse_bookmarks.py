import re
from bs4 import BeautifulSoup
from collections import defaultdict
from urllib.parse import urlparse, urlunparse

def normalize_url(url):
    url = url.strip()
    # remove trailing slash
    parsed = urlparse(url)
    path = parsed.path.rstrip('/')
    # reconstruct without fragment if not essential, or keep
    # let's normalize scheme and netloc to lower
    return urlunparse((
        parsed.scheme.lower(),
        parsed.netloc.lower(),
        path,
        parsed.params,
        parsed.query,
        parsed.fragment
    ))

def parse():
    with open('favorites.html', 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    soup = BeautifulSoup(content, 'html.parser')
    
    # Track hierarchy and links
    links = [] # list of (title, url, folder_path)
    
    def traverse(node, current_path):
        for child in node.children:
            if child.name == 'dt':
                # Can be a folder (h3) or link (a)
                h3 = child.find('h3', recursive=False)
                if h3:
                    folder_name = h3.get_text(strip=True)
                    # Next sibling DL usually contains items
                    # Or DL is inside DT
                    dl = child.find('dl', recursive=False)
                    if not dl:
                        # Sometimes dl is next sibling
                        next_sib = child.find_next_sibling()
                        if next_sib and next_sib.name == 'dl':
                            dl = next_sib
                    new_path = current_path + [folder_name]
                    if dl:
                        traverse(dl, new_path)
                a = child.find('a', recursive=False)
                if a:
                    title = a.get_text(strip=True)
                    url = a.get('href', '').strip()
                    links.append((title, url, ' / '.join(current_path)))
            elif child.name == 'dl':
                traverse(child, current_path)

    # If BeautifulSoup structure didn't nest cleanly (netscape bookmark dl/dt can be quirky):
    # Let's also do a fallback or check how it parsed
    root_dl = soup.find('dl')
    if root_dl:
        traverse(root_dl, [])

    print(f"Total links parsed via traverse: {len(links)}")
    
    # Also find all <a> tags directly to be 100% sure we didn't miss any
    all_a = soup.find_all('a')
    print(f"Total <a> tags in document: {len(all_a)}")

    # Map URLs to entries
    url_map = defaultdict(list)
    for a in all_a:
        title = a.get_text(strip=True)
        url = a.get('href', '').strip()
        norm = normalize_url(url)
        url_map[norm].append((title, url))

    duplicates = {k: v for k, v in url_map.items() if len(v) > 1}
    print(f"\nUnique normalized URLs: {len(url_map)}")
    print(f"Duplicate URLs count: {len(duplicates)}")
    print("\n--- DUPLICATES ---")
    for norm, entries in duplicates.items():
        print(f"URL: {norm} (Count: {len(entries)})")
        for t, orig_url in entries:
            print(f"  - Title: '{t}' | Orig: {orig_url}")

    print("\n--- ALL BOOKMARKS SUMMARY ---")
    for i, a in enumerate(all_a, 1):
        print(f"{i}. [{a.get_text(strip=True)}]({a.get('href', '')})")

if __name__ == '__main__':
    parse()
