import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, Business, Category, BusinessCreateRequest } from '@/services/api';

interface BusinessContextType {
  businesses: Business[];
  categories: Category[];
  featuredBusinesses: Business[];
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  
  // Actions
  fetchBusinesses: (params?: {
    search?: string;
    category?: number;
    city?: string;
    county?: string;
    rating?: number;
    is_featured?: boolean;
    ordering?: string;
    page?: number;
  }) => Promise<void>;
  
  fetchCategories: () => Promise<void>;
  createBusiness: (data: BusinessCreateRequest) => Promise<Business>;
  updateBusiness: (id: string, data: Partial<BusinessCreateRequest>) => Promise<Business>;
  deleteBusiness: (id: string) => Promise<void>;
  toggleFavorite: (businessId: string) => Promise<void>;
  
  // Utility
  getBusinessById: (id: string) => Business | undefined;
  clearError: () => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

interface BusinessProviderProps {
  children: ReactNode;
}

export const BusinessProvider: React.FC<BusinessProviderProps> = ({ children }) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  // Computed featured businesses
  const featuredBusinesses = businesses.filter(business => 
    business.is_featured && business.is_active && business.is_verified
  );

  // Load initial data
  useEffect(() => {
    fetchBusinesses();
    fetchCategories();
  }, []);

  const fetchBusinesses = async (params?: {
    search?: string;
    category?: number;
    city?: string;
    county?: string;
    rating?: number;
    is_featured?: boolean;
    ordering?: string;
    page?: number;
  }) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await apiService.getBusinesses(params);
      setBusinesses(response.results);
      setTotalCount(response.count);
      setCurrentPage(params?.page || 1);
      setHasNextPage(!!response.next);
      setHasPreviousPage(!!response.previous);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch businesses';
      setError(errorMessage);
      console.error('Failed to fetch businesses:', err);
      
      // Fallback to mock data if API fails
      const mockBusinesses = [
        {
          id: "1",
          user: "user1",
          business_name: "Sarah's Catering",
          category: { id: 1, name: "Food & Dining", slug: "food-dining" },
          description: "Delicious catering services for all occasions",
          phone: "+254-700-123-456",
          email: "sarah@catering.com",
          website: "https://sarahscatering.com",
          address: "123 Main Street",
          city: "Nairobi",
          county: "Nairobi",
          state: "Nairobi",
          zip_code: "00100",
          latitude: -1.2921,
          longitude: 36.8219,
          rating: 4.8,
          review_count: 45,
          is_verified: true,
          is_featured: true,
          is_active: true,
          business_image_url: "/lovable-uploads/placeholder.svg",
          business_logo_url: "/lovable-uploads/placeholder.svg",
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z"
        },
        {
          id: "2",
          user: "user2",
          business_name: "Tech Solutions Pro",
          category: { id: 2, name: "Technology", slug: "technology" },
          description: "Professional IT services and web development",
          phone: "+254-700-234-567",
          email: "mike@techsolutions.com",
          website: "https://techsolutionspro.com",
          address: "456 Tech Avenue",
          city: "Nairobi",
          county: "Nairobi",
          state: "Nairobi",
          zip_code: "00100",
          latitude: -1.2921,
          longitude: 36.8219,
          rating: 4.9,
          review_count: 32,
          is_verified: true,
          is_featured: true,
          is_active: true,
          business_image_url: "/lovable-uploads/placeholder.svg",
          business_logo_url: "/lovable-uploads/placeholder.svg",
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z"
        },
        {
          id: "3",
          user: "user3",
          business_name: "Grace Beauty Salon",
          category: { id: 3, name: "Health & Beauty", slug: "health-beauty" },
          description: "Professional beauty and wellness services",
          phone: "+254-700-345-678",
          email: "grace@beautysalon.com",
          website: "https://gracebeautysalon.com",
          address: "789 Beauty Lane",
          city: "Nairobi",
          county: "Nairobi",
          state: "Nairobi",
          zip_code: "00100",
          latitude: -1.2921,
          longitude: 36.8219,
          rating: 4.7,
          review_count: 28,
          is_verified: true,
          is_featured: true,
          is_active: true,
          business_image_url: "/lovable-uploads/placeholder.svg",
          business_logo_url: "/lovable-uploads/placeholder.svg",
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2024-01-01T00:00:00Z"
        }
      ];
      
      setBusinesses(mockBusinesses);
      setTotalCount(mockBusinesses.length);
      setCurrentPage(1);
      setHasNextPage(false);
      setHasPreviousPage(false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setError(null);
      const response = await apiService.getCategories();
      setCategories(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch categories';
      setError(errorMessage);
      console.error('Failed to fetch categories:', err);
      
      // Fallback to mock categories if API fails
      const mockCategories = [
        { id: 1, name: "Food & Dining", slug: "food-dining" },
        { id: 2, name: "Technology", slug: "technology" },
        { id: 3, name: "Health & Beauty", slug: "health-beauty" },
        { id: 4, name: "Automotive", slug: "automotive" },
        { id: 5, name: "Real Estate", slug: "real-estate" },
        { id: 6, name: "Education", slug: "education" },
        { id: 7, name: "Professional Services", slug: "professional-services" },
        { id: 8, name: "Home & Garden", slug: "home-garden" }
      ];
      
      setCategories(mockCategories);
    }
  };

  const createBusiness = async (data: BusinessCreateRequest): Promise<Business> => {
    try {
      setError(null);
      const newBusiness = await apiService.createBusiness(data);
      
      // Add to current list if it's the first page
      if (currentPage === 1) {
        setBusinesses(prev => [newBusiness, ...prev]);
        setTotalCount(prev => prev + 1);
      }
      
      return newBusiness;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create business';
      setError(errorMessage);
      console.error('Failed to create business:', err);
      throw err;
    }
  };

  const updateBusiness = async (id: string, data: Partial<BusinessCreateRequest>): Promise<Business> => {
    try {
      setError(null);
      const updatedBusiness = await apiService.updateBusiness(id, data);
      
      // Update in current list
      setBusinesses(prev => 
        prev.map(business => 
          business.id === id ? updatedBusiness : business
        )
      );
      
      return updatedBusiness;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update business';
      setError(errorMessage);
      console.error('Failed to update business:', err);
      throw err;
    }
  };

  const deleteBusiness = async (id: string): Promise<void> => {
    try {
      setError(null);
      await apiService.deleteBusiness(id);
      
      // Remove from current list
      setBusinesses(prev => prev.filter(business => business.id !== id));
      setTotalCount(prev => prev - 1);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete business';
      setError(errorMessage);
      console.error('Failed to delete business:', err);
      throw err;
    }
  };

  const toggleFavorite = async (businessId: string): Promise<void> => {
    try {
      setError(null);
      await apiService.toggleFavorite(businessId);
      
      // Update business in list (toggle favorite status)
      // Note: This is a simplified approach. In a real app, you might want to track favorites separately
      setBusinesses(prev => 
        prev.map(business => 
          business.id === businessId 
            ? { ...business, is_featured: !business.is_featured }
            : business
        )
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to toggle favorite';
      setError(errorMessage);
      console.error('Failed to toggle favorite:', err);
      throw err;
    }
  };

  const getBusinessById = (id: string): Business | undefined => {
    return businesses.find(business => business.id === id);
  };

  const clearError = () => {
    setError(null);
  };

  // Load initial data
  useEffect(() => {
    fetchBusinesses();
    fetchCategories();
  }, []);

  const value: BusinessContextType = {
    businesses,
    categories,
    featuredBusinesses,
    isLoading,
    error,
    totalCount,
    currentPage,
    hasNextPage,
    hasPreviousPage,
    fetchBusinesses,
    fetchCategories,
    createBusiness,
    updateBusiness,
    deleteBusiness,
    toggleFavorite,
    getBusinessById,
    clearError,
  };

  return <BusinessContext.Provider value={value}>{children}</BusinessContext.Provider>;
};

export const useBusiness = (): BusinessContextType => {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
}; 