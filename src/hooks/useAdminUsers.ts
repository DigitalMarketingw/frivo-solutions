
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, PaginationParams, PaginatedResponse } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

export const useAdminUsers = (params: PaginationParams = { page: 1, limit: 10 }) => {
  const [users, setUsers] = useState<PaginatedResponse<User>>({
    data: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('profiles')
        .select('*', { count: 'exact' });

      // Apply search filter
      if (params.search) {
        query = query.or(`full_name.ilike.%${params.search}%,id.ilike.%${params.search}%`);
      }

      // Apply sorting
      if (params.sort) {
        query = query.order(params.sort, { ascending: params.order === 'asc' });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      // Apply pagination
      const from = (params.page - 1) * params.limit;
      const to = from + params.limit - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;

      const totalPages = Math.ceil((count || 0) / params.limit);

      setUsers({
        data: data || [],
        total: count || 0,
        page: params.page,
        limit: params.limit,
        totalPages,
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || 'Failed to fetch users',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'user' | 'admin') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User role updated successfully",
      });
      
      await fetchUsers();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || 'Failed to update user role',
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [params.page, params.limit, params.search, params.sort, params.order]);

  return {
    users,
    loading,
    refetch: fetchUsers,
    updateUserRole,
  };
};
