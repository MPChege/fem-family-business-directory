
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Hired as Marketing Director",
    company: "Faith Community Outreach",
    quote: "Through FEM Careers Connect, I found a job that aligns with both my professional skills and personal values. The process was seamless and I'm grateful for the opportunity to work with a company that shares my faith.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80"
  },
  {
    id: 2,
    name: "Michael Thomas",
    role: "Employer",
    company: "Thomas Construction",
    quote: "As a business owner in the church community, I was looking for employees who share our values. This platform helped me find skilled painters and craftsmen who are not just qualified but also aligned with our company culture.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80"
  },
  {
    id: 3,
    name: "Rebecca Williams",
    role: "Hired as Administrative Assistant",
    company: "Grace Financial Services",
    quote: "The private messaging system made communication with potential employers so comfortable. I felt safe throughout the process and ended up finding the perfect position that accommodates my family schedule.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80"
  },
];

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-fem-navy mb-4">Success Stories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from members of our community who have found meaningful connections through our platform
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Card className="border-none shadow-lg bg-white overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-fem-navy p-8 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-fem-gold">
                        <img 
                          src={testimonials[activeIndex].avatar} 
                          alt={testimonials[activeIndex].name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-white font-semibold mt-4">{testimonials[activeIndex].name}</h3>
                      <p className="text-fem-gold text-sm">{testimonials[activeIndex].role}</p>
                      <p className="text-gray-300 text-xs">{testimonials[activeIndex].company}</p>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                    <svg className="text-fem-terracotta/30 w-12 h-12 mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-gray-600 italic mb-4 text-lg">
                      {testimonials[activeIndex].quote}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-center mt-6 gap-2">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-fem-navy/20 flex items-center justify-center text-fem-navy hover:bg-fem-navy hover:text-white transition-colors"
                aria-label="Previous testimonial"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    activeIndex === index ? "bg-fem-terracotta" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
              <button 
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-fem-navy/20 flex items-center justify-center text-fem-navy hover:bg-fem-navy hover:text-white transition-colors"
                aria-label="Next testimonial"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
