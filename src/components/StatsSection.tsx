import React, { useEffect, useState } from 'react';
import { TrendingUp, Shield, DollarSign, Clock } from 'lucide-react';
import { useOnceInView } from '../hooks/useOnceInView';
import { EMR_ANIMATE_INTEGER, OSHA_RECORD_DISPLAY } from '../data/credentials';

interface StatData {
  label: string;
  /** The integer target for the count-up animation (e.g. 87 for "0.87") */
  animateTo: number;
  /** How to format the final animated number for display */
  format: (n: number) => string;
  icon: React.ReactNode;
  subtext: string;
  progress: number;
}

const stats: StatData[] = [
{
  label: 'Years Experience',
  animateTo: 13,
  format: (n) => `${n}+`,
  icon: <Clock className="h-5 w-5" />,
  subtext: 'Since 2012',
  progress: 95
},
{
  label: 'Bonding Capacity',
  animateTo: 1,
  format: (n) => `$${n}M`,
  icon: <DollarSign className="h-5 w-5" />,
  subtext: 'Single Project',
  progress: 100
},
{
  label: 'EMR Safety Rating',
  animateTo: EMR_ANIMATE_INTEGER,
  format: (n) => (n / 100).toFixed(2),
  icon: <Shield className="h-5 w-5" />,
  subtext: OSHA_RECORD_DISPLAY,
  progress: EMR_ANIMATE_INTEGER
},
{
  label: 'Project Capacity',
  animateTo: 2,
  format: (n) => `$${n}M+`,
  icon: <TrendingUp className="h-5 w-5" />,
  subtext: 'Single Project',
  progress: 67
}];

function useCountUp(
  end: number,
  duration = 2000,
  start = false,
): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let rafHandle: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      if (progress >= 1) {
        setCount(end);
        return;
      }
      const easeOut = 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOut * end));
      rafHandle = window.requestAnimationFrame(step);
    };
    rafHandle = window.requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafHandle);
  }, [end, duration, start]);
  return count;
}
export function StatsSection(): React.JSX.Element {
  const [sectionRef, isVisible] = useOnceInView();

  return (
    <div
      ref={sectionRef}
      className="bg-brand py-16 border-y border-brand-dark overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) =>
          <StatItem
            key={stat.label}
            stat={stat}
            isVisible={isVisible}
            delay={index * 200} />

          )}
        </div>
      </div>
    </div>);

}
function StatItem({
  stat,
  isVisible,
  delay,
}: {
  stat: StatData;
  isVisible: boolean;
  delay: number;
}): React.JSX.Element {
  const count = useCountUp(stat.animateTo, 2000, isVisible);
  return (
    <div
      className={`text-center group transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      style={{
        transitionDelay: `${delay}ms`
      }}>

      <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-white/10 text-accent mb-4 group-hover:bg-accent group-hover:text-white transition-colors duration-300 relative">
        <div
          className={`absolute inset-0 bg-accent/20 rounded-xl ${isVisible ? 'animate-ping' : ''}`}
          style={{
            animationDuration: '2s',
            animationIterationCount: '3'
          }}>
        </div>
        <div className="relative z-10">{stat.icon}</div>
      </div>

      <div className="text-3xl md:text-5xl font-extrabold text-white mb-2 tracking-tight tabular-nums">
        {stat.format(count)}
      </div>

      <div className="text-sm text-slate-300 font-medium uppercase tracking-wide mb-3">
        {stat.label}
      </div>

      <div className="h-1.5 w-full bg-slate-700/50 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-accent rounded-full transition-all duration-1000 ease-out"
          style={{
            width: isVisible ? `${stat.progress}%` : '0%',
            transitionDelay: `${delay + 500}ms`
          }}>
        </div>
      </div>

      <div className="text-xs text-slate-400">{stat.subtext}</div>
    </div>);

}