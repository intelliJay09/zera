import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Markdown, { type Components } from 'react-markdown';
import { BLOG_POSTS } from '@/data/blog-posts';
import BlogPostClient from './BlogPostClient';
import { SITE_URL } from '@/lib/site';

// Post bodies are Markdown, rendered here on the server so no parser ships to the browser.
const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase text-near-black tracking-brand-header mt-12 mb-6">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl sm:text-2xl font-bold font-display uppercase text-copper-600 tracking-brand-header mt-8 mb-4">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-base sm:text-lg text-near-black/80 leading-relaxed mb-6">{children}</p>
  ),
  strong: ({ children }) => <strong className="text-near-black font-bold">{children}</strong>,
  ul: ({ children }) => (
    <ul className="list-disc pl-6 mb-6 space-y-2 text-base sm:text-lg text-near-black/80 marker:text-copper-600">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 mb-6 space-y-2 text-base sm:text-lg text-near-black/80 marker:text-copper-600 marker:font-bold">{children}</ol>
  ),
  li: ({ children }) => <li className="pl-1 leading-relaxed [&>p]:mb-0">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-copper-500 pl-6 my-8 [&>p]:text-near-black">{children}</blockquote>
  ),
};

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Generate metadata for blog posts
 * Pulls H1 and excerpt for title/description automatically
 */
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The blog post you are looking for does not exist.',
    };
  }
  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    authors: [{ name: 'Zera' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: 'Zera',
      type: 'article',
      publishedTime: post.publishedDate,
      authors: ['Zera'],
      tags: post.keywords,
      // A page-level openGraph replaces the layout's, so the share image is set here too.
      images: [
        {
          url: '/images/og-zera-primary.png',
          width: 3000,
          height: 1575,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      site: '@zerahq',
      creator: '@zerahq',
      images: ['/images/og-zera-primary.png'],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

/**
 * Generate static params for all blog posts
 */
export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Get related posts (next 3 posts in the list)
  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const relatedPosts = BLOG_POSTS.filter((_, index) => index !== currentIndex).slice(0, 3);

  // BlogPosting JSON-LD Schema
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Organization',
      name: 'Zera',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Zera Dynamics Ltd.',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon-maskable-512.png`,
      },
    },
    datePublished: post.publishedDate,
    dateModified: post.publishedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.keywords.join(', '),
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
  };

  return (
    <>
      {/* BlogPosting Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingSchema),
        }}
      />

      <BlogPostClient
        post={post}
        relatedPosts={relatedPosts}
        body={<Markdown components={markdownComponents}>{post.content}</Markdown>}
      />
    </>
  );
}
