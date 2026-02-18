'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { BLOG_POSTS } from '@/data/blog-posts';
import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo, Suspense } from 'react';
import BlogFilterBar from '@/components/sections/BlogFilterBar';

function BlogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Parse URL state
  const activeCategory = searchParams.get('category');

  // Filter logic with useMemo
  const filteredPosts = useMemo(() => {
    let filtered = BLOG_POSTS;

    // Category filter
    if (activeCategory) {
      filtered = filtered.filter(post => post.category === activeCategory);
    }

    return filtered;
  }, [activeCategory]);

  // Handler functions
  const handleCategoryChange = (category: string | null) => {
    if (category) {
      router.push(`/blog?category=${encodeURIComponent(category)}`, { scroll: false });
    } else {
      router.push('/blog', { scroll: false });
    }
  };

  const handleClearFilters = () => {
    router.push('/blog', { scroll: false });
  };
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative bg-cream pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        {/* Ambient copper glow */}
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-copper-500/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-copper-500/3 rounded-full blur-[150px] pointer-events-none" />

        {/* Decorative line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-copper-500/20 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-display uppercase text-near-black tracking-brand-header mb-6 leading-[1.1]">
              INTELLIGENCE BRIEFINGS
            </h1>
            <p className="text-lg sm:text-xl text-near-black/70 leading-relaxed max-w-3xl mx-auto">
              We do not write 5 Tips for Better SEO. That is what freelancers do. ZERA writes Intelligence Briefings. We challenge the status quo, expose the problem, and present the System as the only logical solution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="relative bg-cream py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative">
          {/* Filter Bar */}
          <BlogFilterBar
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            onClearFilters={handleClearFilters}
            totalPosts={BLOG_POSTS.length}
            filteredCount={filteredPosts.length}
          />

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <motion.div
              className="text-center py-16 sm:py-24"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold font-display uppercase text-near-black tracking-brand-header mb-4">
                NO BRIEFINGS FOUND
              </h3>
              <p className="text-base sm:text-lg text-near-black/70 mb-8 max-w-2xl mx-auto">
                No Intelligence Briefings match your current filters. Try a different combination or clear all filters.
              </p>
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center gap-2 text-sm font-medium tracking-brand-label uppercase text-copper-600 hover:text-copper-500 border border-copper-500/30 hover:border-copper-500/60 px-6 py-3 min-h-[44px] transition-all duration-300"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}

          {/* Blog Grid with re-animation on filter change */}
          {filteredPosts.length > 0 && (
            <motion.div
              key={activeCategory || 'all'}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="group relative bg-white border border-copper-500/20 hover:border-copper-500/40 transition-all duration-300 shadow-sm hover:shadow-md"
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="block p-8 lg:p-10">
                  {/* Category Badge */}
                  <div className="mb-6">
                    <span className="inline-block text-xs font-medium tracking-brand-label uppercase text-copper-600 border border-copper-500/30 px-3 py-1.5">
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-bold font-display uppercase text-near-black tracking-brand-header mb-4 group-hover:text-copper-600 transition-colors duration-300">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-base text-near-black/70 leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-near-black/50 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Read More Link */}
                  <div className="flex items-center gap-2 text-sm font-medium tracking-brand-label uppercase text-copper-600 group-hover:text-copper-500 group-hover:gap-3 transition-all duration-300">
                    <span>Read Intelligence Briefing</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.article>
            ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative bg-near-black py-16 sm:py-20 lg:py-24 overflow-hidden">
        {/* Ambient copper glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-copper-500/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display uppercase text-white tracking-brand-header mb-6">
              READY TO INSTALL THE SYSTEM?
            </h2>
            <p className="text-lg text-white/70 mb-10">
              Stop reading. Start implementing. Book a strategy session.
            </p>
            <Link
              href="/booking"
              data-gtm-event="cta_book_strategy"
              data-gtm-location="blog"
              className="group inline-flex items-center justify-center gap-3 bg-copper-500 hover:bg-copper-600 hover:scale-[1.02] text-white font-medium text-base tracking-brand-label uppercase px-8 py-3.5 min-h-[44px] transition-all duration-300 w-fit shadow-lg shadow-copper-500/10 hover:shadow-2xl hover:shadow-copper-500/25"
            >
              Book Strategy Session
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 group-hover:scale-110 transition-all duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-cream">
        <section className="relative bg-cream pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-display uppercase text-near-black tracking-brand-header mb-6 leading-[1.1]">
                INTELLIGENCE BRIEFINGS
              </h1>
            </div>
          </div>
        </section>
      </main>
    }>
      <BlogContent />
    </Suspense>
  );
}
