import { t } from './translations.js';

export function getLang() {
  if (typeof navigator === 'undefined') return 'en';
  const lang = navigator.language || navigator.userLanguage || 'en';
  const code = lang.toLowerCase().slice(0, 2);
  return (code === 'nl') ? 'nl' : 'en';
}

export function getT() {
  return t[getLang()];
}
