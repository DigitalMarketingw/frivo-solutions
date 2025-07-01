
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  Briefcase
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const contactFormSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  currentJobTitle: z.string().min(2, 'Please enter your current job title'),
  yearsExperience: z.string().min(1, 'Please select your experience level'),
  preferredField: z.string().min(1, 'Please select your preferred field'),
  salaryRange: z.string().min(1, 'Please select your desired salary range'),
  locationPreference: z.string().min(1, 'Please select your location preference'),
  message: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      currentJobTitle: '',
      yearsExperience: '',
      preferredField: '',
      salaryRange: '',
      locationPreference: '',
      message: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = (data: ContactFormData) => {
    console.log('Form submitted:', data);
    toast({
      title: "Application Submitted Successfully!",
      description: "We'll review your information and get back to you within 24 hours.",
    });
    form.reset();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/5e550e9d-5865-4e41-bf94-3e957f814d97.png" 
                alt="Frivo Solutions" 
                className="h-10 w-auto"
              />
              <div className="text-xl font-bold text-primary">
                Frivo Solutions
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/">Home</Link>
              </Button>
              <Button asChild className="frivo-button">
                <Link to="/auth">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="professional-section py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-slate-900">
                Ready to Launch Your Career?
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed">
                Share your professional details with us and let our expert team connect you 
                with premium career opportunities tailored to your skills and aspirations.
              </p>
              
              <div className="flex flex-wrap gap-6 pt-4 text-sm text-slate-500">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Free consultation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Expert career guidance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>24/7 support</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Contact Info */}
            <Card className="frivo-card">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900 flex items-center">
                  <Mail className="h-6 w-6 mr-3 text-primary" />
                  Get In Touch
                </CardTitle>
                <CardDescription className="text-slate-600 text-lg">
                  Connect with our career experts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Email Us</p>
                    <p className="text-slate-600 text-sm">careers@frivosolutions.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Call Us</p>
                    <p className="text-slate-600 text-sm">+1 507 209 0001</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Visit Us</p>
                    <p className="text-slate-600 text-sm">147 W 28th ST RM 10E, NEW YORK, NY 10001</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Tell Us About Your Goals
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Fill out this form to help us understand your career aspirations and connect you with the right opportunities.
            </p>
          </div>

          <Card className="frivo-card">
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Personal Information Section */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-200">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900">Personal Information</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Professional Details Section */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-200">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <Briefcase className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900">Professional Details</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="currentJobTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Job Title *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Software Engineer" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="yearsExperience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Years of Experience *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select experience level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="0-1">0-1 years</SelectItem>
                                <SelectItem value="2-3">2-3 years</SelectItem>
                                <SelectItem value="4-6">4-6 years</SelectItem>
                                <SelectItem value="7-10">7-10 years</SelectItem>
                                <SelectItem value="10+">10+ years</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="preferredField"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Field/Industry *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your field" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="technology">Technology</SelectItem>
                                <SelectItem value="finance">Finance</SelectItem>
                                <SelectItem value="healthcare">Healthcare</SelectItem>
                                <SelectItem value="marketing">Marketing</SelectItem>
                                <SelectItem value="sales">Sales</SelectItem>
                                <SelectItem value="design">Design</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="salaryRange"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Desired Salary Range *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select salary range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="30-50k">$30,000 - $50,000</SelectItem>
                                <SelectItem value="50-75k">$50,000 - $75,000</SelectItem>
                                <SelectItem value="75-100k">$75,000 - $100,000</SelectItem>
                                <SelectItem value="100-150k">$100,000 - $150,000</SelectItem>
                                <SelectItem value="150k+">$150,000+</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="locationPreference"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location Preference *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select location preference" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="remote">Remote</SelectItem>
                              <SelectItem value="onsite">On-site</SelectItem>
                              <SelectItem value="hybrid">Hybrid</SelectItem>
                              <SelectItem value="flexible">Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Information</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us more about your career goals, specific requirements, or anything else you'd like us to know..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Terms and Submit */}
                  <div className="space-y-6 pt-6 border-t border-slate-200">
                    <FormField
                      control={form.control}
                      name="agreeToTerms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I agree to the Terms of Service and Privacy Policy *
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full frivo-button"
                    >
                      Submit Application
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Contact;
