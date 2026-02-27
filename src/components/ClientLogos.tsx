import React from 'react';
export function ClientLogos() {
  const clients = [
  { name: '7-Eleven', logo: 'https://logo.clearbit.com/7-eleven.com' },
  { name: 'LAUSD', logo: 'https://logo.clearbit.com/lausd.net' },
  { name: 'Planet Fitness', logo: 'https://logo.clearbit.com/planetfitness.com' },
  { name: 'Buffalo Wild Wings', logo: 'https://logo.clearbit.com/buffalowildwings.com' },
  { name: 'Del Taco', logo: 'https://logo.clearbit.com/deltaco.com' },
  { name: 'Ross', logo: 'https://logo.clearbit.com/rossstores.com' },
  { name: 'Taco Bell', logo: 'https://logo.clearbit.com/tacobell.com' },
  { name: 'TJ Maxx', logo: 'https://logo.clearbit.com/tjmaxx.tjx.com' },
  { name: 'Starbucks', logo: 'https://logo.clearbit.com/starbucks.com' },
  { name: 'Family Dollar', logo: 'https://logo.clearbit.com/familydollar.com' }];

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
                className="h-10 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                onError={(e) => {
                  // Fallback to text if logo fails to load
                  const target = e.currentTarget;
                  const parent = target.parentElement;
                  if (parent) {
                    const span = document.createElement('span');
                    span.className = 'text-slate-400 font-bold text-xl whitespace-nowrap tracking-wide hover:text-brand transition-colors duration-300 cursor-default';
                    span.textContent = client.name;
                    parent.replaceChild(span, target);
                  }
                }}
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