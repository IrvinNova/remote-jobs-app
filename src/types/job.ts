export interface Job {
  id: number;
  url: string;
  title: string;
  company_name: string;
  company_logo: string;
  category: string;
  job_type: string;
  candidate_required_location: string;
  salary: string;
  description: string;
  publication_date: string;
}

export interface Category {
  name: string;
  slug: string;
}

export interface JobStore {
  jobs: Job[];
  filteredJobs: Job[];
  categories: Category[];
  favorites: number[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string;
  selectedJobType: string;
  
  // Actions
  fetchJobs: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  searchJobs: (query: string) => void;
  filterByCategory: (category: string) => void;
  filterByJobType: (jobType: string) => void;
  toggleFavorite: (jobId: number) => void;
  refreshJobs: () => Promise<void>;
}