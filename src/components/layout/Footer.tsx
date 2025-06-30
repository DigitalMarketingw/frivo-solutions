
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/5e550e9d-5865-4e41-bf94-3e957f814d97.png" 
                alt="Frivo Solutions" 
                className="h-10 w-auto"
              />
              <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Frivo Solutions
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Delivering top-tier IT consulting, staffing, and project management solutions 
              that drive digital transformation and business success.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Services</h3>
            <div className="space-y-3">
              <Link to="/services/strategy-consulting" className="block text-slate-300 hover:text-purple-400 transition-colors text-sm">
                Strategy & Consulting
              </Link>
              <Link to="/services/business-transformation" className="block text-slate-300 hover:text-purple-400 transition-colors text-sm">
                Business Transformation
              </Link>
              <Link to="/services/finance-transformation" className="block text-slate-300 hover:text-purple-400 transition-colors text-sm">
                Finance Transformation
              </Link>
              <Link to="/services/business-process-management" className="block text-slate-300 hover:text-purple-400 transition-colors text-sm">
                Business Process Management
              </Link>
              <Link to="/services/digital-automation" className="block text-slate-300 hover:text-purple-400 transition-colors text-sm">
                Digital & Automation
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Company</h3>
            <div className="space-y-3">
              <Link to="/about" className="block text-slate-300 hover:text-purple-400 transition-colors text-sm">
                About Us
              </Link>
              <Link to="/contact" className="block text-slate-300 hover:text-purple-400 transition-colors text-sm">
                Contact Us
              </Link>
              <Link to="/auth" className="block text-slate-300 hover:text-purple-400 transition-colors text-sm">
                Job Portal
              </Link>
              <a href="#" className="block text-slate-300 hover:text-purple-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="block text-slate-300 hover:text-purple-400 transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div className="text-slate-300 text-sm">
                  <p>147 W 28th ST RM 10E</p>
                  <p>NEW YORK, NY 10001</p>
                  <p>United States</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">info@frivosolutions.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2024 Frivo Solutions. All rights reserved.
            </p>
            <p className="text-slate-400 text-sm mt-2 md:mt-0">
              Building careers, one success story at a time.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
