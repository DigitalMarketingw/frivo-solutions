
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Plus, Search, Mail, Phone, Globe, MapPin } from 'lucide-react';
import { useAdminCompanies } from '@/hooks/useAdminCompanies';
import { CompanyCreationModal } from './CompanyCreationModal';
import { Company } from '@/types/company';

export const AdminCompanyManagement: React.FC = () => {
  const { companies, loading, creating, createCompany } = useAdminCompanies();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCompanies = companies.filter(company =>
    company.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.company_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCompany = async (data: any) => {
    const result = await createCompany(data);
    if (result) {
      setIsModalOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2">Loading companies...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Company Management</h2>
          <p className="text-muted-foreground">
            Create and manage company accounts and their admin users
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Create Company</span>
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2 max-w-md">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search companies by name, ID, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Companies Grid */}
      {filteredCompanies.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Companies Found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'No companies match your search criteria.' : 'No companies have been created yet.'}
            </p>
            {!searchTerm && (
              <Button onClick={() => setIsModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Company
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}

      {/* Company Creation Modal */}
      <CompanyCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateCompany={handleCreateCompany}
        isCreating={creating}
      />
    </div>
  );
};

interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{company.company_name}</CardTitle>
              <Badge variant="secondary" className="text-xs">
                ID: {company.company_id}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {company.email && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Mail className="h-3 w-3" />
            <span className="truncate">{company.email}</span>
          </div>
        )}
        
        {company.phone && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Phone className="h-3 w-3" />
            <span>{company.phone}</span>
          </div>
        )}
        
        {company.website && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Globe className="h-3 w-3" />
            <span className="truncate">{company.website}</span>
          </div>
        )}
        
        {company.address && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="truncate">{company.address}</span>
          </div>
        )}

        {company.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {company.description}
          </p>
        )}

        <div className="pt-2 border-t">
          <div className="text-xs text-muted-foreground">
            Created: {formatDate(company.created_at)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
