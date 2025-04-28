
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Briefcase, Clock, ChevronLeft } from "lucide-react";

// Mock job details - In a real app, this would come from an API
const jobDetail = {
  id: 1,
  title: "Senior Painter",
  company: "CreativeSpaces Co.",
  location: "Los Angeles, CA",
  locationType: "On-site",
  salary: "$25 - $35 per hour",
  postedDate: "June 15, 2025",
  deadline: "July 15, 2025",
  description: "We're looking for an experienced painter to join our team for residential and commercial projects.",
  responsibilities: [
    "Lead painting projects from preparation to completion",
    "Estimate time, materials, and labor costs for projects",
    "Prepare surfaces for painting by washing walls, repairing holes, or removing old paint",
    "Apply paint and other finishes to various surfaces using brushes, rollers, or sprayers",
    "Mix, match, and apply colors to achieve desired look",
    "Follow all safety policies and procedures",
    "Train and mentor junior painters"
  ],
  qualifications: [
    "5+ years of experience in residential and commercial painting",
    "Knowledge of different paint types, finishes, and application methods",
    "Experience with color mixing and matching",
    "Ability to safely use ladders and scaffolding",
    "Valid driver's license",
    "Detail-oriented with strong craftsmanship skills"
  ],
  companyDescription: "CreativeSpaces Co. is a full-service painting company specializing in both residential and commercial projects. Founded in 2010, we've built a reputation for quality, reliability, and beautiful finishes. Our team members are valued for their craftsmanship and commitment to excellence.",
  logo: "https://res.cloudinary.com/dqxzuiaj2/image/upload/v1/media/photos/function_uuid4_at_0x7fdc1b0fdaf0_sbn1im",
  tags: ["Full-time", "Experienced"],
  featured: true
};

const JobDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  // In a real app, you would fetch the job details using the ID
  // const { data: job, isLoading } = useQuery(['job', id], () => fetchJob(id))
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Link to="/jobs" className="inline-flex items-center text-fem-navy hover:text-fem-terracotta mb-6">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Jobs
          </Link>
          
          <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={jobDetail.logo} 
                  alt={`${jobDetail.company} logo`} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-fem-navy">{jobDetail.title}</h1>
                    <p className="text-xl text-gray-600">{jobDetail.company}</p>
                  </div>
                  
                  <Button asChild className="bg-fem-terracotta hover:bg-fem-terracotta/90 text-white w-full md:w-auto">
                    <Link to={`/jobs/${id}/apply`}>Apply Now</Link>
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {jobDetail.location} ({jobDetail.locationType})
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Briefcase className="h-4 w-4 mr-2" />
                    {jobDetail.tags[0]}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    Posted on {jobDetail.postedDate}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Apply by {jobDetail.deadline}
                  </div>
                </div>
                
                <div className="mt-4 flex items-center gap-2">
                  {jobDetail.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-fem-gold/10 text-fem-navy border-fem-gold/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="mt-4 text-lg font-medium text-fem-terracotta">
                  {jobDetail.salary}
                </div>
              </div>
            </div>
            
            <hr className="my-8 border-gray-200" />
            
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-bold text-fem-navy mb-4">Job Description</h2>
                <p className="text-gray-600">{jobDetail.description}</p>
              </section>
              
              <section>
                <h2 className="text-xl font-bold text-fem-navy mb-4">Responsibilities</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {jobDetail.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-bold text-fem-navy mb-4">Qualifications</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {jobDetail.qualifications.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-bold text-fem-navy mb-4">About {jobDetail.company}</h2>
                <p className="text-gray-600">{jobDetail.companyDescription}</p>
              </section>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Button asChild className="bg-fem-terracotta hover:bg-fem-terracotta/90 text-white">
                <Link to={`/jobs/${id}/apply`}>Apply for this Position</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JobDetailPage;
