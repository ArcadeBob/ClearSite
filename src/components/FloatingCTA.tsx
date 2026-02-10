import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import { Download, X } from 'lucide-react';
export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 500;
      const shouldShow = window.scrollY > scrollThreshold;
      if (shouldShow && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);
  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };
  useEffect(() => {
    const handleScrollReset = () => {
      if (window.scrollY < 100 && isDismissed) {
        setIsDismissed(false);
      }
    };
    window.addEventListener('scroll', handleScrollReset, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScrollReset);
  }, [isDismissed]);
  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-40
        transition-all duration-500 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}
      `}>

      <div className="bg-[#1e3a5f]/95 backdrop-blur-xl border-t border-white/10 shadow-2xl shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-4">
            {/* Text */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="hidden sm:flex h-10 w-10 rounded-full bg-[#2563eb]/20 flex-shrink-0 items-center justify-center">
                <Download className="h-5 w-5 text-[#2563eb]" />
              </div>
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm sm:text-base truncate">
                  Ready to prequalify?
                </p>
                <p className="text-slate-400 text-xs sm:text-sm hidden sm:block">
                  Get COI, EMR, and references instantly
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link to="/contact">
                <Button
                  variant="secondary"
                  size="sm"
                  className="gap-2 whitespace-nowrap">

                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    Download Prequal Package
                  </span>
                  <span className="sm:hidden">Get Package</span>
                </Button>
              </Link>

              <button
                onClick={handleDismiss}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Dismiss">

                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>);

}