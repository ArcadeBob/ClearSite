import React from 'react';
import { Shield, AlertTriangle, DollarSign } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { Card } from './ui/Card';
import {
  EMR_DISPLAY,
  EMR_INDUSTRY_AVERAGE_DISPLAY,
  BONDING_CAPACITY_DISPLAY,
  OSHA_INCIDENTS_DISPLAY,
} from '../data/credentials';

const safetyStats = [
  {
    label: 'EMR Safety Rating',
    value: EMR_DISPLAY,
    context: `Industry average: ${EMR_INDUSTRY_AVERAGE_DISPLAY}`,
    icon: <Shield className="h-6 w-6 text-brand" />,
  },
  {
    label: 'OSHA Record',
    value: OSHA_INCIDENTS_DISPLAY,
    context: 'OSHA Recordable Incidents',
    icon: <Shield className="h-6 w-6 text-brand" />,
  },
  {
    label: 'Bonding Capacity',
    value: BONDING_CAPACITY_DISPLAY,
    context: 'Single Project Maximum',
    icon: <DollarSign className="h-6 w-6 text-brand" />,
  },
];

export function SafetySection() {
  return (
    <section id="safety" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Amber review banner -- remove when owner approves content */}
        {import.meta.env.DEV && (
        <div className="mb-8 flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5 text-amber-600" />
          <p>
            <strong>Draft safety content</strong> -- pending owner review. Search for{' '}
            <code className="bg-amber-100 px-1 rounded text-xs font-mono">[REVIEW:]</code>{' '}
            markers in this section for items requiring owner confirmation.
          </p>
        </div>
        )}

        {/* Section header */}
        <SectionHeader
          variant="left-bar"
          subheading="Safety Program"
          title="A Safety Culture Built Into Every Project"
          className="mb-12"
        />

        {/* 3-stat highlight row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {safetyStats.map((stat) => (
            <Card key={stat.label} className="p-6 text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-brand/10 mx-auto mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-500 mb-2">
                {stat.context}
              </div>
              <div className="text-sm font-medium text-slate-700 uppercase tracking-wide">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>

        {/* Safety narrative */}
        <div className="max-w-3xl mx-auto mt-12 space-y-4">
          <p className="text-slate-600 leading-relaxed">
            CGI maintains a written Injury and Illness Prevention Program (IIPP){' '}
            {/* [REVIEW: confirm whether IIPP is Cal/OSHA-specific or also references federal standards] */}
            that governs all field and shop operations. The program establishes clear protocols
            for hazard identification, incident reporting, and corrective action -- ensuring
            safety is embedded in daily operations, not treated as an afterthought.
          </p>
          <p className="text-slate-600 leading-relaxed">
            All field personnel participate in regular toolbox talks{' '}
            {/* [REVIEW: confirm frequency -- weekly? daily? per-project?] */}
            covering job-specific hazards, fall protection procedures, and PPE requirements.
            Site-specific safety plans are developed for each project{' '}
            {/* [REVIEW: confirm whether site-specific plans are standard for all projects or only for certain scopes] */}
            , addressing unique conditions and ensuring every crew member understands the
            safety requirements before work begins.
          </p>
          <p className="text-slate-600 leading-relaxed">
            This commitment to proactive safety management is reflected in our record: an EMR
            of {EMR_DISPLAY} -- 13% below the industry average -- and zero OSHA recordable
            incidents.{' '}
            {/* [REVIEW: confirm whether 'zero OSHA recordable incidents' refers to all-time or a specific reporting period] */}
            For general contractors, this means fewer project disruptions, lower insurance
            risk, and a subcontractor that takes jobsite safety as seriously as you do.
          </p>
        </div>

      </div>
    </section>
  );
}
