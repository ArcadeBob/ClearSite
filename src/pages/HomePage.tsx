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
import { SectionHeader } from '../components/SectionHeader';
import { PrevailingWageBanner } from '../components/PrevailingWageBanner';
import {
  BONDING_CAPACITY_DISPLAY,
  EMR_DISPLAY,
  DIR_STATUS,
  PREVAILING_WAGE_STATUS,
} from '../data/credentials';
import {
  Building2,
  Sun,
  Shield,
  DoorOpen,
  PanelTop,
  Fence,
  Bath,
  RectangleHorizontal,
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
  'Keep your project moving with storefront systems that install on your timeline, not ours. One crew handles framing, glazing, and hardware so you have a single point of coordination.',
  icon: <DoorOpen className="h-6 w-6" />,
  bullets: [
    'Same-day budgets on plan review',
    'Coordinates with framing and waterproofing trades',
    'First-pass inspections with minimal punch list items',
  ]
},
{
  title: 'Window Walls',
  description:
  'No schedule gaps between framing and glazing — we field-verify conditions early and show up ready. Our crews have installed window walls on projects from $50K to $2M+.',
  icon: <PanelTop className="h-6 w-6" />,
  bullets: [
    'Field verification before fabrication to prevent change orders',
    'Daily progress updates during installation',
    'Clean jobsite turnover with as-built documentation',
  ]
},
{
  title: 'Curtain Walls',
  description:
  'Your most complex glazing scope handled by one experienced sub. We manage the full curtain wall process from submittals through closeout so nothing falls through the cracks.',
  icon: <Building2 className="h-6 w-6" />,
  bullets: [
    'Proactive lead time tracking with regular status updates',
    'Coordinates with structural, mechanical, and waterproofing trades',
    'Complete submittal packages on your schedule',
  ]
},
{
  title: 'Skylights',
  description:
  'Overhead glazing that passes inspection the first time. We coordinate with roofing and waterproofing trades upfront so your skylight scope stays on schedule.',
  icon: <Sun className="h-6 w-6" />,
  bullets: [
    'Pre-installation coordination with roofing contractors',
    'Engineered submittals for architect approval',
    'Warranty documentation included at closeout',
  ]
},
{
  title: 'Glass Railings',
  description:
  'Railing systems installed to code with no callbacks. We field-measure early and coordinate with your concrete and steel trades to keep the critical path clear.',
  icon: <Fence className="h-6 w-6" />,
  bullets: [
    'Early field measurements to prevent rework',
    'Coordinates with concrete and steel sub schedules',
    'Code-compliant installations with minimal punch list',
  ]
},
{
  title: 'Fire-Rated Glazing',
  description:
  'Pass your fire-rated inspections on the first walk-through. We handle the engineering, product selection, and documentation so you never chase missing paperwork.',
  icon: <Shield className="h-6 w-6" />,
  bullets: [
    'Complete inspection-ready documentation package',
    'Architect coordination on product approvals',
    'First-pass inspection track record',
  ]
},
{
  title: 'Shower Enclosures',
  description:
  'Custom shower glass that fits the first time — no return trips. We template after tile is set and deliver finished enclosures that are ready for final walkthrough.',
  icon: <Bath className="h-6 w-6" />,
  bullets: [
    'Template-after-tile process eliminates remakes',
    'Hospitality and multi-unit rollout experience',
    'Minimal punch list items on final walkthrough',
  ]
},
{
  title: 'Mirrors',
  description:
  'Simple scope, zero hassle. We measure, fabricate, and install mirrors on your timeline with no loose ends at turnover.',
  icon: <RectangleHorizontal className="h-6 w-6" />,
  bullets: [
    'Fast turnaround for tenant improvement schedules',
    'Single-visit installation for most scopes',
    'Clean turnover with no callbacks',
  ]
}];

const featuredProjects = [
{
  title: 'Cabrillo Business Park',
  location: 'Goleta, CA',
  client: 'Gluck Building Company',
  value: '$1.27M',
  scope: 'Exterior Curtain Walls & Doors, Interior Storefront & Doors (4 Buildings)',
  imageUrl: '/images/projects/cabrillo-business-park.jpg'
},
{
  title: 'Cloud Nine Hangar & Offices',
  location: 'Camarillo, CA',
  client: 'T.Viole Construction',
  value: '$1.13M',
  scope: 'Curtain Walls, Polycarbonate Windows, Storefront, Glass Partitions & Sliders',
  imageUrl: '/images/projects/cloud-nine-hangar.jpg'
},
{
  title: 'Citrus Commons',
  location: 'Sherman Oaks, CA',
  client: 'IMT Residential',
  value: '$1.89M',
  scope: 'Exterior Storefront, Aluminum Sliders, ACM Panels, Interior Partitions & Doors',
  imageUrl: '/images/projects/Citrus-Commons.jpg'
}];


export function HomePage(): React.JSX.Element {
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
      <section className="relative min-h-[65vh] flex items-center overflow-hidden">
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
              className="font-heading uppercase tracking-wide text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 leading-[1.1]"
              style={{
                opacity: Math.max(0, 1 - scrollY / HERO_TITLE_FADE_PX)
              }}>

              The Glazing Sub That{' '}
              <span className="text-white">Won't Hold Up</span> Your
              Schedule
            </h1>

            {/* Value Proposition */}
            <p
              className="text-xl md:text-2xl text-white mb-4 leading-relaxed font-semibold"
              style={{
                opacity: Math.max(0, 1 - scrollY / HERO_TAGLINE_FADE_PX)
              }}>

              On-Time. On-Budget.{' '}
              <span className="text-white underline decoration-accent decoration-2 underline-offset-4">Minimal Punch List.</span>
            </p>

            {/* Expanded Copy */}
            {/* Credential values: see src/data/credentials.ts */}
            <p
              className="text-lg text-white/90 mb-5 leading-relaxed max-w-2xl"
              style={{
                opacity: Math.max(0, 1 - scrollY / HERO_BODY_FADE_PX)
              }}>

              Stop babysitting your glazing contractor. With 13+ years of
              commercial experience, {BONDING_CAPACITY_DISPLAY} bonding capacity, and a {EMR_DISPLAY} EMR, we
              show up every day, hit every deadline, and leave you with a clean
              turnover—not a punch list.
            </p>

            {/* Key Differentiators */}
            <div
              className="grid grid-cols-2 md:flex md:flex-wrap gap-x-6 gap-y-3 mb-8 text-sm md:text-base text-white/90"
              style={{
                opacity: Math.max(0, 1 - scrollY / HERO_BADGE_FADE_PX)
              }}>

              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                Projects $10K – $2M+
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                {PREVAILING_WAGE_STATUS}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                Same-Day Budgets
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                Open Shop
              </span>
            </div>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-4"
              style={{
                opacity: Math.max(0, 1 - scrollY / 380)
              }}>

              <Link to="/contact?type=commercial">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto gap-2 shadow-lg">

                  <ArrowRight className="h-5 w-5" />
                  Request Prequal Package
                </Button>
              </Link>
              <Link to="/projects">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-white border-white/50 bg-white/5 hover:bg-white hover:text-brand">

                  See Our Work
                </Button>
              </Link>
            </div>

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
              <div className="h-12 w-12 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                <DollarSign className="h-6 w-6 text-accent" />
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
      <section className="py-10 bg-stone-50">
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

      {/* GC Resources / Prequalification + Certifications Trust Band */}
      <GCResourcesSection />
      <CertificationsBadges variant="compact" />

      {/* Prevailing Wage Experience */}
      <PrevailingWageBanner className="bg-amber-50/50" />

      {/* GC Pain Points */}
      <GCPainPoints />

      {/* Services Grid */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            variant="left-bar"
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
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                Proven Track Record
              </p>
              <h2 className="font-heading uppercase tracking-wide text-3xl md:text-4xl font-bold text-brand mb-4">
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
          <h2 className="font-heading uppercase tracking-wide text-3xl md:text-5xl font-bold text-white mb-6">
            Add CGI to Your Bid List Today
          </h2>
          <p className="text-xl text-slate-300 mb-6 max-w-2xl mx-auto">
            Get our complete prequalification package—COI, EMR, references, and
            project history—<strong>delivered within 24 hours.</strong>
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400 mb-10">
            <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
              <CheckCircle2 className="h-4 w-4 text-green-400" /> {BONDING_CAPACITY_DISPLAY} Bonding
            </span>
            <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
              <CheckCircle2 className="h-4 w-4 text-green-400" /> {EMR_DISPLAY} EMR
            </span>
            <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
              <CheckCircle2 className="h-4 w-4 text-green-400" /> {DIR_STATUS}
            </span>
            <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
              <CheckCircle2 className="h-4 w-4 text-green-400" /> {PREVAILING_WAGE_STATUS}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact?type=commercial">
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

    </div>);

}