
import { useEffect, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { BusinessCategories } from "@/components/home/BusinessCategories";
import { FeaturedBusinesses } from "@/components/home/FeaturedBusinesses";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CallToAction } from "@/components/home/CallToAction";
import { OnboardingCheck } from "@/components/OnboardingCheck";
// import { DataDebugger } from "@/components/debug/DataDebugger";
// import { ApiTester } from "@/components/debug/ApiTester";
import { createScrollAnimations, cleanupAnimations } from "@/utils/animation";

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
      element.style.animation = "float 6s ease-in-out infinite";
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <OnboardingCheck />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <BusinessCategories />
        <FeaturedBusinesses />
        <HowItWorks />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
