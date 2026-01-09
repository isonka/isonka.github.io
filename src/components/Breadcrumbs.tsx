import { Link } from 'react-router-dom';
import { StructuredData } from './StructuredData';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const baseUrl = 'https://www.ptstudio7amsterdam.nl';
  
  const breadcrumbData = [
    { name: 'Home', url: baseUrl },
    ...items.map((item) => ({
      name: item.name,
      url: `${baseUrl}${item.path}`,
    })),
  ];

  return (
    <>
      <StructuredData type="BreadcrumbList" data={{ breadcrumbs: breadcrumbData }} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li>
            <Link to="/">Home</Link>
          </li>
          {items.map((item, index) => (
            <li key={item.path}>
              {index === items.length - 1 ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link to={item.path}>{item.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

