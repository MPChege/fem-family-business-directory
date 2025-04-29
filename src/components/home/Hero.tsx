
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import ThreeDModel from "@/components/3d/ThreeDModel";

export const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-fem-navy to-fem-navy/95 text-white py-16 md:py-24 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-24 h-24 bg-fem-terracotta/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-fem-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-fem-terracotta/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in" style={{animationDelay: '0.1s'}}>
              Find Your <span className="gradient-text text-transparent">Purpose</span> Through 
              <span className="text-fem-terracotta"> Meaningful Work</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fade-in" style={{animationDelay: '0.3s'}}>
              Connecting FEM Family Church members in Kenya with opportunities that align with their skills, values, and calling.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-start mb-10 animate-fade-in" style={{animationDelay: '0.5s'}}>
              <Link to="/jobs">
                <Button size="lg" className="bg-fem-terracotta hover:bg-fem-terracotta/90 text-white w-full sm:w-auto btn-glow">
                  Find Jobs
                </Button>
              </Link>
              <Link to="/post-job">
                <Button size="lg" variant="outline" className="border-fem-gold text-fem-gold hover:bg-fem-gold/10 w-full sm:w-auto">
                  Post a Job
                </Button>
              </Link>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 flex items-center gap-3 max-w-2xl animate-fade-in shadow-lg border border-white/20" style={{animationDelay: '0.7s'}}>
              <Search className="text-fem-gold h-5 w-5 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search for jobs in Kenya (e.g. Painter, Software Engineer)"
                className="flex-1 border-0 focus:ring-0 focus:outline-none bg-transparent text-white placeholder:text-gray-400"
              />
              <Button className="bg-fem-terracotta hover:bg-fem-terracotta/90 text-white">
                Search
              </Button>
            </div>
          </div>
          
          <div className="h-[400px] hidden md:block relative">
            <ThreeDModel type="city" className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
