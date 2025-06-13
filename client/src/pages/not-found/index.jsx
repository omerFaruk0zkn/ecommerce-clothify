import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="flex items-center justify-center animate-bounce">
        <Frown className="size-20 md:size-28" />
      </div>
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Page not found
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        The page you are looking for may not exist or may have been removed.
        Please check the address or return to the home page.
      </p>
      <Button onClick={() => navigate("/")} className="p-6 rounded-lg">
        Return Home Page
      </Button>
    </div>
  );
};

export default NotFound;
