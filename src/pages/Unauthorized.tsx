
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Shield className="h-16 w-16 text-library-secondary mb-6" />
      <h1 className="text-3xl font-bold text-library-primary mb-2">Access Denied</h1>
      <p className="text-xl text-gray-600 mb-2">You don't have permission to access this page.</p>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        This area is restricted to users with specific roles. Please contact a library administrator if you believe you should have access.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild variant="outline" className="flex items-center">
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Go to Home
          </Link>
        </Button>
        <Button asChild className="flex items-center bg-library-primary hover:bg-library-primary/90">
          <Link to="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
