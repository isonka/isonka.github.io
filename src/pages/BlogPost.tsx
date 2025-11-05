import { useParams, Link, Navigate } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { getBlogPostBySlug, getRecentPosts } from '../data/blogPosts';
import '../styles/BlogPost.css';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;
  const recentPosts = getRecentPosts(3).filter(p => p.slug !== slug);

  // If post not found, redirect to blog page
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <SEOHead
        title={`${post.title} | PT Studio 7 Amsterdam Blog`}
        description={post.metaDescription}
        keywords={post.keywords.join(', ')}
        canonical={`https://www.ptstudio7amsterdam.nl/blog/${post.slug}`}
        ogTitle={post.title}
        ogDescription={post.metaDescription}
        ogImage={`https://www.ptstudio7amsterdam.nl${post.image}`}
      />

      <div className="blog-post-page">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/blog">Blog</Link>
          <span>/</span>
          <span>{post.title}</span>
        </nav>

        {/* Article */}
        <article className="blog-post">
          <header className="blog-post-header">
            <div className="blog-post-meta">
              <span className="blog-post-date">
                {new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <span className="blog-post-author">By {post.author}</span>
            </div>
            <h1>{post.title}</h1>
            <div className="blog-post-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="blog-tag">{tag}</span>
              ))}
            </div>
          </header>

          <div className="blog-post-image">
            <img src={post.image} alt={post.title} />
          </div>

          <div 
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Call to Action */}
          <div className="blog-post-cta">
            <h3>Experience It Yourself</h3>
            <p>Ready to try Pilates at PT Studio 7 Amsterdam? Book your class today at our beautiful Museumplein studio.</p>
            <Link to="/schedule" className="cta-button">Book Your Class</Link>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="blog-sidebar">
          {/* Recent Posts */}
          {recentPosts.length > 0 && (
            <div className="sidebar-section">
              <h3>Recent Posts</h3>
              <div className="recent-posts">
                {recentPosts.map((recentPost) => (
                  <Link 
                    key={recentPost.id} 
                    to={`/blog/${recentPost.slug}`}
                    className="recent-post-card"
                  >
                    <div className="recent-post-image">
                      <img src={recentPost.image} alt={recentPost.title} loading="lazy" />
                    </div>
                    <div className="recent-post-content">
                      <h4>{recentPost.title}</h4>
                      <span className="recent-post-date">
                        {new Date(recentPost.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* About Studio */}
          <div className="sidebar-section about-studio">
            <h3>About PT Studio 7</h3>
            <p>
              Located at Museumplein in Amsterdam, PT Studio 7 offers premium Pilates, 
              EMS training, and functional fitness with expert instructors in an intimate setting.
            </p>
            <Link to="/pricing" className="sidebar-link">View Our Packages →</Link>
          </div>
        </aside>
      </div>
    </>
  );
};

