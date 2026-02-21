import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-brand text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
              <img
                src="/logo.png"
                alt="CGI Clean Glass Installation"
                className="h-12 w-auto brightness-0 invert" />

            </div>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Expert contract glazing on-time, on-budget. Serving Southern
              California and beyond with almost 30 years of experience.
            </p>
            <div className="flex items-center gap-2 text-sm text-accent font-medium bg-accent/10 px-3 py-2 rounded-md w-fit">
              <ShieldCheck className="h-4 w-4" />
              <span>C-17 License #965590</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors">

                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="hover:text-white transition-colors">

                  Our Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/residential"
                  className="hover:text-white transition-colors">

                  Residential Services
                </Link>
              </li>
              <li>
                <Link
                  to="/testimonials"
                  className="hover:text-white transition-colors">

                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors">

                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">
              Our Services
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 bg-accent rounded-full"></span>
                Storefronts
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 bg-accent rounded-full"></span>
                Automatic Doors
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 bg-accent rounded-full"></span>
                Curtain Walls
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 bg-accent rounded-full"></span>
                Skylights
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 bg-accent rounded-full"></span>
                Glass Railings
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 bg-accent rounded-full"></span>
                Fire-Rated Glazing
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 group">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="group-hover:text-white transition-colors">
                  9627 Owensmouth Ave #3
                  <br />
                  Chatsworth, CA 91311
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <a
                  href="tel:8184924265"
                  className="hover:text-white transition-colors">

                  (818) 492-4265
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <a
                  href="mailto:email@cginstall.com"
                  className="hover:text-white transition-colors">

                  email@cginstall.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Clean Glass Installation. All
            rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="hover:text-slate-300 cursor-default transition-colors">
              SBE Certified
            </span>
            <span className="hover:text-slate-300 cursor-default transition-colors">
              DIR Registered
            </span>
            <span className="hover:text-slate-300 cursor-default transition-colors">
              Fully Insured
            </span>
          </div>
        </div>
      </div>
    </footer>);

}