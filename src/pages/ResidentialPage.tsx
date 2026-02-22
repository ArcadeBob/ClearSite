import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { CheckCircle } from 'lucide-react';
const features = [
'Custom frameless shower enclosures',
'High-end glass railings (interior & exterior)',
'Custom mirrors and vanity glass',
'Glass partitions and wine cellars',
'Skylights and roof glazing',
'Folding glass walls and sliders'];

export function ResidentialPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-brand text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Residential Services</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            While 90% of our work is commercial, we bring the same level of
            precision and professionalism to high-end custom residential
            projects.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Content */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Custom Glass Solutions for Luxury Homes
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed text-lg">
              We partner with custom home builders and homeowners to deliver
              stunning glass installations that define modern luxury living. Our
              team handles everything from design consultation to precise
              installation.
            </p>

            <div className="bg-slate-50 p-8 rounded-xl mb-8 border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Our Residential Capabilities
              </h3>
              <ul className="space-y-4">
                {features.map((feature, index) =>
                <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 font-medium">
                      {feature}
                    </span>
                  </li>
                )}
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900">
                Pricing Estimates
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-slate-200 p-5 rounded-lg bg-white shadow-sm">
                  <span className="block text-sm text-slate-500 mb-1 font-medium uppercase tracking-wide">
                    Shower Enclosures
                  </span>
                  <span className="block text-2xl font-bold text-brand mb-1">
                    $1,500 – $3,500
                  </span>
                  <span className="text-xs text-slate-400">per unit</span>
                </div>
                <div className="border border-slate-200 p-5 rounded-lg bg-white shadow-sm">
                  <span className="block text-sm text-slate-500 mb-1 font-medium uppercase tracking-wide">
                    Custom Mirrors
                  </span>
                  <span className="block text-2xl font-bold text-brand mb-1">
                    $15 – $25
                  </span>
                  <span className="text-xs text-slate-400">per sq ft</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">
                *Prices are estimates only. Final pricing requires detailed
                measurements and specification review.
              </p>
            </div>

            <div className="mt-10">
              <Link to="/contact">
                <Button size="lg" className="shadow-lg shadow-amber-500/20">
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-8">
            <div className="relative group">
              <div className="absolute -inset-2 bg-slate-100 rounded-xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-300"></div>
              <img
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Modern bathroom with glass shower"
                className="relative rounded-lg shadow-lg w-full h-80 object-cover" />

            </div>
            <div className="relative group">
              <div className="absolute -inset-2 bg-slate-100 rounded-xl transform rotate-1 group-hover:rotate-0 transition-transform duration-300"></div>
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Glass railing system"
                className="relative rounded-lg shadow-lg w-full h-80 object-cover" />

            </div>
          </div>
        </div>
      </div>
    </div>);

}