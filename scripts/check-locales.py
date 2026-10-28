#!/usr/bin/env python3
"""Audit prerendered language routes after `npm run build` (Python standard library)."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json
import re

ROOT = Path(__file__).resolve().parents[1]
BUILD = ROOT / '.next/server/app'
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}

class Page(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.lang = None
        self.canonical = None
        self.alternates = {}
        self.robots = ''
        self.stack = []
        self.text = []
        self.links = []
        self.feed(source)
    def handle_starttag(self, tag, pairs):
        a = dict(pairs)
        if tag == 'html': self.lang = a.get('lang')
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical = a.get('href')
        if tag == 'link' and a.get('rel') == 'alternate': self.alternates[a.get('hreflang')] = a.get('href')
        if tag == 'meta' and a.get('name') == 'robots': self.robots = a.get('content', '')
        if tag == 'a' and a.get('href'): self.links.append((a['href'], a.get('lang')))
        if not any(t in {'script', 'style', 'blockquote'} for t in self.stack):
            self.text.extend(a[k] for k in ('title', 'alt', 'placeholder', 'aria-label') if a.get(k))
        if tag not in VOID: self.stack.append(tag)
    def handle_endtag(self, tag):
        if tag in self.stack:
            index = len(self.stack) - 1 - self.stack[::-1].index(tag)
            self.stack = self.stack[:index]
    def handle_data(self, value):
        if not any(t in {'script', 'style', 'blockquote', 'head'} for t in self.stack) and value.strip():
            self.text.append(re.sub(r'\s+', ' ', value).strip())

pages = {}
for locale in ('cs', 'en', 'it'):
    home = BUILD / f'{locale}.html'
    if home.exists(): pages[f'/{locale}'] = Page(home.read_text())
    for file in (BUILD / locale).rglob('*.html'):
        pages['/' + str(file.relative_to(BUILD).with_suffix(''))] = Page(file.read_text())
assert pages, 'No prerendered pages: run npm run build in web first.'

errors = []
public = []
for route, page in pages.items():
    locale = route.split('/')[1]
    path = route.removeprefix('/cs') or '/'
    if page.lang != locale: errors.append(f'{route}: html lang={page.lang}')
    if 'noindex' in page.robots:
        if route.split('/')[-1] not in {'dekujeme', 'dotaznik'}: errors.append(f'{route}: unexpectedly noindex')
        continue
    public.append(path)
    if not page.canonical or unquote(urlsplit(page.canonical).path) != path: errors.append(f'{route}: invalid canonical {page.canonical}')
    if set(page.alternates) != {'cs', 'en', 'it', 'x-default'}: errors.append(f'{route}: incomplete hreflang')
    for lang, url in page.alternates.items():
        target = unquote(urlsplit(url).path)
        target = target if target.startswith(('/en', '/it')) else '/cs' + (target if target != '/' else '')
        if target not in pages: errors.append(f'{route}: hreflang target missing: {url}')
        elif lang in {'cs', 'en', 'it'} and pages[target].alternates.get(locale) != page.canonical:
            errors.append(f'{route}: non-reciprocal hreflang {lang}')
    if locale != 'cs':
        dictionary = json.loads((ROOT / f'lib/translations/{locale}.json').read_text())
        dictionary.update(json.loads((ROOT / f'lib/translations/{locale}.server.json').read_text()))
        for text in set(page.text):
            if text in dictionary and dictionary[text] != text and not re.search(r'Bajgerov', text):
                errors.append(f'{route}: untranslated text: {text[:100]}')
    for href, lang in page.links:
        if not href.startswith('/') or href.startswith('//'): continue
        target = unquote(urlsplit(href).path).rstrip('/') or '/'
        if '.' in target.rsplit('/', 1)[-1] or target.startswith('/api/'): continue
        internal = target if target.startswith(('/en', '/it')) else '/cs' + (target if target != '/' else '')
        if internal not in pages: errors.append(f'{route}: broken internal link {href}')
        if locale != 'cs' and not lang and not target.startswith('/' + locale):
            errors.append(f'{route}: link leaves current language {href}')

# Every public language variant must be discoverable in the XML sitemap.
sitemap = (BUILD / 'sitemap.xml.body').read_text()
for path in public:
    if f'{path}</loc>' not in sitemap: errors.append(f'{path}: absent from sitemap')
for private in ('dekujeme', 'dotaznik'):
    if re.search(r'<loc>[^<]*/' + private + r'</loc>', sitemap): errors.append(f'{private}: noindex route in sitemap')

errors = sorted(set(errors))
print(json.dumps({'pages': len(pages), 'indexable': len(public), 'errors': errors}, ensure_ascii=False, indent=2))
raise SystemExit(bool(errors))
