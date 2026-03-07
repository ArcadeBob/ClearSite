import React, { useState } from 'react';
interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  bullets?: string[];  // Technical capability bullets -- optional for backward compat
}
export function ServiceCard({
  title,
  description,
  icon,
  bullets,
}: ServiceCardProps): React.JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="group h-full flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-brand/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>

      <div className="p-6 flex-1 flex flex-col relative">
        {/* Background Gradient on Hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        </div>

        <div className="relative z-10">
          {/* Icon Container */}
          <div
            className={`h-14 w-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 ${isHovered ? 'bg-brand text-white shadow-lg shadow-brand/30 scale-110' : 'bg-slate-100 text-brand'}`}>

            <div
              className={`transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>

              {icon}
            </div>
          </div>

          <h3
            className={`font-heading uppercase tracking-wide text-xl font-bold mb-3 transition-colors duration-300 ${isHovered ? 'text-brand' : 'text-brand'}`}>

            {title}
          </h3>
          <p className="text-slate-600 mb-4 flex-1 leading-relaxed">
            {description}
          </p>

          {bullets && bullets.length > 0 && (
            <ul className="mt-3 space-y-1.5 border-t border-slate-100 pt-3">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-1.5 text-xs text-slate-500 leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>
          )}

          <div
            className={`inline-flex items-center text-sm font-medium transition-all duration-300 ${isHovered ? 'text-accent opacity-100' : 'text-slate-400 opacity-0'}`}>

              <span className="h-1.5 w-1.5 rounded-full bg-accent mr-2"></span>
              Available
            </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className={`h-1 bg-gradient-to-r from-brand via-accent to-brand transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
      </div>
    </div>);

}