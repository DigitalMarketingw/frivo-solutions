
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { User, PaginatedResponse } from '@/types/admin';

interface AdminUserManagementProps {
  users: PaginatedResponse<User>;
  loading: boolean;
  searchParams: {
    search: string;
    page: number;
    limit: number;
  };
  onSearchChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (limit: number) => void;
  onUpdateUserRole: (user: User) => void;
}

export const AdminUserManagement: React.FC<AdminUserManagementProps> = ({
  users,
  loading,
  searchParams,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
  onUpdateUserRole,
}) => {
  const userColumns = [
    { key: 'full_name', label: 'Name', render: (value: string, user: User) => value || 'Not provided' },
    { key: 'id', label: 'User ID' },
    { key: 'role', label: 'Role', render: (value: string) => <StatusBadge status={value} type="user" /> },
    { key: 'phone', label: 'Phone', render: (value: string) => value || 'Not provided' },
    { key: 'created_at', label: 'Joined', render: (value: string) => new Date(value).toLocaleDateString() },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          data={users.data}
          columns={userColumns}
          loading={loading}
          search={{
            value: searchParams.search,
            onChange: onSearchChange,
            placeholder: "Search users by name or ID..."
          }}
          pagination={{
            currentPage: users.page,
            totalPages: users.totalPages,
            totalItems: users.total,
            pageSize: users.limit,
            onPageChange: onPageChange,
            onPageSizeChange: onPageSizeChange,
          }}
          actions={(user: User) => (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateUserRole(user)}
            >
              {user.role === 'admin' ? 'Make User' : 'Make Admin'}
            </Button>
          )}
        />
      </CardContent>
    </Card>
  );
};
