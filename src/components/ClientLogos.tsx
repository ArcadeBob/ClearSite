import React from 'react';

const clients: { name: string; logo: string; invert?: boolean }[] = [
  { name: 'A&R Construction', logo: '/images/clients/a-and-r-construction.avif' },
  { name: 'Forza Construction', logo: '/images/clients/forza-construction.avif' },
  { name: 'Canfield Development', logo: '/images/clients/canfield-development.svg' },
  { name: 'IMT Residential', logo: '/images/clients/imt-residential.svg' },
  { name: 'RC Pacific Construction', logo: '/images/clients/rc-pacific-construction.svg' },
  { name: 'Westside Contractors', logo: '/images/clients/westside-contractors.svg' },
  { name: 'Gluck Building Company', logo: '/images/clients/gluck-building.gif' },
  { name: 'T. Viole Construction', logo: '/images/clients/tviole-span-construction.jpg' },
  { name: 'Intertex Companies', logo: '/images/clients/intertex-companies.png' },
  { name: 'Walton Construction', logo: '/images/clients/walton-construction.webp', invert: true },
];

export function ClientLogos(): React.JSX.Element {
  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider">
            Trusted By
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex flex-col items-center justify-center border border-slate-200 rounded-lg p-6 bg-white hover:shadow-md transition-all duration-300 group"
            >
              <img
                src={client.logo}
                alt={client.name}
                className={`h-12 w-auto max-w-[160px] object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300${client.invert ? ' invert' : ''}`}
              />
              <span className="text-xs text-slate-400 mt-2 text-center">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
