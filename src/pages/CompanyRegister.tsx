
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Building2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const CompanyRegister: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    description: '',
    admin_full_name: '',
    admin_email: '',
    admin_password: '',
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First, create the company admin user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.admin_email,
        password: formData.admin_password,
        options: {
          data: {
            full_name: formData.admin_full_name,
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // Generate company ID
        const { data: companyIdData, error: companyIdError } = await supabase
          .rpc('generate_company_id');

        if (companyIdError) throw companyIdError;

        // Create the company record
        const { data: companyData, error: companyError } = await supabase
          .from('companies')
          .insert({
            company_name: formData.company_name,
            company_id: companyIdData,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            website: formData.website,
            description: formData.description,
          })
          .select()
          .single();

        if (companyError) throw companyError;

        // Update the user's profile to link to the company and set role to 'company'
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            company_id: companyData.id,
            role: 'company',
            full_name: formData.admin_full_name,
          })
          .eq('id', authData.user.id);

        if (profileError) throw profileError;

        toast({
          title: "Company registered successfully!",
          description: `Your company ID is: ${companyIdData}. Please save this for future reference.`,
        });

        // Redirect to login page
        navigate('/auth');
      }
    } catch (error: any) {
      console.error('Company registration error:', error);
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <Link to="/auth" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Sign In
          </Link>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <Building2 className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-primary">Register Your Company</h1>
            <p className="text-muted-foreground mt-2">
              Join our platform to start posting jobs and managing applications
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Company Details</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="company_name">Company Name *</Label>
                    <Input
                      id="company_name"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Company Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Tell us about your company..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Admin User Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Admin User Details</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="admin_full_name">Full Name *</Label>
                    <Input
                      id="admin_full_name"
                      name="admin_full_name"
                      value={formData.admin_full_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="admin_email">Email *</Label>
                    <Input
                      id="admin_email"
                      name="admin_email"
                      type="email"
                      value={formData.admin_email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="admin_password">Password *</Label>
                  <Input
                    id="admin_password"
                    name="admin_password"
                    type="password"
                    value={formData.admin_password}
                    onChange={handleInputChange}
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Registering..." : "Register Company"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyRegister;
