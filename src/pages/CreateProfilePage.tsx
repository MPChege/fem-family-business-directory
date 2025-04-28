
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProfileForm } from "@/components/profile/ProfileForm";

const CreateProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-fem-navy mb-2">Create Your Profile</h1>
            <p className="text-gray-600">
              Complete your profile to apply for jobs and connect with employers in our community
            </p>
          </div>
          <ProfileForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateProfilePage;
