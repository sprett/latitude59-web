import Image from "next/image";
import { Mail } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Image Section */}
      <section className="relative h-screen w-full bg-black">
        <div className="relative w-full h-full">
          <Image
            src="/hero-image.png"
            alt="KREAM Hero Image"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Optional overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Optional text overlay - uncomment if you want text over the image */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-white mb-4">
                LATITUDE 59
              </h1>
              <p className="text-xl text-white/90">
                Electronic Music Experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
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
      </section>
    </div>
  );
}
