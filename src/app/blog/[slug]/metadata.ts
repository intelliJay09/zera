import { Metadata } from 'next';
import { BLOG_POSTS } from '@/data/blog-posts';
import { SITE_URL } from '@/lib/site';

interface GenerateMetadataProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
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
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      site: '@zerahq',
      creator: '@zerahq',
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}
