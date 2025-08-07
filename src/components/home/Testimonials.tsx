import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      business: "Sarah's Catering",
      rating: 5,
      text: "Faith Connect has been amazing for my catering business. I've connected with so many church members who trust and support my services.",
      avatar: "/lovable-uploads/placeholder.svg"
    },
    {
      id: 2,
      name: "Michael Chen",
      business: "Tech Solutions Pro",
      rating: 5,
      text: "Being part of this faith-based business directory has helped me build genuine relationships with clients who share my values.",
      avatar: "/lovable-uploads/placeholder.svg"
    },
    {
      id: 3,
      name: "Grace Williams",
      business: "Grace Beauty Salon",
      rating: 5,
      text: "The community support I've received through Faith Connect has been incredible. It's more than just business - it's family.",
      avatar: "/lovable-uploads/placeholder.svg"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-fem-terracotta to-fem-gold rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <div className="font-semibold text-fem-navy">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.business}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
