import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToHash() {
  const { pathname, hash } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (hash) {
      // Wait for target page to render before scrolling to the element
      timer = setTimeout(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else if (pathname !== prevPathname.current) {
      // Scroll to top on non-hash navigation
      window.scrollTo({ top: 0 });
    }

    prevPathname.current = pathname;

    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
