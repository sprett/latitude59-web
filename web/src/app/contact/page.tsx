"use client";

import { Mail } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="space-y-12">
            <div className="flex items-center justify-center space-x-4 text-3xl font-medium">
              <Mail className="h-8 w-8 text-orange-500" />
              <span className="text-gray-300">CONTACT:</span>
              <a
                href="mailto:mail@59latitude.com"
                className="text-orange-400 hover:text-orange-300 transition-colors duration-200"
              >
                mail@59latitude.com
              </a>
            </div>

            <div className="flex items-center justify-center space-x-4 text-3xl font-medium">
              <Mail className="h-8 w-8 text-orange-500" />
              <span className="text-gray-300">BOOKING:</span>
              <a
                href="mailto:booking@59latitude.com"
                className="text-orange-400 hover:text-orange-300 transition-colors duration-200"
              >
                booking@59latitude.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
