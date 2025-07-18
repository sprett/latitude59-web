"use client";

import { useState, useEffect } from "react";
import { Search, SortAsc, SortDesc } from "lucide-react";
import { Button } from "@/components/ui/Button";
import MusicCard from "@/components/sections/MusicCard";
import { client, MusicTrack } from "@/lib/sanity";

export default function MusicPage() {
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<MusicTrack[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "name">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTracks();
  }, []);

  useEffect(() => {
    filterAndSortTracks();
  }, [tracks, searchTerm, genreFilter, sortBy, sortOrder]);

  const fetchTracks = async () => {
    try {
      const query = `*[_type == "musicTrack"] | order(publishedAt desc)`;
      const data = await client.fetch(query);
      setTracks(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tracks:", error);
      setLoading(false);
    }
  };

  const filterAndSortTracks = () => {
    const filtered = tracks.filter((track) => {
      const matchesSearch =
        track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = !genreFilter || track.genre === genreFilter;
      return matchesSearch && matchesGenre;
    });

    // Sort tracks
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "name":
          comparison = a.title.localeCompare(b.title);
          break;
        case "date":
        default:
          comparison =
            new Date(a.publishedAt).getTime() -
            new Date(b.publishedAt).getTime();
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    setFilteredTracks(filtered);
  };

  const genres = Array.from(
    new Set(tracks.map((track) => track.genre).filter(Boolean))
  );

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tracks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Music
          </h1>
          <p className="text-lg text-gray-600">
            Explore my latest tracks and releases
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tracks or artists..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Genre Filter */}
            <div>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre!.charAt(0).toUpperCase() + genre!.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <div className="flex gap-2">
                <select
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "date" | "name")}
                >
                  <option value="date">Date</option>
                  <option value="name">Name</option>
                </select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleSortOrder}
                  className="flex items-center gap-1"
                >
                  {sortOrder === "asc" ? (
                    <SortAsc className="h-4 w-4" />
                  ) : (
                    <SortDesc className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredTracks.length} of {tracks.length} tracks
          </p>
        </div>

        {/* Tracks Grid */}
        {filteredTracks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTracks.map((track) => (
              <MusicCard key={track._id} track={track} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tracks found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
