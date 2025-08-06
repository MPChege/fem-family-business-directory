
import { useEffect, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { BusinessCategories } from "@/components/home/BusinessCategories";
import { FeaturedBusinesses } from "@/components/home/FeaturedBusinesses";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CallToAction } from "@/components/home/CallToAction";
import { CommunityStats } from "@/components/home/CommunityStats";
import { Testimonials } from "@/components/home/Testimonials";
import ImageCarousel from "@/components/ui/ImageCarousel";
import { createScrollAnimations, cleanupAnimations } from "@/utils/animation";

const carouselImages = [
  { src: "/lovable-uploads/f1a3f2a4-bbe7-46e5-be66-1ad39e35defa.png", alt: "Community Image 1" },
  { src: "/lovable-uploads/b392f8fd-6fc5-4bfe-96aa-dc60f6854ba2.png", alt: "Community Image 2" },
  { src: "/lovable-uploads/placeholder.svg", alt: "Community Image 3" }
];

export default function Index() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize scroll animations
    createScrollAnimations();

    // Smooth scrolling for anchor links
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    };

    // Add smooth scroll listeners
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener("click", handleSmoothScroll);
    });

    // Intersection Observer for scroll reveal
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("scroll-reveal");
        }
      });
    }, observerOptions);

    const scrollElements = document.querySelectorAll(".scroll-reveal");
    scrollElements.forEach(el => observer.observe(el));

    // Parallax effect for background elements
    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll(".parallax-bg");
      
      parallaxElements.forEach((element: any) => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    };

    // Throttled scroll handler
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleParallax();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Add floating animation to elements
    const floatingElements = document.querySelectorAll(".floating");
    floatingElements.forEach((element: any) => {
      element.style.animation = "floating 3s ease-in-out infinite";
    });

    // Add gradient animation to elements
    const gradientElements = document.querySelectorAll(".gradient-bg");
    gradientElements.forEach((element: any) => {
      element.style.backgroundSize = "200% 200%";
      element.style.animation = "gradientShift 8s ease infinite";
    });

    // Add particle trail effect
    const particleElements = document.querySelectorAll(".particle-trail");
    particleElements.forEach((element: any) => {
      element.addEventListener("mousemove", (e: MouseEvent) => {
        createParticle(e.clientX, e.clientY);
      });
    });

    // Add magnetic effect to buttons
    const magneticElements = document.querySelectorAll(".magnetic");
    magneticElements.forEach((element: any) => {
      element.addEventListener("mousemove", (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      element.addEventListener("mouseleave", () => {
        element.style.transform = "translate(0px, 0px)";
      });
    });

    // Add 3D tilt effect to cards
    const tiltElements = document.querySelectorAll(".tilt-3d");
    tiltElements.forEach((element: any) => {
      element.addEventListener("mousemove", (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      element.addEventListener("mouseleave", () => {
        element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      });
    });

    // Add neon glow effect
    const neonElements = document.querySelectorAll(".neon-glow");
    neonElements.forEach((element: any) => {
      element.addEventListener("mouseenter", () => {
        element.style.boxShadow = "0 0 20px #f97316, 0 0 40px #f97316, 0 0 60px #f97316";
      });
      
      element.addEventListener("mouseleave", () => {
        element.style.boxShadow = "";
      });
    });

    // Add wave animation
    const waveElements = document.querySelectorAll(".wave-animation");
    waveElements.forEach((element: any) => {
      const wave = element.querySelector(".wave");
      if (wave) {
        wave.style.animation = "waveMove 2s ease-in-out infinite";
      }
    });

    // Add glitch text effect
    const glitchElements = document.querySelectorAll(".glitch-text");
    glitchElements.forEach((element: any) => {
      element.addEventListener("mouseenter", () => {
        const originalText = element.textContent;
        const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
        
        let glitchedText = "";
        for (let i = 0; i < originalText.length; i++) {
          if (Math.random() < 0.3) {
            glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
          } else {
            glitchedText += originalText[i];
          }
        }
        element.textContent = glitchedText;
        
        setTimeout(() => {
          element.textContent = originalText;
        }, 200);
      });
    });

    return () => {
      // Cleanup
      cleanupAnimations();
      anchorLinks.forEach(link => {
        link.removeEventListener("click", handleSmoothScroll);
      });
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const createParticle = (x: number, y: number) => {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: linear-gradient(45deg, #f97316, #eab308);
      border-radius: 50%;
      pointer-events: none;
      z-index: 1000;
      left: ${x}px;
      top: ${y}px;
    `;
    
    document.body.appendChild(particle);
    
    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 200;
    
    particle.animate([
      { transform: "translate(0, 0) scale(1)", opacity: 1 },
      { transform: `translate(${randomX}px, ${randomY}px) scale(0)`, opacity: 0 }
    ], {
      duration: 1000,
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    }).onfinish = () => particle.remove();
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Navbar />
      
      {/* Hero Section with Enhanced Animations */}
      <section className="relative overflow-hidden">
        <div className="parallax-bg absolute inset-0 bg-gradient-to-r from-fem-navy via-fem-terracotta to-fem-gold opacity-10" data-speed="0.3"></div>
        <div className="floating absolute top-20 right-10 w-20 h-20 bg-gradient-to-br from-fem-terracotta to-fem-gold rounded-full opacity-20"></div>
        <div className="floating absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-br from-fem-gold to-fem-navy rounded-full opacity-20" style={{ animationDelay: "1s" }}></div>
        <Hero />
      </section>

      {/* Business Categories with Stagger Animation */}
      <section className="stagger-fade py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-reveal text-4xl font-bold text-fem-navy mb-4">Explore Business Categories</h2>
            <p className="text-gray-600">Discover services and products from our trusted community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Food & Dining", icon: "🍽️", description: "Restaurants, catering, and food services" },
              { name: "Technology", icon: "💻", description: "IT services, web development, and tech support" },
              { name: "Automotive", icon: "🚗", description: "Auto repair, maintenance, and car services" },
              { name: "Health & Beauty", icon: "💄", description: "Salons, spas, and wellness services" }
            ].map((category, index) => (
              <div key={category.name} className="stagger-item tilt-3d magnetic neon-glow bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-fem-navy mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Businesses with Scale Animation */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="glitch-text text-4xl font-bold text-fem-navy mb-4">Featured Businesses</h2>
            <p className="text-gray-600">Trusted and verified businesses in our community</p>
          </div>
          <div className="scale-rotate">
            <FeaturedBusinesses />
          </div>
        </div>
      </section>

      {/* How It Works with Wave Animation */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-fem-navy mb-4">How It Works</h2>
            <div className="wave-animation relative h-1 bg-gradient-to-r from-fem-terracotta to-fem-gold rounded-full overflow-hidden">
              <div className="wave absolute top-0 left-0 w-full h-full bg-gradient-to-r from-fem-gold to-fem-terracotta"></div>
            </div>
          </div>
          <HowItWorks />
        </div>
      </section>

      {/* Community Stats with Gradient Background */}
      <section className="py-16 gradient-bg bg-gradient-to-r from-fem-navy via-fem-terracotta to-fem-gold">
        <div className="container mx-auto px-4">
          <CommunityStats />
        </div>
      </section>

      {/* Testimonials with Particle Trail */}
      <section className="py-16 particle-trail">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-fem-navy mb-4">What Our Community Says</h2>
            <p className="text-gray-600">Real experiences from our business community</p>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* Image Carousel with Enhanced Animations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-fem-navy mb-4">Community Highlights</h2>
            <p className="text-gray-600">Discover amazing moments from our community</p>
          </div>
          <div className="tilt-3d">
            <ImageCarousel images={carouselImages} />
          </div>
        </div>
      </section>

      {/* Call to Action with Magnetic Effect */}
      <section className="py-16 bg-gradient-to-r from-fem-navy to-fem-terracotta">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Connect?</h2>
            <p className="text-white/80 mb-8">Join our community and discover amazing businesses</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="magnetic neon-glow bg-white text-fem-navy px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300">
                Explore Directory
              </button>
              <button className="magnetic neon-glow border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-fem-navy transition-all duration-300">
                Register Business
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
