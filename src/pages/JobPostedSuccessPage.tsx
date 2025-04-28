
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const JobPostedSuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-fem-navy mb-4">Job Posted Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your job posting has been submitted and is now live on our platform. 
              Qualified candidates from our church community can now view and apply to your position.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-left">
                <h3 className="font-semibold text-blue-800 mb-2">What happens next?</h3>
                <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
                  <li>You'll receive email notifications when candidates apply</li>
                  <li>Review applications in your employer dashboard</li>
                  <li>Contact candidates securely through our messaging system</li>
                  <li>Update or close your posting anytime from the dashboard</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-fem-terracotta hover:bg-fem-terracotta/90 text-white">
                  <Link to="/employer-dashboard">Go to Dashboard</Link>
                </Button>
                <Button asChild variant="outline" className="border-fem-navy text-fem-navy hover:bg-fem-navy hover:text-white">
                  <Link to="/post-job">Post Another Job</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobPostedSuccessPage;
