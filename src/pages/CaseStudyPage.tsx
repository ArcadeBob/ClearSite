import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SectionHeader } from '../components/SectionHeader';
import { ProjectCard } from '../components/ProjectCard';
import { Button } from '../components/ui/Button';
import {
  MapPin,
  Building2,
  DollarSign,
  Clock,
  Layers,
  CheckCircle,
  Quote,
  User,
  ArrowLeft,
  Download,
  CheckCircle2,
  Target,
  Users,
  Award,
  Calendar,
  Wrench,
} from 'lucide-react';

interface CaseStudyPhase {
  title: string;
  description: string;
  duration: string;
}

interface CaseStudyResult {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface CaseStudyTestimonial {
  quote: string;
  name: string;
  company: string;
  role: string;
}

interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  location: string;
  client: string;
  gc: string;
  value: string;
  scope: string;
  duration: string;
  status: 'Completed' | 'Current';
  overview: string;
  challenge: string;
  solution: string;
  results: CaseStudyResult[];
  phases: CaseStudyPhase[];
  testimonial?: CaseStudyTestimonial;
  galleryImages: string[];
}

const caseStudies: CaseStudy[] = [
  {
    slug: 'cabrillo-business-park',
    title: 'Cabrillo Business Park',
    subtitle:
      'Large-scale curtain wall and storefront installation for a premier business campus',
    heroImage:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    location: 'Goleta, CA',
    client: 'Cabrillo Business Park LLC',
    gc: 'Gluck Building Company',
    value: '$1,269,400',
    scope: 'Curtain Walls, Doors, Interior Storefront',
    duration: '10 months',
    status: 'Completed',
    overview:
      "The Cabrillo Business Park project in Goleta represented one of CGI's largest completed projects to date — a $1.27M scope covering curtain walls, entry door systems, and interior storefront for a multi-building business campus near Santa Barbara.\n\nWorking with Gluck Building Company as the general contractor, CGI handled the complete glazing package across the development. The project demanded high-performance curtain wall systems that could withstand coastal wind loads while maintaining the clean, modern aesthetic the ownership group envisioned.\n\nThe campus-style layout meant coordinating installations across multiple structures with different completion schedules, requiring careful material staging and crew allocation to keep all buildings progressing in parallel.",
    challenge:
      'The coastal location in Goleta introduced unique engineering requirements — higher wind load ratings for the curtain wall systems and corrosion-resistant hardware throughout. Additionally, the multi-building campus layout required careful logistics planning to stage materials and equipment across several structures simultaneously without disrupting other trades working on the site.',
    solution:
      'CGI worked closely with our engineering partners to specify curtain wall systems rated for the coastal wind exposure, selecting marine-grade hardware and sealants to prevent corrosion. We established a centralized staging area on-site and developed a building-by-building installation sequence that minimized crane repositioning and allowed other trades to maintain access. Our field team coordinated daily with Gluck\'s superintendent to avoid conflicts and maintain the overall project schedule.',
    results: [
      {
        label: 'Project Value',
        value: '$1.27M',
        icon: <DollarSign className="h-6 w-6" />,
      },
      {
        label: 'Buildings Completed',
        value: '4',
        icon: <Building2 className="h-6 w-6" />,
      },
      {
        label: 'Schedule Variance',
        value: '0 days',
        icon: <Clock className="h-6 w-6" />,
      },
      {
        label: 'Safety Incidents',
        value: '0',
        icon: <Award className="h-6 w-6" />,
      },
    ],
    phases: [
      {
        title: 'Engineering & Submittals',
        description:
          'Structural calculations for coastal wind loads, shop drawing development, and submittal review with architect and GC.',
        duration: '6 weeks',
      },
      {
        title: 'Material Procurement',
        description:
          'Curtain wall extrusions, insulated glass units, door hardware, and interior storefront components ordered with staggered deliveries.',
        duration: '8 weeks',
      },
      {
        title: 'Curtain Wall Installation',
        description:
          'Exterior curtain wall systems installed across all four buildings, starting with the primary office building.',
        duration: '12 weeks',
      },
      {
        title: 'Doors & Interior Storefront',
        description:
          'Entry door systems, automatic operators, and interior storefront partitions installed as buildings reached interior finish stage.',
        duration: '8 weeks',
      },
      {
        title: 'Punch & Closeout',
        description:
          'Final sealant inspections, hardware adjustments, automatic door programming, and project documentation turnover.',
        duration: '2 weeks',
      },
    ],
    galleryImages: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
  },
];

const relatedProjects = [
  {
    title: 'Citrus Commons',
    location: 'Sherman Oaks, CA',
    client: 'IMT Residential',
    value: '$1,889,200',
    scope: 'Storefront, Auto Doors, ACM, Partitions',
    status: 'Current' as const,
    imageUrl:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Cloud Nine Hangar',
    location: 'Camarillo, CA',
    client: 'T.Viole Construction',
    value: '$1,125,000',
    scope: 'Curtain Walls, Polycarbonate, Partitions',
    status: 'Completed' as const,
    imageUrl:
      'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Marina Drive',
    location: 'Santa Barbara, CA',
    client: 'Campbell Construction',
    value: '$658,800',
    scope: 'Curtain Walls, Sliders, Partitions, Railings',
    status: 'Completed' as const,
    imageUrl:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = caseStudies.find((cs) => cs.slug === slug);

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Case Study Not Found
          </h1>
          <p className="text-slate-600 mb-8">
            The case study you're looking for doesn't exist.
          </p>
          <Link to="/projects">
            <Button className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const overviewParagraphs = caseStudy.overview.split('\n\n');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={caseStudy.heroImage}
            alt={caseStudy.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand/95 via-brand/60 to-brand/20"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
              <CheckCircle className="h-3 w-3" />
              {caseStudy.status}
            </span>
            <span className="bg-white/10 text-white/90 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 border border-white/20">
              <MapPin className="h-3 w-3" />
              {caseStudy.location}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            {caseStudy.title}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl">{caseStudy.subtitle}</p>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-accent mb-1">
                <DollarSign className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {caseStudy.value}
              </p>
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                Project Value
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-accent mb-1">
                <Clock className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {caseStudy.duration}
              </p>
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                Duration
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-accent mb-1">
                <Layers className="h-5 w-5" />
              </div>
              <p className="text-sm font-bold text-slate-900">
                {caseStudy.scope}
              </p>
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                Scope
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-accent mb-1">
                <Building2 className="h-5 w-5" />
              </div>
              <p className="text-sm font-bold text-slate-900">{caseStudy.gc}</p>
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                General Contractor
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-accent mb-1">
                <Users className="h-5 w-5" />
              </div>
              <p className="text-sm font-bold text-slate-900">
                {caseStudy.client}
              </p>
              <p className="text-xs text-slate-500 uppercase tracking-wide">
                Client
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subheading="Project Overview"
            title="The Full Story"
            className="mb-12"
          />
          <div className="prose prose-lg max-w-none text-slate-600">
            {overviewParagraphs.map((paragraph, index) => (
              <p key={index} className="mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 bg-red-50 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  The Challenge
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {caseStudy.challenge}
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <Wrench className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Our Solution
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Phases */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subheading="Project Timeline"
            title="How We Delivered"
            className="mb-12"
          />
          <div className="space-y-0">
            {caseStudy.phases.map((phase, index) => (
              <div key={index} className="flex gap-6">
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-brand text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  {index < caseStudy.phases.length - 1 && (
                    <div className="w-0.5 bg-slate-200 flex-1 my-2"></div>
                  )}
                </div>
                {/* Content */}
                <div className="pb-10">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h4 className="text-lg font-bold text-slate-900">
                      {phase.title}
                    </h4>
                    <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {phase.duration}
                    </span>
                  </div>
                  <p className="text-slate-600">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subheading="Outcomes"
            title="Results That Speak"
            className="mb-12"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {caseStudy.results.map((result) => (
              <div
                key={result.label}
                className="bg-white rounded-xl p-6 text-center border border-slate-200 shadow-sm"
              >
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-brand text-white mb-4">
                  {result.icon}
                </div>
                <p className="text-3xl font-bold text-slate-900 mb-1">
                  {result.value}
                </p>
                <p className="text-sm text-slate-500">{result.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subheading="Project Gallery"
            title="See the Work"
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudy.galleryImages.map((image, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden shadow-md h-64"
              >
                <img
                  src={image}
                  alt={`${caseStudy.title} - Image ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {caseStudy.testimonial && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-slate-100 text-center">
              <div className="flex justify-center mb-6">
                <div className="h-10 w-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <Quote className="h-5 w-5 text-accent" />
                </div>
              </div>
              <blockquote className="text-xl md:text-2xl font-medium text-slate-800 mb-6 leading-relaxed">
                &ldquo;{caseStudy.testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-3 pt-6 border-t border-slate-100">
                <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-900 text-sm">
                    {caseStudy.testimonial.name}
                  </div>
                  <div className="text-sm text-slate-500">
                    <span className="text-accent font-medium">
                      {caseStudy.testimonial.company}
                    </span>
                    {' · '}
                    <span>{caseStudy.testimonial.role}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subheading="More Work"
            title="Related Projects"
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
            Get our complete prequalification package — COI, EMR, references, and
            project history —{' '}
            <strong>delivered within 24 hours.</strong>
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
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto gap-2 shadow-lg"
              >
                <Download className="h-5 w-5" />
                Request Prequal Package
              </Button>
            </Link>
            <a href="tel:8184924265">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-white border-white/30 hover:bg-white hover:text-brand"
              >
                Call (818) 492-4265
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
