
export interface AdminStats {
  total_users: number;
  total_jobs: number;
  total_applications: number;
  total_enrollments: number;
  active_jobs: number;
  pending_applications: number;
  admin_users: number;
}

export interface User {
  id: string;
  full_name: string | null;
  phone: string | null;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  field: string;
  status: 'open' | 'closed' | 'under_review' | 'filled';
  description: string;
  requirements: any;
  tags: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Application {
  id: string;
  user_id: string;
  job_id: string;
  status: 'applied' | 'under_review' | 'test_assigned' | 'test_completed' | 'approved' | 'rejected';
  applied_at: string;
  assignment_completed: boolean | null;
  assignment_status: string | null;
  hackerrank_link: string | null;
  test_results: any;
  profiles?: {
    full_name: string;
  };
  jobs?: {
    title: string;
    company: string;
  };
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
