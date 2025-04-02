
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Package } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="h-16 w-16 rounded-full bg-shipshape-600 flex items-center justify-center mb-6">
        <Package className="h-10 w-10 text-white" />
      </div>
      <h1 className="text-6xl font-extrabold text-shipshape-700 mb-2">404</h1>
      <p className="text-2xl font-semibold text-gray-800 mb-6">Page Not Found</p>
      <p className="text-center text-gray-600 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved.
        Let's get you back to the dashboard.
      </p>
      <Button 
        className="bg-shipshape-600 hover:bg-shipshape-700"
        onClick={() => navigate("/")}
      >
        Return to Dashboard
      </Button>
    </div>
  );
};

export default NotFound;
