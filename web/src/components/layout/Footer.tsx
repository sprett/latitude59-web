"use client";

import Link from "next/link";
import { Music, Instagram, Facebook, Youtube } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const socialLinks = [
    {
      name: "Apple Music",
      href: "#",
      icon: Music,
    },
    {
      name: "Instagram",
      href: "#",
      icon: Instagram,
    },
    {
      name: "Spotify",
      href: "#",
      icon: Music,
    },
    {
      name: "Facebook",
      href: "#",
      icon: Facebook,
    },
    {
      name: "SoundCloud",
      href: "#",
      icon: Music,
    },
    {
      name: "YouTube",
      href: "#",
      icon: Youtube,
    },
    {
      name: "TikTok",
      href: "#",
      icon: Music,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email signup here
    console.log("Email signup:", email);
    setEmail("");
  };

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white hover:text-cyan-400 transition-colors p-1"
              aria-label={link.name}
            >
              <link.icon className="h-6 w-6" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
