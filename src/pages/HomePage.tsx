import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { StatsSection } from '../components/StatsSection';
import { CertificationsBadges } from '../components/CertificationsBadges';
import { GCResourcesSection } from '../components/GCResourcesSection';
import { GCPainPoints } from '../components/GCPainPoints';
import { ServiceCard } from '../components/ServiceCard';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { ProjectCard } from '../components/ProjectCard';
import { ServiceAreaMap } from '../components/ServiceAreaMap';
import { ClientLogos } from '../components/ClientLogos';
import { PromiseSection } from '../components/PromiseSection';
import { FloatingCTA } from '../components/FloatingCTA';
import { TestimonialCarousel } from '../components/TestimonialCarousel';
import { SectionHeader } from '../components/SectionHeader';
import {
  Building2,
  Maximize,
  Sun,
  Shield,
  LayoutGrid,
  DoorOpen,
  ArrowRight,
  Download,
  CheckCircle2,
  Clock,
  DollarSign,
  ClipboardCheck } from
'lucide-react';

const PARALLAX_FACTOR = 0.25;
const HERO_BADGE_FADE_PX = 400;
const HERO_TITLE_FADE_PX = 500;
const HERO_TAGLINE_FADE_PX = 450;
const HERO_BODY_FADE_PX = 420;

const services = [
{
  title: 'Storefronts',
  description:
  'Custom aluminum storefronts and entrances for retail and office applications.',
  icon: <LayoutGrid className="h-6 w-6" />
},
{
  title: 'Window Walls',
  description:
  'Floor-to-ceiling window wall systems that maximize views and natural light.',
  icon: <Maximize className="h-6 w-6" />
},
{
  title: 'Curtain Walls',
  description:
  'High-performance stick-built and unitized curtain wall systems for commercial buildings.',
  icon: <Building2 className="h-6 w-6" />
},
{
  title: 'Skylights',
  description:
  'Overhead glazing solutions that maximize natural light while maintaining efficiency.',
  icon: <Sun className="h-6 w-6" />
},
{
  title: 'Glass Railings',
  description:
  'Frameless and post-mounted glass railing systems for balconies and stairs.',
  icon: <Maximize className="h-6 w-6" />
},
{
  title: 'Fire-Rated Glazing',
  description:
  'Safety-compliant fire-rated windows and doors meeting all code requirements.',
  icon: <Shield className="h-6 w-6" />
},
{
  title: 'Shower Enclosures',
  description:
  'Custom frameless and semi-frameless shower enclosures for commercial and residential projects.',
  icon: <DoorOpen className="h-6 w-6" />
},
{
  title: 'Mirrors',
  description:
  'Custom-cut mirrors for commercial, retail, and residential applications.',
  icon: <Maximize className="h-6 w-6" />
}];

const featuredProjects = [
{
  title: 'Cabrillo Business Park',
  location: 'Goleta, CA',
  client: 'Gluck Building Company',
  value: '$1.27M',
  scope: 'Exterior Curtain Walls & Doors, Interior Storefront & Doors (4 Buildings)',
  imageUrl:
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
},
{
  title: 'Cloud Nine Hangar & Offices',
  location: 'Camarillo, CA',
  client: 'T.Viole Construction',
  value: '$1.13M',
  scope: 'Curtain Walls, Polycarbonate Windows, Storefront, Glass Partitions & Sliders',
  imageUrl:
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
},
{
  title: 'Citrus Commons',
  location: 'Sherman Oaks, CA',
  client: 'IMT Residential',
  value: '$1.89M',
  scope: 'Exterior Storefront, Aluminum Sliders, ACM Panels, Interior Partitions & Doors',
  imageUrl:
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
}];

const heroStats = [
{
  icon: <Clock className="h-5 w-5" />,
  value: '13+',
  label: 'Years'
},
{
  icon: <DollarSign className="h-5 w-5" />,
  value: '$1M',
  label: 'Bonding'
},
{
  icon: <Shield className="h-5 w-5" />,
  value: '0.87',
  label: 'EMR'
},
{
  icon: <Building2 className="h-5 w-5" />,
  value: '200+',
  label: 'Projects'
},
{
  icon: <ClipboardCheck className="h-5 w-5" />,
  value: '90%',
  label: 'Repeat'
}];

export function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Compelling GC-Focused Copy */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Image - Fixed position for clean parallax */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              transform: `translate3d(0, ${scrollY * PARALLAX_FACTOR}px, 0)`,
              top: '-15%',
              bottom: '-15%'
            }}>

            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="Commercial building with glass facade"
              className="w-full h-full object-cover" />

          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-brand/95 via-brand/85 to-brand/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
          <div className="max-w-3xl text-white">
            {/* Trust Badge */}
            <div
              className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/25"
              style={{
                opacity: Math.max(0, 1 - scrollY / HERO_BADGE_FADE_PX)
              }}>

              <CheckCircle2 className="h-4 w-4 text-green-400" />
              Trusted by California's Top GCs Since 2012
            </div>

            {/* Main Headline */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1] drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
              style={{
                opacity: Math.max(0, 1 - scrollY / HERO_TITLE_FADE_PX)
              }}>

              The Glazing Sub That{' '}
              <span className="relative text-white">
                <span className="relative z-10">Won't Hold Up</span>
                <span className="absolute inset-0 bg-accent/90 -skew-x-2 rounded" aria-hidden="true"></span>
              </span>{' '}Your
              Schedule
            </h1>

            {/* Value Proposition */}
            <p
              className="text-xl md:text-2xl text-white mb-4 leading-relaxed font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
              style={{
                opacity: Math.max(0, 1 - scrollY / HERO_TAGLINE_FADE_PX)
              }}>

              On-Time. On-Budget.{' '}
              <span className="text-sky-300">Minimal Punch List.</span>
            </p>

            {/* Expanded Copy */}
            <p
              className="text-lg text-white/80 mb-6 leading-relaxed max-w-2xl"
              style={{
                opacity: Math.max(0, 1 - scrollY / HERO_BODY_FADE_PX)
              }}>

              Stop babysitting your glazing contractor. With 13+ years of
              commercial experience, $1M bonding capacity, and a 0.87 EMR, we
              show up every day, hit every deadline, and leave you with a clean
              turnover—not a punch list.
            </p>

            {/* Key Differentiators */}
            <div
              className="flex flex-wrap gap-x-6 gap-y-2 mb-8 text-sm text-white/80"
              style={{
                opacity: Math.max(0, 1 - scrollY / HERO_BADGE_FADE_PX)
              }}>

              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                Projects $10K – $2M+
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                Prevailing Wage Certified
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                DIR Registered
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                Same-Day Budgets
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                CSLB C-17 &amp; A #965590
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                Open Shop
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                New Construction &amp; TI
              </span>
            </div>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-4 mb-10"
              style={{
                opacity: Math.max(0, 1 - scrollY / 380)
              }}>

              <Link to="/contact">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto gap-2 shadow-lg">

                  <Download className="h-5 w-5" />
                  Get Prequal Package
                </Button>
              </Link>
              <Link to="/projects">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-white border-white/30 hover:bg-white hover:text-brand">

                  See Our Work
                </Button>
              </Link>
            </div>

            {/* Hero Stats Bar */}
            <div
              className="grid grid-cols-5 gap-4 max-w-xl"
              style={{
                opacity: Math.max(0, 1 - scrollY / 350)
              }}>

              {heroStats.map((stat) =>
              <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center gap-1 text-accent mb-1">
                    {stat.icon}
                    <span className="text-xl font-bold text-white">
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-xs text-white/60 uppercase tracking-wide">
                    {stat.label}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 transition-opacity duration-300"
          style={{
            opacity: Math.max(0, 1 - scrollY / 200)
          }}>

          <span className="text-xs text-white/50 uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-accent rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Value Proposition Banner */}
      <section className="bg-white py-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="h-12 w-12 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-bold text-slate-900">On-Time Delivery</p>
                <p className="text-sm text-slate-500">
                  We hit your milestones, every time
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center border-y md:border-y-0 md:border-x border-slate-100 py-6 md:py-0 md:px-8">
              <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-slate-900">On-Budget Execution</p>
                <p className="text-sm text-slate-500">
                  No surprises, no change order games
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-end">
              <div className="h-12 w-12 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                <ClipboardCheck className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Clean Turnovers</p>
                <p className="text-sm text-slate-500">
                  Minimal punch lists are our standard
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Tabs */}
      <section className="py-10 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/about" className="group">
              <div className="bg-brand text-white rounded-full py-4 px-6 text-center font-medium hover:bg-brand-dark transition-colors">
                About CGI
              </div>
            </Link>
            <Link to="/about#why-choose" className="group">
              <div className="bg-white text-slate-700 rounded-full py-4 px-6 text-center font-medium hover:bg-slate-100 transition-colors border border-slate-200">
                Why Choose CGI
              </div>
            </Link>
            <Link to="/about#team" className="group">
              <div className="bg-white text-slate-700 rounded-full py-4 px-6 text-center font-medium hover:bg-slate-100 transition-colors border border-slate-200">
                Meet The Team
              </div>
            </Link>
            <Link to="/about#vision" className="group">
              <div className="bg-white text-slate-700 rounded-full py-4 px-6 text-center font-medium hover:bg-slate-100 transition-colors border border-slate-200">
                Our Vision
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <StatsSection />

      {/* Client Logos */}
      <ClientLogos />

      {/* GC Resources / Prequalification Section */}
      <GCResourcesSection />

      {/* Certifications & Badges */}
      <CertificationsBadges />

      {/* GC Pain Points */}
      <GCPainPoints />

      {/* Testimonial Carousel - removed until real testimonials are collected */}

      {/* Services Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subheading="What We Do"
            title="Full-Service Commercial Glazing"
            description={<>From fabrication to installation, we handle the complete glazing scope.{' '}<strong>One subcontractor, one point of contact, zero coordination headaches.</strong></>}
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) =>
            <ServiceCard key={service.title} {...service} />
            )}
          </div>
        </div>
      </section>

      {/* How We Work - Process Timeline */}
      <ProcessTimeline />

      {/* Our Promise Section */}
      <PromiseSection />

      {/* Featured Projects */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                Proven Track Record
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Projects Delivered On Schedule
              </h2>
              <p className="text-lg text-slate-600">
                Commercial glazing projects delivered on schedule with clean
                turnovers.
                <strong> Ask our GC references.</strong>
              </p>
            </div>
            <Link to="/projects" className="hidden sm:block">
              <Button variant="outline" className="gap-2">
                View Full Portfolio <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) =>
            <ProjectCard key={project.title} {...project} />
            )}
          </div>

          <div className="mt-12 text-center sm:hidden">
            <Link to="/projects">
              <Button variant="outline" className="w-full">
                View Full Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Service Area Map */}
      <ServiceAreaMap />

      {/* CTA Section - Strong Close */}
      <section className="py-24 bg-brand text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <p className="text-accent font-semibold uppercase tracking-wider mb-4">
            Ready to Work With a Glazing Sub You Can Trust?
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Add CGI to Your Bid List Today
          </h2>
          <p className="text-xl text-slate-300 mb-6 max-w-2xl mx-auto">
            Get our complete prequalification package—COI, EMR, references, and
            project history—<strong>delivered within 24 hours.</strong>
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400 mb-10">
            <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
              <CheckCircle2 className="h-4 w-4 text-green-400" /> $1M Bonding
            </span>
            <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
              <CheckCircle2 className="h-4 w-4 text-green-400" /> 0.87 EMR
            </span>
            <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
              <CheckCircle2 className="h-4 w-4 text-green-400" /> DIR Registered
            </span>
            <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
              <CheckCircle2 className="h-4 w-4 text-green-400" /> Prevailing
              Wage
            </span>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto gap-2 shadow-lg">

                <Download className="h-5 w-5" />
                Request Prequal Package
              </Button>
            </Link>
            <a href="tel:8184924265">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-white border-white/30 hover:bg-white hover:text-brand">

                Call (818) 492-4265
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Floating CTA Bar */}
      <FloatingCTA />
    </div>);

}