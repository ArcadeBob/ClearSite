import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SectionHeader } from '../components/SectionHeader';
import {
  Target,
  Sparkles,
  Handshake,
  Award,
  CheckCircle,
  ArrowRight,
  Calendar,
} from 'lucide-react';
import { CSLB_LICENSE_NUMBER, BONDING_CAPACITY_DISPLAY } from '../data/credentials';
import { SafetySection } from '../components/SafetySection';
import { PrevailingWageBanner } from '../components/PrevailingWageBanner';

const team = [
  {
    name: 'Daniel Kauffman',
    role: 'CEO/Owner/Master Glazier',
    photo: '/images/team/daniel-kauffman.png',
    description:
      'A career glazier with decades of hands-on experience. Daniel founded CGI on the principle that "clean" means more than dust-free — it means precision, efficiency, and minimal punch list on every project.',
  },
  {
    name: 'Yolanda Lara',
    role: 'Senior Project Manager',
    photo: '/images/team/yolanda-lara.png',
    description:
      '30+ years of industry experience. Yolanda manages multi-site rollouts and complex commercial scopes, coordinating everything from submittals to final inspections with meticulous attention to schedule.',
  },
  {
    name: 'Josue Gonzalez',
    role: 'Field Operations Manager',
    photo: '/images/team/josue-gonzalez.png',
    description:
      '28 years in commercial glazing. Josue oversees all field crews and quality control, ensuring every installation meets CGI standards from first anchor to final sealant bead.',
  },
  {
    name: 'Robert Elmquist',
    role: 'Operations Manager',
    photo: '/images/team/robert-elmquist.png',
    description:
      'Robert manages CGI\'s day-to-day business operations, including project tracking, vendor coordination, and office administration — keeping the office and field teams running smoothly.',
  },
];

const values = [
  {
    icon: <Target className="h-6 w-6" />,
    title: 'Our Mission',
    description:
      'To routinely give clients the best installation possible with the best products available using the best people in our field and the best suppliers around.',
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: 'Our Goal',
    description:
      'To continually improve the process in which layout, fabrication, communication and installation are done with aluminum and glass to the point where it is a purposeful, efficient assembly line style production with little or no punch list upon completion.',
  },
  {
    icon: <Handshake className="h-6 w-6" />,
    title: 'Our Promise',
    description:
      'We promise to have a committed crew with one or more assigned foremen on your projects that will be there every day until completion. We promise to be transparent with scheduling and share honest updates—and to deliver a minimal punch list at turnover.',
  },
];

// Credential values: see src/data/credentials.ts
const milestones = [
  {
    year: '2012',
    title: 'Founded',
    description:
      'Daniel Kauffman founds Clean Glass Installation in Chatsworth, CA, building on decades of personal glazing experience.',
  },
  {
    year: '2020',
    title: 'SBE Certified',
    description:
      'Awarded Small Business Enterprise certification, opening doors to public works and institutional projects.',
  },
  {
    year: '2021',
    title: '200+ Projects',
    description:
      'Surpasses 200 completed commercial and residential projects across California, with a 90% repeat client rate.',
  },
  {
    year: '2025',
    title: `${BONDING_CAPACITY_DISPLAY} Bonding`,
    description:
      'Single-project bonding capacity enables CGI to take on the largest commercial glazing scopes in the market.',
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-brand text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading uppercase tracking-wide text-4xl font-bold text-white mb-4">
            About Clean Glass Installation
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Expert contract glazing on-time, on-budget. With over 13 years of
            experience, we help contractors get the job done right the first
            time.
          </p>
        </div>
      </div>

      {/* Brand Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                variant="left-bar"
                subheading="Our Brand"
                title={'"Clean" Is More Than Just Dust-Free'}
                subheadingColor="text-amber-600"
                className="text-left mb-6"
              />
              <div className="prose prose-lg text-slate-600">
                <p className="mb-4">
                  Our brand is a concept that has carried over from the days of
                  the owner installing as a 16-year-old kid. He quickly realized
                  that keeping everything clean, organized, and highly
                  functional gave him positive recognition from clients, bosses,
                  and seasoned installers alike.
                </p>
                <p className="mb-4">
                  This way of doing things turned into a concept, then a vision,
                  and is now a mandate and our brand.
                  <strong className="text-slate-900">
                    {' '}
                    Clean is a method that transcends all departments
                  </strong>{' '}
                  here at CGI and means much, much more than being free of dust.
                </p>
                <p>
                  It means that every task of every employee is streamlined,
                  well thought out, without error, highly functional, on-point,
                  pristine and done with immaculate housekeeping in mind. Of
                  course, nobody is perfect, but it doesn't hurt to work that
                  way.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-amber-50 rounded-2xl transform -rotate-2"></div>
              <img
                src="/images/cgi-building.jpg"
                alt="Clean Glass Installation commercial building project"
                className="relative rounded-xl shadow-xl w-full object-cover h-[450px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            variant="banner"
            subheading="Our Journey"
            title="Company Milestones"
            description={`From a one-man crew to a ${BONDING_CAPACITY_DISPLAY} bonding capacity — over a decade of growth built on clean work.`}
            subheadingColor="text-amber-600"
            className="mb-12"
          />

          {/* Desktop: horizontal timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-slate-200"></div>
              <div className="grid grid-cols-4 gap-4">
                {milestones.map((milestone) => (
                  <div key={milestone.year} className="relative text-center">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-brand text-white font-bold text-sm mb-4 relative z-10 border-4 border-slate-50">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <p className="text-lg font-bold text-accent mb-1">
                      {milestone.year}
                    </p>
                    <h4 className="font-heading uppercase tracking-wide font-bold text-brand mb-2">
                      {milestone.title}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {milestone.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <div className="lg:hidden space-y-0">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-brand text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    <Calendar className="h-4 w-4" />
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 bg-slate-200 flex-1 my-2"></div>
                  )}
                </div>
                <div className="pb-8">
                  <p className="text-sm font-bold text-accent">
                    {milestone.year}
                  </p>
                  <h4 className="font-heading uppercase tracking-wide font-bold text-brand mb-1">
                    {milestone.title}
                  </h4>
                  <p className="text-sm text-slate-600">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Program */}
      <SafetySection />

      {/* Prevailing Wage Experience */}
      <PrevailingWageBanner className="bg-white" />

      {/* Mission, Goal, Promise */}
      <section id="vision" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="p-8 h-full">
                <div className="h-14 w-14 bg-brand rounded-xl flex items-center justify-center text-white mb-6">
                  {value.icon}
                </div>
                <h3 className="font-heading uppercase tracking-wide text-xl font-bold text-brand mb-4">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose CGI */}
      <section id="why-choose" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            variant="left-bar"
            subheading="The CGI Difference"
            title="Why Choose CGI"
            description="We know you have a choice. But when you understand the tremendous advantages CGI brings, there really is no other choice."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Vast Experience',
                desc: 'Over 13 years working on all types of jobs in any environment.',
              },
              {
                title: 'Expert Workmanship',
                desc: 'We take time to get all details right, helping avoid expensive delays.',
              },
              {
                title: 'Clear Communication',
                desc: "We stay out in front so you're always aware of progress.",
              },
              {
                title: 'Competitive Bids',
                desc: 'Extremely efficient operations help keep your costs down.',
              },
              {
                title: 'All-in-One Service',
                desc: 'Fabrication and installation—one source for everything.',
              },
              {
                title: 'Performance History',
                desc: 'Many repeat customers: on time, on budget, every time.',
              },
              {
                title: 'Continuing Education',
                desc: 'Technical, safety, and professional training keeps us sharp.',
              },
              {
                title: 'Responsive Support',
                desc: 'Need adjustments or inspections? We respond immediately.',
              },
              {
                title: 'Fully Licensed',
                desc: `Covered for any job site event. License #${CSLB_LICENSE_NUMBER}.`,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-4 rounded-lg hover:bg-white transition-colors"
              >
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading uppercase tracking-wide font-bold text-brand mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            variant="left-bar"
            subheading="Our Team"
            title="Meet the Leadership"
            description="Extremely talented people who understand our brand and practice clean, thoughtful craftsmanship."
            subheadingColor="text-amber-600"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <Card key={member.name} className="p-6 text-center" hover>
                <img
                  src={member.photo}
                  alt={member.name}
                  className="h-20 w-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-heading uppercase tracking-wide text-lg font-bold text-brand mb-1">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-amber-600 mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-slate-500">{member.description}</p>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-6">
              With several highly trained, scalable installation teams, we are
              well staffed to ensure the most complex projects are completed on
              time with exacting quality standards.
            </p>
            <Link to="/contact?type=commercial">
              <Button className="gap-2">
                Work With Us <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Award className="h-16 w-16 text-amber-500 mx-auto mb-6" />
          <h2 className="font-heading uppercase tracking-wide text-3xl md:text-4xl font-bold text-white mb-6">
            Let Our Experience Make Your Job Easier
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            We know the demands on your time can be overwhelming. With CGI, you
            won't have to babysit our team—giving you more time for the many
            other tasks on your project.
          </p>
          <Link to="/contact?type=commercial">
            <Button
              size="lg"
              variant="secondary"
              className="shadow-lg shadow-amber-500/20"
            >
              Request Prequal Package
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
