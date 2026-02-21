import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import {
  Target,
  Sparkles,
  Handshake,
  Users,
  Award,
  CheckCircle,
  ArrowRight } from
'lucide-react';
export function AboutPage() {
  const team = [
  {
    name: 'Daniel Kauffman',
    role: 'Owner & Master Glazier',
    description: 'Installing glass since 1990. Master status achieved.'
  },
  {
    name: 'Yolanda Lara',
    role: 'Senior Project Manager',
    description: '30+ years of industry experience.'
  },
  {
    name: 'Josue Gonzalez',
    role: 'Field Operations Manager',
    description: '28 years in commercial glazing.'
  },
  {
    name: 'Robert Elmquist',
    role: 'Operations Manager',
    description: 'IT systems and network operations.'
  }];

  const values = [
  {
    icon: <Target className="h-6 w-6" />,
    title: 'Our Mission',
    description:
    'To routinely give clients the best installation possible with the best products available using the best people in our field and the best suppliers around.'
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: 'Our Goal',
    description:
    'To continually improve the process in which layout, fabrication, communication and installation are done with aluminum and glass to the point where it is a purposeful, efficient assembly line style production with little or no punch list upon completion.'
  },
  {
    icon: <Handshake className="h-6 w-6" />,
    title: 'Our Promise',
    description:
    'We promise to have a committed crew with one or more assigned foremen on your projects that will be there every day until completion. We promise to be transparent with scheduling and share honest updates—and to have no punch-list at the end!'
  }];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-brand text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">
            About Clean Glass Installation
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Expert contract glazing on-time, on-budget. With almost 30 years of
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
              <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-2">
                Our Brand
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                "Clean" Is More Than Just Dust-Free
              </h2>
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
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Professional glazing work"
                className="relative rounded-xl shadow-xl w-full object-cover h-[450px]" />

            </div>
          </div>
        </div>
      </section>

      {/* Mission, Goal, Promise */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) =>
            <Card key={value.title} className="p-8 h-full">
                <div className="h-14 w-14 bg-brand rounded-xl flex items-center justify-center text-white mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose CGI */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose CGI
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We know you have a choice. But when you understand the tremendous
              advantages CGI brings, there really is no other choice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
            {
              title: 'Vast Experience',
              desc: 'Almost 30 years working on all types of jobs in any environment.'
            },
            {
              title: 'Expert Workmanship',
              desc: 'We take time to get all details right, helping avoid expensive delays.'
            },
            {
              title: 'Clear Communication',
              desc: "We stay out in front so you're always aware of progress."
            },
            {
              title: 'Competitive Bids',
              desc: 'Extremely efficient operations help keep your costs down.'
            },
            {
              title: 'All-in-One Service',
              desc: 'Design, engineering, and installation—one source for everything.'
            },
            {
              title: 'Performance History',
              desc: 'Many repeat customers: on time, on budget, every time.'
            },
            {
              title: 'Continuing Education',
              desc: 'Technical, safety, and professional training keeps us sharp.'
            },
            {
              title: 'Responsive Support',
              desc: 'Need adjustments or inspections? We respond immediately.'
            },
            {
              title: 'Fully Licensed',
              desc: 'Covered for any job site event. License #965590.'
            }].
            map((item) =>
            <div
              key={item.title}
              className="flex gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors">

                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-2">
              Our Team
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Meet the Leadership
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Extremely talented people who understand our brand and practice
              clean, thoughtful craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) =>
            <Card key={member.name} className="p-6 text-center" hover>
                <div className="h-20 w-20 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-amber-600 mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-slate-500">{member.description}</p>
              </Card>
            )}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-6">
              With several highly trained, scalable installation teams, we are
              well staffed to ensure the most complex projects are completed on
              time with exacting quality standards.
            </p>
            <Link to="/contact">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let Our Experience Make Your Job Easier
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            We know the demands on your time can be overwhelming. With CGI, you
            won't have to babysit our team—giving you more time for the many
            other tasks on your project.
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              variant="secondary"
              className="shadow-lg shadow-amber-500/20">

              Get a Free Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>);

}