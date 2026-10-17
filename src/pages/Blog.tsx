import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { BASE_URL } from '../data/business';
import { blogPostsFor } from '../data/blog';
import { dateLocale } from '../i18n/locale';
import { useLocalizedPage } from '../i18n/useLocalizedPage';
import '../styles/Blog.css';

export const Blog= () => {
  const { t } = useTranslation('blog');
  const page = useLocalizedPage('/blog/');
  const { href } = page;
  const blogPosts = blogPostsFor(page.locale);

  return (
    <>
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description')}
        keywords={t('seo.keywords')}
        canonical={page.canonical}
        ogTitle={t('seo.ogTitle')}
        ogDescription={t('seo.ogDescription')}
        hreflangAlternates={page.hreflang}
        {...page.seoLocale}
      />
      <StructuredData
        type="ItemList"
        data={{
          itemList: {
            name: t('seo.listName'),
            itemListElement: blogPosts.map((post) => ({
              name: post.title,
              url: `${BASE_URL}${href(`/blog/${post.slug}/`)}`,
              image: `${BASE_URL}${post.image}`,
            })),
          },
        }}
      />

      <div className="blog-page">
        <header className="blog-hero">
          <p className="kicker">{t('kicker')}</p>
          <h1>{t('title')}</h1>
          <p className="blog-hero-line">{t('lead')}</p>
        </header>

        <section className="blog-content">
          <ul className="blog-list">
            {blogPosts.map((post) => (
              <li key={post.id} className="blog-item">
                <Link to={href(`/blog/${post.slug}/`)} className="blog-link">
                  <div className="blog-media">
                    <img
                      src={post.image}
                      alt={post.title}
                      width="640"
                      height="400"
                      loading="lazy"
                      decoding="async"
                      style={post.imagePosition ? { objectPosition: post.imagePosition } : undefined}
                    />
                  </div>
                  <p className="blog-meta">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString(dateLocale(page.locale), {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <span aria-hidden="true"> · </span>
                    <span>{post.author}</span>
                  </p>
                  {post.tags[0] ? (
                    <span className="blog-note">{post.tags[0]}</span>
                  ) : null}
                  <h2 className="blog-title">{post.title}</h2>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <span className="prose-link blog-more">{t('readMore')}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="cta-band blog-cta-band">
          <h2>{t('cta.title')}</h2>
          <p>{t('cta.text')}</p>
          <div className="blog-cta-actions">
            <Link to={href('/schedule/')} className="btn-gold">
              {t('cta.book')}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};
