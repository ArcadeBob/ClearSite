import React, { useState } from 'react';
import {
  MapPin,
  DollarSign,
  Layers,
  ArrowUpRight,
  CheckCircle } from
'lucide-react';
interface ProjectCardProps {
  title: string;
  location: string;
  client: string;
  value: string;
  scope: string;
  imageUrl?: string;
  status?: 'Completed' | 'Current' | 'Future';
}
export function ProjectCard({
  title,
  location,
  client,
  value,
  scope,
  imageUrl = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  status = 'Completed'
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const statusColors = {
    Completed: 'bg-green-500 text-white',
    Current: 'bg-[#2563eb] text-white',
    Future: 'bg-[#1e3a5f] text-white'
  };
  return (
    <div
      className="group h-full flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ?
        'perspective(1000px) rotateX(2deg) translateY(-8px)' :
        'perspective(1000px) rotateX(0deg) translateY(0px)'
      }}>

      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-slate-200">
        <img
          src={imageUrl}
          alt={title}
          className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-110 blur-[2px]' : 'scale-100'}`} />


        {/* Overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[#1e3a5f] via-[#1e3a5f]/60 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>

          {/* Quick Stats Overlay */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-500 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>

            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-[#2563eb]" />
                <span className="text-2xl font-bold">{value}</span>
              </div>
              <div className="flex items-center gap-1 text-[#2563eb]">
                <span className="text-sm font-medium">View Details</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className={`absolute top-4 right-4 transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-90'}`}>

          <span
            className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg ${statusColors[status]}`}>

            {status === 'Completed' && <CheckCircle className="h-3 w-3" />}
            {status}
          </span>
        </div>

        {/* Shine Effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-700 ${isHovered ? 'translate-x-full' : '-translate-x-full'}`}
          style={{
            transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)'
          }}>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3
          className={`text-xl font-bold mb-1 transition-colors duration-300 ${isHovered ? 'text-[#1e3a5f]' : 'text-slate-900'}`}>

          {title}
        </h3>
        <div className="flex items-center text-slate-500 text-sm mb-4">
          <MapPin
            className={`h-4 w-4 mr-1 transition-colors duration-300 ${isHovered ? 'text-[#2563eb]' : 'text-slate-400'}`} />

          {location}
        </div>

        <div className="space-y-3 mt-auto">
          <div
            className={`flex justify-between text-sm border-b pb-2 transition-colors duration-300 ${isHovered ? 'border-blue-200' : 'border-slate-100'}`}>

            <span className="text-slate-500">Client</span>
            <span className="font-medium text-slate-900 text-right">
              {client}
            </span>
          </div>
          <div
            className={`flex justify-between text-sm border-b pb-2 transition-colors duration-300 ${isHovered ? 'border-blue-200' : 'border-slate-100'}`}>

            <span className="text-slate-500 flex items-center">
              <DollarSign className="h-3.5 w-3.5 mr-1" /> Value
            </span>
            <span
              className={`font-bold transition-colors duration-300 ${isHovered ? 'text-[#2563eb]' : 'text-slate-900'}`}>

              {value}
            </span>
          </div>
          <div className="flex justify-between text-sm pt-1">
            <span className="text-slate-500 flex items-center">
              <Layers className="h-3.5 w-3.5 mr-1" /> Scope
            </span>
            <span
              className="font-medium text-slate-900 text-right max-w-[60%] truncate"
              title={scope}>

              {scope}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div
        className={`h-1 bg-gradient-to-r from-[#1e3a5f] via-[#2563eb] to-[#1e3a5f] transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
      </div>
    </div>);

}