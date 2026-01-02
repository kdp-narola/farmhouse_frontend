import { ACCESS_TOKEN, USER_ROLE } from "@/constant/constant";
import { Home, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const onNavigate = useNavigate();
  const { authUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleExploreNavigation = () => {
    onNavigate("/property");
    setIsMenuOpen(false);
  };
  const handleDashboardNavigation = () => {
    if (authUser?.role === USER_ROLE.ADMIN) onNavigate("/admin/dashboard");
    if (authUser?.role === USER_ROLE.OWNER) onNavigate("/owner/dashboard");
    if (authUser?.role === USER_ROLE.CUSTOMER)
      onNavigate("/customer/dashboard");
  };
  return (
    <>
      <nav className="px-4 md:px-8 py-4 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between">
          {/* <div className="max-w-7xl mx-auto px-6 flex items-center justify-between"> */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate("/")}
          >
            <div className="w-10 h-10 custom-gradient-teal-violet-1 rounded-2xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold custom-gradient-teal-violet-2 bg-clip-text text-transparent">
              SpaceShare
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {localStorage.getItem(ACCESS_TOKEN) && (
              <Button
                variant={"link"}
                className="font-medium p-0"
                onClick={handleDashboardNavigation}
              >
                Dashboard
              </Button>
            )}
            <Button
              variant={"link"}
              className="font-medium p-0"
              onClick={handleExploreNavigation}
            >
              Explore
            </Button>
            <Button variant={"link"} className="font-medium p-0">
              How it Works
            </Button>
            {localStorage.getItem(ACCESS_TOKEN) ? (
              <Button
                variant={"gradient"}
                onClick={() => {
                  localStorage.clear();
                  onNavigate("/");
                }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant={"link"}
                  onClick={() => onNavigate("/auth/login")}
                  className="font-medium p-0"
                >
                  Login
                </Button>
                <Button
                  variant={"gradient"}
                  onClick={() => onNavigate("/auth/register")}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => {
                setIsMenuOpen(isMenuOpen ? false : true);
              }}
              className="text-2xl"
            >
              <Menu />
            </button>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-white/80 backdrop-blur-md shadow-sm p-4 flex flex-col sticky top-14 z-40">
          {localStorage.getItem(ACCESS_TOKEN) && (
            <Button
              variant={"link"}
              className="font-medium p-0"
              onClick={handleDashboardNavigation}
            >
              Dashboard
            </Button>
          )}
          <Button
            variant={"link"}
            className="font-medium p-0"
            onClick={handleExploreNavigation}
          >
            Explore
          </Button>
          <Button variant={"link"} className="font-medium p-0">
            How it Works
          </Button>
          {localStorage.getItem(ACCESS_TOKEN) ? (
            <Button
              variant={"gradient"}
              onClick={() => {
                localStorage.clear();
                onNavigate("/");
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                variant={"link"}
                onClick={() => onNavigate("/auth/login")}
                className="font-medium p-0"
              >
                Login
              </Button>
              <Button
                variant={"gradient"}
                onClick={() => onNavigate("/auth/register")}
              >
                Get Started
              </Button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
