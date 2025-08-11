import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4 gap-3 sm:gap-2 text-center sm:text-left">
            <AlertCircle className="h-8 w-8 sm:h-10 sm:w-10 text-red-500 flex-shrink-0" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                404 Page Not Found
              </h1>
              <p className="mt-2 sm:mt-4 text-sm sm:text-base text-gray-600">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="inline-flex items-center justify-center px-4 py-2 bg-primary-orange text-white rounded-md hover:bg-primary-orange/90 transition-colors text-sm font-medium"
            >
              Go Back Home
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
