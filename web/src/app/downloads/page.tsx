"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { client, MusicTrack, urlFor } from "@/lib/sanity";

interface GroupedTracks {
  remixes: MusicTrack[];
  "mashups-edits": MusicTrack[];
  "full-mixes": MusicTrack[];
}

export default function DownloadsPage() {
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [groupedTracks, setGroupedTracks] = useState<GroupedTracks>({
    remixes: [],
    "mashups-edits": [],
    "full-mixes": [],
  });
  const [loading, setLoading] = useState(true);

  const fetchTracks = async () => {
    try {
      const query = `*[_type == "musicTrack"] | order(publishedAt desc)`;
      const data = await client.fetch(query);
      setTracks(data);
      groupTracksByCategory(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tracks:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  const groupTracksByCategory = (tracks: MusicTrack[]) => {
    const grouped: GroupedTracks = {
      remixes: [],
      "mashups-edits": [],
      "full-mixes": [],
    };

    tracks.forEach((track) => {
      if (track.category && grouped[track.category]) {
        grouped[track.category].push(track);
      }
    });

    // Sort tracks within each category by publishedAt date (newest first)
    Object.keys(grouped).forEach((category) => {
      grouped[category as keyof GroupedTracks].sort((a, b) => {
        const dateA = new Date(a.publishedAt);
        const dateB = new Date(b.publishedAt);
        return dateA.getTime() - dateB.getTime(); // Ascending order (trying opposite direction)
      });
    });

    setGroupedTracks(grouped);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleTrackClick = (track: MusicTrack) => {
    if (track.downloadLink) {
      window.open(track.downloadLink, "_blank", "noopener,noreferrer");
    } else {
      // Fallback - could show a message or redirect somewhere else
      console.warn(`No download link available for ${track.title}`);
    }
  };

  const renderTrackGrid = (tracks: MusicTrack[]) => {
    if (tracks.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-400">No tracks in this category yet</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {tracks.map((track) => (
          <div
            key={track._id}
            className="group block cursor-pointer"
            onClick={() => handleTrackClick(track)}
          >
            <div
              className="aspect-square relative overflow-hidden rounded-md shadow-2xl transition-all duration-300 hover:shadow-white/20 hover-glow-effect"
              onMouseMove={handleMouseMove}
              style={
                {
                  "--mouse-x": "0px",
                  "--mouse-y": "0px",
                } as React.CSSProperties
              }
            >
              <Image
                src={urlFor(track.coverArt).width(300).height(300).url()}
                alt={`${track.title} cover art`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-2 text-center">
              <h3 className="text-sm font-medium text-white line-clamp-2">
                {track.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case "remixes":
        return "REMIXES";
      case "mashups-edits":
        return "MASHUPS & EDITS";
      case "full-mixes":
        return "FULL MIXES";
      default:
        return category.toUpperCase();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading tracks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Click To Download
          </h1>
        </div>
      </div>

      {/* Track Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {Object.entries(groupedTracks).map(([category, tracks]) => (
          <div key={category} className="mb-16 last:mb-0">
            {/* Category Header */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-2">
                {getCategoryTitle(category)}
              </h2>
              <div className="w-24 h-1 bg-white mx-auto"></div>
            </div>

            {/* Track Grid */}
            {renderTrackGrid(tracks)}
          </div>
        ))}

        {/* Empty State */}
        {tracks.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="h-8 w-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              No tracks found
            </h3>
            <p className="text-gray-400">
              Tracks will appear here once they&apos;re added
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .hover-glow-effect {
          position: relative;
        }

        .hover-glow-effect::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 6px;
          padding: 2px;
          background: radial-gradient(
            300px circle at var(--mouse-x) var(--mouse-y),
            rgba(255, 255, 255, 0.4),
            rgba(255, 255, 255, 0.1) 40%,
            transparent 70%
          );
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: xor;
          -webkit-mask-composite: xor;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .hover-glow-effect:hover::before {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
