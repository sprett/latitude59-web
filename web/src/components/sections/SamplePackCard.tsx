import Image from "next/image";
import { ShoppingCart, Music, Clock, Hash, Tag } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SamplePack, urlFor } from "@/lib/sanity";

interface SamplePackCardProps {
  pack: SamplePack;
  featured?: boolean;
}

export default function SamplePackCard({
  pack,
  featured = false,
}: SamplePackCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
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
            src={urlFor(pack.coverImage).width(400).height(400).url()}
            alt={`${pack.name} cover image`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
          {featured && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          )}
          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-full text-sm font-semibold">
            {formatPrice(pack.price)}
          </div>
        </div>

        <CardTitle className="text-lg line-clamp-2">{pack.name}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          {pack.genre && (
            <>
              <span className="capitalize">{pack.genre}</span>
              <span>•</span>
            </>
          )}
          <span>{pack.sampleCount} samples</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-3">{pack.description}</p>

        {/* Pack Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <Hash className="h-4 w-4" />
            <span>{pack.sampleCount} samples</span>
          </div>
          {pack.bpm && (
            <div className="flex items-center gap-2 text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{pack.bpm} BPM</span>
            </div>
          )}
          {pack.key && (
            <div className="flex items-center gap-2 text-gray-500">
              <Music className="h-4 w-4" />
              <span>{pack.key}</span>
            </div>
          )}
          {pack.packSize && (
            <div className="flex items-center gap-2 text-gray-500">
              <Tag className="h-4 w-4" />
              <span>{pack.packSize}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {pack.tags && pack.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {pack.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
              >
                {tag}
              </span>
            ))}
            {pack.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                +{pack.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Buy Button */}
        <Button asChild className="w-full" disabled={!pack.isActive}>
          <a
            href={pack.gumroadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            {pack.isActive
              ? `Buy now - ${formatPrice(pack.price)}`
              : "Unavailable"}
          </a>
        </Button>

        {/* Preview Audio */}
        {pack.previewAudio && (
          <div className="pt-2 border-t">
            <audio controls className="w-full" preload="metadata">
              <source src={pack.previewAudio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
