
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export interface JobCardProps {
  id: number;
  title: string;
  company: string;
  location: string;
  locationType: string;
  salary: string;
  postedDate: string;
  description: string;
  logo: string;
  tags: string[];
  featured?: boolean;
}

export const JobCard = ({
  id,
  title,
  company,
  location,
  locationType,
  salary,
  postedDate,
  description,
  logo,
  tags,
  featured = false,
}: JobCardProps) => {
  return (
    <Card className={`hover-card-effect border ${featured ? 'border-fem-gold/40 bg-fem-gold/5' : 'border-gray-100'}`}>
      <CardContent className="p-0">
        <div className="p-6">
          {featured && (
            <Badge className="bg-fem-gold text-fem-navy mb-2">Featured</Badge>
          )}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={logo} 
                alt={`${company} logo`} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg text-fem-navy">{title}</h3>
                <span className="text-xs text-gray-500">{postedDate}</span>
              </div>
              
              <p className="text-fem-darkgray">{company}</p>
              
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                <span>{location}</span>
                <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                <span>{locationType}</span>
              </div>
              
              <p className="mt-3 text-sm text-gray-600 line-clamp-2">{description}</p>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-fem-gold/10 text-fem-navy border-fem-gold/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="text-sm font-medium text-fem-terracotta">{salary}</div>
              </div>
              
              <div className="mt-4 flex gap-3">
                <Button asChild variant="outline" size="sm" className="flex-1 border-fem-navy text-fem-navy hover:bg-fem-navy hover:text-white">
                  <Link to={`/jobs/${id}`}>View Details</Link>
                </Button>
                <Button asChild size="sm" className="flex-1 bg-fem-terracotta hover:bg-fem-terracotta/90 text-white">
                  <Link to={`/jobs/${id}/apply`}>Apply Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
