
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Company } from '@/types/company';

interface CreateCompanyData {
  company_name: string;
  company_email: string;
  company_phone?: string;
  company_address?: string;
  company_website?: string;
  company_description?: string;
  admin_full_name: string;
  admin_email: string;
  admin_password: string;
}

interface CompanyCreationResult {
  company_id: string;
  company_uuid: string;
  created_company_name: string;
  admin_email: string;
  admin_full_name: string;
}

export const useAdminCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  const fetchCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCompanies(data || []);
    } catch (error: any) {
      console.error('Error fetching companies:', error);
      toast({
        title: "Error",
        description: "Failed to fetch companies",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const createCompany = useCallback(async (companyData: CreateCompanyData): Promise<CompanyCreationResult | null> => {
    setCreating(true);
    try {
      // Call the function with corrected parameter names
      const { data, error } = await supabase.rpc('admin_create_company', {
        p_company_name: companyData.company_name,
        p_admin_full_name: companyData.admin_full_name,
        p_admin_email: companyData.admin_email,
        p_admin_password: companyData.admin_password,
        p_company_email: companyData.company_email,
        p_company_phone: companyData.company_phone,
        p_company_address: companyData.company_address,
        p_company_website: companyData.company_website,
        p_company_description: companyData.company_description,
      });

      if (error) throw error;

      // Now create the admin user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: companyData.admin_email,
        password: companyData.admin_password,
        options: {
          data: {
            full_name: companyData.admin_full_name,
          },
        },
      });

      if (authError) {
        console.error('Auth error (non-critical):', authError);
        // Don't throw here as the company is already created
      }

      // If auth user was created, update their profile
      if (authData.user && !authError) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: authData.user.id,
            full_name: companyData.admin_full_name,
            role: 'company',
            company_id: data[0].company_uuid,
          });

        if (profileError) {
          console.error('Profile update error (non-critical):', profileError);
        }
      }

      toast({
        title: "Success!",
        description: `Company created successfully! Company ID: ${data[0].company_id}`,
      });

      // Refresh companies list
      await fetchCompanies();

      return data[0] as CompanyCreationResult;
    } catch (error: any) {
      console.error('Error creating company:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create company",
        variant: "destructive",
      });
      return null;
    } finally {
      setCreating(false);
    }
  }, [toast, fetchCompanies]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return {
    companies,
    loading,
    creating,
    fetchCompanies,
    createCompany,
  };
};
