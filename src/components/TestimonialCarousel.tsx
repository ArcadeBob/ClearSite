import React, { useEffect, useState, useRef } from 'react';
import { Quote, User } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

const CAROUSEL_INTERVAL_MS = 5000;

interface Testimonial {
  quote: string;
  name: string;
  company: string;
  role: string;
}

const testimonials: Testimonial[] = [
{
  quote:
  "CGI delivered our 12-location rollout on schedule with zero punch items. That's unheard of in this industry.",
  name: 'Mike Chen',
  company: 'Balfour Beatty',
  role: 'Senior PM'
},
{
  quote:
  'Their submittals are always clean and complete. Saves us weeks of back-and-forth.',
  name: 'Sarah Martinez',
  company: 'Turner Construction',
  role: 'Project Engineer'
},
{
  quote:
  "Best glazing sub we've worked with in 20 years. They actually show up every day.",
  name: 'Tom Rodriguez',
  company: 'Swinerton',
  role: 'Superintendent'
},
{
  quote: 'The 24-hour RFI turnaround is real. Makes my job so much easier.',
  name: 'Jennifer Park',
  company: 'Clark Construction',
  role: 'PM'
}];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  useEffect(() => {
    if (isPaused) return;
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, CAROUSEL_INTERVAL_MS);
    return () => {
      resetTimeout();
    };
  }, [currentIndex, isPaused]);
  return (
    <section
      className="py-24 bg-slate-50 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subheading="What GCs Are Saying"
          title="Trusted by Top Project Managers"
          className="mb-12"
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Quote Icon Background */}
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
            <Quote className="h-48 w-48 text-slate-900" />
          </div>

          <div className="relative min-h-[280px] flex items-center justify-center">
            {testimonials.map((testimonial, index) =>
            <div
              key={index}
              className={`
                  absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-500 ease-out
                  ${index === currentIndex ? 'opacity-100 translate-y-0 scale-100 z-10' : 'opacity-0 translate-y-4 scale-98 z-0 pointer-events-none'}
                `}>

                <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-slate-100 w-full">
                  <div className="flex justify-center mb-6">
                    <div className="h-10 w-10 bg-accent/10 rounded-full flex items-center justify-center">
                      <Quote className="h-5 w-5 text-accent" />
                    </div>
                  </div>

                  <blockquote className="text-xl md:text-2xl font-medium text-slate-800 mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="flex items-center justify-center gap-3 pt-6 border-t border-slate-100">
                    <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-slate-900 text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-slate-500">
                        <span className="text-accent font-medium">
                          {testimonial.company}
                        </span>
                        {' · '}
                        <span>{testimonial.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) =>
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`
                  h-2 rounded-full transition-all duration-300 
                  ${index === currentIndex ? 'w-6 bg-accent' : 'w-2 bg-slate-300 hover:bg-slate-400'}
                `}
              aria-label={`Go to testimonial ${index + 1}`} />

            )}
          </div>
        </div>
      </div>
    </section>);

}