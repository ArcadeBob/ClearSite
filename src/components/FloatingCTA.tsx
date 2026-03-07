import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/Button';
import { ArrowRight, X } from 'lucide-react';

const SCROLL_SHOW_THRESHOLD = 500;
const SCROLL_RESET_THRESHOLD = 100;

export function FloatingCTA(): React.JSX.Element {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { pathname } = useLocation();
  const isResidential = pathname === '/residential';

  useEffect(() => {
    const handleScroll = () => {
      // Reset dismissal only near the top, but don't re-show on the same event
      if (window.scrollY < SCROLL_RESET_THRESHOLD && isDismissed) {
        setIsDismissed(false);
        return;
      }
      setIsVisible(window.scrollY > SCROLL_SHOW_THRESHOLD && !isDismissed);
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

  const headline = isResidential ? 'Ready for your project?' : 'Ready to prequalify?';
  const subtext = isResidential
    ? 'Showers, mirrors, railings & more'
    : 'Get COI, EMR, and references within 24 hours';
  const buttonText = isResidential ? 'Request a Quote' : 'Request Prequal Package';
  const buttonTextMobile = isResidential ? 'Get Quote' : 'Get Prequal';
  const linkTo = isResidential ? '/contact?type=residential' : '/contact?type=commercial';

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-40
        transition-all duration-500 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}
      `}>

      <div className="bg-brand/95 backdrop-blur-xl border-t border-white/10 shadow-2xl shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-4">
            {/* Text */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="hidden sm:flex h-10 w-10 rounded-full bg-accent/20 flex-shrink-0 items-center justify-center">
                <ArrowRight className="h-5 w-5 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm sm:text-base truncate">
                  {headline}
                </p>
                <p className="text-slate-400 text-xs sm:text-sm hidden sm:block">
                  {subtext}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link to={linkTo}>
                <Button
                  variant="secondary"
                  size="sm"
                  className="gap-2 whitespace-nowrap">

                  <ArrowRight className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {buttonText}
                  </span>
                  <span className="sm:hidden">{buttonTextMobile}</span>
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
