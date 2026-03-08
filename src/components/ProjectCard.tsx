import React, { useState } from 'react';
import {
  MapPin,
  DollarSign,
  Layers,
  CheckCircle,
  Clock,
  Building2,
  Maximize2,
  RotateCcw,
  Info } from
'lucide-react';

interface ProjectCardProps {
  title: string;
  location: string;
  client: string;
  value: string;
  scope: string;
  imageUrl?: string;
  status?: string;
  description?: string;
  systems?: string[];
  highlights?: string[];
  duration?: string;
  sqft?: string;
}

export function ProjectCard({
  title,
  location,
  client,
  value,
  scope,
  imageUrl = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  status,
  description,
  systems,
  highlights,
  duration,
  sqft,
}: ProjectCardProps): React.JSX.Element {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  };

  return (
    <div
      className="h-[420px] cursor-pointer"
      style={{ perspective: '1000px' }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${title}`}
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Inner rotating container */}
      <div
        className="relative w-full h-full transition-transform duration-600"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.6s ease-in-out',
        }}
      >
        {/* === FRONT FACE === */}
        <div
          className="absolute inset-0 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: isHovered && !isFlipped
              ? 'translateY(-4px)'
              : 'translateY(0px)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            boxShadow: isHovered && !isFlipped
              ? '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)'
              : '0 1px 3px rgba(0,0,0,0.1)',
          }}
        >
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden bg-slate-200 flex-shrink-0">
            <img
              src={imageUrl}
              alt={title}
              className={`w-full h-full object-cover transition-all duration-700 ${isHovered && !isFlipped ? 'scale-105' : 'scale-100'}`}
            />

            {/* Status Badge */}
            {status && (
              <div className="absolute top-3 right-3">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg ${
                  status === 'Completed' ? 'bg-green-500 text-white' :
                  status === 'Current' ? 'bg-accent text-white' :
                  'bg-slate-500 text-white'
                }`}>
                  <CheckCircle className="h-3 w-3" />
                  {status}
                </span>
              </div>
            )}

            {/* Flip hint on hover */}
            <div
              className={`absolute bottom-3 right-3 flex items-center gap-1 bg-brand/80 text-white text-xs px-2.5 py-1.5 rounded-full transition-all duration-300 ${
                isHovered && !isFlipped ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}
            >
              <Info className="h-3 w-3" />
              Tap for details
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col min-h-0">
            <h3 className="font-heading uppercase tracking-wide text-lg font-bold text-brand mb-1 leading-tight">
              {title}
            </h3>
            <div className="flex items-center text-slate-500 text-sm mb-3">
              <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400 flex-shrink-0" />
              {location}
            </div>

            <div className="space-y-2 mt-auto">
              <div className="flex justify-between text-sm border-b border-slate-100 pb-1.5">
                <span className="text-slate-500">Client</span>
                <span className="font-medium text-slate-900 text-right truncate ml-2">{client}</span>
              </div>
              <div className="flex justify-between text-sm border-b border-slate-100 pb-1.5">
                <span className="text-slate-500 flex items-center">
                  <DollarSign className="h-3.5 w-3.5 mr-0.5" /> Value
                </span>
                <span className="font-bold text-slate-900">{value}</span>
              </div>
              <div className="flex justify-between text-sm pt-0.5">
                <span className="text-slate-500 flex items-center">
                  <Layers className="h-3.5 w-3.5 mr-0.5" /> Scope
                </span>
                <span className="font-medium text-slate-900 text-right max-w-[60%] truncate" title={scope}>
                  {scope}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Accent Line */}
          <div className={`h-1 bg-gradient-to-r from-brand via-accent to-brand transition-opacity duration-500 ${isHovered && !isFlipped ? 'opacity-100' : 'opacity-0'}`} />
        </div>

        {/* === BACK FACE === */}
        <div
          className="absolute inset-0 bg-brand rounded-xl overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="h-full flex flex-col p-5 text-white">
            {/* Header */}
            <div className="mb-3">
              <h3 className="font-heading uppercase tracking-wide text-lg font-bold text-white leading-tight">
                {title}
              </h3>
              <div className="flex items-center text-white/60 text-sm mt-0.5">
                <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                {location}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-white/10 rounded-lg px-3 py-2">
                <div className="flex items-center gap-1.5 text-white/60 text-xs mb-0.5">
                  <DollarSign className="h-3 w-3" /> Value
                </div>
                <div className="text-sm font-bold">{value}</div>
              </div>
              {duration && (
                <div className="bg-white/10 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-1.5 text-white/60 text-xs mb-0.5">
                    <Clock className="h-3 w-3" /> Duration
                  </div>
                  <div className="text-sm font-bold">{duration}</div>
                </div>
              )}
              {sqft && (
                <div className="bg-white/10 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-1.5 text-white/60 text-xs mb-0.5">
                    <Maximize2 className="h-3 w-3" /> Area
                  </div>
                  <div className="text-sm font-bold">{sqft}</div>
                </div>
              )}
              <div className="bg-white/10 rounded-lg px-3 py-2">
                <div className="flex items-center gap-1.5 text-white/60 text-xs mb-0.5">
                  <Building2 className="h-3 w-3" /> GC Partner
                </div>
                <div className="text-sm font-bold truncate" title={client}>{client}</div>
              </div>
            </div>

            {/* Description */}
            {description && (
              <p className="text-sm text-white/80 mb-3 line-clamp-2">
                {description}
              </p>
            )}

            {/* Glazing Systems */}
            {systems && systems.length > 0 && (
              <div className="mb-3">
                <div className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                  Glazing Systems
                </div>
                <div className="flex flex-wrap gap-1">
                  {systems.map((system) => (
                    <span
                      key={system}
                      className="bg-white/10 text-white/90 text-xs px-2 py-0.5 rounded"
                    >
                      {system}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights */}
            {highlights && highlights.length > 0 && (
              <div className="mb-3 flex-1 min-h-0">
                <div className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
                  Highlights
                </div>
                <ul className="space-y-1">
                  {highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-1.5 text-xs text-white/80">
                      <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-0.5" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Flip Back Button */}
            <button
              className="mt-auto flex items-center justify-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors py-1.5"
              onClick={(e) => {
                e.stopPropagation();
                handleFlip();
              }}
              aria-label={`Flip back to front of ${title} card`}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Flip Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
