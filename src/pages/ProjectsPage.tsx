import React, { useState } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { Button } from '../components/ui/Button';
import { FolderOpen } from 'lucide-react';

const caseStudySlugs: Record<string, string> = {
  'Cabrillo Business Park': 'cabrillo-business-park',
};

const projects = [
{
  title: 'Citrus Commons',
  location: 'Sherman Oaks, CA',
  client: 'IMT Residential',
  value: '$1,889,200',
  scope: 'Storefront, Auto Doors, ACM, Partitions',
  status: 'Completed' as const,
  imageUrl: '/images/projects/Citrus-Commons.jpg',
  description: 'Large-scale mixed-use residential complex featuring extensive ground-floor retail storefront and ACM panel systems with interior glass partitions throughout common areas.',
  systems: ['Kawneer Trifab 451 Storefront', 'ASSA ABLOY Besam Auto Doors', 'Alucobond ACM Panels'],
  highlights: ['Coordinated with 15+ trades on occupied site', 'Phased installation across multiple buildings', 'Zero safety incidents'],
  duration: '8-12 months',
  sqft: '85,000 SF'
},
{
  title: '9900 Venice',
  location: 'Los Angeles, CA',
  client: 'Fassberg Construction',
  value: '$363,300',
  scope: 'Exterior Storefront & Doors, Mirrors',
  status: 'Completed' as const,
  imageUrl: '/images/projects/9900-venice.jpg',
  description: 'Modern commercial office building with full exterior storefront glazing and interior mirror installations for fitness and common areas.',
  systems: ['Oldcastle Reliance SS Storefront', 'CR Laurence Frameless Mirrors'],
  highlights: ['Tight urban site with limited staging', 'Coordinated with curtain wall sequence', 'Delivered ahead of schedule'],
  duration: '5-7 months',
  sqft: '28,000 SF'
},
{
  title: 'Via Avanti',
  location: 'Sherman Oaks, CA',
  client: 'IMT Residential',
  value: '$1,889,200',
  scope: 'Storefront, Auto Doors, ACM, Interior',
  status: 'Current' as const,
  imageUrl: '/images/projects/via-avanti.jpg',
  description: 'Luxury multifamily development with ground-level retail storefront, automatic entry doors, ACM rainscreen panels, and interior glass partition systems.',
  systems: ['Kawneer Trifab 601 Storefront', 'ASSA ABLOY Besam SL500 Auto Doors', 'Alucobond Plus ACM'],
  highlights: ['Active occupied building with phased access', 'Complex ACM detailing at entries', 'Integrated with security access controls'],
  duration: '8-12 months',
  sqft: '90,000 SF'
},
{
  title: 'Cabrillo Business Park',
  location: 'Goleta, CA',
  client: 'Gluck Building Company',
  value: '$1,269,400',
  scope: 'Curtain Walls, Doors, Interior Storefront',
  status: 'Completed' as const,
  imageUrl: '/images/projects/cabrillo-business-park.jpg',
  description: 'Multi-building commercial business park with extensive curtain wall systems, aluminum entrance doors, and interior storefront separating office and common spaces.',
  systems: ['Kawneer 1600 Curtain Wall', 'Kawneer 350 Medium Stile Doors', 'Oldcastle Reliance SS Interior Storefront'],
  highlights: ['Coastal wind-load engineering required', 'Multi-building phased delivery', 'Minimal punch list at turnover'],
  duration: '8-12 months',
  sqft: '72,000 SF'
},
{
  title: 'Cloud Nine Hangar',
  location: 'Camarillo, CA',
  client: 'T.Viole Construction',
  value: '$1,125,000',
  scope: 'Curtain Walls, Polycarbonate, Partitions',
  status: 'Completed' as const,
  imageUrl: '/images/projects/cloud-nine-hangar.jpg',
  description: 'Aviation hangar facility with high-performance curtain wall systems, polycarbonate daylighting panels, and interior glass office partitions.',
  systems: ['Kawneer 1600 Curtain Wall', 'Polygal Polycarbonate Panels', 'CR Laurence Office Partitions'],
  highlights: ['Specialized airport zone access coordination', 'Large-span polycarbonate installation', 'Met FAA site requirements'],
  duration: '8-12 months',
  sqft: '65,000 SF'
},
{
  title: 'Marina Drive',
  location: 'Santa Barbara, CA',
  client: 'Campbell Construction',
  value: '$658,800',
  scope: 'Curtain Walls, Sliders, Partitions, Railings',
  status: 'Completed' as const,
  imageUrl: '/images/projects/marina-drive.jpg',
  description: 'Waterfront mixed-use development with curtain wall glazing, large sliding door systems, interior glass partitions, and decorative glass railings.',
  systems: ['Kawneer 1600 Curtain Wall', 'Western Window Systems Multi-Slide', 'CR Laurence GRS Glass Railing'],
  highlights: ['Coastal corrosion-resistant finishes required', 'Coordinated with 10+ trades', 'Complex railing details at balconies'],
  duration: '6-9 months',
  sqft: '42,000 SF'
},
{
  title: 'The 505',
  location: 'Los Angeles, CA',
  client: 'Westside Contractors',
  value: '$486,000',
  scope: 'Curtain Walls, Doors, Interior Storefront',
  status: 'Completed' as const,
  imageUrl: '/images/projects/the-505.jpg',
  description: 'Urban mixed-use building with curtain wall facade, aluminum entrance systems, and interior storefront for retail and lobby separation.',
  systems: ['Oldcastle Reliance CW Curtain Wall', 'Kawneer 350 Medium Stile Doors', 'Oldcastle Reliance SS Storefront'],
  highlights: ['Dense urban site with crane coordination', 'Night work for street-facing installations', 'Repeat client project'],
  duration: '5-7 months',
  sqft: '35,000 SF'
},
{
  title: 'West Athens Safe Landing',
  location: 'Los Angeles, CA',
  client: 'VFB Joint Venture',
  value: '$368,400',
  scope: 'Exterior Storefront & Doors',
  status: 'Completed' as const,
  imageUrl: '/images/projects/west-athens-safe-landing.jpg',
  description: 'Supportive housing facility with durable exterior storefront and entrance door systems designed for high-traffic community use.',
  systems: ['Oldcastle Reliance SS Storefront', 'Kawneer 350 Heavy Wall Doors'],
  highlights: ['Prevailing wage project', 'Impact-resistant glazing at ground level', 'Accelerated schedule delivery'],
  duration: '5-7 months',
  sqft: '24,000 SF'
},
{
  title: 'Bridge to Home',
  location: 'Santa Clarita, CA',
  client: 'Intertex Construction',
  value: '$335,200',
  scope: 'Storefront, Fire-Rated, Partitions, Mirrors',
  status: 'Completed' as const,
  imageUrl: '/images/projects/bridge-to-home.jpg',
  description: 'Community services facility with fire-rated glazing assemblies, exterior storefront, interior glass partitions, and mirror installations throughout.',
  systems: ['SAFTI FIRST Fire-Rated Frames', 'Oldcastle Reliance SS Storefront', 'CR Laurence Frameless Mirrors'],
  highlights: ['Fire-rated assemblies at corridor separations', 'Coordinated with fire marshal inspections', 'Community benefit project'],
  duration: '5-7 months',
  sqft: '22,000 SF'
},
{
  title: '4060 Ince',
  location: 'Culver City, CA',
  client: 'Fulcrum Construction',
  value: '$357,000',
  scope: 'Interior Storefront & Doors, Glass Partitions',
  status: 'Completed' as const,
  imageUrl: '/images/projects/4060-ince.jpg',
  description: 'Creative office space renovation with floor-to-ceiling interior storefront, frameless glass partitions, and custom aluminum door systems.',
  systems: ['Oldcastle Reliance SS Interior Storefront', 'CR Laurence Entrigue Partitions', 'Kawneer 350 Medium Stile Doors'],
  highlights: ['Occupied building renovation', 'After-hours installation required', 'Custom finish coordination with architect'],
  duration: '5-7 months',
  sqft: '30,000 SF'
},
{
  title: 'W 43rd Street',
  location: 'Los Angeles, CA',
  client: 'Westside Contractors',
  value: '$183,000',
  scope: 'Storefront & Doors, Fire-Rated Windows & Doors',
  status: 'Completed' as const,
  imageUrl: '/images/projects/w-43rd-street.jpg',
  description: 'Multifamily residential building with ground-floor storefront, entrance doors, and fire-rated window and door assemblies at corridor separations.',
  systems: ['Oldcastle Reliance SS Storefront', 'SAFTI FIRST SuperLite II-XL Fire-Rated', 'Kawneer 350 Doors'],
  highlights: ['Fire-rated glazing at stairwell enclosures', 'Tight schedule turnaround', 'Repeat client project'],
  duration: '3-4 months',
  sqft: '18,000 SF'
},
{
  title: 'Central Terrace Apartments',
  location: 'Oxnard, CA',
  client: 'Cannon Constructors South',
  value: '$136,000',
  scope: 'Exterior Storefront & Doors',
  status: 'Completed' as const,
  imageUrl: '/images/projects/central-terrace-apartments.jpg',
  description: 'Affordable housing apartment complex with exterior aluminum storefront and entrance door systems at building entries and common areas.',
  systems: ['Oldcastle Reliance SS Storefront', 'Kawneer 350 Medium Stile Doors'],
  highlights: ['Prevailing wage compliance', 'Coordinated with stucco and waterproofing trades', 'On-time completion'],
  duration: '3-4 months',
  sqft: '15,000 SF'
},
{
  title: "Foster's Freeze Salinas",
  location: 'Salinas, CA',
  client: 'R.C. Pacific Construction',
  value: '$111,000',
  scope: 'Curtain Wall, Storefront Doors, Drive Thru Windows',
  status: 'Completed' as const,
  imageUrl: '/images/projects/fosters-freeze-salinas.jpg',
  description: 'Quick-service restaurant with full curtain wall facade, storefront entry doors, and specialized drive-thru transaction windows.',
  systems: ['Kawneer 1600 Curtain Wall', 'Kawneer 350 Doors', 'Custom Drive-Thru Transaction Windows'],
  highlights: ['Fast-track restaurant construction schedule', 'Specialized drive-thru window engineering', 'Minimal punch list'],
  duration: '3-4 months',
  sqft: '3,200 SF'
},
{
  title: '4750 Santa Monica',
  location: 'Los Angeles, CA',
  client: 'Westside Contractors',
  value: '$303,000',
  scope: 'Storefront & Doors, Fire-Rated, Glass Railing',
  status: 'Completed' as const,
  imageUrl: '/images/projects/4750-santa-monica.jpg',
  description: 'Mixed-use building with ground-floor storefront, fire-rated glazing assemblies, and decorative glass railing systems at balconies and stairs.',
  systems: ['Oldcastle Reliance SS Storefront', 'SAFTI FIRST Fire-Rated Frames', 'CR Laurence GRS Glass Railing'],
  highlights: ['Multi-system coordination on single project', 'Glass railing at exterior balconies', 'Repeat client project'],
  duration: '5-7 months',
  sqft: '26,000 SF'
},
{
  title: 'Jordan Downs S4',
  location: 'Los Angeles, CA',
  client: 'Walton Construction',
  value: '$296,000',
  scope: 'Exterior Storefront & Doors',
  status: 'Completed' as const,
  imageUrl: '/images/projects/jordan-downs-s4.jpg',
  description: 'Public housing redevelopment project with durable exterior storefront and entrance door systems designed for community residential use.',
  systems: ['Oldcastle Reliance SS Storefront', 'Kawneer 350 Heavy Wall Doors'],
  highlights: ['Prevailing wage and PLA requirements', 'Phased occupied site work', 'HACLA compliance coordination'],
  duration: '5-7 months',
  sqft: '20,000 SF'
},
{
  title: 'Wilshire Lofts',
  location: 'Los Angeles, CA',
  client: 'Forza Construction',
  value: '$899,000',
  scope: 'Custom Curtain Walls & Doors, Storefront Windows',
  status: 'Current' as const,
  imageUrl: '/images/projects/wilshire-lofts.jpg',
  description: 'Upscale loft-style residential building with custom curtain wall system, oversized aluminum entrance doors, and storefront window systems at street level.',
  systems: ['Kawneer 1600 Curtain Wall', 'Kawneer 500 Wide Stile Doors', 'Oldcastle Reliance SS Storefront'],
  highlights: ['Custom curtain wall profiles', 'Coordinated with structural steel sequence', 'High-visibility Wilshire Blvd location'],
  duration: '6-9 months',
  sqft: '55,000 SF'
},
{
  title: '1st Street North',
  location: 'Los Angeles, CA',
  client: 'Walton Construction',
  value: '$1,453,800',
  scope: 'Curtain Wall, Sliders, Glass Canopy, Storefront',
  status: 'Current' as const,
  imageUrl: '/images/projects/1st-street-north.jpg',
  description: 'Large mixed-use development with curtain wall facade, sliding door systems, structural glass canopy, and ground-floor retail storefront.',
  systems: ['Kawneer 1600 Curtain Wall', 'Western Window Systems Multi-Slide', 'Oldcastle Structural Glass Canopy', 'Kawneer Trifab 451 Storefront'],
  highlights: ['Structural glass canopy engineering', 'Coordinated with 12+ trades', 'Multi-phase delivery schedule'],
  duration: '8-12 months',
  sqft: '78,000 SF'
}];

export function ProjectsPage() {
  const [filter, setFilter] = useState<
    'All' | 'Completed' | 'Current'>(
    'All');

  const filteredProjects =
  filter === 'All' ? projects : projects.filter((p) => p.status === filter);
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative bg-gradient-to-br from-brand-dark via-brand to-brand text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, currentColor 20px, currentColor 21px)' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading uppercase tracking-wide text-4xl font-bold text-white mb-4">Project Portfolio</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            A selection of our commercial glazing projects across California.
            From large-scale curtain walls to specialized interior
            installations.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-dark to-accent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {(['All', 'Completed', 'Current'] as const).map((status) =>
          <Button
            key={status}
            variant={filter === status ? 'primary' : 'outline'}
            onClick={() => setFilter(status)}
            className={`rounded-full px-6 ${filter === status ? 'shadow-md' : 'bg-white'}`}>

              {status} Projects
            </Button>
          )}
        </div>

        {/* Grid */}
        {filteredProjects.length > 0 ?
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) =>
          <div key={project.title}>
              <ProjectCard {...project} caseStudySlug={caseStudySlugs[project.title]} />
            </div>
          )}
          </div> :

        <div className="text-center py-20 bg-white rounded-lg border border-slate-200 border-dashed">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 mb-4">
              <FolderOpen className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="font-heading uppercase tracking-wide text-lg font-medium text-brand">
              No projects found
            </h3>
            <p className="text-slate-500 mt-1">
              Try adjusting your filter selection.
            </p>
            <Button
            variant="outline"
            className="mt-6"
            onClick={() => setFilter('All')}>

              Clear Filters
            </Button>
          </div>
        }
      </div>
    </div>);

}