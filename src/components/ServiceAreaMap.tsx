import React, { useEffect, useState, useRef } from 'react';
import { MapPin, CheckCircle, Building2, Users, Briefcase } from 'lucide-react';
interface RegionData {
  name: string;
  projects: number;
  value: string;
  cx: number;
  cy: number;
}
export function ServiceAreaMap() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
  const regions: RegionData[] = [
  {
    name: 'Los Angeles County',
    projects: 150,
    value: '$25M+',
    cx: 200,
    cy: 280
  },
  {
    name: 'Ventura County',
    projects: 35,
    value: '$8M+',
    cx: 170,
    cy: 240
  },
  {
    name: 'Santa Barbara County',
    projects: 20,
    value: '$5M+',
    cx: 150,
    cy: 200
  },
  {
    name: 'Bay Area',
    projects: 45,
    value: '$12M+',
    cx: 180,
    cy: 140
  },
  {
    name: 'Orange County',
    projects: 60,
    value: '$15M+',
    cx: 230,
    cy: 300
  },
  {
    name: 'San Diego County',
    projects: 40,
    value: '$10M+',
    cx: 250,
    cy: 340
  }];

  const secondaryStates = [
  {
    name: 'Oregon',
    abbr: 'OR',
    projects: 8
  },
  {
    name: 'Nevada',
    abbr: 'NV',
    projects: 12
  },
  {
    name: 'Arizona',
    abbr: 'AZ',
    projects: 15
  }];

  const getRegionByCoords = (
  cx: number,
  cy: number)
  : RegionData | undefined => {
    return regions.find((r) => r.cx === cx && r.cy === cy);
  };
  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Interactive Map Visualization */}
          <div
            className={`relative order-2 lg:order-1 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>

            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Background Circle with pulse */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-50 rounded-full">
                <div
                  className={`absolute inset-4 border-2 border-dashed border-slate-200 rounded-full ${isVisible ? 'animate-spin-slow' : ''}`}
                  style={{
                    animationDuration: '60s'
                  }}>
                </div>
              </div>

              {/* California Shape (Stylized) */}
              <svg
                viewBox="0 0 400 400"
                className="absolute inset-0 w-full h-full">

                <defs>
                  <filter
                    id="glow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%">

                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient
                    id="mapGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%">

                    <stop offset="0%" stopColor="#1e3a5f" />
                    <stop offset="100%" stopColor="#2d4a6f" />
                  </linearGradient>
                </defs>

                {/* California outline */}
                <path
                  d="M180 60 L220 55 L240 70 L250 100 L260 140 L270 180 L280 220 L290 260 L285 300 L270 330 L240 350 L200 355 L160 340 L140 310 L130 270 L125 230 L130 190 L140 150 L150 110 L160 80 Z"
                  fill="url(#mapGradient)"
                  filter="url(#glow)"
                  className={`transition-all duration-1000 ${isVisible ? 'opacity-90' : 'opacity-0'}`} />


                {/* Interactive City markers */}
                {regions.map((region, index) =>
                <g
                  key={region.name}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredRegion(region.name)}
                  onMouseLeave={() => setHoveredRegion(null)}>

                    {/* Pulse ring */}
                    <circle
                    cx={region.cx}
                    cy={region.cy}
                    r={hoveredRegion === region.name ? 20 : 12}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    opacity={hoveredRegion === region.name ? 0.5 : 0}
                    className="transition-all duration-300" />

                    {/* Main marker */}
                    <circle
                    cx={region.cx}
                    cy={region.cy}
                    r={hoveredRegion === region.name ? 10 : 7}
                    fill="#f59e0b"
                    className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      transitionDelay: `${index * 100 + 500}ms`
                    }} />

                    {/* Inner dot */}
                    <circle
                    cx={region.cx}
                    cy={region.cy}
                    r="3"
                    fill="white"
                    className={`transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      transitionDelay: `${index * 100 + 600}ms`
                    }} />

                  </g>
                )}

                {/* HQ Marker */}
                <g
                  transform="translate(190, 260)"
                  className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    transitionDelay: '800ms'
                  }}>

                  <circle
                    r="16"
                    fill="white"
                    stroke="#1e3a5f"
                    strokeWidth="3"
                    className="drop-shadow-lg" />

                  <circle r="8" fill="#1e3a5f" />
                  <circle r="4" fill="#f59e0b" />
                </g>
              </svg>

              {/* Tooltip */}
              {hoveredRegion &&
              <div
                className="absolute bg-white shadow-2xl rounded-xl px-4 py-3 border border-slate-200 z-20 pointer-events-none animate-fade-in"
                style={{
                  left: '50%',
                  top: '20%',
                  transform: 'translateX(-50%)'
                }}>

                  <p className="text-sm font-bold text-[#1e3a5f] mb-1">
                    {hoveredRegion}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3 text-amber-500" />
                      {
                    regions.find((r) => r.name === hoveredRegion)?.projects
                    }{' '}
                      projects
                    </span>
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3 w-3 text-green-500" />
                      {regions.find((r) => r.name === hoveredRegion)?.value}
                    </span>
                  </div>
                </div>
              }

              {/* HQ Label */}
              <div
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-12' : 'opacity-0 translate-y-16'}`}
                style={{
                  transitionDelay: '900ms'
                }}>

                <div className="bg-white shadow-lg rounded-lg px-4 py-2 border border-slate-200">
                  <p className="text-xs font-semibold text-slate-500 uppercase">
                    Headquarters
                  </p>
                  <p className="text-sm font-bold text-[#1e3a5f]">
                    Chatsworth, CA
                  </p>
                </div>
              </div>

              {/* Secondary States Labels */}
              <div className="absolute top-8 right-4 flex flex-col gap-2">
                {secondaryStates.map((state, index) =>
                <div
                  key={state.abbr}
                  className={`bg-slate-100 rounded-full px-3 py-1.5 text-xs font-medium text-slate-600 border border-slate-200 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 transition-all duration-300 cursor-default ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                  style={{
                    transitionDelay: `${index * 100 + 1000}ms`
                  }}>

                    {state.abbr} • {state.projects} projects
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            className={`order-1 lg:order-2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
            style={{
              transitionDelay: '200ms'
            }}>

            <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-2">
              Coverage Area
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Serving California & Beyond
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Based in Chatsworth, we serve projects throughout California with
              extended coverage into Oregon, Nevada, and Arizona for larger
              commercial projects.
            </p>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-amber-500" />
                Primary Service Regions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {regions.map((region, index) =>
                <div
                  key={region.name}
                  className={`flex items-center gap-2 text-slate-700 p-2 rounded-lg transition-all duration-300 cursor-default ${hoveredRegion === region.name ? 'bg-amber-50 text-amber-700' : 'hover:bg-slate-50'} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={{
                    transitionDelay: `${index * 50 + 400}ms`
                  }}
                  onMouseEnter={() => setHoveredRegion(region.name)}
                  onMouseLeave={() => setHoveredRegion(null)}>

                    <CheckCircle
                    className={`h-4 w-4 flex-shrink-0 transition-colors duration-300 ${hoveredRegion === region.name ? 'text-amber-500' : 'text-green-500'}`} />

                    <span className="text-sm font-medium">{region.name}</span>
                  </div>
                )}
              </div>
            </div>

            <div
              className={`bg-slate-50 rounded-xl p-6 border border-slate-100 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{
                transitionDelay: '700ms'
              }}>

              <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">
                Extended Coverage
              </h3>
              <div className="flex flex-wrap gap-3">
                {secondaryStates.map((state) =>
                <span
                  key={state.abbr}
                  className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:border-amber-300 hover:bg-amber-50 transition-all duration-300 cursor-default">

                    {state.name}
                    <span className="text-xs text-amber-600 font-bold">
                      {state.projects}
                    </span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-3">
                Available for projects $100K+ in secondary markets
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 60s linear infinite;
        }
      `}</style>
    </section>);

}