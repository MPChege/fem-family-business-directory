
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const HowItWorks = () => {
  const steps = [
    {
      title: "Create Your Profile",
      description: "Sign up and build your profile with skills, experience, and your church membership details.",
      icon: "👤",
      link: "/register"
    },
    {
      title: "Discover Opportunities",
      description: "Browse job listings from businesses within our church community.",
      icon: "🔍",
      link: "/jobs"
    },
    {
      title: "Apply with Ease",
      description: "Submit applications with your profile and receive notifications on your status.",
      icon: "📝",
      link: "/jobs"
    },
    {
      title: "Connect Securely",
      description: "Chat with employers while keeping your personal contact information private.",
      icon: "💬",
      link: "/how-it-works"
    },
  ];

  return (
    <section className="py-16 bg-fem-navy text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our platform makes it easy to connect with faith-aligned opportunities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.title}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 animate-fade-in"
              style={{ animationDelay: `${0.15 * index}s` }}
            >
              <div className="bg-fem-gold/20 text-fem-gold w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-300 mb-4">{step.description}</p>
              <Link 
                to={step.link} 
                className="text-fem-gold hover:text-fem-lightgold flex items-center text-sm font-medium"
              >
                Learn more
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/register">
            <Button size="lg" className="bg-fem-terracotta hover:bg-fem-terracotta/90 text-white">
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
