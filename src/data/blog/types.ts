export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  dateModified?: string;
  image: string;
  imagePosition?: 'center' | 'top';
  tags: string[];
  metaDescription: string;
  keywords: string[];
  faqs?: { question: string; answer: string }[];
}
