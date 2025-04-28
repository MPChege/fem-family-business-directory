
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JobPostForm } from "@/components/jobs/JobPostForm";

const PostJobPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-fem-navy mb-2">Post a Job</h1>
            <p className="text-gray-600">
              Share your opportunity with our church community and find the right talent
            </p>
          </div>
          <JobPostForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostJobPage;
