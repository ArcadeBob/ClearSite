import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
}
export function ServiceCard({
  title,
  description,
  icon,
  link
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="group h-full flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 hover:border-[#2563eb]/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>

      <div className="p-6 flex-1 flex flex-col relative">
        {/* Background Gradient on Hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        </div>

        <div className="relative z-10">
          {/* Icon Container */}
          <div
            className={`h-14 w-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 ${isHovered ? 'bg-[#1e3a5f] text-white shadow-lg shadow-[#1e3a5f]/30 scale-110' : 'bg-slate-100 text-[#1e3a5f]'}`}>

            <div
              className={`transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>

              {icon}
            </div>
          </div>

          <h3
            className={`text-xl font-bold mb-3 transition-colors duration-300 ${isHovered ? 'text-[#1e3a5f]' : 'text-slate-900'}`}>

            {title}
          </h3>
          <p className="text-slate-600 mb-4 flex-1 leading-relaxed">
            {description}
          </p>

          {link ?
          <Link
            to={link}
            className={`inline-flex items-center font-semibold transition-all duration-300 ${isHovered ? 'text-[#2563eb] translate-x-1' : 'text-[#1e3a5f]'}`}>

              Learn more
              <ArrowRight
              className={`ml-1 h-4 w-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />

            </Link> :

          <div
            className={`inline-flex items-center text-sm font-medium transition-all duration-300 ${isHovered ? 'text-[#2563eb] opacity-100' : 'text-slate-400 opacity-0'}`}>

              <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb] mr-2"></span>
              Available
            </div>
          }
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className={`h-1 bg-gradient-to-r from-[#1e3a5f] via-[#2563eb] to-[#1e3a5f] transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
      </div>
    </div>);

}