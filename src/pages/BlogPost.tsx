import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { getBlogPostBySlug, getRecentPosts } from '../data/blog';
import { BASE_URL } from '../data/business';
import { dateLocale } from '../i18n/locale';
import { useLocalizedPage } from '../i18n/useLocalizedPage';
import { trackBlogPostView, trackBlogPostRead, trackPageView } from '../utils/gtmTracking';
import { NotFound } from './NotFound';
import '../styles/BlogPost.css';
import { blogSeoTitle } from '../data/blog';

export const BlogPost= () => {
  const { t } = useTranslation('blog');
  const { slug } = useParams<{ slug: string }>();
  const page = useLocalizedPage(`/blog/${slug}/`);
  const { href, locale } = page;
  const post = slug ? getBlogPostBySlug(slug, locale) : undefined;
  const recentPosts = getRecentPosts(3, locale).filter((p) => p.slug !== slug);
  const [readStartTime] = useState(Date.now());

  useEffect(() => {
    if (post) {
      trackPageView(page.path, post.title);
      trackBlogPostView(post.title, post.slug);
    }
  }, [post, page.path]);

  useEffect(() => {
    if (!post) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrolled + windowHeight >= documentHeight * 0.8) {
        const readTime = Math.floor((Date.now() - readStartTime) / 1000);
        trackBlogPostRead(post.title, readTime);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post, readStartTime]);

  if (!post) {
    return <NotFound />;
  }

  return (
    <>
      <SEOHead
        title={blogSeoTitle(post)}
        description={post.metaDescription}
        keywords={post.keywords.join(', ')}
        canonical={page.canonical}
        ogTitle={post.title}
        ogDescription={post.metaDescription}
        ogImage={`${BASE_URL}${post.image}`}
        hreflangAlternates={page.hreflang}
        {...page.seoLocale}
      />
      <StructuredData
        type="BlogPosting"
        data={{
          blogPosting: {
            headline: post.title,
            description: post.metaDescription,
            image: post.image,
            datePublished: post.date,
            dateModified: post.dateModified ?? post.date,
            authorName: post.author === 'PT7 Team' ? 'Elif Arzu Ogan' : post.author,
            keywords: post.keywords,
            url: page.canonical,
            inLanguage: locale,
            articleSection: post.tags[0] || 'Pilates',
          },
        }}
      />
      {post.faqs && post.faqs.length > 0 ? (
        <StructuredData type="FAQPage" data={{ faqs: post.faqs }} />
      ) : null}

      <Breadcrumbs
        items={[
          { name: t('post.breadcrumb'), path: href('/blog/') },
          { name: post.title, path: page.path },
        ]}
      />

      <div className="blog-post-page">
        <article className="blog-post">
          <header className="blog-post-header">
            <p className="kicker">{t('kicker')}</p>
            <p className="blog-post-meta">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString(dateLocale(locale), {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span aria-hidden="true"> · </span>
              <span>{t('post.byAuthor', { author: post.author })}</span>
            </p>
            <h1>{post.title}</h1>
            {post.tags.length > 0 ? (
              <p className="blog-post-topics">
                {post.tags.join(' · ')}
              </p>
            ) : null}
          </header>

          <div className="blog-post-image">
            <img
              src={post.image}
              alt={post.title}
              width="960"
              height="540"
              loading="eager"
              decoding="async"
              style={post.imagePosition ? { objectPosition: post.imagePosition } : undefined}
            />
          </div>

          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <aside className="blog-sidebar">
          {recentPosts.length > 0 ? (
            <div className="sidebar-section">
              <h2 className="sidebar-heading">{t('post.recent')}</h2>
              <ul className="recent-posts">
                {recentPosts.map((recentPost) => (
                  <li key={recentPost.id}>
                    <Link to={href(`/blog/${recentPost.slug}/`)} className="recent-post-link">
                      <div className="recent-post-image">
                        <img
                          src={recentPost.image}
                          alt=""
                          width="80"
                          height="80"
                          loading="lazy"
                          decoding="async"
                          style={recentPost.imagePosition ? { objectPosition: recentPost.imagePosition } : undefined}
                        />
                      </div>
                      <div className="recent-post-content">
                        <span className="recent-post-title">{recentPost.title}</span>
                        <time className="recent-post-date" dateTime={recentPost.date}>
                          {new Date(recentPost.date).toLocaleDateString(dateLocale(locale), {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="sidebar-section">
            <h2 className="sidebar-heading">{t('post.aboutTitle')}</h2>
            <p>{t('post.aboutText')}</p>
            <Link to={href('/pricing/')} className="prose-link">
              {t('post.packages')}
            </Link>
          </div>
        </aside>
      </div>

      <section className="cta-band blog-post-cta-band">
        <h2>{t('post.ctaTitle')}</h2>
        <p>{t('post.ctaText')}</p>
        <div className="blog-post-cta-actions">
          <Link to={href('/schedule/')} className="btn-gold">
            {t('cta.book')}
          </Link>
        </div>
      </section>
    </>
  );
};
