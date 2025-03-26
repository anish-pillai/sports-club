"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, Filter, MapPin } from "lucide-react";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for arenas - this would come from your API in production
const MOCK_ARENAS = [
  {
    id: "1",
    name: "Downtown Basketball Court",
    description: "Professional-grade indoor basketball court with high-quality flooring and equipment.",
    imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    sportType: "BASKETBALL",
    location: "123 Main Street, Downtown",
    hourlyRate: 50,
  },
  {
    id: "2",
    name: "Sunshine Tennis Club",
    description: "Well-maintained outdoor tennis courts with professional-grade surfaces.",
    imageUrl: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    sportType: "TENNIS",
    location: "456 Park Avenue, Midtown",
    hourlyRate: 40,
  },
  {
    id: "3",
    name: "Green Valley Football Field",
    description: "Full-size football field with natural grass and excellent drainage system.",
    imageUrl: "https://images.unsplash.com/photo-1551958219-acbc608c6377?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    sportType: "FOOTBALL",
    location: "789 Valley Road, Westside",
    hourlyRate: 75,
  },
  {
    id: "4",
    name: "Volley Beach Arena",
    description: "Premium sand volleyball courts with professional setup and lighting for night games.",
    imageUrl: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    sportType: "VOLLEYBALL",
    location: "101 Beach Drive, Seaside",
    hourlyRate: 45,
  },
  {
    id: "5",
    name: "Badminton Central",
    description: "Indoor badminton courts with professional flooring and equipment.",
    imageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac1b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    sportType: "BADMINTON",
    location: "202 Center Avenue, Midtown",
    hourlyRate: 35,
  },
  {
    id: "6",
    name: "Aquatic Sports Center",
    description: "Olympic-sized swimming pool with professional facilities and trained lifeguards.",
    imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    sportType: "SWIMMING",
    location: "303 Water Lane, Riverside",
    hourlyRate: 60,
  },
];

// Mock locations
const LOCATIONS = [
  "Downtown",
  "Midtown",
  "Westside",
  "Seaside",
  "Riverside",
];

function ArenaContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialSport = searchParams.get("sport") || "";
  const initialLocation = searchParams.get("location") || "";
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sportFilter, setSportFilter] = useState(initialSport);
  const [locationFilter, setLocationFilter] = useState(initialLocation);
  const [filteredArenas, setFilteredArenas] = useState(MOCK_ARENAS);

  useEffect(() => {
    // Apply filters
    let filtered = MOCK_ARENAS;
    
    if (searchQuery) {
      filtered = filtered.filter(arena => 
        arena.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        arena.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (sportFilter && sportFilter !== 'all') {
      filtered = filtered.filter(arena => arena.sportType === sportFilter);
    }
    
    if (locationFilter && locationFilter !== 'all') {
      filtered = filtered.filter(arena => arena.location.includes(locationFilter));
    }
    
    setFilteredArenas(filtered);
  }, [searchQuery, sportFilter, locationFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL with search parameters
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (sportFilter) params.set("sport", sportFilter);
    if (locationFilter) params.set("location", locationFilter);
    
    router.push(`/arenas?${params.toString()}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Sports Arenas</h1>
          <p className="text-gray-600 dark:text-gray-400">Find and book the perfect arena for your next game or training session</p>
        </div>

        {/* Search and Filters */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or description"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={sportFilter} onValueChange={setSportFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Sport Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sports</SelectItem>
                  <SelectItem value="BASKETBALL">Basketball</SelectItem>
                  <SelectItem value="TENNIS">Tennis</SelectItem>
                  <SelectItem value="FOOTBALL">Football</SelectItem>
                  <SelectItem value="VOLLEYBALL">Volleyball</SelectItem>
                  <SelectItem value="BADMINTON">Badminton</SelectItem>
                  <SelectItem value="SWIMMING">Swimming</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-48">
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {LOCATIONS.map(location => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="flex-shrink-0">
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
          </div>
        </form>

        {/* Results */}
        {filteredArenas.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredArenas.map((arena) => (
              <Card key={arena.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48 w-full">
                  <Image
                    src={arena.imageUrl}
                    alt={arena.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute bottom-2 right-2">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      {arena.sportType.charAt(0) + arena.sportType.slice(1).toLowerCase()}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{arena.name}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="mr-1 h-3 w-3" />
                    {arena.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{arena.description}</p>
                  <p className="mt-2 font-medium">${arena.hourlyRate}/hour</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/arenas/${arena.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
            <div className="text-center">
              <p className="mb-2 text-xl font-semibold">No arenas found</p>
              <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
            <Button variant="outline" className="mt-4" onClick={() => {
              setSearchQuery("");
              setSportFilter("");
              setLocationFilter("");
              router.push("/arenas");
            }}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ArenasPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <ArenaContent />
    </Suspense>
  );
}
