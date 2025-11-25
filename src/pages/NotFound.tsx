import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Number with gradient */}
        <h1 className="text-[150px] md:text-[200px] font-bold leading-none bg-gradient-to-br from-violet-600 via-purple-500 to-violet-600 bg-clip-text text-transparent mb-8 animate-pulse">
          404
        </h1>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-zinc-400 mb-12 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-700 hover:to-purple-600 text-white font-semibold border border-white/20 shadow-lg shadow-violet-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Homepage
            </Button>
          </Link>

          <Button 
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="bg-transparent border-zinc-700 text-zinc-100 hover:bg-zinc-900 hover:border-violet-500/50 transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
        </div>

        {/* Attempted Path Display */}
        {location.pathname && (
          <div className="mt-12 p-4 bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-lg">
            <p className="text-sm text-zinc-500">
              Attempted path: <span className="text-violet-400 font-mono">{location.pathname}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotFound;
