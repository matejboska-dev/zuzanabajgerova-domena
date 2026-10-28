import { cloneElement, isValidElement, type ReactNode, type ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from './i18n';
import { languagePath, SEGMENTS, SITE_URL } from './routes';
import en from './translations/en.json';
import it from './translations/it.json';

const dictionaries: Record<'en' | 'it', Record<string, string>> = { en, it };
const normalize = (text: string) => text.replace(/\s+/g, ' ').trim();

/** Static dictionaries are used during prerendering and again for interactive states. */
export function translate(text: string, locale: Locale): string {
  if (locale === 'cs' || !text.trim()) return text;
  const source = normalize(text);
  if (/Kč/.test(source)) return translate(text.replace(/Kč/g, 'CZK'), locale);
  const monthNames = ['ledna', 'února', 'března', 'dubna', 'května', 'června', 'července', 'srpna', 'září', 'října', 'listopadu', 'prosince'];
  const date = source.match(/^(\d{1,2})\.\s+(\S+)\s+(\d{4})$/);
  if (date && monthNames.includes(date[2])) return new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'it-IT', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(Number(date[3]), monthNames.indexOf(date[2]), Number(date[1]))));
  const translated = dictionaries[locale][source];
  if (translated !== undefined) return text.replace(text.trim(), translated);
  for (const pattern of source.length < 1200 ? patterns[locale] : []) {
    const match = source.match(pattern.regex);
    if (match) return pattern.target.replace(/ZXQ(\d+)QXZ/g, (_, index: string) => translate(match[Number(index) + 1] ?? '', locale));
  }
  return text;
}

const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const patterns = Object.fromEntries((['en', 'it'] as const).map(locale => [locale, Object.entries(dictionaries[locale])
  .filter(([key]) => key.includes('ZXQ') && !/QXZZXQ/.test(key))
  .map(([key, target]) => ({ regex: new RegExp('^' + key.split(/ZXQ\d+QXZ/).map(escapeRegex).join('(.*?)') + '$'), target }))
])) as Record<'en' | 'it', { regex: RegExp; target: string }[]>;

const textProps = new Set(['children', 'fallback', 'title', 'accent', 'lead', 'text', 'description', 'label', 'linkLabel', 'badge', 'chips', 'heading', 'fine', 'before', 'alt', 'placeholder', 'aria-label', 'ariaLabel', 'submitLabel', 'updated', 'role', 'successMessage', 'message', 'q', 'a', 'name', 'caption', 'eyebrow', 'note', 'sendLabel']);
const dataProps = new Set(['items', 'slides', 'fields', 'options', 'ctas', 'primary', 'secondary', 'toc', 'rows', 'faq', 'bg', 'portrait', 'oblasti', 'areas', 'data']);
const routeStarts = new Set(Object.values(SEGMENTS).map(s => s.split('/')[0]));

export function localizedHref(href: string, locale: Locale): string {
  if (locale === 'cs') return href;
  if (href.startsWith('https://wa.me/')) {
    const url = new URL(href);
    const text = url.searchParams.get('text');
    if (text) url.searchParams.set('text', translate(text, locale));
    return url.toString();
  }
  if (href.startsWith(SITE_URL + '/')) {
    if (/\/#(?:agent|zuzana|website)$/.test(href)) return href;
    return SITE_URL + localizedHref(href.slice(SITE_URL.length), locale);
  }
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  const index = href.search(/[?#]/);
  const base = index < 0 ? href : href.slice(0, index);
  const suffix = index < 0 ? '' : href.slice(index);
  const withoutLocale = base.replace(/^\/(?:cs|en|it)(?=\/|$)/, '');
  if (withoutLocale !== '' && withoutLocale !== '/' && !routeStarts.has(withoutLocale.split('/')[1])) return href;
  return languagePath(base, locale) + suffix;
}

type Translator = (text: string, locale: Locale) => string;

function data(value: unknown, locale: Locale, key = '', translator: Translator = translate): unknown {
  if (isValidElement(value)) return localizeTree(value, locale, translator);
  if (typeof value === 'string') {
    if (key === 'inLanguage') return locale;
    if (['href', 'here', 'url', '@id'].includes(key)) return localizedHref(value, locale);
    if (['id', 'type', 'source', 'src', 'webp', 'value', 'className', 'ratio', 'variant'].includes(key)) return value;
    return translator(value, locale);
  }
  if (Array.isArray(value)) return value.map(item => data(item, locale, key, translator));
  if (value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, data(v, locale, k, translator)]));
  }
  return value;
}

/** Translate presentation props only; field names, filter values, URLs and IDs stay stable. */
export function localizeTree(node: ReactNode, locale: Locale, translator: Translator = translate): ReactNode {
  if (locale === 'cs') return node;
  if (typeof node === 'string') return translator(node, locale);
  if (Array.isArray(node)) return node.map(child => localizeTree(child, locale, translator));
  if (!isValidElement(node)) return node;
  const element = node as ReactElement<Record<string, unknown>>;
  const props: Record<string, unknown> = {};
  const original = element.props;
  // Keep client testimonials in their original language, including their lang attribute.
  if (element.type === 'blockquote') return cloneElement(element, { lang: original.lang ?? 'cs' });
  for (const [key, value] of Object.entries(original)) {
    if (key === 'children') props[key] = localizeTree(value as ReactNode, locale, translator);
    else if (key === 'href' || key === 'here' || key === 'privacyHref' || key === 'consultHref') props[key] = typeof value === 'string' ? localizedHref(value, locale) : value;
    else if (textProps.has(key)) props[key] = data(value, locale, '', translator);
    else if (dataProps.has(key)) props[key] = data(value, locale, '', translator);
  }
  // Locale is passed through component boundaries, never added to native DOM nodes.
  if (typeof element.type !== 'string' && typeof element.type !== 'symbol' && element.type !== Link && element.type !== Image) props.locale = locale;
  return cloneElement(element, props);
}

/** Shared components keep their current public props; locale is supplied by their page. */
export function localized<P>(Component: (props: P) => ReactNode) {
  return function LocalizedComponent(props: NonNullable<P> & { locale?: Locale }) {
    return localizeTree(Component(props as P), props.locale ?? 'cs');
  };
}
