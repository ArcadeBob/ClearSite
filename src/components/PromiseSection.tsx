import React from 'react';
import { CheckCircle, Users, Calendar, FileCheck } from 'lucide-react';
export function PromiseSection() {
  const promises = [
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Committed Crew',
    description:
    'One or more assigned foremen on your project every day until completion.'
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: 'Transparent Scheduling',
    description:
    'Honest updates from our suppliers during preconstruction and throughout.'
  },
  {
    icon: <FileCheck className="h-6 w-6" />,
    title: 'No Punch-List',
    description:
    'Our goal is zero punch-list items at completion—and we deliver.'
  }];

  return (
    <section className="py-24 bg-brand text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
            Our Promise
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            You'll Never Wonder If We're Showing Up
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            We promise to be there every day until completion with transparent
            communication and honest updates every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promises.map((promise) =>
          <div
            key={promise.title}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">

              <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-accent text-white mb-4">
                {promise.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{promise.title}</h3>
              <p className="text-slate-300 text-sm">{promise.description}</p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-5 py-2.5 rounded-full border border-green-500/30 text-sm">
            <CheckCircle className="h-4 w-4" />
            <span className="font-medium">
              Expert Contract Glazing: On-Time, On-Budget
            </span>
          </div>
        </div>
      </div>
    </section>);

}