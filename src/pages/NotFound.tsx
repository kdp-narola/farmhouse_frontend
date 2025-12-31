import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const onNavigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6 py-8 w-full">
      <h1 className="text-4xl font-extrabold text-gray-900">404</h1>
      <p className="text-gray-600 mb-6">
        Sorry, the page you're looking for could not be found.
      </p>
      <Button
        onClick={() => {
          onNavigate("/");
        }}
      >
        Go Back to Homepage
      </Button>
    </div>
  );
};

export default NotFound;
