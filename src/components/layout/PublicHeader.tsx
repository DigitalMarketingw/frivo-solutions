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
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/5e550e9d-5865-4e41-bf94-3e957f814d97.png" 
                alt="Frivo Solutions" 
                className="h-10 w-auto"
              />
              <div className="text-xl font-bold text-primary">
                Frivo Solutions
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-slate-700 hover:text-primary font-medium">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[500px] gap-2 p-4">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/services/strategy-consulting"
                          className="group flex items-center space-x-3 rounded-lg p-3 hover:bg-slate-50 transition-colors"
                        >
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Brain className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">Strategy & Consulting</div>
                            <div className="text-sm text-slate-600">Flexible delivery models and deep expertise</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      
                      <NavigationMenuLink asChild>
                        <Link
                          to="/services/business-transformation"
                          className="group flex items-center space-x-3 rounded-lg p-3 hover:bg-slate-50 transition-colors"
                        >
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Rocket className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">Business Transformation</div>
                            <div className="text-sm text-slate-600">Reshape operations for sustainable growth</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      
                      <NavigationMenuLink asChild>
                        <Link
                          to="/services/finance-transformation"
                          className="group flex items-center space-x-3 rounded-lg p-3 hover:bg-slate-50 transition-colors"
                        >
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <DollarSign className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">Finance Transformation</div>
                            <div className="text-sm text-slate-600">Build resilient, agile finance functions</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      
                      <NavigationMenuLink asChild>
                        <Link
                          to="/services/business-process-management"
                          className="group flex items-center space-x-3 rounded-lg p-3 hover:bg-slate-50 transition-colors"
                        >
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Cog className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">Business Process Management</div>
                            <div className="text-sm text-slate-600">Streamline operations across all functions</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      
                      <NavigationMenuLink asChild>
                        <Link
                          to="/services/digital-automation"
                          className="group flex items-center space-x-3 rounded-lg p-3 hover:bg-slate-50 transition-colors"
                        >
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Cpu className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">Digital & Automation</div>
                            <div className="text-sm text-slate-600">AI, ML, RPA, and custom software solutions</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-slate-700 hover:text-primary font-medium">
                    Know Us
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-2 p-4">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/know-us/our-purpose"
                          className="group flex items-center space-x-3 rounded-lg p-3 hover:bg-slate-50 transition-colors"
                        >
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Target className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">Our Purpose</div>
                            <div className="text-sm text-slate-600">Fueling innovation through excellence</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      
                      <NavigationMenuLink asChild>
                        <Link
                          to="/know-us/quality-security-trust"
                          className="group flex items-center space-x-3 rounded-lg p-3 hover:bg-slate-50 transition-colors"
                        >
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Shield className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">Quality, Security & Trust</div>
                            <div className="text-sm text-slate-600">Highest standards of quality and data protection</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      
                      <NavigationMenuLink asChild>
                        <Link
                          to="/know-us/workplace-that-inspires"
                          className="group flex items-center space-x-3 rounded-lg p-3 hover:bg-slate-50 transition-colors"
                        >
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Heart className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">A Workplace That Inspires</div>
                            <div className="text-sm text-slate-600">Where innovation meets culture</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Button variant="ghost" asChild>
              <Link to="/about">About Us</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
            <Button asChild className="frivo-button">
              <Link to="/auth">Job Portal</Link>
            </Button>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
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
                  <div className="space-y-3">
                    <h3 className="font-semibold text-slate-900 text-lg">Services</h3>
                    <div className="space-y-2 pl-2">
                      <Link
                        to="/services/strategy-consulting"
                        className="flex items-center space-x-3 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
                          <Brain className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-slate-700 text-sm">Strategy & Consulting</span>
                      </Link>
                      
                      <Link
                        to="/services/business-transformation"
                        className="flex items-center space-x-3 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
                          <Rocket className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-slate-700 text-sm">Business Transformation</span>
                      </Link>
                      
                      <Link
                        to="/services/finance-transformation"
                        className="flex items-center space-x-3 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
                          <DollarSign className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-slate-700 text-sm">Finance Transformation</span>
                      </Link>
                      
                      <Link
                        to="/services/business-process-management"
                        className="flex items-center space-x-3 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
                          <Cog className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-slate-700 text-sm">Business Process Management</span>
                      </Link>
                      
                      <Link
                        to="/services/digital-automation"
                        className="flex items-center space-x-3 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
                          <Cpu className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-slate-700 text-sm">Digital & Automation</span>
                      </Link>
                    </div>
                  </div>

                  {/* Know Us Section */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-slate-900 text-lg">Know Us</h3>
                    <div className="space-y-2 pl-2">
                      <Link
                        to="/know-us/our-purpose"
                        className="flex items-center space-x-3 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
                          <Target className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-slate-700 text-sm">Our Purpose</span>
                      </Link>
                      
                      <Link
                        to="/know-us/quality-security-trust"
                        className="flex items-center space-x-3 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
                          <Shield className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-slate-700 text-sm">Quality, Security & Trust</span>
                      </Link>
                      
                      <Link
                        to="/know-us/workplace-that-inspires"
                        className="flex items-center space-x-3 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center">
                          <Heart className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-slate-700 text-sm">A Workplace That Inspires</span>
                      </Link>
                    </div>
                  </div>
                  
                  {/* Other Navigation Links */}
                  <div className="space-y-2 pt-4 border-t border-slate-200">
                    <Button variant="ghost" asChild className="w-full justify-start">
                      <Link to="/about">About Us</Link>
                    </Button>
                    <Button variant="ghost" asChild className="w-full justify-start">
                      <Link to="/contact">Contact Us</Link>
                    </Button>
                    <Button variant="ghost" asChild className="w-full justify-start">
                      <Link to="/auth">Sign In</Link>
                    </Button>
                    <Button asChild className="w-full frivo-button">
                      <Link to="/auth">Job Portal</Link>
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
