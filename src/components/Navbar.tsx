import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { Button } from './ui/Button';
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigation = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'About Us',
    href: '/about'
  },
  {
    name: 'Our Projects',
    href: '/projects'
  },
  {
    name: 'Residential',
    href: '/residential'
  },
  {
    name: 'Contact',
    href: '/contact'
  }];

  const isActive = (path: string) => location.pathname === path;
  return (
    <>
      {/* Top Bar */}
      <div className="bg-brand text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center sm:justify-between items-center gap-2 sm:gap-4">
          <a
            href="tel:8184924265"
            className="flex items-center gap-2 hover:text-blue-300 transition-colors">

            <Phone className="h-4 w-4" />
            818-492-4265
          </a>
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="h-4 w-4" />
            <span>Location 9627 Owensmouth Ave. #3 Chatsworth, CA 91311</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center group">
                <img
                  src="/logo.png"
                  alt="CGI Clean Glass Installation"
                  className="h-14 w-auto transition-transform duration-300 group-hover:scale-105" />

              </Link>
            </div>

            {/* Desktop menu */}
            <div className="hidden lg:flex lg:items-center lg:space-x-1">
              {navigation.map((item) =>
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${isActive(item.href) ? 'text-accent' : 'text-slate-600 hover:text-accent'}`}>

                  {item.name}
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand">

                <span className="sr-only">Open main menu</span>
                {isOpen ?
                <X className="block h-6 w-6" aria-hidden="true" /> :

                <Menu className="block h-6 w-6" aria-hidden="true" />
                }
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen &&
        <div className="lg:hidden bg-white border-b border-slate-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) =>
            <Link
              key={item.name}
              to={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(item.href) ? 'text-accent bg-blue-50' : 'text-slate-600 hover:bg-slate-50 hover:text-accent'}`}
              onClick={() => setIsOpen(false)}>

                  {item.name}
                </Link>
            )}
              <div className="mt-4 px-3">
                <a href="tel:8184924265" onClick={() => setIsOpen(false)}>
                  <Button fullWidth className="gap-2">
                    <Phone className="h-4 w-4" />
                    Call Now
                  </Button>
                </a>
              </div>
            </div>
          </div>
        }
      </nav>
    </>);

}