import React, { useEffect, useState, useRef } from 'react';
import {
  FileText,
  MapPin,
  ClipboardList,
  Wrench,
  CheckCircle } from
'lucide-react';
export function ProcessTimeline() {
  const [isVisible, setIsVisible] = useState(false);
  const [lineProgress, setLineProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate line progress
          let progress = 0;
          const interval = setInterval(() => {
            progress += 2;
            setLineProgress(Math.min(progress, 100));
            if (progress >= 100) clearInterval(interval);
          }, 30);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2
      }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  const steps = [
  {
    icon: <FileText className="h-5 w-5" />,
    title: 'Bid Request',
    description: 'Submit plans & specs for same-day quote turnaround',
    duration: 'Day 1'
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: 'Site Visit',
    description: 'On-site assessment and field measurements',
    duration: 'Days 2-3'
  },
  {
    icon: <ClipboardList className="h-5 w-5" />,
    title: 'Detailed Proposal',
    description: 'Comprehensive scope, schedule, and pricing',
    duration: 'Days 4-5'
  },
  {
    icon: <Wrench className="h-5 w-5" />,
    title: 'Installation',
    description: 'Professional execution with daily progress updates',
    duration: 'Per Schedule'
  },
  {
    icon: <CheckCircle className="h-5 w-5" />,
    title: 'Closeout',
    description: 'Final inspection, punch list, and warranty docs',
    duration: 'Completion'
  }];

  return (
    <section ref={sectionRef} className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          <p className="text-sm font-semibold text-[#2563eb] uppercase tracking-wider mb-2">
            Our Process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            How We Work
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A streamlined process designed for GC efficiency—from bid to
            closeout.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection Line - Animated */}
            <div className="absolute top-12 left-0 right-0 h-1 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#1e3a5f] via-[#2563eb] to-[#1e3a5f] transition-all duration-1000 ease-out rounded-full"
                style={{
                  width: `${lineProgress}%`
                }}>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-4">
              {steps.map((step, index) =>
              <div
                key={step.title}
                className={`relative flex flex-col items-center text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{
                  transitionDelay: `${index * 200 + 300}ms`
                }}>

                  {/* Step Number & Icon */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div
                    className={`h-24 w-24 rounded-full bg-white border-4 flex items-center justify-center shadow-lg mb-4 transition-all duration-500 ${isVisible && lineProgress > index * 25 ? 'border-[#2563eb] scale-100' : 'border-slate-200 scale-90'}`}>

                      <div
                      className={`h-16 w-16 rounded-full flex items-center justify-center text-white transition-all duration-500 ${isVisible && lineProgress > index * 25 ? 'bg-[#2563eb]' : 'bg-[#1e3a5f]'}`}>

                        {step.icon}
                      </div>
                    </div>
                    <span
                    className={`absolute -top-2 -right-2 h-8 w-8 rounded-full bg-[#1e3a5f] text-white text-sm font-bold flex items-center justify-center shadow-md transition-all duration-500 ${isVisible && lineProgress > index * 25 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                    style={{
                      transitionDelay: `${index * 200 + 500}ms`
                    }}>

                      {index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-2 leading-relaxed">
                    {step.description}
                  </p>
                  <span
                  className={`text-xs font-semibold text-[#2563eb] bg-blue-50 px-3 py-1 rounded-full transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                  style={{
                    transitionDelay: `${index * 200 + 600}ms`
                  }}>

                    {step.duration}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical Line - Animated */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="w-full bg-gradient-to-b from-[#1e3a5f] via-[#2563eb] to-[#1e3a5f] transition-all duration-1000 ease-out"
                style={{
                  height: `${lineProgress}%`
                }}>
              </div>
            </div>

            <div className="space-y-8">
              {steps.map((step, index) =>
              <div
                key={step.title}
                className={`relative flex gap-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                style={{
                  transitionDelay: `${index * 150 + 200}ms`
                }}>

                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                    className={`h-16 w-16 rounded-full bg-white border-4 flex items-center justify-center shadow-lg transition-all duration-500 ${isVisible && lineProgress > index * 20 ? 'border-[#2563eb]' : 'border-slate-200'}`}>

                      <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center text-white transition-colors duration-500 ${isVisible && lineProgress > index * 20 ? 'bg-[#2563eb]' : 'bg-[#1e3a5f]'}`}>

                        {step.icon}
                      </div>
                    </div>
                    <span
                    className={`absolute -top-1 -right-1 h-6 w-6 rounded-full bg-[#1e3a5f] text-white text-xs font-bold flex items-center justify-center shadow-md transition-all duration-500 ${isVisible && lineProgress > index * 20 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                    style={{
                      transitionDelay: `${index * 150 + 400}ms`
                    }}>

                      {index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">
                        {step.title}
                      </h3>
                      <span className="text-xs font-semibold text-[#2563eb] bg-blue-50 px-2 py-0.5 rounded-full">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{step.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}