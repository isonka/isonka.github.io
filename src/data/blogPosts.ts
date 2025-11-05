export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
  metaDescription: string;
  keywords: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'prenatal-pilates-supporting-body-through-every-trimester',
    title: 'Prenatal Pilates: Supporting the Body Through Every Trimester',
    excerpt: 'Discover how Reformer Pilates can safely support expecting mothers through each stage of pregnancy, from building foundation to preparing for birth.',
    content: `
      <p>Pregnancy is a unique journey, and each trimester brings different physical and emotional needs. At our studio, we use Reformer Pilates as a safe and effective way to support expecting mothers throughout this transformation.</p>

      <div style="text-align: center; margin: 40px 0;">
        <img src="/assets/images/pregnancy1.jpg" alt="Prenatal Pilates at PT Studio 7 Amsterdam" style="max-width: 100%; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);" />
      </div>

      <h2>First Trimester: Building a Strong Foundation</h2>
      <p>In the first trimester, we focus on building a strong foundation, introducing safe movement patterns, and gently activating the postural muscles. This early stage is crucial for establishing proper body mechanics that will support you throughout pregnancy.</p>

      <h2>Second Trimester: Maintaining Mobility and Strength</h2>
      <p>As we move into the second trimester, the goal is to maintain mobility, improve posture, and start preparing the body for birth by strengthening the pelvic floor and back muscles. Your body is changing rapidly, and Pilates helps you adapt with grace and strength.</p>

      <div style="text-align: center; margin: 40px 0;">
        <img src="/assets/images/pregnancy2.jpeg" alt="Prenatal Reformer Pilates exercises" style="max-width: 100%; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);" />
      </div>

      <h2>Third Trimester: Breathwork and Preparation</h2>
      <p>During the third trimester, we emphasize breathwork, relaxation, and gentle movements to support labor and reduce discomfort. This stage is about listening to your body and preparing for the incredible journey ahead.</p>

      <h2>Preventing Postpartum Issues</h2>
      <p>Regular prenatal Pilates can also help prevent postpartum issues such as urinary incontinence, which is common due to pelvic floor weakness. Strengthening these muscles during pregnancy greatly supports recovery after birth.</p>

      <h2>Empowerment Through Movement</h2>
      <p>Prenatal Pilates is not just about movement—it's about preparing your body for birth and beyond. With proper guidance, it's one of the most empowering practices an expecting mother can do for herself.</p>

      <p>At PT Studio 7 Amsterdam, our certified instructors provide personalized prenatal Pilates sessions in our intimate Museumplein studio. We offer both private and small group classes tailored to each trimester's unique needs.</p>
    `,
    author: 'PT Studio 7 Team',
    date: '2025-11-05',
    image: '/assets/images/pregnancy2.jpeg',
    tags: ['Prenatal', 'Pilates', 'Pregnancy', 'Women\'s Health', 'Pelvic Floor'],
    metaDescription: 'Learn how Prenatal Reformer Pilates at PT Studio 7 Amsterdam supports expecting mothers through every trimester with safe, effective exercises for pregnancy and postpartum recovery.',
    keywords: [
      'prenatal pilates amsterdam',
      'pregnancy pilates',
      'reformer pilates pregnancy',
      'prenatal exercise amsterdam',
      'pregnancy fitness museumplein',
      'pelvic floor exercises pregnancy',
      'prenatal pilates classes',
      'pregnancy workout amsterdam'
    ]
  }
];

// Helper function to get a blog post by slug
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

// Helper function to get recent posts
export const getRecentPosts = (limit: number = 3): BlogPost[] => {
  return blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

