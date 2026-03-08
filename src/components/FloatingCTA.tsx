import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/Button';
import { ArrowRight, X } from 'lucide-react';

const SCROLL_SHOW_THRESHOLD = 500;
const SCROLL_RESET_THRESHOLD = 100;

export function FloatingCTA(): React.JSX.Element {
  const [isDismissed, setIsDismissed] = useState(false);
  const [scrollPastThreshold, setScrollPastThreshold] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const { pathname } = useLocation();
  const isResidential = pathname === '/residential';
  const isContactPage = pathname === '/contact';
  const visibleCountRef = useRef(0);

  // Track inline CTA visibility via IntersectionObserver
  useEffect(() => {
    if (isContactPage) return;

    visibleCountRef.current = 0;
    setCtaVisible(false);

    let observer: IntersectionObserver | null = null;

    // Small delay to let the DOM render after navigation
    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll('[data-cta-inline]');
      if (elements.length === 0) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              visibleCountRef.current++;
            } else {
              visibleCountRef.current = Math.max(0, visibleCountRef.current - 1);
            }
          });
          setCtaVisible(visibleCountRef.current > 0);
        },
        { threshold: 0.5, rootMargin: '0px 0px 80px 0px' }
      );

      elements.forEach((el) => observer?.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer?.disconnect();
    };
  }, [pathname]);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y < SCROLL_RESET_THRESHOLD) {
        setIsDismissed(false);
      }
      setScrollPastThreshold(y > SCROLL_SHOW_THRESHOLD);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDismiss = useCallback(() => {
    setIsDismissed(true);
  }, []);

  // Combined visibility: past scroll threshold, not dismissed, no inline CTA visible, not on contact page
  const isVisible = scrollPastThreshold && !isDismissed && !ctaVisible && !isContactPage;

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
