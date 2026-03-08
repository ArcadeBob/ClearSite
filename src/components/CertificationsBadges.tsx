import React from 'react';
import { ShieldCheck, FileCheck, Award, Heart, ExternalLink } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import {
  CSLB_LICENSE_CLASS,
  CSLB_LICENSE_NUMBER,
  CSLB_LOOKUP_URL,
  SBE_CERT_NUMBER,
  EMR_DISPLAY,
  OSHA_RECORD_DISPLAY,
  DIR_STATUS,
} from '../data/credentials';

const certifications = [
{
  icon: <ShieldCheck className="h-6 w-6" />,
  title: `${CSLB_LICENSE_CLASS} Licensed`,
  subtitle: `License #${CSLB_LICENSE_NUMBER}`,
  description: 'California Glazing Contractor',
  verifyUrl: CSLB_LOOKUP_URL,
  verifyLabel: 'Verify on CSLB',
},
{
  icon: <Award className="h-6 w-6" />,
  title: 'SBE Certified',
  subtitle: `ID #${SBE_CERT_NUMBER}`,
  description: 'Small Business Enterprise'
},
{
  icon: <FileCheck className="h-6 w-6" />,
  title: DIR_STATUS,
  subtitle: 'Prevailing Wage',
  description: 'Public Works Qualified'
},
{
  icon: <Heart className="h-6 w-6" />,
  title: `${EMR_DISPLAY} EMR`,
  subtitle: 'Safety Rating',
  description: OSHA_RECORD_DISPLAY
}];

export function CertificationsBadges({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
  if (variant === 'compact') {
    return (
      <div className="py-8 bg-brand relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert) =>
            <div key={cert.title} className="group">
                <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10 transition-all duration-300 group-hover:border-accent/50 group-hover:bg-white/[0.07] h-full">
                  <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-accent/20 text-accent mb-2 group-hover:bg-accent group-hover:text-white transition-colors">
                    {cert.icon}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-0.5">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-semibold text-accent">
                    {cert.subtitle}
                  </p>
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-accent hover:text-white font-medium mt-1 transition-colors"
                    >
                      {cert.verifyLabel} <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          variant="banner"
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
                <h3 className="text-lg font-bold text-brand mb-1">
                  {cert.title}
                </h3>
                <p className="text-sm font-semibold text-accent mb-2">
                  {cert.subtitle}
                </p>
                <p className="text-xs text-slate-500">{cert.description}</p>
                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent-dark font-medium mt-2 transition-colors"
                  >
                    {cert.verifyLabel} <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}