
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, Map, Award, User, MessageSquare, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", icon: <Home className="w-4 h-4 mr-2" />, path: "/" },
    { name: "Quests", icon: <Map className="w-4 h-4 mr-2" />, path: "/quests" },
    { name: "Badges", icon: <Award className="w-4 h-4 mr-2" />, path: "/badges" },
    { name: "Buddy", icon: <User className="w-4 h-4 mr-2" />, path: "/buddy" },
    { name: "Feedback", icon: <MessageSquare className="w-4 h-4 mr-2" />, path: "/feedback" },
  ];

  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <h1 className="text-xl font-poppins font-bold text-quest-primary flex items-center">
              <span className="bg-quest-primary text-white p-1 rounded-lg mr-2">OQ</span>
              Onboarding Quest
            </h1>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost" 
              className={`flex items-center ${
                location.pathname === item.path 
                  ? "bg-quest-light text-quest-primary" 
                  : "text-quest-dark hover:bg-quest-light hover:text-quest-primary"
              }`}
              asChild
            >
              <Link to={item.path}>
                {item.icon}
                {item.name}
              </Link>
            </Button>
          ))}
        </nav>
        
        {/* Mobile Menu Button */}
        <Button
          variant="ghost" 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden mt-4 px-6 pb-4 bg-white">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost" 
                className={`flex items-center justify-start ${
                  location.pathname === item.path 
                    ? "bg-quest-light text-quest-primary" 
                    : "text-quest-dark hover:bg-quest-light hover:text-quest-primary"
                }`}
                asChild
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link to={item.path}>
                  {item.icon}
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
