import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ContactForm } from '../components/ContactForm';
import { SectionHeader } from '../components/SectionHeader';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Download,
  Award,
  FileCheck,
  Heart,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import {
  CSLB_LICENSE_CLASS,
  CSLB_LICENSE_NUMBER,
  CSLB_LOOKUP_URL,
  CSLB_LICENSE_DISPLAY,
  SBE_CERT_NUMBER,
  EMR_DISPLAY,
  DIR_STATUS,
  BONDING_CAPACITY_DISPLAY,
} from '../data/credentials';

const trustBadges = [
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: `${CSLB_LICENSE_CLASS} Licensed`,
    subtitle: `#${CSLB_LICENSE_NUMBER}`,
  },
  {
    icon: <Award className="h-5 w-5" />,
    title: 'SBE Certified',
    subtitle: `#${SBE_CERT_NUMBER}`,
  },
  {
    icon: <FileCheck className="h-5 w-5" />,
    title: DIR_STATUS,
    subtitle: 'Prevailing Wage',
  },
  {
    icon: <Heart className="h-5 w-5" />,
    title: `${EMR_DISPLAY} EMR`,
    subtitle: 'Safety Rating',
  },
];

const faqs = [
  {
    question: "What's your typical response time?",
    answer:
      'We respond to all inquiries within 24 hours. For prequalification packet requests, we typically deliver the complete package the same business day. Bid requests receive detailed proposals within 3-5 business days depending on project complexity.',
  },
  {
    question: 'What areas do you serve?',
    answer:
      'Our primary service area covers all of Southern California, including Los Angeles, Ventura, Santa Barbara, Orange, San Bernardino, and Riverside counties. We also take on projects in Central and Northern California and have completed work statewide.',
  },
  {
    question: 'What size projects do you handle?',
    answer:
      `We handle commercial glazing projects ranging from $10,000 to over $2 million. With ${BONDING_CAPACITY_DISPLAY} single-project bonding capacity, we can take on major commercial scopes. We also do select high-end residential projects.`,
  },
  {
    question: 'How do I get a bid?',
    answer:
      'Fill out the form on this page or call us directly at (818) 492-4265. Send us your plans and specifications and we\'ll provide a detailed bid within 3-5 business days. For faster turnaround, include the project timeline and any relevant addenda.',
  },
];

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const inquiryType: 'commercial' | 'residential' =
    searchParams.get('type') === 'residential' ? 'residential' : 'commercial';

  const pageTitle = inquiryType === 'residential'
    ? 'Request a Quote'
    : 'Request Prequalification Packet';

  const pageSubtitle = inquiryType === 'residential'
    ? "Tell us about your project and we'll get back to you within one business day."
    : "Get everything you need to add CGI to your bid list \u2014 COI, EMR, references, and project history \u2014 delivered within 24 hours.";

  const formHeading = inquiryType === 'residential'
    ? 'Tell Us About Your Project'
    : 'Request Your Prequalification Packet';

  const formSubtitle = inquiryType === 'residential'
    ? "Share your project details and we'll provide a detailed quote."
    : "Tell us about your project and we'll send your complete prequal package within 24 hours.";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-brand text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading uppercase tracking-wide text-4xl font-bold text-white mb-4">
            {pageTitle}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            {pageSubtitle}
          </p>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustBadges.map((badge) => (
              <div
                key={badge.title}
                className="flex items-center gap-3 justify-center md:justify-start"
              >
                <div className="h-10 w-10 rounded-full bg-brand text-white flex items-center justify-center flex-shrink-0">
                  {badge.icon}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">
                    {badge.title}
                  </p>
                  <p className="text-xs text-slate-500">{badge.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="font-heading uppercase tracking-wide text-lg font-bold text-brand mb-4 border-b border-slate-100 pb-2">
                Office Location
              </h3>
              <div className="flex items-start gap-3 text-slate-600">
                <MapPin className="h-5 w-5 text-amber-500 mt-1 shrink-0" />
                <p>
                  9627 Owensmouth Ave #3
                  <br />
                  Chatsworth, CA 91311
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="font-heading uppercase tracking-wide text-lg font-bold text-brand mb-4 border-b border-slate-100 pb-2">
                Contact Details
              </h3>
              <div className="space-y-4 text-slate-600">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-amber-500 shrink-0" />
                  <a
                    href="tel:8184924265"
                    className="hover:text-brand font-medium transition-colors"
                  >
                    (818) 492-4265
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-amber-500 shrink-0" />
                  <a
                    href="mailto:bids@cginstall.com"
                    className="hover:text-brand font-medium transition-colors"
                  >
                    bids@cginstall.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="font-heading uppercase tracking-wide text-lg font-bold text-brand mb-4 border-b border-slate-100 pb-2">
                Business Info
              </h3>
              <div className="space-y-4 text-slate-600">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-amber-500 shrink-0" />
                  <div>
                    <span>{CSLB_LICENSE_DISPLAY}</span>
                    <a
                      href={CSLB_LOOKUP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-accent hover:text-accent-dark font-medium mt-0.5 transition-colors"
                    >
                      Verify on CSLB <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-amber-500 shrink-0" />
                  <span>Mon-Fri: 7:00 AM - 4:00 PM</span>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
              <h3 className="font-heading uppercase tracking-wide text-lg font-bold text-brand mb-4 flex items-center gap-2">
                <Download className="h-5 w-5 text-amber-600" />
                What's in the Prequal Packet
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">&#10003;</span>
                  Certificate of Insurance (COI)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">&#10003;</span>
                  EMR &amp; Safety Documentation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">&#10003;</span>
                  Project References &amp; History
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">&#10003;</span>
                  Company Profile &amp; Capabilities
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">&#10003;</span>
                  Bonding &amp; License Information
                </li>
              </ul>
            </div>

            {/* Map Placeholder */}
            <div className="bg-slate-200 rounded-xl h-48 w-full flex items-center justify-center relative overflow-hidden shadow-inner border border-slate-300">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Map location"
                className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="relative z-10 bg-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand" />
                <p className="font-bold text-slate-900 text-sm">
                  Chatsworth, CA
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-md border border-slate-200">
              <h2 className="font-heading uppercase tracking-wide text-2xl font-bold text-brand mb-2">
                {formHeading}
              </h2>
              <p className="text-slate-500 mb-8">
                {formSubtitle}
              </p>
              <ContactForm inquiryType={inquiryType} />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            variant="banner"
            subheading="Common Questions"
            title="Frequently Asked Questions"
            className="mb-12"
          />
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-slate-50 rounded-xl p-6 border border-slate-100"
              >
                <h3 className="font-heading uppercase tracking-wide flex items-start gap-3 text-lg font-bold text-brand mb-3">
                  <HelpCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-slate-600 leading-relaxed pl-8">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
