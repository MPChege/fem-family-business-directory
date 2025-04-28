
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface JobApplicationProps {
  jobId: number;
  jobTitle: string;
  companyName: string;
  onSuccess: () => void;
}

export const JobApplication = ({ jobId, jobTitle, companyName, onSuccess }: JobApplicationProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Application Submitted!",
        description: "Your application has been sent to the employer.",
      });
      
      onSuccess();
    }, 1500);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
      <h2 className="text-2xl font-bold text-fem-navy mb-2">Apply for {jobTitle}</h2>
      <p className="text-gray-500 mb-6">at {companyName}</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="fullName" className="text-fem-navy">Full Name*</Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="email" className="text-fem-navy">Email*</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="phone" className="text-fem-navy">Phone Number*</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Your number will be kept private and used only for this application.
          </p>
        </div>
        
        <div>
          <Label htmlFor="resume" className="text-fem-navy">Resume/CV*</Label>
          <Input
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            required
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            Accepted formats: PDF, DOC, DOCX (Max 5MB)
          </p>
        </div>
        
        <div>
          <Label htmlFor="coverLetter" className="text-fem-navy">
            Cover Letter
            <span className="text-gray-500 font-normal text-sm ml-1">(Optional)</span>
          </Label>
          <Textarea
            id="coverLetter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Tell the employer why you're a great fit for this position..."
            className="mt-1 min-h-32"
          />
        </div>
        
        <div className="pt-4">
          <Button 
            type="submit" 
            className="w-full bg-fem-terracotta hover:bg-fem-terracotta/90 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
          
          <p className="text-center text-xs text-gray-500 mt-4">
            By clicking Submit, you agree to share your application details with the employer.
            Your personal information will be handled according to our privacy policy.
          </p>
        </div>
      </form>
    </div>
  );
};
