import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { StructuredData } from './StructuredData';
import { withTrailingSlash } from '../utils/urls';
import { homePath } from '../i18n/locale';
import { useLocale } from '../i18n/useLocale';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const { t } = useTranslation('common');
  const home = homePath(useLocale());
  const baseUrl = 'https://www.pt7.nl';

  const breadcrumbData = [
    { name: t('breadcrumbs.home'), url: `${baseUrl}${home}` },
    ...items.map((item) => ({
      name: item.name,
      url: withTrailingSlash(`${baseUrl}${item.path}`),
    })),
  ];

  return (
    <>
      <StructuredData type="BreadcrumbList" data={{ breadcrumbs: breadcrumbData }} />
      <nav className="breadcrumbs" aria-label={t('breadcrumbs.aria')}>
        <ol>
          <li>
            <Link to={home}>{t('breadcrumbs.home')}</Link>
          </li>
          {items.map((item, index) => (
            <li key={item.path}>
              {index === items.length - 1 ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link to={withTrailingSlash(item.path)}>{item.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};
