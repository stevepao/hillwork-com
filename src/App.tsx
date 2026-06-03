/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Linkedin, 
  Youtube, 
  Calendar, 
  Phone, 
  MapPin, 
  Globe, 
  ArrowRight, 
  BookOpen, 
  Menu, 
  X, 
  ChevronRight,
  TrendingUp,
  FileText,
  UserCheck,
  Compass,
  CheckCircle,
  Clock,
  Send
} from 'lucide-react';

const portraitImage = new URL('./assets/images/portrait_stephen_pao.png', import.meta.url).href;
const techDnaImage = new URL('./assets/images/tech_dna_1780509815040.png', import.meta.url).href;
const slateSlabImage = new URL('./assets/images/slate_slab_1780509798621.png', import.meta.url).href;

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'core' | 'functional'>('all');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    website: ''
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError('');

    try {
      const response = await fetch('/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || 'Unable to send message right now.');
      }

      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setContactModalOpen(false);
        setFormData({ name: '', email: '', company: '', message: '', website: '' });
      }, 2500);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to send message right now.');
    } finally {
      setFormSubmitting(false);
    }
  };

  // Content Arrays for Practice Areas & Services
  const coreServices = [
    {
      id: 'board-adv',
      title: 'Board Advisory',
      description: 'I join boards of early-stage companies where founders need a voice with operating experience, not just pattern-matching from a distance.',
      category: 'core',
      highlight: 'Strategic Oversight'
    },
    {
      id: 'ceo-adv',
      title: 'CEO Advisory',
      description: 'Direct, private work with founders and CEOs on the decisions that don\'t fit neatly into a team meeting. Positioning, fundraising framing, org design, what to do when the roadmap stops making sense.',
      category: 'core',
      highlight: 'Direct Coaching'
    },
    {
      id: 'interim-exec',
      title: 'Interim Executive Assignments',
      description: 'When you need someone in the seat, not on retainer. I\'ve stepped into executive roles during transitions and know how to move fast without breaking the organization.',
      category: 'core',
      highlight: 'Hands-on Leadership'
    }
  ];

  const functionalServices = [
    {
      id: 'messaging-positioning',
      title: 'Messaging and Product Positioning',
      description: 'Most early-stage companies can\'t see their own product the way a buyer sees it. I can. I help close the gap between what you built and what the market hears.',
      category: 'functional',
      highlight: 'Brand Clarity'
    },
    {
      id: 'product-mgmt',
      title: 'Product Management',
      description: 'From roadmap prioritization to build-vs-buy decisions, I bring a PM\'s discipline and an executive\'s perspective on what actually ships and what matters once it does.',
      category: 'functional',
      highlight: 'Strategic Roadmaps'
    },
    {
      id: 'product-mktg',
      title: 'Product Marketing',
      description: 'The gap between a good product and a product people understand is almost always a marketing problem. I help close it.',
      category: 'functional',
      highlight: 'Go-to-Market'
    },
    {
      id: 'life-coaching',
      title: 'Life Coaching',
      description: 'For founders and executives who want a thought partner, not a cheerleader. I\'ll tell you what I actually think.',
      category: 'functional',
      highlight: 'Personal Evolution'
    }
  ];

  const filteredServices = activeTab === 'all' 
    ? [...coreServices, ...functionalServices] 
    : activeTab === 'core' 
      ? coreServices 
      : functionalServices;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans antialiased selection:bg-stone-900/10 selection:text-stone-950 overflow-x-hidden">
      
      {/* HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-stone-200/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center col-span-3">
              <a href="#" className="flex items-center gap-1 group">
                <span className="font-display text-2xl font-black text-stone-900 tracking-tight transition-transform duration-300 group-hover:scale-[1.01] uppercase">
                  Hillwork
                </span>
                <span className="h-2 w-2 rounded-full bg-sky-500 inline-block translate-y-1.5 transition-all duration-500 group-hover:scale-125"></span>
              </a>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center sm:gap-6 md:gap-8 lg:gap-12">
              <a 
                href="#expertise" 
                className="font-display font-bold text-xs tracking-widest text-stone-500 hover:text-stone-900 uppercase transition-colors"
              >
                Expertise
              </a>
              <a 
                href="#services" 
                className="font-display font-bold text-xs tracking-widest text-stone-500 hover:text-stone-900 uppercase transition-colors"
              >
                Services
              </a>
              <a 
                href="#contact" 
                className="font-display font-bold text-xs tracking-widest text-stone-500 hover:text-stone-900 uppercase transition-colors"
              >
                Contact
              </a>
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://calendly.com/spao/60min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-stone-900 text-white font-bold text-xs tracking-widest uppercase py-3 px-6 rounded-full transition-all duration-300 hover:bg-black hover:shadow-sm"
              >
                Book appointment
              </a>
            </div>

            {/* Mobile menu trigger */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-200/50 transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-stone-200 bg-white"
            >
              <div className="px-4 pt-4 pb-6 space-y-4 shadow-inner">
                <a
                  href="#expertise"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl text-base font-bold text-stone-700 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                >
                  Expertise
                </a>
                <a
                  href="#services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl text-base font-bold text-stone-700 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                >
                  Services
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl text-base font-bold text-stone-700 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                >
                  Contact
                </a>
                <div className="pt-4 border-t border-stone-100">
                  <a
                    href="https://calendly.com/spao/60min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center bg-stone-900 text-white font-bold text-sm tracking-widest uppercase py-3 px-4 rounded-xl transition-all duration-300 hover:bg-black"
                  >
                    Book an Appointment
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION - GORGEOUS BENTO GRID */}
      <section className="relative py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* LARGE HERO CARD - 7 Columns of Bento Cell */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-stone-200 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-md min-h-[440px]">
              {/* availability tag indicator */}
              <div className="flex justify-between items-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 rounded-full text-stone-600 text-[10px] tracking-widest font-mono uppercase font-bold border border-stone-200/40">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  Board Advisor
                </div>
                {/* Visual Icon overlay */}
                <div className="w-10 h-10 bg-stone-50 rounded-full flex items-center justify-center border border-stone-200 shadow-sm">
                  <UserCheck size={18} className="text-stone-500" />
                </div>
              </div>

              {/* Main Content */}
              <div className="my-8 lg:my-10">
                <span className="text-[10px] uppercase tracking-[0.2em] font-mono font-extrabold text-stone-400 block mb-2">ADVISOR PROFILE</span>
                <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-5xl text-stone-900 tracking-tight leading-[1.15]">
                  I've been in the room. Now I help you navigate it.
                </h1>

                <p className="mt-5 text-base sm:text-lg text-stone-500 font-normal leading-relaxed max-w-xl">
                  Board advisor, interim executive, and early-stage investor. I work directly with founders and CEOs who need someone who has already made the mistakes.
                </p>
              </div>

              {/* Actions Footer row within Bento block */}
              <div className="flex flex-wrap gap-4 pt-5 border-t border-stone-100">
                <a
                  href="#services"
                  className="inline-flex items-center justify-center bg-stone-900 text-white font-semibold text-xs tracking-widest uppercase py-3.5 px-6 rounded-full transition-all duration-300 hover:bg-black hover:shadow-sm"
                >
                  Explore Practice Areas
                </a>
                <button
                  onClick={() => {
                    setFormError('');
                    setContactModalOpen(true);
                  }}
                  className="inline-flex items-center justify-center border border-stone-350 text-stone-800 font-semibold text-xs tracking-widest uppercase bg-stone-55 hover:bg-stone-100 transition-all duration-300 py-3.5 px-6 rounded-full"
                >
                  Direct Message
                </button>
              </div>
            </div>

            {/* PORTRAIT IMAGE CARD - 5 Columns of Bento Cell */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-4 shadow-sm border border-stone-200 flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-md min-h-[440px]">
              <div className="relative w-full h-full bg-stone-100 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center group">
                <img
                  src={portraitImage}
                  alt="Stephen Pao Portrait"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.025]"
                />
                
                {/* Blueprint details */}
                <div className="absolute right-4 bottom-4 z-20 bg-stone-900/90 backdrop-blur-md text-white py-2 px-3 rounded-xl border border-stone-800 flex items-center gap-2">
                  <span className="font-mono text-[9px] tracking-widest uppercase text-stone-200">PORTLAND, OR</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* EXPERTISE SECTION - MODULAR HIGHLIGHTS */}
      <section id="expertise" className="relative py-12 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Highlight Cards Grid - Pill style Bento Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm text-center lg:text-left flex items-center justify-center lg:justify-start gap-3 transition-colors duration-300 hover:bg-stone-50/50">
              <span className="h-2 w-2 bg-sky-500 rounded-full shrink-0"></span>
              <span className="font-display font-extrabold text-xs tracking-wider uppercase text-stone-800">
                What I've Seen
              </span>
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm text-center lg:text-left flex items-center justify-center lg:justify-start gap-3 transition-colors duration-300 hover:bg-stone-50/50">
              <span className="h-2 w-2 bg-blue-500 rounded-full shrink-0"></span>
              <span className="font-display font-extrabold text-xs tracking-wider uppercase text-stone-800">
                Strategic Growth
              </span>
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm text-center lg:text-left flex items-center justify-center lg:justify-start gap-3 transition-colors duration-300 hover:bg-stone-50/50">
              <span className="h-2 w-2 bg-amber-500 rounded-full shrink-0"></span>
              <span className="font-display font-extrabold text-xs tracking-wider uppercase text-stone-800">
                Continuous Learning
              </span>
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm text-center lg:text-left flex items-center justify-center lg:justify-start gap-3 transition-colors duration-300 hover:bg-stone-50/50">
              <span className="h-2 w-2 bg-indigo-500 rounded-full shrink-0"></span>
              <span className="font-display font-extrabold text-xs tracking-wider uppercase text-stone-800">
                Broad Mentorship
              </span>
            </div>
          </div>

          {/* Large split Row for Copy and Imagery */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* COPY CARD - 7 columns */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-sm flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-[0.2em] font-mono font-bold text-stone-400 mb-3 block">CORE COMPETENCY</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight leading-tight">
                Pattern recognition, not theory.
              </h2>

              <div className="mt-6 space-y-5 text-sm sm:text-base text-stone-500 font-normal leading-relaxed">
                <p>
                  I've been a product manager at Oracle when the database market was being defined, and a product executive at Barracuda Networks and Latitude Communications through their public offerings on the NYSE and NASDAQ. I'm a technology person. I understand how products get built, not just how they get sold.
                </p>
                <p>
                  The problems I see most often aren't new. Founders who are right about their product but wrong about how to explain it. CEOs who need someone in the room who isn't on the payroll. Teams that are moving fast but on a shaky foundation. I've been on both sides of those problems.
                </p>
                <p>
                  I work directly. No associates, no firm. If you're talking to me, I'm the one doing the work.
                </p>
              </div>
            </div>

            {/* ART WORKSPACE CARD - 5 columns */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-4 border border-stone-200 shadow-sm flex flex-col justify-center min-h-[340px]">
              <div className="relative w-full h-full bg-stone-100 rounded-2xl overflow-hidden shadow-inner min-h-[280px]">
                <img
                  src={techDnaImage}
                  alt="Tech DNA"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-stone-900/10 mix-blend-multiply"></div>
                
                {/* Tech overlay label */}
                <div className="absolute left-4 top-4 z-15 bg-white/95 backdrop-blur-sm shadow-sm py-1.5 px-3 rounded-lg border border-stone-200">
                  <span className="font-mono text-[9px] tracking-wider text-stone-700 font-bold uppercase">Oracle · Barracuda · Latitude</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WRITING, BLOG & DIRECT LINKS SECTION */}
      <section className="py-6 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* PERSONAL BLOG CELL (Indigo tinted Bento Box) */}
            <div className="lg:col-span-7 bg-indigo-50/80 rounded-3xl p-8 sm:p-10 border border-indigo-100 flex flex-col justify-between group hover:bg-indigo-50 transition-colors duration-300 min-h-[320px]">
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-indigo-900 text-xs font-bold uppercase tracking-widest bg-indigo-100/60 px-3 py-1 rounded-full">Writing</span>
                  <BookOpen size={20} className="text-indigo-600 group-hover:rotate-6 transition-transform duration-300" />
                </div>
                <div className="mt-8">
                  <h2 className="text-3xl font-bold text-indigo-950 mb-3 font-display">Visit Personal Blog</h2>
                  <p className="text-indigo-700/80 max-w-lg text-sm sm:text-base leading-relaxed">
                    Explore my personal collection of writings, tech articles, executive advice, and Portland community stories.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between items-center pt-6 border-t border-indigo-100/50">
                <span className="text-indigo-800 italic uppercase text-xs tracking-wider font-bold">retiredpdx.com</span>
                <a
                  href="https://www.retiredpdx.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-indigo-950 text-white font-semibold text-xs tracking-widest uppercase py-2.5 px-5 rounded-full transition-all hover:bg-black"
                >
                  Read Blog <ArrowRight size={12} />
                </a>
              </div>
            </div>

            {/* PUBLICATIONS / FEATURED ARTICLES CARD */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-stone-200 shadow-sm flex flex-col justify-between min-h-[320px]">
              <div>
                <span className="text-stone-400 text-[10px] font-bold uppercase tracking-widest bg-stone-100 px-3 py-1 rounded-full">Featured In</span>
                <p className="mt-6 text-stone-500 text-sm sm:text-base leading-relaxed">
                  My insights and contributions to technology leadership and executive boards are regularly featured on key industry platforms.
                </p>
              </div>

              <div className="space-y-4 mt-6">
                <a 
                  href="https://www.infoworld.com/profile/stephen-pao/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between group p-3.5 bg-stone-50 hover:bg-stone-100 rounded-xl border border-stone-200/40 transition-colors"
                >
                  <span className="font-extrabold text-stone-900 group-hover:text-stone-700">InfoWorld</span>
                  <ChevronRight size={16} className="text-stone-400 group-hover:translate-x-1 transition-all" />
                </a>
                <a 
                  href="https://www.forbes.com/councils/forbestechcouncil/people/stevepao/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between group p-3.5 bg-stone-50 hover:bg-stone-100 rounded-xl border border-stone-200/40 transition-colors"
                >
                  <span className="font-extrabold text-stone-900 group-hover:text-stone-700">Forbes Tech Council</span>
                  <ChevronRight size={16} className="text-stone-400 group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            </div>

          </div>

          {/* Sub-bento blocks for Trajectory Focus */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                <Compass size={18} className="text-emerald-600" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-stone-900 text-lg">By Referral</h3>
                <p className="mt-2 text-stone-500 text-sm leading-relaxed">
                  I work with a small number of companies at a time, by referral. If someone sent you here, that's why.
                </p>
              </div>
            </div>

            <div className="bg-white border border-stone-200 rounded-3xl p-8 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                <TrendingUp size={18} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-stone-900 text-lg">Two IPOs</h3>
                <p className="mt-2 text-stone-500 text-sm leading-relaxed">
                  Barracuda went public on the NYSE and Latitude on the NASDAQ while I was an executive at each. I know what the scaling phase feels like from inside the building.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* TEXTURED CENTER PIECE BANNER (Charcoal Slate finish) */}
      <section className="py-6 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-stone-950 text-white rounded-3xl p-10 md:p-16 text-center overflow-hidden border border-stone-900 shadow-md group">
            <img
              src={slateSlabImage}
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-[4000ms] pointer-events-none"
            />
            {/* Subtle radial light mask */}
            <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(28,25,23,0.3),rgba(12,10,9,0.95)] pointer-events-none"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="text-[10px] uppercase tracking-[0.25em] font-mono font-bold text-sky-400 mb-4 block">ADVISORY CENTER</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[42px] tracking-tight leading-[1.25] text-stone-100">
                Navigating the complex challenges of{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300 font-extrabold">
                  achieving product-market fit
                </span>{' '}
                and scaling growth.
              </h2>
              <div className="h-1 w-12 bg-sky-500 mx-auto mt-8 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES & PRACTICE AREAS */}
      <section id="services" className="bg-stone-50 py-12 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Block */}
          <div className="max-w-3xl mb-10">
            <span className="font-display font-bold text-xs tracking-widest text-[#0284c7] uppercase">EXPERTISE SPECTRUM</span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl mt-2 text-stone-900 tracking-tight">
              Practice Areas
            </h2>
            <p className="mt-3 text-stone-500 text-sm sm:text-base leading-relaxed">
              Direct engagements only. Every service below is something I do personally, drawn from roles I've actually held.
            </p>
          </div>

          {/* Core/Functional Category Selector Pills - Matches Bento Stone aesthetic perfectly */}
          <div className="inline-flex p-1 bg-stone-200/55 rounded-full border border-stone-200/40 mb-10 overflow-x-auto whitespace-nowrap">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                activeTab === 'all' 
                  ? 'bg-stone-900 text-white shadow-sm' 
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              All Services ({coreServices.length + functionalServices.length})
            </button>
            <button
              onClick={() => setActiveTab('core')}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                activeTab === 'core' 
                  ? 'bg-stone-900 text-white shadow-sm' 
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Core Advisory ({coreServices.length})
            </button>
            <button
              onClick={() => setActiveTab('functional')}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                activeTab === 'functional' 
                  ? 'bg-stone-900 text-white shadow-sm' 
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              Capabilities ({functionalServices.length})
            </button>
          </div>

          {/* Cards Portfolio Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  key={service.id}
                  className="bg-white border border-stone-200 rounded-3xl p-8 flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 relative group min-h-[260px]"
                >
                  <div>
                    {/* Visual Tag */}
                    <div className="flex justify-between items-start mb-6">
                      <span className="font-mono text-[9px] bg-stone-100 text-stone-850 px-3 py-1 uppercase tracking-widest font-bold rounded-full border border-stone-200/40">
                        {service.category === 'core' ? 'Advisory' : 'Capability'}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-stone-300 group-hover:bg-indigo-500 transition-colors duration-300"></span>
                    </div>

                    {/* Headline */}
                    <h3 className="font-display font-semibold text-xl sm:text-2xl text-stone-900 tracking-tight group-hover:text-indigo-900 transition-colors">
                      {service.title}
                    </h3>

                    {/* Paragraph */}
                    <p className="mt-3 text-stone-500 text-sm sm:text-base leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Footer area inside Card */}
                  <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-stone-400 font-display uppercase tracking-widest">
                      {service.highlight}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-stone-50 flex items-center justify-center border border-stone-200 group-hover:bg-indigo-50 group-hover:border-indigo-200 transition-all">
                      <ChevronRight size={14} className="text-stone-400 group-hover:text-indigo-800 transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Specialized Inline Scheduler Callout */}
          <div className="mt-12 bg-stone-900 text-white rounded-3xl p-8 md:p-12 border border-stone-850 shadow-md flex flex-col lg:flex-row items-center justify-between gap-8 group hover:bg-black transition-colors duration-400 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-radial-at-tr from-white/10 to-transparent pointer-events-none"></div>
            
            <div className="max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 rounded-full text-stone-300 text-[10px] uppercase tracking-widest font-mono font-bold mb-4">
                <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-ping shrink-0"></span>
                <Clock size={12} className="inline" /> AVAILABLE FOR ADVISORY
              </div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-stone-100">
                If someone sent you here, reach out.
              </h3>
              <p className="mt-2 text-stone-450 text-sm sm:text-base">
                A 60-minute conversation costs nothing and usually makes it clear whether working together makes sense.
              </p>
            </div>
            
            <div className="flex-shrink-0 w-full lg:w-auto relative z-10">
              <a
                href="https://calendly.com/spao/60min"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full lg:w-auto inline-flex items-center justify-center gap-3 bg-white text-stone-900 font-bold text-xs tracking-widest uppercase py-4 px-8 rounded-full transition-all duration-300 hover:bg-stone-100 hover:-translate-y-0.5"
              >
                Book appointment <ArrowRight size={14} className="text-indigo-600 animate-pulse" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* CORE FOOTER SECTION - MODULAR BENTO CARDS */}
      <footer id="contact" className="bg-stone-150 text-stone-900 py-16 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* PITCH CARD: 4 columns */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-8 border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <a href="#" className="flex items-center gap-1">
                  <span className="font-display text-2xl font-black tracking-tight text-stone-900 uppercase">
                    Hillwork
                  </span>
                  <span className="h-2.5 w-2.5 rounded-full bg-sky-500 inline-block translate-y-[2px]"></span>
                </a>
                <p className="mt-6 text-sm text-stone-500 font-normal leading-relaxed">
                  The independent practice of Stephen Pao. All work is direct and personal.
                </p>
              </div>

              <div className="mt-8 border-t border-stone-100 pt-4">
                <span className="font-mono text-[9px] tracking-widest text-stone-400 uppercase font-bold">
                  HILLWORK, LLC
                </span>
              </div>
            </div>

            {/* CORE CONTACT DETAILS CARD: 4 columns */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-8 border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-stone-400 text-xs font-bold uppercase tracking-widest font-mono block mb-5">Location & Connection</span>
                
                <div className="space-y-4 text-sm text-stone-600">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      5441 S Macadam Ave Ste R<br />
                      Portland, OR 97239, US
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-indigo-600 shrink-0" />
                    <p>Phone: (503) 278-5675</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Globe size={16} className="text-indigo-600 shrink-0" />
                    <p>Website: hillwork.us</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-stone-100 pt-4">
                <span className="font-mono text-[9px] tracking-widest text-stone-400 uppercase font-bold">
                  Direct Assignments Only
                </span>
              </div>
            </div>

            {/* SOCIAL MEDIA / BLOG LINKS GRID: 4 columns */}
            <div className="lg:col-span-4 bg-stone-200/40 rounded-3xl p-6 border border-stone-200 flex flex-col justify-between">
              <div>
                <span className="text-stone-400 text-xs font-bold uppercase tracking-widest font-mono block mb-4 px-2">Writing & Channels</span>
                <p className="text-xs text-stone-500 mb-6 px-2 leading-relaxed">
                  Writing, talks, and community — where I think out loud about technology, product, and life in Portland.
                </p>
              </div>

              {/* 4-Column Social sub-grid matching design mock nicely! */}
              <div className="grid grid-cols-2 xs:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3">
                <a 
                  href="https://www.linkedin.com/in/stevep" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white rounded-2xl p-3.5 flex flex-col items-center justify-center border border-stone-200 hover:shadow-md transition-all group"
                  title="LinkedIn profile"
                >
                  <Linkedin size={18} className="text-stone-800 group-hover:text-indigo-600 transition-colors" />
                  <span className="text-[9px] text-stone-400 uppercase tracking-widest mt-1.5 font-bold">LinkedIn</span>
                </a>
                <a 
                  href="https://www.retiredpdx.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white rounded-2xl p-3.5 flex flex-col items-center justify-center border border-stone-200 hover:shadow-md transition-all group"
                  title="Substack publication"
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    className="h-[18px] w-[18px] text-stone-800 group-hover:text-[#FF6719] fill-current transition-colors" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 3h16v2.24H4zm0 4.14h16v2.24H4zm0 4.14h16V21l-8-5-8 5z"/>
                  </svg>
                  <span className="text-[9px] text-stone-400 uppercase tracking-widest mt-1.5 font-bold">Substack</span>
                </a>
                <a 
                  href="https://www.youtube.com/@retiredpdx" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white rounded-2xl p-3.5 flex flex-col items-center justify-center border border-stone-200 hover:shadow-md transition-all group"
                  title="YouTube profile"
                >
                  <Youtube size={18} className="text-stone-800 group-hover:text-red-500 transition-colors" />
                  <span className="text-[9px] text-stone-400 uppercase tracking-widest mt-1.5 font-bold">YouTube</span>
                </a>
                <a 
                  href="https://www.instagram.com/stevepao7" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white rounded-2xl p-3.5 flex flex-col items-center justify-center border border-stone-200 hover:shadow-md transition-all group"
                  title="Instagram profile"
                >
                  <Instagram size={18} className="text-stone-800 group-hover:text-amber-500 transition-colors" />
                  <span className="text-[9px] text-stone-400 uppercase tracking-widest mt-1.5 font-bold">Instagram</span>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom alignment line */}
          <div className="border-t border-stone-205 mt-12 pt-6 text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em] flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <div>© {new Date().getFullYear()} Stephen Pao. All rights reserved.</div>
            <div>Designed for Strategy & Clarity</div>
          </div>
        </div>
      </footer>

      {/* MODAL: STYLISH DIRECT CONTACT MESSAGE */}
      <AnimatePresence>
        {contactModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white max-w-md w-full p-8 shadow-2xl relative border border-stone-200 rounded-3xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setContactModalOpen(false)}
                className="absolute right-5 top-5 text-stone-400 hover:text-stone-600 p-1.5 rounded-full hover:bg-stone-100 transition-colors"
                title="Close modal"
              >
                <X size={20} />
              </button>

              <div className="mb-6">
                <span className="font-mono text-[9px] bg-stone-100 text-stone-850 px-2.5 py-1 uppercase tracking-widest font-bold rounded-md border border-stone-200/40">
                  DIRECT ENGAGEMENT
                </span>
                <h3 className="font-display font-extrabold text-2xl text-stone-900 mt-3">
                  Tell me what you're working on.
                </h3>
                <p className="text-sm text-stone-500 mt-1">
                  I read everything and respond personally.
                </p>
              </div>

              {formSubmitted ? (
                <div className="py-12 text-center animate-fade-in">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 mb-4 border border-emerald-100">
                    <CheckCircle size={28} />
                  </div>
                  <h4 className="font-display font-bold text-lg text-stone-900">Inquiry Received</h4>
                  <p className="text-sm text-stone-500 mt-1 max-w-xs mx-auto">
                    Got it. Stephen will read this and reach out personally.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-450 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Stephen Pao"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-stone-900 focus:bg-white transition-all rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-450 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. stephen@example.com"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-stone-900 focus:bg-white transition-all rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-450 mb-1">
                      Company / Startup
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Hillwork, LLC"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-stone-900 focus:bg-white transition-all rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-450 mb-1">
                      Brief Message
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="What are you working on?"
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-stone-900 focus:bg-white transition-all rounded-xl resize-none"
                    />
                  </div>

                  <div className="hidden" aria-hidden="true">
                    <label>
                      Website
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      />
                    </label>
                  </div>

                  {formError && (
                    <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                      {formError}
                    </p>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 bg-stone-900 text-white font-bold text-xs tracking-widest uppercase py-4 rounded-full transition-all hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {formSubmitting ? 'Sending...' : <>Send Message <Send size={12} className="text-sky-400" /></>}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
