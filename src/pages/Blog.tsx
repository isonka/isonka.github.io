import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { blogPosts } from '../data/blogPosts';
import '../styles/Blog.css';

export const Blog: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Pilates & Fitness Blog | Expert Tips & Guides | PT Studio 7 Amsterdam"
        description="Read expert articles about Pilates, prenatal fitness, EMS training, and wellness from PT Studio 7 Amsterdam. Tips, guides, and insights from our certified trainers at Museumplein."
        keywords="pilates blog, prenatal pilates, fitness tips amsterdam, pilates exercises, reformer pilates guide, pregnancy fitness, EMS training tips, wellness blog amsterdam"
        canonical="https://www.ptstudio7amsterdam.nl/blog"
        ogTitle="Pilates & Fitness Blog | PT Studio 7 Amsterdam"
        ogDescription="Expert articles about Pilates, prenatal fitness, and wellness from PT Studio 7 Amsterdam's certified trainers."
      />

      <div className="blog-page">
        {/* Hero Section */}
        <section className="blog-hero">
          <div className="blog-hero-content">
            <h1>Pilates & Wellness Blog</h1>
            <p>Expert tips, guides, and insights from our certified trainers at PT Studio 7 Amsterdam</p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="blog-content">
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.id} className="blog-card">
                <Link to={`/blog/${post.slug}`} className="blog-card-link">
                  <div className="blog-card-image">
                    <img src={post.image} alt={post.title} loading="lazy" />
                  </div>
                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      <span className="blog-date">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span className="blog-author">By {post.author}</span>
                    </div>
                    <h2>{post.title}</h2>
                    <p className="blog-excerpt">{post.excerpt}</p>
                    <div className="blog-tags">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="blog-tag">{tag}</span>
                      ))}
                    </div>
                    <span className="read-more">Read More →</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* CTA Section */}
          <div className="blog-cta">
            <h2>Ready to Start Your Pilates Journey?</h2>
            <p>Join us at PT Studio 7 Amsterdam for expert-led Pilates classes in our beautiful Museumplein studio.</p>
            <Link to="/schedule" className="cta-button">Book Your Class</Link>
          </div>
        </section>
      </div>
    </>
  );
};

