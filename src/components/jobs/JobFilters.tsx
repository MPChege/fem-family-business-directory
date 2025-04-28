
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, X } from "lucide-react";

export interface JobFiltersProps {
  onApplyFilters: (filters: any) => void;
  onClearFilters: () => void;
}

export const JobFilters = ({ onApplyFilters, onClearFilters }: JobFiltersProps) => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState(25);
  const [category, setCategory] = useState("");
  const [employmentType, setEmploymentType] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState([0, 200000]);
  const [remote, setRemote] = useState(false);
  
  const employmentTypes = [
    { id: "full-time", label: "Full-time" },
    { id: "part-time", label: "Part-time" },
    { id: "contract", label: "Contract" },
    { id: "temporary", label: "Temporary" },
    { id: "internship", label: "Internship" },
    { id: "volunteer", label: "Volunteer" },
  ];
  
  const categories = [
    "Technology",
    "Healthcare",
    "Education",
    "Construction",
    "Hospitality",
    "Finance",
    "Creative",
    "Administrative",
  ];
  
  const handleEmploymentTypeChange = (typeId: string, checked: boolean) => {
    if (checked) {
      setEmploymentType([...employmentType, typeId]);
    } else {
      setEmploymentType(employmentType.filter(id => id !== typeId));
    }
  };
  
  const handleApplyFilters = () => {
    const filters = {
      keyword,
      location,
      radius,
      category,
      employmentType,
      salaryRange,
      remote,
    };
    
    onApplyFilters(filters);
  };
  
  const handleClearFilters = () => {
    setKeyword("");
    setLocation("");
    setRadius(25);
    setCategory("");
    setEmploymentType([]);
    setSalaryRange([0, 200000]);
    setRemote(false);
    
    onClearFilters();
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 mb-6">
      <div className="space-y-6">
        <h2 className="font-semibold text-lg text-fem-navy flex items-center justify-between">
          Filter Jobs
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClearFilters}
            className="text-fem-darkgray hover:text-fem-terracotta"
          >
            <X className="h-4 w-4 mr-1" /> Clear All
          </Button>
        </h2>
        
        <div className="space-y-4">
          {/* Keyword Search */}
          <div>
            <Label htmlFor="keyword" className="text-fem-darkgray">Keyword</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="keyword"
                placeholder="Job title, skills, or keywords"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          
          {/* Location */}
          <div>
            <Label htmlFor="location" className="text-fem-darkgray">Location</Label>
            <Input
              id="location"
              placeholder="City, state, or zip code"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            
            <div className="mt-4">
              <Label className="text-fem-darkgray mb-2 flex justify-between items-center">
                <span>Distance (miles): {radius}</span>
              </Label>
              <Slider
                defaultValue={[radius]}
                max={100}
                step={5}
                onValueChange={(value) => setRadius(value[0])}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>
          </div>
          
          {/* Category */}
          <div>
            <Label htmlFor="category" className="text-fem-darkgray">Category</Label>
            <Select onValueChange={(value) => setCategory(value)} value={category}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Employment Type */}
          <div>
            <Label className="text-fem-darkgray mb-2 block">Employment Type</Label>
            <div className="space-y-2">
              {employmentTypes.map((type) => (
                <div key={type.id} className="flex items-center">
                  <Checkbox
                    id={type.id}
                    checked={employmentType.includes(type.id)}
                    onCheckedChange={(checked) => handleEmploymentTypeChange(type.id, checked as boolean)}
                  />
                  <label htmlFor={type.id} className="ml-2 text-sm text-gray-700">
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Salary Range */}
          <div>
            <Label className="text-fem-darkgray mb-2 flex justify-between items-center">
              <span>Salary Range</span>
              <span className="text-sm font-normal">
                ${salaryRange[0].toLocaleString()} - ${salaryRange[1].toLocaleString()}
              </span>
            </Label>
            <Slider
              defaultValue={salaryRange}
              max={200000}
              step={5000}
              onValueChange={setSalaryRange}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$0</span>
              <span>$100K</span>
              <span>$200K+</span>
            </div>
          </div>
          
          {/* Remote Option */}
          <div className="flex items-center">
            <Checkbox
              id="remote"
              checked={remote}
              onCheckedChange={(checked) => setRemote(checked as boolean)}
            />
            <label htmlFor="remote" className="ml-2 text-sm text-gray-700">
              Remote jobs only
            </label>
          </div>
        </div>
        
        <Button 
          onClick={handleApplyFilters}
          className="w-full bg-fem-terracotta hover:bg-fem-terracotta/90 text-white"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};
