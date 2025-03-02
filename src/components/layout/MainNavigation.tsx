
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  ClipboardList,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MainNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      name: "Form",
      href: "/",
      icon: <Home className="w-5 h-5 mr-2" />,
      active: location.pathname === "/",
    },
    {
      name: "Questionnaires",
      href: "/dashboard",
      icon: <ClipboardList className="w-5 h-5 mr-2" />,
      active: location.pathname === "/dashboard",
    },
  ];

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-900">
                Medical Assessment
              </span>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-2">
              {navigationItems.map((item) => (
                <Link key={item.name} to={item.href}>
                  <Button 
                    variant={item.active ? "default" : "ghost"} 
                    className={cn(
                      "flex items-center",
                      item.active 
                        ? "bg-primary text-primary-foreground" 
                        : "text-gray-600 hover:text-gray-900"
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <Link 
                key={item.name} 
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button 
                  variant={item.active ? "default" : "ghost"} 
                  className={cn(
                    "w-full justify-start",
                    item.active 
                      ? "bg-primary text-primary-foreground" 
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  {item.icon}
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
