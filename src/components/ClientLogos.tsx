import React from 'react';

const clients = [
  { name: 'A&R Construction', logo: '/images/clients/a-and-r-construction.avif' },
  { name: 'Forza Construction', logo: '/images/clients/forza-construction.avif' },
  { name: 'Canfield Development', logo: '/images/clients/canfield-development.svg' },
  { name: 'IMT Residential', logo: '/images/clients/imt-residential.svg' },
  { name: 'RC Pacific Construction', logo: '/images/clients/rc-pacific-construction.svg' },
  { name: 'Westside Contractors', logo: '/images/clients/westside-contractors.svg' },
  { name: 'Gluck Building Company', logo: '/images/clients/gluck-building.gif' },
  { name: 'T. Violé Construction', logo: '/images/clients/tviole-span-construction.jpg' },
  { name: 'Intertex Companies', logo: '/images/clients/intertex-companies.png' },
  { name: 'Walton Construction', logo: '/images/clients/walton-construction.webp', invert: true },
];

export function ClientLogos(): React.JSX.Element {
  // Double the array for seamless infinite scroll
  const doubledClients = [...clients, ...clients];
  return (
    <section className="py-12 bg-white border-y border-slate-100 overflow-hidden">
      <div className="text-center mb-8">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
          Trusted by Leading Contractors and Developers
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative group">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling Track */}
        <div
          className="flex gap-16 items-center animate-marquee group-hover:[animation-play-state:paused]"
          style={{
            width: 'max-content'
          }}>

          {doubledClients.map((client, index) =>
          <div
            key={`${client.name}-${index}`}
            className="flex items-center justify-center px-4 py-2">

              <img
                src={client.logo}
                alt={client.name}
                className={`h-12 w-auto max-w-[180px] object-contain opacity-70 hover:opacity-100 transition-all duration-300${
                  'invert' in client && client.invert ? ' invert' : ''
                }`}
              />
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
