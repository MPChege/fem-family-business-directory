import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useBusiness } from "@/contexts/BusinessContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Clock,
  Phone,
  X,
  Building2,
  Eye,
  MessageSquare,
  Grid3X3,
  List,
  Shield
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const DirectoryPage = () => {
  const { businesses, categories, isLoading } = useBusiness();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("services");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState({
    county: "all",
    category: "all",
    rating: [0, 5],
    verifiedOnly: false,
    sortBy: "default"
  });
  
  const navigate = useNavigate();

  // Get unique counties from businesses
  const counties = Array.isArray(businesses) ? Array.from(new Set(businesses.map(b => b.county).filter(Boolean))).sort() : [];

  // Get category names from categories
  const categoryNames = Array.isArray(categories) ? categories.map(cat => cat.name) : [];

  // Calculate stats from businesses
  const stats = {
    totalBusinesses: Array.isArray(businesses) ? businesses.length : 0,
    verifiedBusinesses: Array.isArray(businesses) ? businesses.filter(b => b.verified).length : 0,
    averageRating: Array.isArray(businesses) && businesses.length > 0 
      ? (businesses.reduce((sum, b) => sum + (b.rating || 0), 0) / businesses.length).toFixed(1)
      : "0.0",
    totalReviews: Array.isArray(businesses) ? businesses.reduce((sum, b) => sum + (b.reviewCount || 0), 0) : 0
  };

  const handleSearch = () => {
    // Search functionality is handled by filtering
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearFilters = () => {
    setFilters({
      county: "all",
      category: "all",
      rating: [0, 5],
      verifiedOnly: false,
      sortBy: "default"
    });
  };

  // Filter businesses based on search and filters
  const filteredBusinesses = Array.isArray(businesses) ? businesses.filter(business => {
    const matchesSearch = searchTerm === "" || 
      business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCounty = filters.county === "all" || business.county === filters.county;
    const matchesCategory = filters.category === "all" || business.category === filters.category;
    const matchesRating = business.rating >= filters.rating[0] && business.rating <= filters.rating[1];
    const matchesVerified = !filters.verifiedOnly || business.verified;
    
    return matchesSearch && matchesCounty && matchesCategory && matchesRating && matchesVerified;
  }) : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-fem-terracotta mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading businesses...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          
          {/* Header */}
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8 text-center"
          >
            <h1 className="text-3xl font-bold text-fem-navy mb-4">Business Directory</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover trusted businesses in our faith community. Connect with local entrepreneurs and find the services you need.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          >
            <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-fem-terracotta to-fem-gold rounded-full flex items-center justify-center mx-auto mb-2">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-fem-navy">{stats.totalBusinesses}</div>
              <div className="text-sm text-gray-600">Total Businesses</div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-fem-navy to-fem-terracotta rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-fem-navy">{stats.verifiedBusinesses}</div>
              <div className="text-sm text-gray-600">Verified</div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-fem-gold to-fem-terracotta rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-fem-navy">{stats.averageRating}</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-fem-terracotta to-fem-navy rounded-full flex items-center justify-center mx-auto mb-2">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-fem-navy">{stats.totalReviews}</div>
              <div className="text-sm text-gray-600">Reviews</div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-1"
            >
              <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl sticky top-8">
                <CardHeader className="bg-gradient-to-r from-fem-navy to-fem-terracotta text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                  
                    {/* Search */}
                    <div>
                      <Label htmlFor="search" className="text-sm font-medium text-fem-navy">Search</Label>
                      <Input
                        id="search"
                        placeholder="Search businesses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="mt-1"
                      />
                    </div>

                    {/* Category Filter */}
                    <div>
                      <Label className="text-sm font-medium text-fem-navy">Category</Label>
                      <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {categoryNames.map((category) => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* County Filter */}
                    <div>
                      <Label className="text-sm font-medium text-fem-navy">County</Label>
                      <Select value={filters.county} onValueChange={(value) => setFilters(prev => ({ ...prev, county: value }))}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="All Counties" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Counties</SelectItem>
                          {counties.map((county) => (
                            <SelectItem key={county} value={county}>{county}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Rating Filter */}
                    <div>
                      <Label className="text-sm font-medium text-fem-navy">Rating: {filters.rating[0]} - {filters.rating[1]}</Label>
                      <Slider
                        value={filters.rating}
                        onValueChange={(value) => setFilters(prev => ({ ...prev, rating: value as [number, number] }))}
                        max={5}
                        min={0}
                        step={0.5}
                        className="mt-2"
                      />
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="verified"
                          checked={filters.verifiedOnly}
                          onCheckedChange={(checked) => setFilters(prev => ({ ...prev, verifiedOnly: checked as boolean }))}
                        />
                        <Label htmlFor="verified" className="text-sm">Verified Only</Label>
                      </div>
                    </div>

                    {/* Clear Filters */}
                    <Button
                      onClick={clearFilters}
                      variant="outline"
                      className="w-full"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Content */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-3"
            >
              <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-fem-navy to-fem-terracotta text-white rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <CardTitle>Business Directory</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                        onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                      >
                        {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  
                  {/* Business Listings */}
                  {filteredBusinesses.length > 0 ? (
                    <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                      {filteredBusinesses.map((business) => (
                        <motion.div 
                          key={business.id}
                          variants={itemVariants}
                          className="group"
                        >
                          <Card className="hover:shadow-lg transition-all duration-300 border border-gray-100">
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-fem-navy group-hover:text-fem-terracotta transition-colors duration-300">
                                    {business.name}
                                  </h3>
                                  <p className="text-gray-600 text-sm mt-1">{business.description}</p>
                                </div>
                                <Badge variant="outline" className="bg-gradient-to-r from-fem-terracotta to-fem-gold text-white border-0">
                                  {business.category}
                                </Badge>
                              </div>
                              
                              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4 text-fem-terracotta" />
                                  <span>{business.county}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span>{business.rating}</span>
                                </div>
                              </div>
                              
                              <div className="flex gap-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 border-fem-terracotta text-fem-terracotta hover:bg-fem-terracotta hover:text-white transition-all duration-300"
                                  onClick={() => navigate(`/business/${business.id}`)}
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </Button>
                                <Button
                                  size="sm"
                                  className="flex-1 bg-gradient-to-r from-fem-terracotta to-fem-gold text-white hover:from-fem-gold hover:to-fem-terracotta transition-all duration-300"
                                  onClick={() => navigate(`/chat?business=${business.id}`)}
                                >
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  Contact
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Building2 className="w-12 h-12 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No Businesses Found</h3>
                      <p className="text-gray-500">Try adjusting your filters to discover more businesses.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DirectoryPage; 