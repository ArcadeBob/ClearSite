import React, { useEffect, useState, useRef } from 'react';
import {
  FileText,
  MapPin,
  ClipboardList,
  Wrench,
  CheckCircle } from
'lucide-react';
import { SectionHeader } from './SectionHeader';

const LINE_PROGRESS_INCREMENT = 2;
const LINE_ANIMATION_INTERVAL_MS = 30;
const INTERSECTION_THRESHOLD = 0.2;
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

export function ProcessTimeline() {
  const [isVisible, setIsVisible] = useState(false);
  const [lineProgress, setLineProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          let progress = 0;
          intervalRef.current = setInterval(() => {
            progress += LINE_PROGRESS_INCREMENT;
            setLineProgress(Math.min(progress, 100));
            if (progress >= 100) clearInterval(intervalRef.current);
          }, LINE_ANIMATION_INTERVAL_MS);
          observer.disconnect();
        }
      },
      {
        threshold: INTERSECTION_THRESHOLD
      }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      observer.disconnect();
      clearInterval(intervalRef.current);
    };
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
        <SectionHeader
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

            <div className="grid grid-cols-5 gap-4">
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
                      isActive={isVisible && lineProgress > index * 25}
                      numberDelay={`${index * DESKTOP_STAGGER_MS + DESKTOP_STAGGER_BASE_MS + 200}ms`}
                      size="lg"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-2 leading-relaxed">
                    {step.description}
                  </p>
                  <span
                  className={`text-xs font-semibold text-accent bg-blue-50 px-3 py-1 rounded-full transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                  style={{
                    transitionDelay: `${index * DESKTOP_STAGGER_MS + DESKTOP_STAGGER_BASE_MS + 300}ms`
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
                      isActive={isVisible && lineProgress > index * 20}
                      numberDelay={`${index * MOBILE_STAGGER_MS + MOBILE_STAGGER_BASE_MS + 200}ms`}
                      size="sm"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">
                        {step.title}
                      </h3>
                      <span className="text-xs font-semibold text-accent bg-blue-50 px-2 py-0.5 rounded-full">
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