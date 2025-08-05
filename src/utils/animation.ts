import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Color theme constants
export const FAITH_COLORS = {
  navy: "#1e3a8a",
  terracotta: "#d97706", 
  gold: "#f59e0b",
  darkgray: "#374151",
  lightgray: "#f3f4f6"
};

// GSAP Animation Presets
export const animationPresets = {
  fadeInUp: {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  },
  fadeInScale: {
    scale: 0.8,
    opacity: 0,
    duration: 0.6,
    ease: "back.out(1.7)"
  },
  staggerFadeIn: {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out"
  },
  slideInLeft: {
    x: -100,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  },
  slideInRight: {
    x: 100,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  }
};

// Creative scroll animations
export const createScrollAnimations = () => {
  // Parallax background effect
  gsap.utils.toArray(".parallax-bg").forEach((element: any) => {
    gsap.to(element, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  // Stagger fade in elements
  gsap.utils.toArray(".stagger-fade").forEach((container: any) => {
    const elements = container.querySelectorAll(".stagger-item");
    gsap.fromTo(elements,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Scale and rotate cards on scroll
  gsap.utils.toArray(".scale-rotate").forEach((element: any) => {
    gsap.to(element, {
      scale: 1.05,
      rotation: 2,
      duration: 0.3,
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play reverse play reverse"
      }
    });
  });

  // Text reveal animation
  gsap.utils.toArray(".text-reveal").forEach((element: any) => {
    const text = element.textContent;
    element.textContent = "";
    
    gsap.to(element, {
      duration: 2,
      text: text,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // Floating animation for elements
  gsap.utils.toArray(".floating").forEach((element: any) => {
    gsap.to(element, {
      y: -20,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });
  });

  // Gradient background animation
  gsap.utils.toArray(".gradient-bg").forEach((element: any) => {
    gsap.to(element, {
      backgroundPosition: "200% 200%",
      duration: 10,
      ease: "none",
      repeat: -1,
      yoyo: true
    });
  });

  // 3D tilt effect
  gsap.utils.toArray(".tilt-3d").forEach((element: any) => {
    element.addEventListener("mousemove", (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      gsap.to(element, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    element.addEventListener("mouseleave", () => {
      gsap.to(element, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    });
  });

  // Magnetic effect
  gsap.utils.toArray(".magnetic").forEach((element: any) => {
    element.addEventListener("mousemove", (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(element, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    element.addEventListener("mouseleave", () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    });
  });

  // Morphing shapes
  gsap.utils.toArray(".morph-shape").forEach((element: any) => {
    const paths = element.querySelectorAll("path");
    if (paths.length > 1) {
      gsap.to(paths[1], {
        morphSVG: paths[0],
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play reverse play reverse"
        }
      });
    }
  });

  // Particle trail effect
  gsap.utils.toArray(".particle-trail").forEach((element: any) => {
    element.addEventListener("mousemove", (e: MouseEvent) => {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, #f97316, #eab308);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
      `;
      
      particle.style.left = e.clientX + "px";
      particle.style.top = e.clientY + "px";
      
      document.body.appendChild(particle);
      
      gsap.to(particle, {
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        opacity: 0,
        scale: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => particle.remove()
      });
    });
  });

  // Glitch text effect
  gsap.utils.toArray(".glitch-text").forEach((element: any) => {
    const originalText = element.textContent;
    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    const glitchEffect = () => {
      let glitchedText = "";
      for (let i = 0; i < originalText.length; i++) {
        if (Math.random() < 0.1) {
          glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        } else {
          glitchedText += originalText[i];
        }
      }
      element.textContent = glitchedText;
    };

    gsap.to({}, {
      duration: 0.1,
      repeat: 5,
      onRepeat: glitchEffect,
      onComplete: () => {
        element.textContent = originalText;
      },
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // Wave animation
  gsap.utils.toArray(".wave-animation").forEach((element: any) => {
    const wave = element.querySelector(".wave");
    if (wave) {
      gsap.to(wave, {
        x: "100%",
        duration: 2,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });
    }
  });

  // Neon glow effect
  gsap.utils.toArray(".neon-glow").forEach((element: any) => {
    gsap.to(element, {
      boxShadow: "0 0 20px #f97316, 0 0 40px #f97316, 0 0 60px #f97316",
      duration: 1,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play reverse play reverse"
      }
    });
  });
};

// Hover animations
export const hoverAnimations = {
  // Pulse effect
  pulse: (element: HTMLElement) => {
    gsap.to(element, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    });
  },

  // Shake effect
  shake: (element: HTMLElement) => {
    gsap.to(element, {
      x: "random(-10, 10)",
      duration: 0.1,
      repeat: 5,
      yoyo: true,
      ease: "power2.out"
    });
  },

  // Glow effect
  glow: (element: HTMLElement) => {
    gsap.to(element, {
      boxShadow: "0 0 20px rgba(249, 115, 22, 0.5)",
      duration: 0.3,
      ease: "power2.out"
    });
  },

  // Color change
  colorChange: (element: HTMLElement) => {
    gsap.to(element, {
      color: "#f97316",
      duration: 0.3,
      ease: "power2.out"
    });
  }
};

// Page transition animations
export const pageTransitions = {
  // Fade in from bottom
  fadeInUp: (element: HTMLElement) => {
    gsap.fromTo(element,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
  },

  // Slide in from left
  slideInLeft: (element: HTMLElement) => {
    gsap.fromTo(element,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
  },

  // Slide in from right
  slideInRight: (element: HTMLElement) => {
    gsap.fromTo(element,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
  },

  // Scale in
  scaleIn: (element: HTMLElement) => {
    gsap.fromTo(element,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
    );
  },

  // Rotate in
  rotateIn: (element: HTMLElement) => {
    gsap.fromTo(element,
      { rotation: -180, opacity: 0 },
      { rotation: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" }
    );
  },

  // Bounce in
  bounceIn: (element: HTMLElement) => {
    gsap.fromTo(element,
      { scale: 0, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 1, 
        ease: "bounce.out",
        onComplete: () => {
          gsap.to(element, { scale: 1.1, duration: 0.1, yoyo: true, repeat: 1 });
        }
      }
    );
  }
};

// Text animations
export const textAnimations = {
  // Typewriter effect
  typewriter: (element: HTMLElement, text: string, speed = 0.05) => {
    gsap.to(element, {
      duration: text.length * speed,
      text: text,
      ease: "none"
    });
  },

  // Text reveal
  textReveal: (element: HTMLElement) => {
    gsap.fromTo(element,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }
    );
  }
};

// Loading animations
export const loadingAnimations = {
  // Pulse effect
  pulse: (element: HTMLElement) => {
    gsap.to(element, {
      scale: 1.1,
      duration: 0.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });
  },

  // Rotate effect
  rotate: (element: HTMLElement) => {
    gsap.to(element, {
      rotation: 360,
      duration: 1,
      ease: "none",
      repeat: -1
    });
  }
};

// Utility functions
export const animationUtils = {
  // Kill all animations on an element
  killAnimations: (element: HTMLElement) => {
    gsap.killTweensOf(element);
  },

  // Pause all scroll triggers
  pauseScrollTriggers: () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.disable());
  },

  // Resume all scroll triggers
  resumeScrollTriggers: () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.enable());
  },

  // Refresh scroll triggers
  refreshScrollTriggers: () => {
    ScrollTrigger.refresh();
  }
};

// Performance optimizations
export const performanceUtils = {
  // Debounce function
  debounce: (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function
  throttle: (func: Function, limit: number) => {
    let inThrottle: boolean;
    return function executedFunction(...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

// Cleanup function
export const cleanupAnimations = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

export default {
  animationPresets,
  createScrollAnimations,
  hoverAnimations,
  pageTransitions,
  textAnimations,
  loadingAnimations,
  animationUtils,
  performanceUtils,
  FAITH_COLORS
}; 