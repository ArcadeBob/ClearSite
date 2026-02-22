import React from 'react';
import { SectionHeader } from './SectionHeader';
import {
  Clock,
  FileCheck,
  MessageSquare,
  CalendarCheck,
  UserCheck,
  ClipboardCheck,
  AlertCircle,
  CheckCircle2 } from
'lucide-react';
const painPoints = [
{
  icon: <UserCheck className="h-6 w-6" />,
  problem: 'Tired of babysitting subs?',
  solution: 'No Supervision Required',
  description:
  "A senior foreman is on-site every day. You won't have to check on us—we'll update you.",
  metric: 'Foreman on every job'
},
{
  icon: <CalendarCheck className="h-6 w-6" />,
  problem: 'Worried about schedule delays?',
  solution: "We Don't Hold Up Your Schedule",
  description:
  'Our fabrication process runs parallel with glass ordering—shaving weeks off lead times.',
  metric: 'Weeks saved on lead time'
},
{
  icon: <FileCheck className="h-6 w-6" />,
  problem: 'Submittal nightmares?',
  solution: 'Clean Submittals, First Time',
  description:
  "Complete, code-compliant submittals that don't bounce back. We know what engineers want.",
  metric: '90%+ first-pass approval'
},
{
  icon: <MessageSquare className="h-6 w-6" />,
  problem: 'Chasing subs for answers?',
  solution: 'RFI Response in 24 Hours',
  description:
  'We respond to RFIs same-day when possible, always within 24 hours. No chasing required.',
  metric: '<24hr RFI turnaround'
},
{
  icon: <ClipboardCheck className="h-6 w-6" />,
  problem: 'Dreading the punch list?',
  solution: 'Zero Punch-List Goal',
  description:
  'Our QA process catches issues before you do. We aim for zero punch items at turnover.',
  metric: 'Near-zero punch lists'
},
{
  icon: <Clock className="h-6 w-6" />,
  problem: 'Need a bid yesterday?',
  solution: 'Same-Day Quote Turnaround',
  description:
  'Send us plans by noon, get a budget number by end of day. Detailed proposals in 48-72 hours.',
  metric: 'Same-day budgets'
}];

export function GCPainPoints() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          subheading="Built for GCs"
          title="We Know What Keeps PMs Up at Night"
          description="After 30 years working with GCs, we've built our entire operation around solving the problems that matter most to project managers."
          className="mb-16"
        />

        {/* Pain Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((item) =>
          <div key={item.solution} className="group">
              <div className="bg-slate-50 rounded-xl p-6 h-full border border-slate-100 hover:border-accent/30 hover:shadow-lg hover:bg-white transition-all duration-300">
                {/* Problem Badge */}
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <span className="italic">{item.problem}</span>
                </div>

                {/* Icon */}
                <div className="h-12 w-12 rounded-lg bg-brand flex items-center justify-center text-white mb-4 group-hover:bg-accent transition-colors">
                  {item.icon}
                </div>

                {/* Solution */}
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.solution}
                </h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Metric */}
                <div className="flex items-center gap-2 text-green-600 font-medium text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  {item.metric}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Quote */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-brand text-white rounded-xl px-8 py-6 max-w-3xl">
            <p className="text-lg italic mb-3 text-white/90">
              "Let our experience make your job easier. With CGI, you won't have
              to babysit our team—giving you more time for the many other tasks
              on your project."
            </p>
            <p className="text-accent font-semibold">
              — Daniel Kauffman, Master Glazier & Owner
            </p>
          </div>
        </div>
      </div>
    </section>);

}