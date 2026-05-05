'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

export default function Home() {
  
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 overflow-hidden">
      
      {/* Navigation Bar */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-black text-gray-900 tracking-tight">
            Client<span className="text-blue-600">Manager</span>
          </span>
          <Link 
            href="/login" 
            className="text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm"
          >
            Sign In
          </Link>
        </div>
      </motion.nav>

      <main>
        {/* Hero Section */}
        <div className="relative isolate px-6 pt-14 lg:px-8 bg-gradient-to-b from-blue-50/50 to-white">
          
          {/* Animated Background Elements */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-400/10 blur-[100px] rounded-full pointer-events-none -z-10"
          />

          <div className="mx-auto max-w-3xl py-16 sm:py-24 text-center">
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.2 } } // Staggers appearance of children elements
              }}
            >
              <motion.div variants={fadeInUp} className="mb-8 flex justify-center">
                <span className="relative rounded-full px-4 py-1.5 text-xs font-semibold leading-6 text-blue-600 bg-blue-50 ring-1 ring-inset ring-blue-100">
                  The ultimate tool for freelancers & agencies.
                </span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl mb-6">
                Manage Your Clients <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  With Confidence
                </span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                A simple, elegant way to keep track of client projects, goals, and summaries. 
                Set up your custom professional template and keep everything beautifully organized in one place.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="mt-10 flex items-center justify-center gap-x-6">
                <Link href="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }} // Slight pop on hover
                    whileTap={{ scale: 0.95 }}   // Slight shrink when clicked
                    className="rounded-lg bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-colors"
                  >
                    Get Started for Free
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }} // Trigger when 100px of the component is visible
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
            className="grid grid-cols-1 gap-8 sm:grid-cols-3"
          >
            
            {/* Features */}
            <motion.div variants={fadeInUp} className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-colors duration-200">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 text-2xl shadow-inner">
                📝
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Templates</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Design your professional identity once. Generate identical, beautifully structured summary documents for every new client automatically.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-colors duration-200">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 text-2xl shadow-inner">
                🗂️
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Organized Dashboard</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                See all your active, paused, and completed projects at a glance. Never lose track of a client's status or goals again.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-colors duration-200">
              <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center mb-6 text-2xl shadow-inner">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Built on modern web technologies. Enjoy a secure, instantaneous workspace that gets out of your way so you can focus on work.
              </p>
            </motion.div>

          </motion.div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} ClientManager. Built with Next.js & Supabase.</p>
      </footer>
    </div>
  );
}