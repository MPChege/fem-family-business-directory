import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const steps = [
  "Basic Information",
  "Job Details",
  "Requirements",
  "Company & Culture",
  "Review & Submit"
];

const kenyanLocations = [
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Eldoret",
  "Thika",
  "Malindi",
  "Kitale",
  "Machakos",
  "Nyeri"
];

export const JobPostForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    locationType: "",
    employmentType: "",
    salaryMin: "",
    salaryMax: "",
    salaryPeriod: "monthly",
    deadline: "",
    responsibilities: "",
    qualifications: "",
    description: "",
    companyDescription: "",
    logo: null,
    cultureVideo: null,
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, [field]: e.target.files?.[0] }));
    }
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
    toast({
      title: "Job Posted Successfully!",
      description: "Your job listing is now live and visible to potential candidates.",
    });
    
    navigate("/job-posted-success");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <div 
              key={step}
              className={`text-xs font-medium ${
                index <= currentStep ? "text-fem-terracotta" : "text-gray-400"
              } hidden sm:block`}
            >
              {step}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
          <div 
            className="bg-fem-terracotta h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
        <p className="text-center mt-2 text-sm text-gray-500">
          Step {currentStep + 1} of {steps.length}: <span className="font-medium text-fem-navy">{steps[currentStep]}</span>
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8 animate-fade-in">
        <form onSubmit={handleSubmit}>
          {currentStep === 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-fem-navy mb-6">Basic Job Information</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-fem-navy">Job Title*</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Senior Painter, Software Developer"
                    className="mt-1"
                    required
                    autoFocus
                  />
                </div>
                
                <div>
                  <Label htmlFor="company" className="text-fem-navy">Company Name*</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Creative Spaces Kenya Ltd"
                    className="mt-1"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location" className="text-fem-navy">Location*</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange("location", value)}
                      value={formData.location}
                      required
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {kenyanLocations.map((location) => (
                          <SelectItem key={location} value={location}>{location}, Kenya</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="locationType" className="text-fem-navy">Location Type*</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange("locationType", value)}
                      value={formData.locationType}
                      required
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select location type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="on-site">On-site</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="employmentType" className="text-fem-navy">Employment Type*</Label>
                  <Select 
                    onValueChange={(value) => handleSelectChange("employmentType", value)}
                    value={formData.employmentType}
                    required
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="temporary">Temporary</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="volunteer">Volunteer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-fem-navy">Salary Range (KES)*</Label>
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <div>
                      <Input
                        id="salaryMin"
                        name="salaryMin"
                        value={formData.salaryMin}
                        onChange={handleChange}
                        placeholder="Min"
                        type="number"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        id="salaryMax"
                        name="salaryMax"
                        value={formData.salaryMax}
                        onChange={handleChange}
                        placeholder="Max"
                        type="number"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <Select 
                      onValueChange={(value) => handleSelectChange("salaryPeriod", value)}
                      defaultValue="monthly"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Salary period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Per Hour</SelectItem>
                        <SelectItem value="daily">Per Day</SelectItem>
                        <SelectItem value="weekly">Per Week</SelectItem>
                        <SelectItem value="monthly">Per Month</SelectItem>
                        <SelectItem value="yearly">Per Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="deadline" className="text-fem-navy">Application Deadline*</Label>
                  <Input
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    type="date"
                    className="mt-1"
                    required
                  />
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-fem-navy mb-6">Job Details</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description" className="text-fem-navy">
                    Job Description*
                    <span className="text-sm text-gray-500 font-normal ml-1">
                      (Overview of the role and its purpose)
                    </span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="At FEM Family Church Kenya, we're seeking passionate individuals who..."
                    className="mt-1 min-h-32"
                    required
                  />
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-fem-navy mb-6">Job Requirements</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="responsibilities" className="text-fem-navy">
                    Responsibilities*
                    <span className="text-sm text-gray-500 font-normal ml-1">
                      (List the main duties and responsibilities)
                    </span>
                  </Label>
                  <Textarea
                    id="responsibilities"
                    name="responsibilities"
                    value={formData.responsibilities}
                    onChange={handleChange}
                    placeholder="- Lead painting projects across Nairobi from preparation to completion
- Estimate material quantities and costs in KES
- Ensure all Kenyan safety standards are followed"
                    className="mt-1 min-h-32"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="qualifications" className="text-fem-navy">
                    Qualifications*
                    <span className="text-sm text-gray-500 font-normal ml-1">
                      (Required skills, experience, education, etc.)
                    </span>
                  </Label>
                  <Textarea
                    id="qualifications"
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    placeholder="- 3+ years experience in residential painting in Kenya
- Knowledge of locally available paint materials and techniques
- Valid Kenyan driver's license"
                    className="mt-1 min-h-32"
                    required
                  />
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-fem-navy mb-6">Company & Culture</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyDescription" className="text-fem-navy">
                    Company Description*
                    <span className="text-sm text-gray-500 font-normal ml-1">
                      (Tell candidates about your company)
                    </span>
                  </Label>
                  <Textarea
                    id="companyDescription"
                    name="companyDescription"
                    value={formData.companyDescription}
                    onChange={handleChange}
                    placeholder="Our Kenyan company is dedicated to delivering quality craftsmanship while upholding Christian values in the local community..."
                    className="mt-1 min-h-32"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="logo" className="text-fem-navy">
                    Company Logo
                    <span className="text-sm text-gray-500 font-normal ml-1">
                      (Recommended: square format, min 200x200px)
                    </span>
                  </Label>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "logo")}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="cultureVideo" className="text-fem-navy">
                    Company Culture Video
                    <span className="text-sm text-gray-500 font-normal ml-1">
                      (Optional: Share your workplace culture)
                    </span>
                  </Label>
                  <Input
                    id="cultureVideo"
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileChange(e, "cultureVideo")}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-fem-navy mb-6">Review & Submit</h2>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg text-fem-navy mb-2">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Job Title</p>
                      <p className="font-medium">{formData.title || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Company</p>
                      <p className="font-medium">{formData.company || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Location</p>
                      <p className="font-medium">{formData.location || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Location Type</p>
                      <p className="font-medium capitalize">{formData.locationType || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Employment Type</p>
                      <p className="font-medium capitalize">{formData.employmentType || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Salary Range</p>
                      <p className="font-medium">
                        {formData.salaryMin && formData.salaryMax 
                          ? `KES ${formData.salaryMin} - KES ${formData.salaryMax} per ${formData.salaryPeriod}` 
                          : "Not specified"
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Application Deadline</p>
                      <p className="font-medium">
                        {formData.deadline 
                          ? new Date(formData.deadline).toLocaleDateString()
                          : "Not specified"
                        }
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg text-fem-navy mb-2">Job Description</h3>
                  <p className="whitespace-pre-line text-sm">
                    {formData.description || "No description provided."}
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg text-fem-navy mb-2">Responsibilities</h3>
                  <p className="whitespace-pre-line text-sm">
                    {formData.responsibilities || "No responsibilities specified."}
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg text-fem-navy mb-2">Qualifications</h3>
                  <p className="whitespace-pre-line text-sm">
                    {formData.qualifications || "No qualifications specified."}
                  </p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg text-fem-navy mb-2">Company Description</h3>
                  <p className="whitespace-pre-line text-sm">
                    {formData.companyDescription || "No company description provided."}
                  </p>
                </div>
              </div>
              
              <div className="rounded-lg bg-fem-gold/10 p-4 border border-fem-gold/20">
                <h3 className="font-semibold text-fem-navy mb-2">Ready to submit?</h3>
                <p className="text-sm text-gray-600">
                  Once submitted, your job posting will be reviewed and published to our Kenya-based platform. 
                  You'll receive an email confirmation once it's live.
                </p>
              </div>
            </div>
          )}
          
          <div className="flex justify-between mt-8">
            {currentStep > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                className="border-fem-navy text-fem-navy hover:bg-fem-navy hover:text-white"
              >
                Previous Step
              </Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button 
                type="button"
                onClick={nextStep}
                className="bg-fem-terracotta hover:bg-fem-terracotta/90 text-white ml-auto"
              >
                Continue
              </Button>
            ) : (
              <Button 
                type="submit"
                className="bg-fem-terracotta hover:bg-fem-terracotta/90 text-white ml-auto"
              >
                Submit Job Posting
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
