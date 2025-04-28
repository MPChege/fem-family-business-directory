
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/f1a3f2a4-bbe7-46e5-be66-1ad39e35defa.png" 
            alt="FEM Family Church Logo" 
            className="h-12 w-auto" 
          />
          <div className="hidden sm:flex flex-col">
            <span className="font-heading font-semibold text-fem-navy">FEM Family Church</span>
            <span className="text-xs text-fem-darkgray">Careers Connect</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/jobs" className="text-fem-navy hover:text-fem-terracotta transition-colors">
            Find Jobs
          </Link>
          <Link to="/post-job" className="text-fem-navy hover:text-fem-terracotta transition-colors">
            Post a Job
          </Link>
          <Link to="/about" className="text-fem-navy hover:text-fem-terracotta transition-colors">
            About
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-fem-navy">
            <Search className="h-5 w-5" />
          </Button>
          <Link to="/login">
            <Button variant="outline" className="hidden sm:inline-flex border-fem-terracotta text-fem-terracotta hover:bg-fem-terracotta hover:text-white">
              Sign In
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-fem-terracotta hover:bg-fem-terracotta/90 text-white">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
