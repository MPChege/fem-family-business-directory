
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const Hero = () => {
  return (
    <div className="bg-fem-navy text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in" style={{animationDelay: '0.1s'}}>
            Find Your <span className="text-fem-gold">Purpose</span> Through 
            <span className="text-fem-terracotta"> Meaningful Work</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fade-in" style={{animationDelay: '0.3s'}}>
            Connecting FEM Family Church members with opportunities that align with their skills, values, and calling.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10 animate-fade-in" style={{animationDelay: '0.5s'}}>
            <Link to="/jobs">
              <Button size="lg" className="bg-fem-terracotta hover:bg-fem-terracotta/90 text-white w-full sm:w-auto">
                Find Jobs
              </Button>
            </Link>
            <Link to="/post-job">
              <Button size="lg" variant="outline" className="border-fem-gold text-fem-gold hover:bg-fem-gold/10 w-full sm:w-auto">
                Post a Job
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg p-4 flex items-center gap-3 max-w-2xl mx-auto animate-fade-in shadow-lg" style={{animationDelay: '0.7s'}}>
            <Search className="text-fem-navy h-5 w-5 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search for jobs (e.g. Painter, Software Engineer)"
              className="flex-1 border-0 focus:ring-0 focus:outline-none text-fem-navy placeholder:text-gray-400"
            />
            <Button className="bg-fem-terracotta hover:bg-fem-terracotta/90 text-white">
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
