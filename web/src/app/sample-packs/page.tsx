"use client";

import { useState, useEffect } from "react";
import { Search, SortAsc, SortDesc } from "lucide-react";
import { Button } from "@/components/ui/Button";
import SamplePackCard from "@/components/sections/SamplePackCard";
import { client, SamplePack } from "@/lib/sanity";

export default function SamplePacksPage() {
  const [packs, setPacks] = useState<SamplePack[]>([]);
  const [filteredPacks, setFilteredPacks] = useState<SamplePack[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "name" | "price">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPacks();
  }, []);

  useEffect(() => {
    filterAndSortPacks();
  }, [packs, searchTerm, genreFilter, priceFilter, sortBy, sortOrder]);

  const fetchPacks = async () => {
    try {
      const query = `*[_type == "samplePack" && isActive == true] | order(publishedAt desc)`;
      const data = await client.fetch(query);
      setPacks(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching packs:", error);
      setLoading(false);
    }
  };

  const filterAndSortPacks = () => {
    const filtered = packs.filter((pack) => {
      const matchesSearch =
        pack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pack.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (pack.tags &&
          pack.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ));
      const matchesGenre = !genreFilter || pack.genre === genreFilter;

      let matchesPrice = true;
      if (priceFilter) {
        switch (priceFilter) {
          case "free":
            matchesPrice = pack.price === 0;
            break;
          case "under-10":
            matchesPrice = pack.price < 10;
            break;
          case "10-25":
            matchesPrice = pack.price >= 10 && pack.price <= 25;
            break;
          case "25-50":
            matchesPrice = pack.price >= 25 && pack.price <= 50;
            break;
          case "over-50":
            matchesPrice = pack.price > 50;
            break;
        }
      }

      return matchesSearch && matchesGenre && matchesPrice;
    });

    // Sort packs
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "price":
          comparison = a.price - b.price;
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

    setFilteredPacks(filtered);
  };

  const genres = Array.from(
    new Set(packs.map((pack) => pack.genre).filter(Boolean))
  );

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading store...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Blurred Content */}
      <div className="blur-sm pointer-events-none">
        {/* Header */}
        <div className="bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Store
            </h1>
            <h2 className="text-2xl font-semibold text-gray-300 mb-8">
              LATITUDE 59 SOUNDS
            </h2>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="bg-gray-900 rounded-lg shadow-xl p-6 mb-8 border border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search packs, descriptions, or tags..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-white focus:border-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Genre Filter */}
              <div>
                <select
                  className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-white focus:border-white"
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

              {/* Price Filter */}
              <div>
                <select
                  className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-white focus:border-white"
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                >
                  <option value="">All Prices</option>
                  <option value="free">Free</option>
                  <option value="under-10">Under $10</option>
                  <option value="10-25">$10 - $25</option>
                  <option value="25-50">$25 - $50</option>
                  <option value="over-50">Over $50</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <div className="flex gap-2">
                  <select
                    className="flex-1 px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-white focus:border-white"
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value as "date" | "name" | "price")
                    }
                  >
                    <option value="date">Date</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                  </select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleSortOrder}
                    className="flex items-center gap-1 border-gray-700 bg-gray-800 text-white hover:bg-gray-700 hover:border-gray-600"
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
            <p className="text-gray-400">
              Showing {filteredPacks.length} of {packs.length} sample packs
            </p>
          </div>

          {/* Sample Packs Grid */}
          {filteredPacks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPacks.map((pack) => (
                <SamplePackCard key={pack._id} pack={pack} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                No sample packs found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Launching Soon Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-wider">
            LAUNCHING
          </h1>
          <h2 className="text-4xl md:text-6xl font-light text-gray-300 tracking-widest">
            SOON
          </h2>
          <div className="mt-8 h-1 w-32 bg-white mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
