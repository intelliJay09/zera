'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutContent() {

  return (
    <main className="min-h-screen bg-cream-200">
      {/* Hero Section */}
      <section className="relative bg-cream-200 pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <motion.div
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black font-display uppercase text-near-black tracking-brand-header mb-8 leading-[1.1]">
              WE ARE NOT CREATIVES.
              <br />
              <span className="text-copper-500">WE ARE ARCHITECTS.</span>
            </h1>
            <p className="text-lg sm:text-xl text-near-black/70 leading-relaxed max-w-3xl mx-auto">
              Marketing is often treated as Art—subjective and chaotic. We treat it as Engineering—objective and measurable. We exist to replace hope with systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Zera Philosophy Section */}
      <section className="relative bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium tracking-brand-label uppercase text-copper-500 mb-4 text-center">Origin Code</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display uppercase text-near-black tracking-brand-header mb-8 text-center">
              THE ZERA PHILOSOPHY
            </h2>

            <div className="space-y-6 text-base sm:text-lg text-near-black/80 leading-relaxed">
              <p>
                The word <strong>&ldquo;Zera&rdquo;</strong> (Hebrew: זֶרַע) translates to <strong>&ldquo;Seed&rdquo;</strong> or <strong>&ldquo;Offspring.&rdquo;</strong>
              </p>
              <p>
                A seed contains the entire blueprint of the forest before it even breaks the soil. It is self-replicating, resilient, and designed for exponential scale.
              </p>
              <p className="font-semibold text-near-black text-xl">
                Most agencies build Billboards—flashy things that eventually rot. We build Seeds—systems that are engineered to grow, multiply, and generate yield long after we have left the building.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Remote Doctrine Section */}
      <section className="relative bg-near-black py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-medium tracking-brand-label uppercase text-copper-500 mb-4 text-center">Cloud-Native Operations</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display uppercase text-white tracking-brand-header mb-8 text-center">
              THE REMOTE DOCTRINE
            </h2>

            <div className="space-y-6 text-base sm:text-lg text-white/80 leading-relaxed mb-12">
              <p>
                We reject the vanity of the physical office. Marble lobbies do not generate leads. Glass conference rooms do not lower your CAC (Customer Acquisition Cost).
              </p>
              <p className="text-xl font-semibold text-white">
                <strong>ZERA</strong> is a decentralized sovereign entity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-lg font-bold text-copper-500 mb-3">No Overhead</h3>
                <p className="text-base text-white/70 leading-relaxed">
                  We do not pass rent costs on to our partners. We invest 100% of our capital into Engineering and Strategy.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-lg font-bold text-copper-500 mb-3">Global Velocity</h3>
                <p className="text-base text-white/70 leading-relaxed">
                  Our team operates across the cloud, allowing us to deploy systems faster than agencies stuck in rush hour traffic.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-lg font-bold text-copper-500 mb-3">Border Agnostic</h3>
                <p className="text-base text-white/70 leading-relaxed">
                  We are headquartered in <strong>Accra, Ghana</strong>, but our territory is the Internet.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Code of Conduct Section */}
      <section className="relative bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display uppercase text-near-black tracking-brand-header mb-12 text-center">
              OUR CODE OF CONDUCT
            </h2>

            <div className="space-y-10">
              <motion.div
                className="border-l-4 border-copper-500 pl-6 hover:pl-8 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ x: 10 }}
              >
                <h3 className="text-xl font-bold text-near-black mb-3">01. Revenue Over Vanity</h3>
                <p className="text-base text-near-black/70 leading-relaxed">
                  We do not report on Likes or Impressions. We report on <strong>Lead Volume</strong>, <strong>Conversion Rate</strong>, and <strong>Lifetime Value</strong>. If it doesn&apos;t print money, we don&apos;t build it.
                </p>
              </motion.div>

              <motion.div
                className="border-l-4 border-copper-500 pl-6 hover:pl-8 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ x: 10 }}
              >
                <h3 className="text-xl font-bold text-near-black mb-3">02. Systems Over Heroics</h3>
                <p className="text-base text-near-black/70 leading-relaxed">
                  A business that relies on a Rockstar employee is fragile. A business that relies on an <strong>Automated System</strong> is antifragile. We build the machine that replaces the hustle.
                </p>
              </motion.div>

              <motion.div
                className="border-l-4 border-copper-500 pl-6 hover:pl-8 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ x: 10 }}
              >
                <h3 className="text-xl font-bold text-near-black mb-3">03. Sovereignty Over Dependency</h3>
                <p className="text-base text-near-black/70 leading-relaxed">
                  Our goal is not to keep you on a retainer forever. Our goal is to install the system, train your team, and hand over the keys to your new empire.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Team Section */}
      <section className="relative bg-[#2a2a2a] py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display uppercase text-white tracking-brand-header mb-16 text-center">
              THE TEAM
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {/* Jacqueline */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="relative w-64 h-64 mx-auto mb-6 overflow-hidden">
                  <motion.div
                    className="relative w-full h-full"
                    initial={{ filter: 'blur(10px)', scale: 1.1 }}
                    whileInView={{ filter: 'blur(0px)', scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    <Image
                      src="/images/jacqueline-amoako.png"
                      alt="Jacqueline F. Amoako"
                      fill
                      className="object-cover grayscale"
                    />
                  </motion.div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Jacqueline F. Amoako</h3>
                <p className="text-sm font-medium tracking-brand-label uppercase text-copper-500 mb-2">Principal Architect</p>
                <p className="text-base text-white/70">Strategy & System Design</p>
              </motion.div>

              {/* Derrick */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative w-64 h-64 mx-auto mb-6 overflow-hidden">
                  <motion.div
                    className="relative w-full h-full"
                    initial={{ filter: 'blur(10px)', scale: 1.1 }}
                    whileInView={{ filter: 'blur(0px)', scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    <Image
                      src="/images/derrick-siawor.jpg"
                      alt="Derrick S.K Siawor"
                      fill
                      className="object-cover grayscale"
                    />
                  </motion.div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Derrick S.K Siawor</h3>
                <p className="text-sm font-medium tracking-brand-label uppercase text-copper-500 mb-2">Technical Operations</p>
                <p className="text-base text-white/70">Deployment & Automation</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative bg-near-black py-16 sm:py-20 lg:py-24 overflow-hidden">
        {/* Ambient copper glow */}
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-copper-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-copper-500/5 rounded-full blur-[150px] pointer-events-none" />

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
              The seed has been planted. It is time to water it.
            </p>
            <Link
              href="/booking"
              data-gtm-event="cta_book_strategy"
              data-gtm-location="about"
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
