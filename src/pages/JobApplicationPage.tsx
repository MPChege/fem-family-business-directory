
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JobApplication } from "@/components/jobs/JobApplication";
import { ChevronLeft } from "lucide-react";

// Mock job detail (in a real app would come from API)
const jobDetail = {
  id: 1,
  title: "Senior Painter",
  company: "CreativeSpaces Co.",
};

const JobApplicationPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  
  const handleApplicationSuccess = () => {
    setApplicationSubmitted(true);
    // In a real app, you might redirect to a success page or dashboard
    setTimeout(() => {
      navigate("/applications");
    }, 3000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Link to={`/jobs/${id}`} className="inline-flex items-center text-fem-navy hover:text-fem-terracotta mb-6">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Job Details
          </Link>
          
          {applicationSubmitted ? (
            <div className="bg-white rounded-lg shadow-md border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-fem-navy mb-4">Application Submitted!</h2>
              <p className="text-gray-600 mb-6">
                Your application for {jobDetail.title} at {jobDetail.company} has been successfully submitted. 
                The employer will be notified and will reach out if they wish to proceed.
              </p>
              <p className="text-gray-500">Redirecting to your applications...</p>
            </div>
          ) : (
            <JobApplication 
              jobId={Number(id)}
              jobTitle={jobDetail.title}
              companyName={jobDetail.company}
              onSuccess={handleApplicationSuccess}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobApplicationPage;
