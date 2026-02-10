import React from 'react';
export function ClientLogos() {
  const clients = [
  '7-Eleven',
  'LAUSD',
  'Planet Fitness',
  'Buffalo Wild Wings',
  'Del Taco',
  'Ross',
  'Taco Bell',
  'TJ Maxx',
  'Starbucks',
  'Family Dollar'];

  // Double the array for seamless infinite scroll
  const doubledClients = [...clients, ...clients];
  return (
    <section className="py-12 bg-white border-y border-slate-100 overflow-hidden">
      <div className="text-center mb-8">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
          Trusted by Leading Brands
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative group">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling Track */}
        <div
          className="flex gap-16 animate-marquee group-hover:[animation-play-state:paused]"
          style={{
            width: 'max-content'
          }}>

          {doubledClients.map((client, index) =>
          <div
            key={`${client}-${index}`}
            className="flex items-center justify-center px-4 py-2">

              <span className="text-slate-400 font-bold text-xl whitespace-nowrap tracking-wide hover:text-[#1e3a5f] transition-colors duration-300 cursor-default">
                {client}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>);

}