import { useLocation } from 'react-router-dom';
import { localeFromPath, type Locale } from './locale';

export function useLocale(): Locale {
  const { pathname } = useLocation();
  return localeFromPath(pathname);
}
