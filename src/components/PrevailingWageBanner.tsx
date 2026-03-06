import React from 'react';
import { FileCheck, Scale, GraduationCap, Building2 } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { DIR_STATUS, PREVAILING_WAGE_STATUS } from '../data/credentials';

interface PrevailingWageBannerProps {
  className?: string;
}

const prevailingWageTypes = [
  {
    label: 'Project Labor Agreements (PLA)',
    description:
      'Experienced with hiring hall obligations and union coordination. CGI fulfills PLA requirements while maintaining the efficiency and schedule predictability GCs depend on.',
    icon: <Scale className="h-6 w-6" />,
  },
  {
    label: 'Davis-Bacon Act',
    description:
      'Fully equipped for federal prevailing wage requirements on public works projects. Certified payroll, accurate wage determinations, and proper fringe benefit compliance.',
    icon: <FileCheck className="h-6 w-6" />,
  },
  {
    label: 'State Prevailing Wage (CA)',
    description:
      `${DIR_STATUS} and ${PREVAILING_WAGE_STATUS}. Certified payroll submissions, DIR reporting, and full compliance with California Labor Code on all applicable projects.`,
    icon: <Building2 className="h-6 w-6" />,
  },
  {
    label: 'LAUSD & Institutional Projects',
    description:
      'Proven track record on public-owner institutional projects, including LAUSD schools and other municipal scopes requiring rigorous compliance documentation.',
    icon: <GraduationCap className="h-6 w-6" />,
  },
];

export function PrevailingWageBanner({ className = '' }: PrevailingWageBannerProps) {
  return (
    <section id="prevailing-wage" className={`py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subheading="Prevailing Wage Experience"
          title="Certified for Public Works Projects"
          description="CGI is DIR registered and prevailing wage certified — ready for PLA, Davis-Bacon, state prevailing wage, and institutional scopes from day one."
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {prevailingWageTypes.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-brand text-white flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {item.label}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
