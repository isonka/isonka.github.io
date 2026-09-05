import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { blogPosts } from '../data/blog';
import '../styles/Blog.css';

export const Blog= () => {
  return (
    <>
      <SEOHead
        title="Pilates & Fitness Blog | Expert Tips & Guides | PT Studio 7 Amsterdam"
        description="Read expert articles about Pilates, prenatal fitness, and wellness from PT Studio 7 Amsterdam. Tips, guides, and insights from our certified trainers at Museumplein."
        keywords="pilates blog, prenatal pilates, fitness tips amsterdam, pilates exercises, reformer pilates guide, pregnancy fitness, wellness blog amsterdam"
        canonical="https://www.pt7.nl/blog/"
        ogTitle="Pilates & Fitness Blog | PT Studio 7 Amsterdam"
        ogDescription="Expert articles about Pilates, prenatal fitness, and wellness from PT Studio 7 Amsterdam's certified trainers."
      />

      <div className="blog-page">
        <header className="blog-hero">
          <p className="kicker">Blog</p>
          <h1>Pilates &amp; Fitness Blog</h1>
          <p className="blog-hero-line">
            Tips, guides, and studio notes from our trainers at Museumplein.
          </p>
        </header>

        <section className="blog-content">
          <ul className="blog-list">
            {blogPosts.map((post) => (
              <li key={post.id} className="blog-item">
                <Link to={`/blog/${post.slug}/`} className="blog-link">
                  <div className="blog-media">
                    <img
                      src={post.image}
                      alt={post.title}
                      width="640"
                      height="400"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <p className="blog-meta">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
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
                  <span className="prose-link blog-more">Read more</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="cta-band blog-cta-band">
          <h2>Ready to start training?</h2>
          <p>
            Join us at PT Studio 7 Amsterdam for expert-led Pilates in our Museumplein studio.
          </p>
          <div className="blog-cta-actions">
            <Link to="/schedule/" className="btn-gold">
              Book Your Class
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};
