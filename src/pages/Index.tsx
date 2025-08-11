
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { apiService, Business, Category } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { 
  ChevronDown, Star, MapPin, Phone, Mail, Globe, Users, Award, Shield, Heart,
  Building2, Handshake, Globe2, Users2, CheckCircle, Zap, Sparkles, Target,
  TrendingUp, Lightbulb, Coffee, Palette, Wrench, Car, BookOpen, ShoppingBag,
  Camera, Music, Utensils, Home, Briefcase, HeartHandshake, Star as StarIcon,
  Crown, Gem, Diamond, Star as StarIcon2, Sparkles as SparklesIcon, Plus
} from "lucide-react";

export default function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll();
  
  // Transform values for parallax
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Fetch data from backend
  const { data: businesses, isLoading: businessesLoading } = useQuery({
    queryKey: ['featured-businesses'],
    queryFn: () => apiService.getBusinesses({ is_featured: true, page: 1 }),
    staleTime: 5 * 60 * 1000,
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => apiService.getCategories(),
    staleTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Counter animation hook
  const useCounter = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
      if (isInView) {
        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
          if (!startTime) startTime = currentTime;
          const progress = Math.min((currentTime - startTime) / duration, 1);
          
          setCount(Math.floor(progress * end));
          
          if (progress < 1) {
            animationFrame = requestAnimationFrame(animate);
          }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
      }
    }, [isInView, end, duration]);

    return { count, ref };
  };

  // Default categories if API doesn't return data
  const defaultCategories = [
    { id: 1, name: "Home Services", icon: "🏠", description: "Cleaning, repairs, maintenance" },
    { id: 2, name: "Professional Services", icon: "💼", description: "Legal, accounting, consulting" },
    { id: 3, name: "Health & Wellness", icon: "💪", description: "Fitness, therapy, nutrition" },
    { id: 4, name: "Education", icon: "📚", description: "Tutoring, training, workshops" },
    { id: 5, name: "Technology", icon: "💻", description: "IT support, web development" },
    { id: 6, name: "Automotive", icon: "🚗", description: "Repair, maintenance, detailing" }
  ];

  // Safely get categories data
  const categoriesData = Array.isArray(categories) ? categories : defaultCategories;

  const businessesCount = useCounter(businesses?.count || 150);
  const membersCount = useCounter(500);
  const categoriesCount = useCounter(categoriesData.length);

  const features = [
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Premium Verified",
      description: "Elite businesses with proven excellence"
    },
    {
      icon: <Gem className="w-8 h-8" />,
      title: "Faith-Based Excellence",
      description: "Values-driven community connections"
    },
    {
      icon: <Diamond className="w-8 h-8" />,
      title: "Quality Assured",
      description: "Curated excellence in every service"
    },
    {
      icon: <SparklesIcon className="w-8 h-8" />,
      title: "Community First",
      description: "Strengthening bonds through business"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      business: "Sarah's Bakery",
      testimonial: "The Fem Business Directory helped me connect with my church community and grow my business. The trust factor is everything!",
      rating: 5,
      image: "/lovable-uploads/1d5eb230-3a20-497c-9b7c-e5d21ac111dc.png"
    },
    {
      name: "Michael Chen",
      business: "Tech Solutions Pro",
      testimonial: "Being part of this faith-based business network has opened so many doors. The community support is incredible.",
      rating: 5,
      image: "/lovable-uploads/18b2a2c2-8517-4194-b3af-fce8bf8b92c6.png"
    },
    {
      name: "Lisa Rodriguez",
      business: "Lisa's Cleaning Service",
      testimonial: "I love how this platform connects me with people who share my values. It's more than just business - it's family.",
      rating: 5,
      image: "/lovable-uploads/06b622e4-037d-4adb-95e9-2f4e2c861815.png"
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-x-hidden font-['Playfair_Display']">
      <Navbar />
      
      {/* Hero Section with Church Community Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image - Church Community */}
        <motion.div 
          className="absolute inset-0"
          style={{ y: backgroundY }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
              filter: 'brightness(0.8) contrast(1.0)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-fem-navy/60 via-fem-terracotta/50 to-fem-gold/40" />
        </motion.div>

        {/* Animated Geometric Elements */}
        <motion.div 
          className="absolute top-20 left-20 w-24 h-24 border-2 border-fem-gold/50 rounded-full"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-20 h-20 bg-gradient-to-br from-fem-gold/60 to-silver/80 rounded-full"
          animate={{ 
            y: [0, 15, 0],
            x: [0, -15, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Diamond Elements */}
        <motion.div 
          className="absolute top-1/3 right-1/4 w-12 h-12 border border-fem-gold/70 transform rotate-45"
          animate={{ 
            y: [0, -15, 0],
            x: [0, 10, 0],
            rotate: [45, 225, 45]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/4 w-10 h-10 bg-fem-gold/50 rounded-full"
          animate={{ 
            y: [0, 15, 0],
            x: [0, -10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.1 }}
          >
            <div className="flex items-center justify-center mb-4">
              <Crown className="w-8 h-8 text-fem-gold mr-2" />
              <Gem className="w-6 h-6 text-silver mr-2" />
              <Diamond className="w-8 h-8 text-fem-gold" />
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 font-['Playfair_Display'] tracking-tight"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            style={{ y: titleY }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fem-gold via-yellow-400 to-fem-gold">
              Welcome to
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-fem-gold to-yellow-400">
              FaithConnect
            </span>
            <br />
            <span className="text-white text-2xl md:text-4xl drop-shadow-lg">Business Directory</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl mb-8 text-gray-100 max-w-3xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            Discover trusted businesses owned by fellow believers in our church community. 
            Support local commerce while building meaningful relationships grounded in shared faith and values.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.7 }}
          >
            <motion.button 
              className="bg-gradient-to-r from-fem-gold to-yellow-500 hover:from-yellow-500 hover:to-fem-gold text-fem-navy px-8 py-4 rounded-xl font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-xl group border-2 border-silver/30"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center">
                <Briefcase className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Browse Directory →
              </span>
            </motion.button>
            <motion.button 
              className="border-2 border-silver text-silver hover:bg-silver hover:text-fem-navy px-8 py-4 rounded-xl font-bold text-lg transition-all duration-500 shadow-xl group backdrop-blur-sm"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center">
                <Plus className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                List Your Business →
              </span>
            </motion.button>
          </motion.div>

          {/* Premium Features Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.9 }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 + index * 0.15 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-gradient-to-br from-white/25 to-silver/20 backdrop-blur-md rounded-xl p-4 mb-3 inline-block group-hover:from-white/35 group-hover:to-silver/30 transition-all duration-500 border border-fem-gold/30 shadow-lg">
                  <div className="text-fem-gold group-hover:scale-110 transition-transform duration-500">{feature.icon}</div>
                </div>
                <h3 className="text-sm font-bold text-white mb-1 font-['Playfair_Display'] drop-shadow-md">{feature.title}</h3>
                <p className="text-xs text-gray-200 leading-relaxed drop-shadow-md">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-silver rounded-full flex justify-center">
            <motion.div 
              className="w-1.5 h-3 bg-gradient-to-b from-fem-gold to-silver rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
          <ChevronDown className="w-6 h-6 text-silver mx-auto mt-2" />
        </motion.div>
      </section>

      {/* Mission & Vision Section with Wheat Field Background */}
      <section className="relative py-32 bg-gradient-to-r from-gray-50 to-white overflow-hidden">
        {/* Background Image - Wheat Field */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
              filter: 'brightness(0.8) contrast(1.1)'
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-10">
                <div className="relative">
                  <Target className="w-16 h-16 text-fem-navy mr-6" />
                  <motion.div 
                    className="absolute -top-2 -right-2 w-8 h-8 bg-fem-gold rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <h2 className="text-6xl font-bold text-fem-navy font-['Playfair_Display']">
                  Our Mission
                </h2>
              </div>
              <p className="text-2xl text-gray-700 mb-10 leading-relaxed font-light">
                We believe in the power of <span className="text-fem-gold font-semibold">premium connections</span> and faith. 
                Our platform connects church members, entrepreneurs, and verified local businesses in a trusted 
                environment where excellence meets integrity.
              </p>
              <div className="space-y-8">
                <div className="flex items-center space-x-6">
                  <div className="w-6 h-6 bg-gradient-to-r from-fem-gold to-silver rounded-full"></div>
                  <span className="text-gray-700 text-xl font-medium">Premium verified business listings</span>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="w-6 h-6 bg-gradient-to-r from-silver to-fem-gold rounded-full"></div>
                  <span className="text-gray-700 text-xl font-medium">Faith-based community excellence</span>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="w-6 h-6 bg-gradient-to-r from-fem-gold to-silver rounded-full"></div>
                  <span className="text-gray-700 text-xl font-medium">Trusted local connections</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-fem-navy via-fem-terracotta to-fem-navy rounded-3xl p-12 text-white shadow-2xl border border-silver/20">
                <div className="flex items-center mb-8">
                  <Lightbulb className="w-10 h-10 text-fem-gold mr-4" />
                  <h3 className="text-4xl font-bold text-fem-gold font-['Playfair_Display']">Our Vision</h3>
                </div>
                <p className="text-gray-200 leading-relaxed text-xl font-light">
                  To create the most <span className="text-fem-gold font-semibold">premium business directory</span> for faith communities, 
                  where every connection strengthens our shared values and builds lasting relationships.
                  We envision a world where faith-based businesses thrive and communities flourish together.
                </p>
                <div className="mt-10 flex items-center space-x-6">
                  <div className="bg-gradient-to-r from-fem-gold/30 to-silver/30 rounded-full p-4">
                    <Heart className="w-8 h-8 text-fem-gold" />
                  </div>
                  <div>
                    <div className="font-bold text-fem-gold text-xl">Community Excellence</div>
                    <div className="text-gray-300">Supporting premium local businesses</div>
                  </div>
                </div>
              </div>
              <motion.div 
                className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-r from-fem-gold to-silver rounded-full opacity-30"
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 6, repeat: Infinity }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Categories with Premium Design */}
      <section className="py-32 bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center mb-8">
              <Globe2 className="w-16 h-16 text-fem-navy mr-6" />
              <h2 className="text-6xl font-bold text-fem-navy font-['Playfair_Display']">Business Categories</h2>
            </div>
            <p className="text-gray-600 text-2xl max-w-4xl mx-auto font-light">
              Explore trusted services and products from our faith-based business community
            </p>
          </motion.div>

          {/* Categories Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {categoriesLoading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-10 h-56 animate-pulse border border-silver/20">
                  <div className="w-20 h-20 bg-gray-300 rounded-full mb-6"></div>
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))
            ) : (
              (Array.isArray(categoriesData) ? categoriesData.slice(0, 6) : []).map((category, index) => (
                <motion.div 
                  key={category.id}
                  className="bg-gradient-to-br from-fem-navy via-fem-terracotta to-fem-navy rounded-2xl p-10 text-white hover:shadow-2xl transition-all duration-500 cursor-pointer group border border-silver/20"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -8 }}
                >
                  <div className="text-6xl mb-6 group-hover:scale-125 transition-transform duration-500">
                    {category.icon || "🏢"}
                  </div>
                  <h4 className="text-2xl font-bold mb-4 text-fem-gold font-['Playfair_Display']">{category.name}</h4>
                  <p className="text-gray-300 text-lg leading-relaxed">{category.description || "Explore trusted businesses in this category"}</p>
                  <div className="mt-6 flex items-center text-fem-gold">
                    <span className="text-lg font-semibold">View Businesses</span>
                    <ChevronDown className="w-5 h-5 ml-2 group-hover:rotate-180 transition-transform duration-500" />
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Featured Businesses with Premium Design */}
      <section className="py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center mb-8">
              <StarIcon className="w-16 h-16 text-fem-navy mr-6" />
              <h2 className="text-6xl font-bold text-fem-navy font-['Playfair_Display']">Premium Businesses</h2>
            </div>
            <p className="text-gray-600 text-2xl">Curated and verified businesses in our community</p>
          </motion.div>

          {businessesLoading ? (
            // Loading skeleton
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg animate-pulse border border-silver/20">
                  <div className="w-full h-56 bg-gray-200 rounded-xl mb-6"></div>
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {businesses?.results?.slice(0, 6).map((business, index) => (
                <motion.div 
                  key={business.id}
                  className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer group border border-silver/20"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03, y: -8 }}
                >
                  <div className="relative mb-6">
                    <img 
                      src={business.business_image_url || "/placeholder.svg"} 
                      alt={business.business_name}
                      className="w-full h-56 object-cover rounded-xl"
                    />
                    {business.is_verified && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-fem-gold to-silver text-fem-navy px-4 py-2 rounded-full text-sm font-bold flex items-center border border-silver/30">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Premium Verified
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-fem-navy mb-4 group-hover:text-fem-terracotta transition-colors duration-500 font-['Playfair_Display']">
                    {business.business_name}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-2 text-lg leading-relaxed">{business.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < Math.floor(Number(business.rating)) ? 'text-fem-gold fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-2">({business.review_count})</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      {business.city}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Community Stats with Premium Design */}
      <section className="py-32 bg-gradient-to-r from-fem-navy via-fem-terracotta to-fem-navy relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center mb-8">
              <TrendingUp className="w-16 h-16 text-fem-gold mr-6" />
              <h2 className="text-6xl font-bold text-white font-['Playfair_Display']">Our Premium Community</h2>
            </div>
            <p className="text-gray-300 text-2xl">Growing together in faith and excellence</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-16">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fem-gold via-silver to-fem-gold mb-6" ref={businessesCount.ref}>
                {businessesCount.count}+
              </div>
              <div className="text-white text-2xl font-bold mb-4">Premium Businesses</div>
              <div className="text-gray-300 text-lg">Curated excellence</div>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-silver via-fem-gold to-silver mb-6" ref={membersCount.ref}>
                {membersCount.count}+
              </div>
              <div className="text-white text-2xl font-bold mb-4">Community Members</div>
              <div className="text-gray-300 text-lg">Connected and growing</div>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fem-gold via-silver to-fem-gold mb-6" ref={categoriesCount.ref}>
                {categoriesCount.count}+
              </div>
              <div className="text-white text-2xl font-bold mb-4">Premium Categories</div>
              <div className="text-gray-300 text-lg">Diverse excellence</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section with Premium Design */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center mb-8">
              <HeartHandshake className="w-16 h-16 text-fem-navy mr-6" />
              <h2 className="text-6xl font-bold text-fem-navy font-['Playfair_Display']">Premium Testimonials</h2>
            </div>
            <p className="text-gray-600 text-2xl">Real experiences from our premium business community</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.name}
                className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-silver/20"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className="flex mb-8">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-fem-gold fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-8 italic text-xl leading-relaxed font-light">"{testimonial.testimonial}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-6 object-cover border-2 border-silver/30"
                  />
                  <div>
                    <div className="font-bold text-fem-navy text-xl font-['Playfair_Display']">{testimonial.name}</div>
                    <div className="text-gray-600 text-lg">{testimonial.business}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Footer with Premium Design */}
      <section className="py-32 bg-gradient-to-r from-fem-navy to-fem-terracotta relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center mb-8">
              <Zap className="w-16 h-16 text-fem-gold mr-6" />
              <h2 className="text-6xl font-bold text-white font-['Playfair_Display']">Ready to Connect?</h2>
            </div>
            <p className="text-gray-300 text-2xl mb-16 max-w-4xl mx-auto font-light leading-relaxed">
              Join our premium faith-based business community and discover exceptional opportunities to grow together. 
              Whether you're looking for trusted services or want to list your business, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <motion.button 
                className="bg-gradient-to-r from-fem-gold to-yellow-500 hover:from-yellow-500 hover:to-fem-gold text-fem-navy px-16 py-8 rounded-2xl font-bold text-2xl transition-all duration-500 shadow-2xl group border-2 border-silver/30"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center justify-center">
                  <Globe className="w-7 h-7 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  Explore Premium Directory
                </span>
              </motion.button>
              <motion.button 
                className="border-3 border-silver text-silver hover:bg-silver hover:text-fem-navy px-16 py-8 rounded-2xl font-bold text-2xl transition-all duration-500 shadow-2xl group backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center justify-center">
                  <Building2 className="w-7 h-7 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  Join Premium Network
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}