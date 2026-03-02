import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProjectCard } from '../components/ProjectCard';
import { Button } from '../components/ui/Button';
import { FolderOpen, ArrowRight } from 'lucide-react';

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
  status: 'Current' as const,
  imageUrl: '/images/projects/Citrus-Commons.jpg'
},
{
  title: '9900 Venice',
  location: 'Los Angeles, CA',
  client: 'Fassberg Construction',
  value: '$363,300',
  scope: 'Exterior Storefront & Doors, Mirrors',
  status: 'Current' as const,
  imageUrl: '/images/projects/9900-venice.jpg'
},
{
  title: 'Via Avanti',
  location: 'Sherman Oaks, CA',
  client: 'IMT Residential',
  value: '$1,889,200',
  scope: 'Storefront, Auto Doors, ACM, Interior',
  status: 'Future' as const,
  imageUrl: '/images/projects/via-avanti.jpg'
},
{
  title: 'Cabrillo Business Park',
  location: 'Goleta, CA',
  client: 'Gluck Building Company',
  value: '$1,269,400',
  scope: 'Curtain Walls, Doors, Interior Storefront',
  status: 'Completed' as const,
  imageUrl: '/images/projects/cabrillo-business-park.jpg'
},
{
  title: 'Cloud Nine Hangar',
  location: 'Camarillo, CA',
  client: 'T.Viole Construction',
  value: '$1,125,000',
  scope: 'Curtain Walls, Polycarbonate, Partitions',
  status: 'Completed' as const,
  imageUrl: '/images/projects/cloud-nine-hangar.jpg'
},
{
  title: 'Marina Drive',
  location: 'Santa Barbara, CA',
  client: 'Campbell Construction',
  value: '$658,800',
  scope: 'Curtain Walls, Sliders, Partitions, Railings',
  status: 'Completed' as const,
  imageUrl: '/images/projects/marina-drive.jpg'
},
{
  title: 'The 505',
  location: 'Los Angeles, CA',
  client: 'Westside Contractors',
  value: '$486,000',
  scope: 'Curtain Walls, Doors, Interior Storefront',
  status: 'Completed' as const,
  imageUrl: '/images/projects/the-505.jpg'
},
{
  title: 'West Athens Safe Landing',
  location: 'Los Angeles, CA',
  client: 'VFB Joint Venture',
  value: '$368,400',
  scope: 'Exterior Storefront & Doors',
  status: 'Completed' as const,
  imageUrl: '/images/projects/west-athens-safe-landing.jpg'
},
{
  title: 'Bridge to Home',
  location: 'Santa Clarita, CA',
  client: 'Intertex Construction',
  value: '$335,200',
  scope: 'Storefront, Fire-Rated, Partitions, Mirrors',
  status: 'Completed' as const,
  imageUrl: '/images/projects/bridge-to-home.jpg'
},
{
  title: '4060 Ince',
  location: 'Culver City, CA',
  client: 'Fulcrum Construction',
  value: '$357,000',
  scope: 'Interior Storefront & Doors, Glass Partitions',
  status: 'Completed' as const,
  imageUrl: '/images/projects/4060-ince.jpg'
},
{
  title: 'W 43rd Street',
  location: 'Los Angeles, CA',
  client: 'Westside Contractors',
  value: '$183,000',
  scope: 'Storefront & Doors, Fire-Rated Windows & Doors',
  status: 'Completed' as const,
  imageUrl: '/images/projects/w-43rd-street.jpg'
},
{
  title: 'Central Terrace Apartments',
  location: 'Oxnard, CA',
  client: 'Cannon Constructors South',
  value: '$136,000',
  scope: 'Exterior Storefront & Doors',
  status: 'Completed' as const,
  imageUrl: '/images/projects/central-terrace-apartments.jpg'
},
{
  title: "Foster's Freeze Salinas",
  location: 'Salinas, CA',
  client: 'R.C. Pacific Construction',
  value: '$111,000',
  scope: 'Curtain Wall, Storefront Doors, Drive Thru Windows',
  status: 'Completed' as const,
  imageUrl: '/images/projects/fosters-freeze-salinas.jpg'
},
{
  title: '4750 Santa Monica',
  location: 'Los Angeles, CA',
  client: 'Westside Contractors',
  value: '$303,000',
  scope: 'Storefront & Doors, Fire-Rated, Glass Railing',
  status: 'Current' as const,
  imageUrl: '/images/projects/4750-santa-monica.jpg'
},
{
  title: 'Jordan Downs S4',
  location: 'Los Angeles, CA',
  client: 'Walton Construction',
  value: '$296,000',
  scope: 'Exterior Storefront & Doors',
  status: 'Current' as const,
  imageUrl: '/images/projects/jordan-downs-s4.jpg'
},
{
  title: 'Wilshire Lofts',
  location: 'Los Angeles, CA',
  client: 'Forza Construction',
  value: '$899,000',
  scope: 'Custom Curtain Walls & Doors, Storefront Windows',
  status: 'Future' as const,
  imageUrl: '/images/projects/wilshire-lofts.jpg'
},
{
  title: '1st Street North',
  location: 'Los Angeles, CA',
  client: 'Walton Construction',
  value: '$1,453,800',
  scope: 'Curtain Wall, Sliders, Glass Canopy, Storefront',
  status: 'Future' as const,
  imageUrl: '/images/projects/1st-street-north.jpg'
}];

export function ProjectsPage() {
  const [filter, setFilter] = useState<
    'All' | 'Completed' | 'Current' | 'Future'>(
    'All');

  const filteredProjects =
  filter === 'All' ? projects : projects.filter((p) => p.status === filter);
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-brand text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Project Portfolio</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            A selection of our commercial glazing projects across California.
            From large-scale curtain walls to specialized interior
            installations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {(['All', 'Completed', 'Current', 'Future'] as const).map((status) =>
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
          <div key={project.title} className="flex flex-col">
              <ProjectCard {...project} />
              {caseStudySlugs[project.title] && (
                <Link
                  to={`/projects/${caseStudySlugs[project.title]}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-dark transition-colors"
                >
                  View Case Study <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          )}
          </div> :

        <div className="text-center py-20 bg-white rounded-lg border border-slate-200 border-dashed">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-slate-100 mb-4">
              <FolderOpen className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">
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