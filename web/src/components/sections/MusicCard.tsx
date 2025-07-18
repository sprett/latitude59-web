import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Music, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MusicTrack, urlFor } from "@/lib/sanity";

interface MusicCardProps {
  track: MusicTrack;
  featured?: boolean;
}

export default function MusicCard({ track, featured = false }: MusicCardProps) {
  const primaryLink =
    track.streamingLinks?.find((link) => link.isPrimary) ||
    track.streamingLinks?.[0];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "spotify":
        return "🎵";
      case "apple-music":
        return "🍎";
      case "soundcloud":
        return "☁️";
      case "youtube":
        return "📺";
      case "bandcamp":
        return "🎪";
      default:
        return "🎵";
    }
  };

  return (
    <Card
      className={`group hover:shadow-lg transition-shadow duration-200 ${
        featured ? "ring-2 ring-blue-500" : ""
      }`}
    >
      <CardHeader className="pb-3">
        <div className="relative aspect-square rounded-md overflow-hidden mb-4">
          <Image
            src={urlFor(track.coverArt).width(400).height(400).url()}
            alt={`${track.title} cover art`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
          {featured && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          )}
        </div>

        <CardTitle className="text-lg line-clamp-2">{track.title}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <span>by {track.artist}</span>
          {track.genre && (
            <>
              <span>•</span>
              <span className="capitalize">{track.genre}</span>
            </>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {track.description && (
          <p className="text-sm text-gray-600 line-clamp-3">
            {track.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Music className="h-4 w-4" />
            <span className="capitalize">{track.trackType}</span>
          </div>
          {track.releaseDate && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(track.releaseDate)}</span>
            </div>
          )}
        </div>

        {/* Streaming Links */}
        <div className="space-y-2">
          {primaryLink && (
            <Button asChild className="w-full">
              <a
                href={primaryLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <span>{getPlatformIcon(primaryLink.platform)}</span>
                Listen on {primaryLink.platform}
                <ExternalLink className="h-4 w-4 ml-auto" />
              </a>
            </Button>
          )}

          {track.streamingLinks && track.streamingLinks.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {track.streamingLinks
                .filter((link) => !link.isPrimary)
                .map((link, index) => (
                  <Button key={index} variant="outline" size="sm" asChild>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <span>{getPlatformIcon(link.platform)}</span>
                      {link.platform}
                    </a>
                  </Button>
                ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
