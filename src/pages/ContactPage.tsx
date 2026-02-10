import React from 'react';
import { ContactForm } from '../components/ContactForm';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Download,
  FileText } from
'lucide-react';
export function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-[#1e3a5f] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-amber-500/30">
            <FileText className="h-4 w-4" />
            For General Contractors
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Request Prequalification Packet
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Get everything you need to add CGI to your bid list—COI, EMR,
            references, and project history—delivered within 24 hours.
          </p>
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
                    className="hover:text-[#1e3a5f] font-medium transition-colors">

                    (818) 492-4265
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-amber-500 shrink-0" />
                  <a
                    href="mailto:email@cginstall.com"
                    className="hover:text-[#1e3a5f] font-medium transition-colors">

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
                  <span className="text-amber-500 mt-1">✓</span>
                  Certificate of Insurance (COI)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">✓</span>
                  EMR & Safety Documentation
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">✓</span>
                  Project References & History
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">✓</span>
                  Company Profile & Capabilities
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">✓</span>
                  Bonding & License Information
                </li>
              </ul>
            </div>

            {/* Map Placeholder */}
            <div className="bg-slate-200 rounded-xl h-48 w-full flex items-center justify-center relative overflow-hidden shadow-inner border border-slate-300">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Map location"
                className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" />

              <div className="relative z-10 bg-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#1e3a5f]" />
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
    </div>);

}