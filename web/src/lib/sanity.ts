import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Real Sanity client
export const client = createClient({
  projectId: "1ut778we",
  dataset: "production",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
  apiVersion: "2024-01-01", // Use current date (YYYY-MM-DD) to target the latest API version
});

// Real URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Type definitions for our content
export interface MusicTrack {
  _id: string;
  title: string;
  slug: { current: string };
  artist: string;
  coverArt: any;
  category: "remixes" | "mashups-edits" | "full-mixes";
  trackType: "original" | "remix" | "collaboration";
  genre?: string;
  releaseDate?: string;
  streamingLinks?: Array<{
    platform: string;
    url: string;
    isPrimary?: boolean;
  }>;
  downloadLink?: string;
  description?: string;
  featured?: boolean;
  publishedAt: string;
}

export interface SamplePack {
  _id: string;
  name: string;
  slug: { current: string };
  coverImage: any;
  description: string;
  detailedDescription?: any[];
  genre?: string;
  bpm?: string;
  key?: string;
  sampleCount: number;
  packSize?: string;
  tags?: string[];
  price: number;
  gumroadUrl: string;
  gumroadProductId?: string;
  previewAudio?: any;
  previewImages?: any[];
  featured?: boolean;
  isActive: boolean;
  publishedAt: string;
}

export interface Artist {
  _id: string;
  name: string;
  stageName?: string;
  profileImage?: any;
  heroImage?: any;
  bio?: any[];
  shortBio?: string;
  location?: string;
  socialLinks?: Array<{
    platform: string;
    url: string;
    username?: string;
  }>;
  contactEmail?: string;
  bookingEmail?: string;
  genres?: string[];
  equipment?: string[];
  achievements?: string[];
  isActive: boolean;
}
