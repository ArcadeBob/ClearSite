import React, { useEffect, useState, useRef } from 'react';
import { FileText, MapPin, CalendarCheck, FileCheck, Factory, Wrench, CheckCircle } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { useOnceInView } from '../hooks/useOnceInView';

const DESKTOP_STAGGER_MS = 200;
const DESKTOP_STAGGER_BASE_MS = 300;
const MOBILE_STAGGER_MS = 150;
const MOBILE_STAGGER_BASE_MS = 200;

function StepIcon({
  icon,
  index,
  isActive,
  numberDelay,
  size,
}: {
  icon: React.ReactNode;
  index: number;
  isActive: boolean;
  numberDelay: string;
  size: 'lg' | 'sm';
}) {
  const lg = size === 'lg';
  return (
    <>
      <div
        className={`${lg ? 'h-24 w-24 mb-4' : 'h-16 w-16'} rounded-full bg-white border-4 flex items-center justify-center shadow-lg transition-all duration-500 ${isActive ? `border-accent${lg ? ' scale-100' : ''}` : `border-slate-200${lg ? ' scale-90' : ''}`}`}>
        <div
          className={`${lg ? 'h-16 w-16' : 'h-10 w-10'} rounded-full flex items-center justify-center text-white transition-colors duration-500 ${isActive ? 'bg-accent' : 'bg-brand'}`}>
          {icon}
        </div>
      </div>
      <span
        className={`absolute ${lg ? '-top-2 -right-2 h-8 w-8 text-sm' : '-top-1 -right-1 h-6 w-6 text-xs'} rounded-full bg-brand text-white font-bold flex items-center justify-center shadow-md transition-all duration-500 ${isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
        style={{ transitionDelay: numberDelay }}>
        {index + 1}
      </span>
    </>
  );
}

const steps = [
  {
    icon: <FileText className="h-5 w-5" />,
    title: 'Budget Request',
    description: 'Send us your plans and specs — get a same-day budget you can plug into your estimate',
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: 'Site Assessment',
    description: 'We field-verify conditions early so there are no surprises or change orders down the road',
  },
  {
    icon: <CalendarCheck className="h-5 w-5" />,
    title: 'Scope & Schedule',
    description: 'Clear scope aligned to your master schedule — you know exactly what we are delivering and when',
  },
  {
    icon: <FileCheck className="h-5 w-5" />,
    title: 'Submittals & Approvals',
    description: 'Shop drawings submitted on your timeline with architect coordination handled for you',
  },
  {
    icon: <Factory className="h-5 w-5" />,
    title: 'Fabrication',
    description: 'Proactive lead time tracking with regular updates so you can plan around delivery dates',
  },
  {
    icon: <Wrench className="h-5 w-5" />,
    title: 'Installation',
    description: 'Daily progress updates, coordination with other trades, and a clean jobsite every day',
  },
  {
    icon: <CheckCircle className="h-5 w-5" />,
    title: 'Closeout & Warranty',
    description: 'Minimal punch list, as-built documentation, and a complete warranty package for turnover',
  },
];

export function ProcessTimeline(): React.JSX.Element {
  const [sectionRef, isVisible] = useOnceInView();
  const [lineProgress, setLineProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (!isVisible) return;
    let progress = 0;
    intervalRef.current = setInterval(() => {
      progress += 2;
      setLineProgress(Math.min(progress, 100));
      if (progress >= 100) clearInterval(intervalRef.current);
    }, 30);
    return () => clearInterval(intervalRef.current);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          variant="left-bar"
          subheading="Our Process"
          title="How We Work"
          description="A streamlined process designed for GC efficiency—from bid to closeout."
          className={`mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        />

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection Line - Animated */}
            <div className="absolute top-12 left-0 right-0 h-1 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand via-accent to-brand transition-all duration-1000 ease-out rounded-full"
                style={{
                  width: `${lineProgress}%`
                }}>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-4">
              {steps.map((step, index) =>
              <div
                key={step.title}
                className={`relative flex flex-col items-center text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{
                  transitionDelay: `${index * DESKTOP_STAGGER_MS + DESKTOP_STAGGER_BASE_MS}ms`
                }}>

                  {/* Step Number & Icon */}
                  <div className="relative z-10 flex flex-col items-center">
                    <StepIcon
                      icon={step.icon}
                      index={index}
                      isActive={isVisible && lineProgress > (index * 100) / steps.length}
                      numberDelay={`${index * DESKTOP_STAGGER_MS + DESKTOP_STAGGER_BASE_MS + 200}ms`}
                      size="lg"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-brand mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
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
                className="w-full bg-gradient-to-b from-brand via-accent to-brand transition-all duration-1000 ease-out"
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
                  transitionDelay: `${index * MOBILE_STAGGER_MS + MOBILE_STAGGER_BASE_MS}ms`
                }}>

                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <StepIcon
                      icon={step.icon}
                      index={index}
                      isActive={isVisible && lineProgress > (index * 100) / steps.length}
                      numberDelay={`${index * MOBILE_STAGGER_MS + MOBILE_STAGGER_BASE_MS + 200}ms`}
                      size="sm"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-brand">
                        {step.title}
                      </h3>
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