"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Music, Instagram, Facebook, Youtube } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "HOME", href: "/" },
    { name: "DOWNLOADS", href: "/downloads" },
    { name: "STORE", href: "/sample-packs" },
    { name: "CONTACT", href: "/contact" },
  ];

  const socialIcons = [
    { name: "Apple Music", href: "#", icon: Music },
    { name: "Instagram", href: "#", icon: Instagram },
    { name: "Spotify", href: "#", icon: Music },
    { name: "SoundCloud", href: "#", icon: Music },
    { name: "YouTube", href: "#", icon: Youtube },
    { name: "TikTok", href: "#", icon: Music },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md  ">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-white tracking-wider"
            >
              LATITUDE 59
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors tracking-wide"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Social Media Icons - Right */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
            {socialIcons.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="text-white hover:text-blue-400 transition-colors p-1"
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/95 border-t border-gray-800">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-blue-400 block px-3 py-2 text-base font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 pb-2">
                <div className="flex items-center space-x-4 px-3">
                  {socialIcons.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      className="text-white hover:text-blue-400 transition-colors p-1"
                      aria-label={social.name}
                    >
                      <social.icon className="h-5 w-5" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
