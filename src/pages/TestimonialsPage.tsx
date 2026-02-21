import React from 'react';
import { Card } from '../components/ui/Card';
import { Quote, Star, Building2 } from 'lucide-react';
export function TestimonialsPage() {
  const testimonials = [
  {
    text: 'We just moved our fitness business into our new Northridge location. Clean Glass Installation was not only very professional but everything was handled in a timely manner helping us open by our deadline. Not only did we open on time but Daniel the owner showed us some other options to help enhance the look of our entrance to our aerobic room. Highly recommend to anyone looking for good service, speed, and efficiency.',
    author: 'T.Y.',
    location: 'Los Angeles',
    featured: true
  },
  {
    text: 'Thank you for bringing this one home! Excellent finished product.',
    author: 'Mike Cook',
    company: 'Smith and Severson',
    role: 'Project Manager',
    featured: true
  },
  {
    text: 'I just wanted to let you know that the job came out really nice! Very happy with the work, thank you very much looking forward to working with you guys again.',
    author: 'Fulcrum Construction',
    featured: true
  },
  {
    text: 'I would like to recommend a company that I have worked with extensively in the past. Clean Glass Installations. They have always done a great job for me and are always reliable and professional.',
    author: 'Johnstone Moyer Inc.',
    featured: false
  },
  {
    text: 'Would recommend this company to everyone!',
    author: 'C.F.',
    featured: false
  },
  {
    text: 'Went above and beyond fantastic all around highly recommend!',
    author: 'N.M.',
    location: 'Los Angeles',
    featured: false
  },
  {
    text: 'They were really nice, accommodating and easy to work with. Highly recommend!',
    author: 'J.K.',
    location: 'Los Angeles, CA',
    featured: false
  },
  {
    text: 'Company did a perfect job. Thank you very much',
    author: 'V.S.',
    location: 'West Hills, CA',
    featured: false
  }];

  const clients = [
  '7-Eleven',
  'Logix Smarter Banking',
  'LAUSD',
  'Clay Lacy',
  'Buffalo Wild Wings',
  'Del Taco',
  'Ross',
  'Planet Fitness',
  'Family Dollar',
  'Taco Bell',
  'TJ Maxx',
  'Starbucks'];

  const suppliers = [
  'Oldcastle',
  'NanaWall',
  'Kingspan',
  'Glasswerks',
  'Fleetwood',
  'Von Duprin',
  'Western Integrated',
  'TPG Fire Rated',
  'Supersky'];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-brand text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Client Testimonials</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Our promise: A committed crew every day until completion,
            transparent scheduling, honest updates, and no punch-list at the
            end.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
            <Star className="h-6 w-6 text-amber-500 fill-amber-500" />
            Featured Reviews
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testimonials.
            filter((t) => t.featured).
            map((t, i) =>
            <Card
              key={i}
              className="p-8 bg-white border-l-4 border-l-amber-500">

                  <Quote className="h-8 w-8 text-amber-500 mb-4" />
                  <p className="text-slate-700 text-lg leading-relaxed mb-6 italic">
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-slate-600">
                        {t.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{t.author}</p>
                      {t.company &&
                  <p className="text-sm text-slate-500">{t.company}</p>
                  }
                      {t.role &&
                  <p className="text-xs text-amber-600">{t.role}</p>
                  }
                      {t.location &&
                  <p className="text-sm text-slate-500">{t.location}</p>
                  }
                    </div>
                  </div>
                </Card>
            )}
          </div>
        </div>

        {/* Other Testimonials */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            More Happy Clients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.
            filter((t) => !t.featured).
            map((t, i) =>
            <Card key={i} className="p-6 bg-white h-full flex flex-col">
                  <Quote className="h-5 w-5 text-slate-300 mb-3" />
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1 italic">
                    "{t.text}"
                  </p>
                  <div className="pt-4 border-t border-slate-100">
                    <p className="font-semibold text-slate-900 text-sm">
                      {t.author}
                    </p>
                    {t.location &&
                <p className="text-xs text-slate-500">{t.location}</p>
                }
                  </div>
                </Card>
            )}
          </div>
        </div>

        {/* Clients Section */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Trusted By Leading Brands
            </h2>
            <p className="text-slate-600">
              We've completed projects for businesses across retail, restaurant,
              fitness, and more.
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {clients.map((client) =>
            <Card
              key={client}
              className="p-4 flex items-center justify-center text-center h-20 bg-white hover:border-amber-200 transition-colors group"
              hover>

                <span className="font-semibold text-slate-600 text-sm group-hover:text-brand transition-colors">
                  {client}
                </span>
              </Card>
            )}
          </div>
        </div>

        {/* Suppliers Section */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Our Supplier Partners
            </h2>
            <p className="text-slate-600">
              We work with the best manufacturers and suppliers in the industry.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {suppliers.map((supplier) =>
            <div
              key={supplier}
              className="px-6 py-3 bg-slate-100 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors">

                {supplier}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);

}