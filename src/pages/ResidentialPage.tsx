import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { SectionHeader } from '../components/SectionHeader';
import {
  CheckCircle,
  ClipboardList,
  Ruler,
  Cog,
  Wrench,
  Quote,
  DollarSign,
} from 'lucide-react';

const features = [
  'Custom frameless shower enclosures',
  'High-end glass railings (interior & exterior)',
  'Custom mirrors and vanity glass',
  'Glass partitions and wine cellars',
  'Skylights and roof glazing',
  'Folding glass walls and sliders',
];

const residentialProjects = [
  {
    title: 'Bel Air Custom Residence',
    category: 'Railings & Enclosures',
    description:
      'Glass railings throughout a 12,000 sq ft estate plus a temperature-controlled wine cellar enclosure with custom UV-filtered glass.',
    value: '$85,000',
    imageUrl:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Malibu Beach House',
    category: 'Walls & Skylights',
    description:
      'NanaWall folding glass wall system opening to ocean views, plus three custom skylights flooding the great room with natural light.',
    value: '$120,000',
    imageUrl:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Encino Estate',
    category: 'Shower & Mirrors',
    description:
      'Five frameless shower enclosures and custom mirrors for a complete master suite and guest bathroom renovation.',
    value: '$35,000',
    imageUrl:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Pacific Palisades Home',
    category: 'Partitions & Railings',
    description:
      'Interior glass partitions for a home office and den, plus a frameless glass staircase railing spanning three floors.',
    value: '$65,000',
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

const processSteps = [
  {
    icon: <ClipboardList className="h-6 w-6" />,
    title: 'Consultation',
    description:
      'We visit your home, discuss your vision, and provide expert recommendations on glass types and configurations.',
  },
  {
    icon: <Ruler className="h-6 w-6" />,
    title: 'Measurement',
    description:
      'Precise field measurements ensure a perfect fit. We template complex curves and angles on-site.',
  },
  {
    icon: <Cog className="h-6 w-6" />,
    title: 'Fabrication',
    description:
      'Custom glass is cut, tempered, and finished to exact specifications at our partner fabrication facilities.',
  },
  {
    icon: <Wrench className="h-6 w-6" />,
    title: 'Installation',
    description:
      'Our experienced crew installs with care — protecting your home and leaving the site spotless.',
  },
];

const residentialTestimonials = [
  {
    text: 'They were really nice, accommodating and easy to work with. Highly recommend!',
    author: 'J.K.',
    location: 'Los Angeles, CA',
  },
  {
    text: 'Company did a perfect job. Thank you very much.',
    author: 'V.S.',
    location: 'West Hills, CA',
  },
];

const pricingCategories = [
  {
    name: 'Shower Enclosures',
    price: '$1,500 – $3,500',
    unit: 'per unit',
  },
  {
    name: 'Custom Mirrors',
    price: '$15 – $25',
    unit: 'per sq ft',
  },
  {
    name: 'Glass Railings',
    price: '$150 – $300',
    unit: 'per linear ft',
  },
  {
    name: 'Glass Partitions',
    price: '$75 – $150',
    unit: 'per sq ft',
  },
  {
    name: 'Skylights',
    price: '$2,500 – $8,000',
    unit: 'per unit',
  },
  {
    name: 'Folding Glass Walls',
    price: '$800 – $1,200',
    unit: 'per linear ft',
  },
];

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

      {/* Intro + Features + Images */}
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
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Images */}
          <div className="space-y-8">
            <div className="relative group">
              <div className="absolute -inset-2 bg-slate-100 rounded-xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-300"></div>
              <img
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Modern bathroom with glass shower"
                className="relative rounded-lg shadow-lg w-full h-80 object-cover"
              />
            </div>
            <div className="relative group">
              <div className="absolute -inset-2 bg-slate-100 rounded-xl transform rotate-1 group-hover:rotate-0 transition-transform duration-300"></div>
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Glass railing system"
                className="relative rounded-lg shadow-lg w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Residential Project Gallery */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subheading="Our Work"
            title="Residential Project Gallery"
            description="A selection of custom residential glass installations across the Los Angeles area."
            subheadingColor="text-amber-600"
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {residentialProjects.map((project) => (
              <div
                key={project.title}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-bold text-brand">
                      <DollarSign className="h-3.5 w-3.5" />
                      {project.value}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subheading="How It Works"
            title="Our Residential Process"
            description="From first consultation to final installation, we make the process simple and stress-free."
            subheadingColor="text-amber-600"
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="relative inline-flex items-center justify-center h-16 w-16 rounded-full bg-brand text-white mb-4">
                  {step.icon}
                  <span className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subheading="Happy Homeowners"
            title="What Our Clients Say"
            subheadingColor="text-amber-600"
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {residentialTestimonials.map((testimonial) => (
              <div
                key={testimonial.author}
                className="bg-white p-8 rounded-xl shadow-sm border border-slate-100"
              >
                <Quote className="h-8 w-8 text-amber-500 mb-4" />
                <p className="text-slate-700 text-lg leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="pt-4 border-t border-slate-100">
                  <p className="font-bold text-slate-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-slate-500">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subheading="Investment Guide"
            title="Pricing Estimates"
            description="Transparent pricing to help you plan your project. Final pricing requires detailed measurements and specification review."
            subheadingColor="text-amber-600"
            className="mb-12"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {pricingCategories.map((category) => (
              <div
                key={category.name}
                className="border border-slate-200 p-5 rounded-lg bg-white shadow-sm hover:border-amber-200 transition-colors"
              >
                <span className="block text-sm text-slate-500 mb-1 font-medium uppercase tracking-wide">
                  {category.name}
                </span>
                <span className="block text-2xl font-bold text-brand mb-1">
                  {category.price}
                </span>
                <span className="text-xs text-slate-400">{category.unit}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 italic text-center mt-6">
            *Prices are estimates only. Final pricing requires detailed
            measurements and specification review.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Home?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            From a single shower enclosure to a whole-home glass package, we
            bring commercial-grade precision to every residential project.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              variant="secondary"
              className="shadow-lg shadow-amber-500/20"
            >
              Request a Quote
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
