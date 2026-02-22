import React from 'react';
import { ShieldCheck, FileCheck, Award, Heart } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
const certifications = [
{
  icon: <ShieldCheck className="h-6 w-6" />,
  title: 'C-17 Licensed',
  subtitle: 'License #965590',
  description: 'California Glazing Contractor'
},
{
  icon: <Award className="h-6 w-6" />,
  title: 'SBE Certified',
  subtitle: 'ID #2034373',
  description: 'Small Business Enterprise'
},
{
  icon: <FileCheck className="h-6 w-6" />,
  title: 'DIR Registered',
  subtitle: 'Prevailing Wage',
  description: 'Public Works Qualified'
},
{
  icon: <Heart className="h-6 w-6" />,
  title: '0.87 EMR',
  subtitle: 'Safety Rating',
  description: 'Zero OSHA Incidents'
}];

export function CertificationsBadges() {
  return (
    <section className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subheading="Trusted & Verified"
          title="Our Credentials"
          titleSize="sm"
          className="mb-12"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert) =>
          <div key={cert.title} className="group">
              <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-100 transition-all duration-300 group-hover:border-accent/30 group-hover:shadow-lg group-hover:bg-white h-full">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-brand text-white mb-4 group-hover:bg-accent transition-colors">
                  {cert.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {cert.title}
                </h3>
                <p className="text-sm font-semibold text-accent mb-2">
                  {cert.subtitle}
                </p>
                <p className="text-xs text-slate-500">{cert.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}