
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-fem-navy mb-6">About FEM Family Church Careers Connect</h1>
            
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold text-fem-terracotta mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-6">
                FEM Family Church Careers Connect is dedicated to connecting our church community with meaningful employment opportunities across Kenya. 
                We believe that by supporting each other professionally, we strengthen our bonds as a church family and contribute 
                to economic growth within our community.
              </p>
              
              <div className="aspect-video mb-8 rounded-lg overflow-hidden">
                <img 
                  src="https://res.cloudinary.com/dqxzuiaj2/image/upload/v1/media/photos/function_uuid4_at_0x7fea31a87af0_zovtfy" 
                  alt="FEM Family Church Community" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h2 className="text-2xl font-bold text-fem-terracotta mb-4">What We Do</h2>
              <p className="text-gray-700 mb-4">
                Our platform serves as a bridge between job seekers and employers within our Kenyan church community, offering:
              </p>
              
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>A trusted marketplace for job postings from vetted employers</li>
                <li>Free profile creation for church members seeking employment</li>
                <li>Direct connections between employers and qualified candidates</li>
                <li>Support for both professional and trade occupations</li>
                <li>Resources for career development and growth</li>
              </ul>
              
              <h2 className="text-2xl font-bold text-fem-terracotta mb-4">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-fem-navy mb-2">Community</h3>
                  <p className="text-gray-600">Supporting each other through meaningful employment opportunities</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-fem-navy mb-2">Integrity</h3>
                  <p className="text-gray-600">Operating with honesty and transparency in all connections</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-fem-navy mb-2">Excellence</h3>
                  <p className="text-gray-600">Promoting quality work and professional growth</p>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-fem-terracotta mb-4">How It Works</h2>
              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-fem-gold/20 rounded-full flex items-center justify-center text-fem-navy font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="text-xl font-semibold text-fem-navy mb-1">Create a Profile</h3>
                    <p className="text-gray-600">Church members can create a free profile showcasing their skills and experience</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-fem-gold/20 rounded-full flex items-center justify-center text-fem-navy font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="text-xl font-semibold text-fem-navy mb-1">Browse Opportunities</h3>
                    <p className="text-gray-600">Find suitable job openings across Kenya posted by trusted employers</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-fem-gold/20 rounded-full flex items-center justify-center text-fem-navy font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="text-xl font-semibold text-fem-navy mb-1">Apply & Connect</h3>
                    <p className="text-gray-600">Submit applications and connect directly with potential employers</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button asChild className="bg-fem-terracotta hover:bg-fem-terracotta/90 text-white">
                  <Link to="/jobs">Browse Available Jobs</Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-fem-terracotta mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about FEM Family Church Careers Connect, please don't hesitate to contact us:
              </p>
              
              <div className="space-y-4 text-gray-700">
                <p><span className="font-semibold">Email:</span> careers@femfamilychurch.org</p>
                <p><span className="font-semibold">Phone:</span> +254 700 123 456</p>
                <p><span className="font-semibold">Location:</span> FEM Family Church Headquarters, Nairobi, Kenya</p>
                <p><span className="font-semibold">Office Hours:</span> Monday to Friday, 9:00 AM to 5:00 PM EAT</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
