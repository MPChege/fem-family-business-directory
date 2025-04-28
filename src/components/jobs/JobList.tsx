
import { useState } from "react";
import { JobCard, JobCardProps } from "./JobCard";

// Mock data for jobs
const mockJobs: JobCardProps[] = [
  {
    id: 1,
    title: "Senior Painter",
    company: "CreativeSpaces Co.",
    location: "Los Angeles, CA",
    locationType: "On-site",
    salary: "$25 - $35 per hour",
    postedDate: "3 days ago",
    description: "We're looking for an experienced painter to join our team for residential and commercial projects.",
    logo: "https://res.cloudinary.com/dqxzuiaj2/image/upload/v1/media/photos/function_uuid4_at_0x7fdc1b0fdaf0_sbn1im",
    tags: ["Full-time", "Experienced"],
    featured: true
  },
  {
    id: 2,
    title: "Software Engineer",
    company: "TechFaith Solutions",
    location: "Remote",
    locationType: "Remote",
    salary: "$85,000 - $110,000",
    postedDate: "1 week ago",
    description: "Join our development team to create applications that serve our church community.",
    logo: "https://res.cloudinary.com/dqxzuiaj2/image/upload/v1/media/photos/function_uuid4_at_0x7fea31a87af0_qryz7q",
    tags: ["Full-time", "Mid-Level"]
  },
  {
    id: 3,
    title: "Youth Ministry Coordinator",
    company: "FEM Family Church",
    location: "Atlanta, GA",
    locationType: "Hybrid",
    salary: "$45,000 - $55,000",
    postedDate: "2 days ago",
    description: "Passionate about guiding youth? Help coordinate our church's youth programs and activities.",
    logo: "/lovable-uploads/f1a3f2a4-bbe7-46e5-be66-1ad39e35defa.png",
    tags: ["Full-time", "Entry-Level"]
  },
  {
    id: 4,
    title: "Administrative Assistant",
    company: "Grace Accounting",
    location: "Chicago, IL",
    locationType: "On-site",
    salary: "$18 - $22 per hour",
    postedDate: "5 days ago",
    description: "Support our accounting team with administrative tasks. Great opportunity for organized individuals.",
    logo: "https://res.cloudinary.com/dqxzuiaj2/image/upload/v1/media/photos/function_uuid4_at_0x7fea31a87af0_zovtfy",
    tags: ["Part-time", "Entry-Level"]
  },
  {
    id: 5,
    title: "Graphic Designer",
    company: "Faith Media Group",
    location: "Dallas, TX",
    locationType: "Hybrid",
    salary: "$50,000 - $65,000",
    postedDate: "1 week ago",
    description: "Creative designer needed for print and digital materials for our church and partner organizations.",
    logo: "https://res.cloudinary.com/dqxzuiaj2/image/upload/v1/media/photos/function_uuid4_at_0x7fdc1b0fdaf0_sbn1im",
    tags: ["Full-time", "Mid-Level"]
  },
  {
    id: 6,
    title: "Church Facilities Manager",
    company: "FEM Family Church",
    location: "Houston, TX",
    locationType: "On-site",
    salary: "$55,000 - $70,000",
    postedDate: "2 weeks ago",
    description: "Oversee the maintenance and operations of church facilities, including scheduling and vendor management.",
    logo: "/lovable-uploads/f1a3f2a4-bbe7-46e5-be66-1ad39e35defa.png",
    tags: ["Full-time", "Experienced"],
    featured: true
  }
];

export interface JobListProps {
  filters?: any;
}

export const JobList = ({ filters }: JobListProps) => {
  const [jobs, setJobs] = useState<JobCardProps[]>(mockJobs);
  
  // In a real application, we would filter the jobs based on the filters
  // For now, we'll just display all jobs
  
  return (
    <div className="space-y-6">
      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-fem-navy">No jobs found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      ) : (
        <>
          <p className="text-gray-500">{jobs.length} jobs found</p>
          {jobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </>
      )}
    </div>
  );
};
