import Image from "next/image";
import { MapPin, Mail, Calendar, Award, Music, Headphones } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { client, Artist, urlFor } from "@/lib/sanity";

async function getArtistData() {
  const query = `*[_type == "artist" && isActive == true][0]`;
  const artist = await client.fetch(query);
  return artist as Artist;
}

export default async function AboutPage() {
  const artist = await getArtistData();

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return "📷";
      case "twitter":
        return "🐦";
      case "youtube":
        return "📺";
      case "soundcloud":
        return "☁️";
      case "spotify":
        return "🎵";
      case "bandcamp":
        return "🎪";
      default:
        return "🔗";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About {artist?.name || "Latitude"}
              </h1>
              {artist?.location && (
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin className="h-5 w-5" />
                  <span>{artist.location}</span>
                </div>
              )}
              <p className="text-xl text-gray-600 mb-8">
                {artist?.shortBio || "Electronic music producer and artist"}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <a href="/music">Listen to Music</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/contact">Get in Touch</a>
                </Button>
              </div>
            </div>

            {artist?.profileImage && (
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={urlFor(artist.profileImage).width(600).height(600).url()}
                  alt={artist.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Biography Section */}
      {artist?.bio && (
        <div className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Biography</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <PortableText value={artist.bio} />
            </div>
          </div>
        </div>
      )}

      {/* Stats & Info Grid */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Genres */}
            {artist?.genres && artist.genres.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Music className="h-5 w-5" />
                    Genres
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {artist.genres.map((genre, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Equipment */}
            {artist?.equipment && artist.equipment.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Headphones className="h-5 w-5" />
                    Equipment & Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {artist.equipment.map((item, index) => (
                      <li key={index} className="text-gray-700">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Achievements */}
            {artist?.achievements && artist.achievements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {artist.achievements.map((achievement, index) => (
                      <li key={index} className="text-gray-700">
                        • {achievement}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Social Links */}
      {artist?.socialLinks && artist.socialLinks.length > 0 && (
        <div className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Connect</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {artist.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border"
                >
                  <span className="text-2xl">
                    {getSocialIcon(link.platform)}
                  </span>
                  <div className="text-left">
                    <div className="font-medium text-gray-900 capitalize">
                      {link.platform}
                    </div>
                    {link.username && (
                      <div className="text-sm text-gray-500">
                        @{link.username}
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's Work Together
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Interested in collaborations, bookings, or custom music production?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <a href="/contact">Get in Touch</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <a href="/sample-packs">Shop Sample Packs</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
