
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building2, User, Mail, Phone, MapPin, Globe, FileText } from 'lucide-react';

interface CompanyCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCompany: (data: CompanyFormData) => Promise<void>;
  isCreating: boolean;
}

interface CompanyFormData {
  company_name: string;
  company_email: string;
  company_phone: string;
  company_address: string;
  company_website: string;
  company_description: string;
  admin_full_name: string;
  admin_email: string;
  admin_password: string;
}

export const CompanyCreationModal: React.FC<CompanyCreationModalProps> = ({
  isOpen,
  onClose,
  onCreateCompany,
  isCreating,
}) => {
  const [formData, setFormData] = useState<CompanyFormData>({
    company_name: '',
    company_email: '',
    company_phone: '',
    company_address: '',
    company_website: '',
    company_description: '',
    admin_full_name: '',
    admin_email: '',
    admin_password: '',
  });

  const handleInputChange = (field: keyof CompanyFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onCreateCompany(formData);
    // Reset form
    setFormData({
      company_name: '',
      company_email: '',
      company_phone: '',
      company_address: '',
      company_website: '',
      company_description: '',
      admin_full_name: '',
      admin_email: '',
      admin_password: '',
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <Building2 className="h-5 w-5" />
            <span>Create New Company</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="flex items-center space-x-2 text-lg font-semibold">
              <Building2 className="h-4 w-4" />
              <span>Company Information</span>
            </h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="company_name" className="flex items-center space-x-1">
                  <Building2 className="h-3 w-3" />
                  <span>Company Name *</span>
                </Label>
                <Input
                  id="company_name"
                  value={formData.company_name}
                  onChange={(e) => handleInputChange('company_name', e.target.value)}
                  required
                  placeholder="Enter company name"
                />
              </div>
              
              <div>
                <Label htmlFor="company_email" className="flex items-center space-x-1">
                  <Mail className="h-3 w-3" />
                  <span>Company Email *</span>
                </Label>
                <Input
                  id="company_email"
                  type="email"
                  value={formData.company_email}
                  onChange={(e) => handleInputChange('company_email', e.target.value)}
                  required
                  placeholder="company@example.com"
                />
              </div>
              
              <div>
                <Label htmlFor="company_phone" className="flex items-center space-x-1">
                  <Phone className="h-3 w-3" />
                  <span>Phone</span>
                </Label>
                <Input
                  id="company_phone"
                  value={formData.company_phone}
                  onChange={(e) => handleInputChange('company_phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div>
                <Label htmlFor="company_website" className="flex items-center space-x-1">
                  <Globe className="h-3 w-3" />
                  <span>Website</span>
                </Label>
                <Input
                  id="company_website"
                  value={formData.company_website}
                  onChange={(e) => handleInputChange('company_website', e.target.value)}
                  placeholder="https://company.com"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="company_address" className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>Address</span>
              </Label>
              <Input
                id="company_address"
                value={formData.company_address}
                onChange={(e) => handleInputChange('company_address', e.target.value)}
                placeholder="123 Business St, City, State 12345"
              />
            </div>
            
            <div>
              <Label htmlFor="company_description" className="flex items-center space-x-1">
                <FileText className="h-3 w-3" />
                <span>Description</span>
              </Label>
              <Textarea
                id="company_description"
                value={formData.company_description}
                onChange={(e) => handleInputChange('company_description', e.target.value)}
                placeholder="Brief description of the company..."
                rows={3}
              />
            </div>
          </div>

          {/* Admin User Information */}
          <div className="space-y-4">
            <h3 className="flex items-center space-x-2 text-lg font-semibold">
              <User className="h-4 w-4" />
              <span>Company Admin User</span>
            </h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="admin_full_name" className="flex items-center space-x-1">
                  <User className="h-3 w-3" />
                  <span>Full Name *</span>
                </Label>
                <Input
                  id="admin_full_name"
                  value={formData.admin_full_name}
                  onChange={(e) => handleInputChange('admin_full_name', e.target.value)}
                  required
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <Label htmlFor="admin_email" className="flex items-center space-x-1">
                  <Mail className="h-3 w-3" />
                  <span>Admin Email *</span>
                </Label>
                <Input
                  id="admin_email"
                  type="email"
                  value={formData.admin_email}
                  onChange={(e) => handleInputChange('admin_email', e.target.value)}
                  required
                  placeholder="admin@company.com"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="admin_password" className="flex items-center space-x-1">
                <span>Password *</span>
              </Label>
              <Input
                id="admin_password"
                type="password"
                value={formData.admin_password}
                onChange={(e) => handleInputChange('admin_password', e.target.value)}
                required
                minLength={6}
                placeholder="Minimum 6 characters"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Company"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
