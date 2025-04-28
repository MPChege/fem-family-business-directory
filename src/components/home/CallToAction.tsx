
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-fem-navy to-fem-navy/90">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Your Next Opportunity?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Join our community of believers seeking meaningful work and businesses looking for talented individuals who share their values.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-fem-terracotta hover:bg-fem-terracotta/90 text-white w-full sm:w-auto">
                Create an Account
              </Button>
            </Link>
            <Link to="/post-job">
              <Button size="lg" variant="outline" className="border-fem-gold text-fem-gold hover:bg-fem-gold/10 w-full sm:w-auto">
                Post a Job
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
