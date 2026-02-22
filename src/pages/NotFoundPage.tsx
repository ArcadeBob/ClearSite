import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold text-brand mb-2">404</h1>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-slate-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button className="gap-2">
              <Home className="h-4 w-4" /> Back to Home
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
