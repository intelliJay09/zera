'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2 } from 'lucide-react';
import { BlogPost } from '@/data/blog-posts';

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  /** The post body, rendered from Markdown on the server. */
  body: React.ReactNode;
}

export default function BlogPostClient({ post, relatedPosts, body }: BlogPostClientProps) {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative bg-cream pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        {/* Ambient copper glow */}
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-copper-500/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-copper-500/3 rounded-full blur-[150px] pointer-events-none" />

        {/* Decorative line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-copper-500/20 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[900px] relative">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium tracking-brand-label uppercase text-copper-700 hover:text-copper-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Intelligence Briefings
            </Link>
          </motion.div>

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-block text-xs font-medium tracking-brand-label uppercase text-copper-700 border border-copper-500/30 px-3 py-1.5">
              {post.category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-display uppercase text-near-black tracking-brand-header mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {post.title}
          </motion.h1>

          {/* Meta */}
          <motion.div
            className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-near-black/60"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
            <button className="flex items-center gap-2 hover:text-copper-600 transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="relative bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[900px] relative">
          <motion.article
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-near-black/80 leading-relaxed">{body}</div>
          </motion.article>

          {/* CTA Box */}
          <motion.div
            className="mt-16 bg-cream border border-copper-500/20 p-8 lg:p-10"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold font-display uppercase text-near-black tracking-brand-header mb-4">
              {post.cta.text}
            </h3>
            <p className="text-base text-near-black/70 mb-6">
              Stop reading. Start implementing. Let us install the system.
            </p>
            <Link
              href={post.cta.link}
              className="group inline-flex items-center justify-center gap-3 bg-copper-600 hover:bg-copper-700 hover:scale-[1.02] text-white font-medium text-base tracking-brand-label uppercase px-8 py-3.5 min-h-[44px] transition-all duration-300 w-fit shadow-lg shadow-copper-500/10 hover:shadow-2xl hover:shadow-copper-500/25"
            >
              {post.cta.text}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 group-hover:scale-110 transition-all duration-300" />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* Related Posts */}
      <section className="relative bg-cream py-16 sm:py-20 lg:py-24 overflow-hidden border-t border-copper-500/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold font-display uppercase text-near-black tracking-brand-header mb-12 text-center"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            MORE INTELLIGENCE BRIEFINGS
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {relatedPosts.map((relatedPost, index) => (
              <motion.article
                key={relatedPost.id}
                className="group relative bg-white border border-copper-500/20 hover:border-copper-500/40 transition-all duration-300 shadow-sm hover:shadow-md"
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/blog/${relatedPost.slug}`} className="block p-8 lg:p-10">
                  <div className="mb-4">
                    <span className="inline-block text-xs font-medium tracking-brand-label uppercase text-copper-700 border border-copper-500/30 px-3 py-1.5">
                      {relatedPost.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-display uppercase text-near-black tracking-brand-header mb-4 group-hover:text-copper-600 transition-colors duration-300 line-clamp-2">
                    {relatedPost.title}
                  </h3>

                  <p className="text-sm text-near-black/70 leading-relaxed mb-4 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-medium tracking-brand-label uppercase text-copper-700 group-hover:text-copper-800 group-hover:gap-3 transition-all duration-300">
                    <span>Read Briefing</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
