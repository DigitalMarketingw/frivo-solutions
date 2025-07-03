
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Brain, Rocket, DollarSign, Cog, Cpu, Menu, Target, Shield, Heart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export const PublicHeader: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/5e550e9d-5865-4e41-bf94-3e957f814d97.png" 
                alt="Frivo Solutions" 
                className="h-10 w-auto"
              />
              <div className="text-xl font-bold bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
                Frivo Solutions
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation Menu with Services and Know Us Dropdowns */}
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-slate-700 hover:text-primary font-medium">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[600px] gap-3 p-6">
                      <div className="grid grid-cols-1 gap-2">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/services/strategy-consulting"
                            className="group flex items-center space-x-3 rounded-lg p-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-200"
                          >
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                              <Brain className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900 group-hover:text-primary">Strategy & Consulting</div>
                              <div className="text-sm text-slate-600">Flexible delivery models and deep expertise</div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        
                        <NavigationMenuLink asChild>
                          <Link
                            to="/services/business-transformation"
                            className="group flex items-center space-x-3 rounded-lg p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-200"
                          >
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                              <Rocket className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900 group-hover:text-primary">Business Transformation</div>
                              <div className="text-sm text-slate-600">Reshape operations for sustainable growth</div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        
                        <NavigationMenuLink asChild>
                          <Link
                            to="/services/finance-transformation"
                            className="group flex items-center space-x-3 rounded-lg p-3 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-200"
                          >
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                              <DollarSign className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900 group-hover:text-primary">Finance Transformation</div>
                              <div className="text-sm text-slate-600">Build resilient, agile finance functions</div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        
                        <NavigationMenuLink asChild>
                          <Link
                            to="/services/business-process-management"
                            className="group flex items-center space-x-3 rounded-lg p-3 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-200"
                          >
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                              <Cog className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900 group-hover:text-primary">Business Process Management</div>
                              <div className="text-sm text-slate-600">Streamline operations across all functions</div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        
                        <NavigationMenuLink asChild>
                          <Link
                            to="/services/digital-automation"
                            className="group flex items-center space-x-3 rounded-lg p-3 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200"
                          >
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                              <Cpu className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900 group-hover:text-primary">Digital & Automation</div>
                              <div className="text-sm text-slate-600">AI, ML, RPA, and custom software solutions</div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-slate-700 hover:text-primary font-medium">
                    Know Us
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[500px] gap-3 p-6">
                      <div className="grid grid-cols-1 gap-2">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/know-us/our-purpose"
                            className="group flex items-center space-x-3 rounded-lg p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                          >
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                              <Target className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900 group-hover:text-primary">Our Purpose</div>
                              <div className="text-sm text-slate-600">Fueling innovation through excellence</div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        
                        <NavigationMenuLink asChild>
                          <Link
                            to="/know-us/quality-security-trust"
                            className="group flex items-center space-x-3 rounded-lg p-3 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200"
                          >
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                              <Shield className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900 group-hover:text-primary">Frivo Quality, Security & Trust</div>
                              <div className="text-sm text-slate-600">Highest standards of quality and data protection</div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        
                        <NavigationMenuLink asChild>
                          <Link
                            to="/know-us/workplace-that-inspires"
                            className="group flex items-center space-x-3 rounded-lg p-3 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 transition-all duration-200"
                          >
                            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
                              <Heart className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900 group-hover:text-primary">A Workplace That Inspires</div>
                              <div className="text-sm text-slate-600">Where innovation meets culture</div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Button variant="ghost" asChild className="hover:bg-primary/5">
              <Link to="/about">About Us</Link>
            </Button>
            <Button variant="ghost" asChild className="hover:bg-primary/5">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button variant="ghost" asChild className="hover:bg-primary/5">
              <Link to="/auth">Sign In</Link>
            </Button>
            <Button variant="default" asChild className="bg-gradient-to-r from-primary to-blue-700 hover:from-primary/90 hover:to-blue-700/90 shadow-md hover:shadow-lg transition-all duration-200">
              <Link to="/jobs">Job Portal</Link>
            </Button>
          </div>
          
          {/* Mobile Navigation - Hamburger Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/5">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 sm:w-96">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-6">
                  {/* Services Section */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900 text-lg">Services</h3>
                    <div className="space-y-3 pl-4">
                      <Link
                        to="/services/strategy-consulting"
                        className="flex items-center space-x-3 rounded-lg p-3 hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                          <Brain className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-slate-700">Strategy & Consulting</span>
                      </Link>
                      
                      <Link
                        to="/services/business-transformation"
                        className="flex items-center space-x-3 rounded-lg p-3 hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                          <Rocket className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-slate-700">Business Transformation</span>
                      </Link>
                      
                      <Link
                        to="/services/finance-transformation"
                        className="flex items-center space-x-3 rounded-lg p-3 hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                          <DollarSign className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-slate-700">Finance Transformation</span>
                      </Link>
                      
                      <Link
                        to="/services/business-process-management"
                        className="flex items-center space-x-3 rounded-lg p-3 hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                          <Cog className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-slate-700">Business Process Management</span>
                      </Link>
                      
                      <Link
                        to="/services/digital-automation"
                        className="flex items-center space-x-3 rounded-lg p-3 hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Cpu className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-slate-700">Digital & Automation</span>
                      </Link>
                    </div>
                  </div>

                  {/* Know Us Section */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-900 text-lg">Know Us</h3>
                    <div className="space-y-3 pl-4">
                      <Link
                        to="/know-us/our-purpose"
                        className="flex items-center space-x-3 rounded-lg p-3 hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                          <Target className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-slate-700">Our Purpose</span>
                      </Link>
                      
                      <Link
                        to="/know-us/quality-security-trust"
                        className="flex items-center space-x-3 rounded-lg p-3 hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                          <Shield className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-slate-700">Quality, Security & Trust</span>
                      </Link>
                      
                      <Link
                        to="/know-us/workplace-that-inspires"
                        className="flex items-center space-x-3 rounded-lg p-3 hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
                          <Heart className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-slate-700">A Workplace That Inspires</span>
                      </Link>
                    </div>
                  </div>
                  
                  {/* Other Navigation Links */}
                  <div className="space-y-3">
                    <Button variant="ghost" asChild className="w-full justify-start hover:bg-slate-50">
                      <Link to="/about">About Us</Link>
                    </Button>
                    <Button variant="ghost" asChild className="w-full justify-start hover:bg-slate-50">
                      <Link to="/contact">Contact Us</Link>
                    </Button>
                    <Button variant="ghost" asChild className="w-full justify-start hover:bg-slate-50">
                      <Link to="/auth">Sign In</Link>
                    </Button>
                    <Button variant="default" asChild className="w-full bg-gradient-to-r from-primary to-blue-700 hover:from-primary/90 hover:to-blue-700/90 shadow-md hover:shadow-lg transition-all duration-200">
                      <Link to="/jobs">Job Portal</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
