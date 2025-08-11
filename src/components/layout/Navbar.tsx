
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, X, Home, Building2, Users, Heart, 
  Crown, Gem, Diamond, Sparkles, Star
} from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/", icon: <Home className="w-4 h-4" /> },
    { name: "Directory", path: "/directory", icon: <Building2 className="w-4 h-4" /> },
    { name: "Community", path: "/community", icon: <Users className="w-4 h-4" /> },
    { name: "About", path: "/about", icon: <Heart className="w-4 h-4" /> },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-silver/20" 
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Crown className="w-8 h-8 text-fem-gold" />
                <motion.div 
                  className="absolute -top-1 -right-1 w-3 h-3 bg-fem-gold rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="flex items-center space-x-1">
                <Gem className="w-6 h-6 text-silver" />
                <Diamond className="w-8 h-8 text-fem-gold" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-fem-navy font-['Playfair_Display']">
                FaithConnect
              </span>
              <span className="text-xs text-gray-500">Business Directory</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 group ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-fem-gold to-yellow-500 text-fem-navy shadow-lg"
                      : "text-gray-700 hover:text-fem-gold hover:bg-white/50"
                  }`}
                >
                  <span className="group-hover:rotate-12 transition-transform duration-300">
                    {item.icon}
                  </span>
                  <span className="font-semibold">{item.name}</span>
                  {location.pathname === item.path && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-fem-gold"
                      layoutId="activeTab"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              className="px-6 py-3 text-fem-gold border-2 border-fem-gold rounded-xl font-semibold hover:bg-fem-gold hover:text-white transition-all duration-300 group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span>List Business</span>
              </span>
            </motion.button>
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-fem-gold to-yellow-500 text-fem-navy rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span>Get Started</span>
              </span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg bg-white/20 backdrop-blur-sm border border-silver/30"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-fem-navy" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-fem-navy" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-6 space-y-4 bg-white/95 backdrop-blur-md rounded-2xl mt-4 border border-silver/20 shadow-xl">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                        location.pathname === item.path
                          ? "bg-gradient-to-r from-fem-gold to-yellow-500 text-fem-navy"
                          : "text-gray-700 hover:text-fem-gold hover:bg-gray-50"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="group-hover:rotate-12 transition-transform duration-300">
                        {item.icon}
                      </span>
                      <span className="font-semibold">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile CTA Buttons */}
                <div className="pt-4 space-y-3">
                  <motion.button
                    className="w-full px-6 py-3 text-fem-gold border-2 border-fem-gold rounded-xl font-semibold hover:bg-fem-gold hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <Building2 className="w-4 h-4" />
                      <span>List Business</span>
                    </span>
                  </motion.button>
                  <motion.button
                    className="w-full px-6 py-3 bg-gradient-to-r from-fem-gold to-yellow-500 text-fem-navy rounded-xl font-semibold shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Get Started</span>
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
