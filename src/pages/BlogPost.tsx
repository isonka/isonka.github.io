import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { StructuredData } from '../components/StructuredData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { getBlogPostBySlug, getRecentPosts } from '../data/blogPosts';
import { trackBlogPostView, trackBlogPostRead, trackPageView } from '../utils/gtmTracking';
import '../styles/BlogPost.css';

export const BlogPost= () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const recentPosts = getRecentPosts(3).filter((p) => p.slug !== slug);
  const [readStartTime] = useState(Date.now());

  useEffect(() => {
    if (post) {
      trackPageView(`/blog/${post.slug}`, post.title);
      trackBlogPostView(post.title, post.slug);
    }
  }, [post]);

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
    return <Navigate to="/blog/" replace />;
  }

  return (
    <>
      <SEOHead
        title={`${post.title} | PT Studio 7 Amsterdam Blog`}
        description={post.metaDescription}
        keywords={post.keywords.join(', ')}
        canonical={`https://www.pt7.nl/blog/${post.slug}/`}
        ogTitle={post.title}
        ogDescription={post.metaDescription}
        ogImage={`https://www.pt7.nl${post.image}`}
      />
      <StructuredData
        type="BlogPosting"
        data={{
          blogPosting: {
            headline: post.title,
            description: post.metaDescription,
            image: post.image,
            datePublished: post.date,
            dateModified: post.date,
            authorName: post.author === 'PT Studio 7 Team' ? 'Elif Arzu Ogan' : post.author,
            keywords: post.keywords,
            slug: post.slug,
            articleSection: post.tags[0] || 'Pilates',
          },
        }}
      />

      <Breadcrumbs
        items={[
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <div className="blog-post-page">
        <article className="blog-post">
          <header className="blog-post-header">
            <p className="kicker">Blog</p>
            <p className="blog-post-meta">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span aria-hidden="true"> · </span>
              <span>By {post.author}</span>
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
              <h2 className="sidebar-heading">Recent posts</h2>
              <ul className="recent-posts">
                {recentPosts.map((recentPost) => (
                  <li key={recentPost.id}>
                    <Link to={`/blog/${recentPost.slug}/`} className="recent-post-link">
                      <div className="recent-post-image">
                        <img
                          src={recentPost.image}
                          alt=""
                          width="80"
                          height="80"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="recent-post-content">
                        <span className="recent-post-title">{recentPost.title}</span>
                        <time className="recent-post-date" dateTime={recentPost.date}>
                          {new Date(recentPost.date).toLocaleDateString('en-US', {
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
            <h2 className="sidebar-heading">About PT Studio 7</h2>
            <p>
              Located at Museumplein in Amsterdam, PT Studio 7 offers premium Pilates, TRX, and
              functional fitness with expert instructors in an intimate setting.
            </p>
            <Link to="/pricing/" className="prose-link">
              View our packages
            </Link>
          </div>
        </aside>
      </div>

      <section className="cta-band blog-post-cta-band">
        <h2>Experience it yourself</h2>
        <p>
          Ready to try Pilates at PT Studio 7 Amsterdam? Book a class at our Museumplein studio.
        </p>
        <div className="blog-post-cta-actions">
          <Link to="/schedule/" className="btn-gold">
            Book Your Class
          </Link>
        </div>
      </section>
    </>
  );
};
