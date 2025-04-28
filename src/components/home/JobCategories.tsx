
import { Link } from "react-router-dom";

const categories = [
  { name: "Technology", icon: "💻", count: 24 },
  { name: "Healthcare", icon: "🏥", count: 18 },
  { name: "Education", icon: "📚", count: 15 },
  { name: "Construction", icon: "🏗️", count: 12 },
  { name: "Hospitality", icon: "🏨", count: 10 },
  { name: "Finance", icon: "💰", count: 8 },
  { name: "Creative", icon: "🎨", count: 7 },
  { name: "Administrative", icon: "📝", count: 14 },
];

export const JobCategories = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-fem-navy mb-4">Browse Job Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore opportunities across various industries within our church community
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link 
              to={`/jobs?category=${category.name.toLowerCase()}`} 
              key={category.name}
              className="bg-white rounded-lg p-6 shadow-sm hover-card-effect flex flex-col items-center text-center animate-fade-in"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <span className="text-4xl mb-3">{category.icon}</span>
              <h3 className="font-semibold text-fem-navy mb-1">{category.name}</h3>
              <span className="text-sm text-gray-500">{category.count} openings</span>
            </Link>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link 
            to="/jobs" 
            className="inline-flex items-center text-fem-terracotta hover:text-fem-terracotta/80 font-medium"
          >
            View all categories
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};
