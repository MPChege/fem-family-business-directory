
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

const categories = [
  { name: "Technology", icon: "💻", count: 24, color: "from-blue-500/20 to-purple-500/20" },
  { name: "Healthcare", icon: "🏥", count: 18, color: "from-green-500/20 to-teal-500/20" },
  { name: "Education", icon: "📚", count: 15, color: "from-yellow-500/20 to-amber-500/20" },
  { name: "Construction", icon: "🏗️", count: 12, color: "from-red-500/20 to-orange-500/20" },
  { name: "Hospitality", icon: "🏨", count: 10, color: "from-pink-500/20 to-rose-500/20" },
  { name: "Finance", icon: "💰", count: 8, color: "from-emerald-500/20 to-green-500/20" },
  { name: "Creative", icon: "🎨", count: 7, color: "from-indigo-500/20 to-violet-500/20" },
  { name: "Administrative", icon: "📝", count: 14, color: "from-cyan-500/20 to-sky-500/20" },
];

export const JobCategories = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-fem-navy mb-4">Browse Job Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore opportunities across various industries within our church community in Kenya
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link 
              to={`/jobs?category=${category.name.toLowerCase()}`} 
              key={category.name}
              className={cn(
                "bg-gradient-to-br rounded-lg p-6 shadow-sm hover-card-effect flex flex-col items-center text-center",
                category.color
              )}
              style={{ 
                animationDelay: `${0.1 * index}s`,
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}
            >
              <div className="text-4xl mb-3 animate-float-slow">{category.icon}</div>
              <h3 className="font-semibold text-fem-navy mb-1">{category.name}</h3>
              <span className="text-sm text-gray-500">{category.count} openings</span>
            </Link>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link 
            to="/jobs" 
            className="inline-flex items-center text-fem-terracotta hover:text-fem-terracotta/80 font-medium group"
          >
            View all categories
            <svg 
              className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};
