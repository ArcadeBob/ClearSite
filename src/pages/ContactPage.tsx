import React from 'react';
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
} from 'lucide-react';

const trustBadges = [
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'C-17 Licensed',
    subtitle: '#965590',
  },
  {
    icon: <Award className="h-5 w-5" />,
    title: 'SBE Certified',
    subtitle: '#2034373',
  },
  {
    icon: <FileCheck className="h-5 w-5" />,
    title: 'DIR Registered',
    subtitle: 'Prevailing Wage',
  },
  {
    icon: <Heart className="h-5 w-5" />,
    title: '0.87 EMR',
    subtitle: 'Safety Rating',
  },
];

const faqs = [
  {
    question: "What's your typical response time?",
    answer:
      'We respond to all inquiries within 24 hours. For prequalification packet requests, we typically deliver the complete package the same business day. Bid requests receive detailed proposals within 48-72 hours depending on project complexity.',
  },
  {
    question: 'What areas do you serve?',
    answer:
      'Our primary service area covers all of Southern California, including Los Angeles, Ventura, Santa Barbara, Orange, San Bernardino, and Riverside counties. We also take on projects in the San Francisco Bay Area and have completed work statewide.',
  },
  {
    question: 'What size projects do you handle?',
    answer:
      'We handle commercial glazing projects ranging from $50,000 to over $2 million. With $5M bonding capacity, we can take on the largest scopes. We also do select high-end residential projects.',
  },
  {
    question: 'Do you do prevailing wage work?',
    answer:
      'Yes. CGI is DIR registered and fully set up for prevailing wage projects. We have extensive experience with public works, LAUSD, and other institutional projects requiring certified payroll.',
  },
  {
    question: 'How do I get a bid?',
    answer:
      'Fill out the form on this page or call us directly at (818) 492-4265. Send us your plans and specifications and we\'ll provide a detailed bid within 48-72 hours. For faster turnaround, include the project timeline and any relevant addenda.',
  },
];

export function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-brand text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subheading="For General Contractors"
            title="Request Prequalification Packet"
            description="Get everything you need to add CGI to your bid list — COI, EMR, references, and project history — delivered within 24 hours."
            subheadingColor="text-amber-300"
            className="text-left"
          />
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
              <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
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
              <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
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
                    href="mailto:email@cginstall.com"
                    className="hover:text-brand font-medium transition-colors"
                  >
                    email@cginstall.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">
                Business Info
              </h3>
              <div className="space-y-4 text-slate-600">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-amber-500 shrink-0" />
                  <span>License C-17 #965590</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-amber-500 shrink-0" />
                  <span>Mon-Fri: 7:00 AM - 4:00 PM</span>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
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
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Request Your Prequalification Packet
              </h2>
              <p className="text-slate-500 mb-8">
                Tell us about your project and we'll send your complete prequal
                package within 24 hours.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
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
                <h3 className="flex items-start gap-3 text-lg font-bold text-slate-900 mb-3">
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
