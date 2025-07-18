"use client";

import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpotify,
  faInstagram,
  faTiktok,
  faYoutube,
  faSoundcloud,
} from "@fortawesome/free-brands-svg-icons";
import AppleMusicIcon from "@/components/ui/AppleMusicIcon";
import "@/lib/fontawesome";

export default function Footer() {
  const [email, setEmail] = useState("");

  const socialIcons = [
    {
      name: "Apple Music",
      href: "https://music.apple.com/fr/artist/latitude-59/1817503477?l=en-GB",
      icon: "applemusic",
      color: "#FB3C56",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/59latitude/",
      icon: faInstagram,
      color: "#E4405F",
    },
    {
      name: "Spotify",
      href: "https://open.spotify.com/artist/2rnFDslzyFxifdAWLXTdWF?si=MInkwkrZRnaLDlHfo1CBqg",
      icon: faSpotify,
      color: "#1DB954",
    },
    {
      name: "SoundCloud",
      href: "https://soundcloud.com/latitude59",
      icon: faSoundcloud,
      color: "#FF5733",
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/channel/UCwWJAUAzZLZ9c3wQ4j0MrJQ",
      icon: faYoutube,
      color: "#FF0000",
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@latitude59music",
      icon: faTiktok,
      color: "#FFFFFF",
    },
  ];

  const renderSocialIcon = (social: any) => {
    if (social.icon === "applemusic") {
      return (
        <AppleMusicIcon className="h-5 w-5" style={{ color: social.color }} />
      );
    }
    return (
      <FontAwesomeIcon
        icon={social.icon}
        className="h-5 w-5"
        style={{ color: social.color }}
      />
    );
  };

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6">
          {socialIcons.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              className="text-white hover:text-cyan-400 transition-colors p-1"
              aria-label={social.name}
              target={social.href !== "#" ? "_blank" : undefined}
              rel={social.href !== "#" ? "noopener noreferrer" : undefined}
            >
              {renderSocialIcon(social)}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
