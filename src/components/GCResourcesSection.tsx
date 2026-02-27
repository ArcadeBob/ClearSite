import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import {
  Shield,
  Award,
  Building2,
  DollarSign,
  Users,
  CheckCircle,
  ShieldCheck,
  ArrowRight,
  File } from
'lucide-react';

interface InfoCardData {
  title: string;
  icon: React.ReactNode;
  highlight: string;
  details: string[];
  ctaText?: string;
}

const infoCards: InfoCardData[] = [
  {
    title: 'Certificate of Insurance',
    icon: <Shield className="h-6 w-6" />,
    highlight: 'Current',
    details: [
      'Comprehensive general liability coverage',
      'Workers\' comp maintained',
      'COI available within 24 hrs',
    ],
    ctaText: 'Request COI',
  },
  {
    title: 'Safety Record',
    icon: <Award className="h-6 w-6" />,
    highlight: '0.87 EMR',
    details: [
      'Zero OSHA recordable incidents',
      'Full safety protocols & training',
      'EMR well below industry avg',
    ],
  },
  {
    title: 'License & Bonding',
    icon: <ShieldCheck className="h-6 w-6" />,
    highlight: '$1M Bond',
    details: [
      'C-17 License #965590',
      '$1M bonding active & verified',
      'DIR registered, prevailing wage certified',
    ],
  },
];

function InfoCard({ title, icon, highlight, details, ctaText }: InfoCardData) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-accent/50 hover:bg-white/[0.07] transition-all group flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="h-12 w-12 rounded-lg bg-brand flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors">
          {icon}
        </div>
        <div className="bg-accent/20 px-2.5 py-1 rounded text-xs font-bold text-accent uppercase tracking-wider">
          {highlight}
        </div>
      </div>

      <h3 className="text-lg font-bold text-white mb-4 group-hover:text-accent transition-colors">
        {title}
      </h3>

      <ul className="space-y-2.5 flex-1">
        {details.map((detail) => (
          <li key={detail} className="flex items-start gap-2 text-sm text-slate-300">
            <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>

      {ctaText && (
        <div className="mt-5 pt-4 border-t border-white/10">
          <Link
            to="/contact"
            className="text-sm font-semibold text-accent hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            {ctaText} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}

const quickFacts = [
{
  label: 'Bonding Capacity',
  value: '$1M',
  icon: <DollarSign className="h-5 w-5" />
},
{
  label: 'Single Project Max',
  value: '$2M+',
  icon: <Building2 className="h-5 w-5" />
},
{
  label: 'EMR Rating',
  value: '0.87',
  icon: <Shield className="h-5 w-5" />
},
{
  label: 'OSHA Incidents',
  value: '0',
  icon: <CheckCircle className="h-5 w-5" />
},
{
  label: 'Crew Size',
  value: '24+',
  icon: <Users className="h-5 w-5" />
},
];

export function GCResourcesSection() {
  return (
    <section className="py-24 bg-brand text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
            For General Contractors
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Instant Information Center
          </h2>
          <p className="text-lg text-slate-300">
            Everything you need to prequalify CGI for your next bid — key stats,
            credentials, and capabilities at a glance.
          </p>
        </div>

        {/* Quick Facts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {quickFacts.map((fact) =>
          <div
            key={fact.label}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 hover:border-accent/50 transition-colors group">

              <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-accent/20 text-accent mb-3 group-hover:scale-110 transition-transform">
                {fact.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {fact.value}
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-wide">
                {fact.label}
              </div>
            </div>
          )}
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {infoCards.map((card) =>
          <InfoCard key={card.title} {...card} />
          )}
        </div>

        {/* Bottom CTA */}
        <div className="bg-white/5 rounded-xl p-6 md:p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center text-accent shrink-0">
              <File className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                Need More Details?
              </h3>
              <p className="text-slate-400 text-sm">
                Have specific prequalification requirements or need additional
                documentation? We'll get it to you within 24 hours.
              </p>
            </div>
          </div>

          <Link to="/contact">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white hover:text-brand gap-2 whitespace-nowrap">

              Get in Touch <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>);

}
