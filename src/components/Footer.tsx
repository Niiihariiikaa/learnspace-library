
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-library-primary text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and about */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <BookOpen className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">LearnSpace</span>
            </Link>
            <p className="text-sm text-gray-300 mb-4">
              Empowering students and faculty with knowledge resources since 2010.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/books" className="text-gray-300 hover:text-white text-sm">
                  Books
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-white text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-300 hover:text-white text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/books?category=Fiction" className="text-gray-300 hover:text-white text-sm">
                  Fiction Books
                </Link>
              </li>
              <li>
                <Link to="/books?category=Non-Fiction" className="text-gray-300 hover:text-white text-sm">
                  Non-Fiction Books
                </Link>
              </li>
              <li>
                <Link to="/books?category=Academic" className="text-gray-300 hover:text-white text-sm">
                  Academic Resources
                </Link>
              </li>
              <li>
                <Link to="/books?category=Journals" className="text-gray-300 hover:text-white text-sm">
                  Journals
                </Link>
              </li>
              <li>
                <Link to="/books?isEbook=true" className="text-gray-300 hover:text-white text-sm">
                  E-Books
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-300 mr-2 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  123 University Avenue,<br />
                  Campus District,<br />
                  Academic City, AC 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gray-300 mr-2" />
                <span className="text-gray-300 text-sm">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gray-300 mr-2" />
                <a href="mailto:info@learnspace.edu" className="text-gray-300 hover:text-white text-sm">
                  info@learnspace.edu
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8">
          <p className="text-center text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} LearnSpace Library. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
