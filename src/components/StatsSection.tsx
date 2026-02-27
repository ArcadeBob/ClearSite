import React, { useEffect, useState, useRef } from 'react';
import { TrendingUp, Shield, DollarSign, Clock } from 'lucide-react';

const INTERSECTION_THRESHOLD = 0.2;

interface StatData {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  isDecimal?: boolean;
  icon: React.ReactNode;
  subtext: string;
  progress: number;
}

const stats: StatData[] = [
{
  label: 'Years Experience',
  value: 13,
  suffix: '+',
  icon: <Clock className="h-5 w-5" />,
  subtext: 'Since 2012',
  progress: 95
},
{
  label: 'Bonding Capacity',
  value: 1,
  prefix: '$',
  suffix: 'M',
  icon: <DollarSign className="h-5 w-5" />,
  subtext: 'Single Project',
  progress: 100
},
{
  label: 'EMR Safety Rating',
  value: 0.87,
  isDecimal: true,
  icon: <Shield className="h-5 w-5" />,
  subtext: 'Zero OSHA Incidents',
  progress: 87
},
{
  label: 'Project Capacity',
  value: 2,
  prefix: '$',
  suffix: 'M+',
  icon: <TrendingUp className="h-5 w-5" />,
  subtext: 'Single Project',
  progress: 67
}];

function useCountUp(
end: number,
duration = 2000,
start = false)
{
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}
export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: INTERSECTION_THRESHOLD
      }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

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
  delay




}: {stat: StatData;isVisible: boolean;delay: number;}) {
  const count = useCountUp(
    stat.isDecimal ? stat.value * 100 : stat.value,
    2000,
    isVisible
  );
  const displayValue = stat.isDecimal ? (count / 100).toFixed(2) : count;
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
            animationIterationCount: 'infinite'
          }}>
        </div>
        <div className="relative z-10">{stat.icon}</div>
      </div>

      <div className="text-3xl md:text-5xl font-extrabold text-white mb-2 tracking-tight tabular-nums">
        {stat.prefix}
        {displayValue}
        {stat.suffix}
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