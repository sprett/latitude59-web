import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Download, Music, ArrowLeft } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSoundcloud,
  faSpotify,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "@/lib/fontawesome";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Footer from "@/components/layout/Footer";
import { client, MusicTrack, urlFor } from "@/lib/sanity";

interface TrackPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getTrack(slug: string): Promise<MusicTrack | null> {
  const query = `*[_type == "musicTrack" && slug.current == $slug][0]`;
  const track = await client.fetch(query, { slug });
  return track || null;
}

export default async function TrackPage({ params }: TrackPageProps) {
  const { slug } = await params;
  const track = await getTrack(slug);

  if (!track) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "spotify":
        return (
          <FontAwesomeIcon
            icon={faSpotify}
            style={{ color: "#1DB954", fontSize: "18px" }}
          />
        );
      case "apple-music":
        return "🍎";
      case "soundcloud":
        return (
          <FontAwesomeIcon
            icon={faSoundcloud}
            style={{ color: "#FF5733", fontSize: "18px" }}
          />
        );
      case "youtube":
        return (
          <FontAwesomeIcon
            icon={faYoutube}
            style={{ color: "#FF0000", fontSize: "18px" }}
          />
        );
      case "bandcamp":
        return "🎪";
      case "beatport":
        return "🎛️";
      default:
        return "🎵";
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Back Button */}
      <div className="bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/downloads"
            className="inline-flex items-center justify-center w-10 h-10 text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </div>
      </div>

      {/* Track Details */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Cover Art */}
          <div className="aspect-square relative overflow-hidden rounded-lg shadow-2xl">
            <Image
              src={urlFor(track.coverArt).width(600).height(600).url()}
              alt={`${track.title} cover art`}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Track Information */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {track.title}
              </h1>
              <p className="text-xl text-gray-300 mb-4">by {track.artist}</p>

              {track.releaseDate && (
                <p className="text-gray-400 mb-6">
                  Release date: {formatDate(track.releaseDate)}
                </p>
              )}

              {track.description && (
                <p className="text-gray-300 leading-relaxed">
                  {track.description}
                </p>
              )}
            </div>

            {/* Download Button */}
            {track.downloadLink && (
              <Card className="bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Download className="h-5 w-5" />
                    Download Track
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <a
                      href={track.downloadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Download className="h-5 w-5" />
                      Download Now
                      <ExternalLink className="h-4 w-4 ml-auto" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Streaming Platforms */}
            {track.streamingLinks && track.streamingLinks.length > 0 && (
              <Card className="bg-gray-800 border-gray-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Music className="h-5 w-5" />
                    Listen on Streaming Platforms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {track.streamingLinks.map((link, index) => (
                    <Button
                      key={index}
                      asChild
                      variant={link.isPrimary ? "primary" : "outline"}
                      className="w-full justify-start border-gray-500 text-white hover:bg-gray-700"
                      size="lg"
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3"
                      >
                        <span className="text-lg">
                          {getPlatformIcon(link.platform)}
                        </span>
                        <span className="font-medium">
                          Listen on {link.platform}
                        </span>
                        <ExternalLink className="h-4 w-4 ml-auto" />
                      </a>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
