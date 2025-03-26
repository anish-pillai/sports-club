"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Filter, Users, Calendar, DollarSign } from "lucide-react";

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
import { Badge } from "@/components/ui/badge";

// Mock data for coaching classes
const MOCK_CLASSES = [
  {
    id: "1",
    title: "Elite Basketball Training",
    description: "Learn from professional coaches with experience coaching national teams. Perfect for intermediate to advanced players looking to elevate their game.",
    imageUrl: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    sportType: "BASKETBALL",
    level: "ADVANCED",
    coach: "Michael Johnson",
    coachImage: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: 120,
    duration: "8 weeks",
    schedule: "Tuesdays and Thursdays, 6:00 PM - 8:00 PM",
    capacity: 15,
    enrolledCount: 8,
  },
  {
    id: "2",
    title: "Tennis Fundamentals",
    description: "Master the basics of tennis with our comprehensive program designed for beginners. Focus on technique, footwork, and game strategy.",
    imageUrl: "https://images.unsplash.com/photo-1542144582-1ba00456b5e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    sportType: "TENNIS",
    level: "BEGINNER",
    coach: "Serena Williams",
    coachImage: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: 90,
    duration: "6 weeks",
    schedule: "Mondays and Wednesdays, 5:00 PM - 6:30 PM",
    capacity: 10,
    enrolledCount: 6,
  },
  {
    id: "3",
    title: "Football Skills Academy",
    description: "Comprehensive football training covering dribbling, passing, shooting, and tactical awareness. Suitable for players of all skill levels.",
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    sportType: "FOOTBALL",
    level: "INTERMEDIATE",
    coach: "David Beckham",
    coachImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: 100,
    duration: "10 weeks",
    schedule: "Saturdays, 10:00 AM - 12:00 PM",
    capacity: 20,
    enrolledCount: 15,
  },
  {
    id: "4",
    title: "Volleyball Basics",
    description: "Learn the fundamentals of volleyball including serving, passing, setting, and basic game strategies in a fun and supportive environment.",
    imageUrl: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    sportType: "VOLLEYBALL",
    level: "BEGINNER",
    coach: "Jennifer Thompson",
    coachImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: 80,
    duration: "6 weeks",
    schedule: "Fridays, 4:00 PM - 6:00 PM",
    capacity: 12,
    enrolledCount: 5,
  },
  {
    id: "5",
    title: "Badminton Masterclass",
    description: "Improve your badminton skills with advanced techniques, strategic gameplay, and conditioning exercises tailored for competitive players.",
    imageUrl: "https://images.unsplash.com/photo-1626224583764-f87db24ac1b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    sportType: "BADMINTON",
    level: "ADVANCED",
    coach: "Lee Chong",
    coachImage: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: 110,
    duration: "8 weeks",
    schedule: "Tuesdays and Thursdays, 7:00 PM - 9:00 PM",
    capacity: 8,
    enrolledCount: 7,
  },
  {
    id: "6",
    title: "Swimming for Beginners",
    description: "Learn essential swimming techniques in a safe and supportive environment. Perfect for those new to swimming or looking to improve basic skills.",
    imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    sportType: "SWIMMING",
    level: "BEGINNER",
    coach: "Michael Phelps",
    coachImage: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    price: 95,
    duration: "8 weeks",
    schedule: "Mondays, Wednesdays, and Fridays, 7:00 AM - 8:00 AM",
    capacity: 10,
    enrolledCount: 6,
  },
];

export default function CoachingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sportFilter, setSportFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [filteredClasses, setFilteredClasses] = useState(MOCK_CLASSES);

  const handleSearch = () => {
    let filtered = MOCK_CLASSES;
    
    if (searchQuery) {
      filtered = filtered.filter(classItem => 
        classItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        classItem.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (sportFilter && sportFilter !== 'all') {
      filtered = filtered.filter(classItem => classItem.sportType === sportFilter);
    }
    
    if (levelFilter && levelFilter !== 'all') {
      filtered = filtered.filter(classItem => classItem.level === levelFilter);
    }
    
    setFilteredClasses(filtered);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSportFilter("");
    setLevelFilter("");
    setFilteredClasses(MOCK_CLASSES);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Coaching Classes</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Improve your skills with our professional coaching programs
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by title or description"
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
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Skill Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="BEGINNER">Beginner</SelectItem>
                  <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                  <SelectItem value="ADVANCED">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSearch} className="flex-shrink-0">
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </Button>
            <Button variant="outline" onClick={resetFilters} className="flex-shrink-0">
              Reset
            </Button>
          </div>
        </div>

        {/* Results */}
        {filteredClasses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredClasses.map((classItem) => (
              <Card key={classItem.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48 w-full">
                  <Image
                    src={classItem.imageUrl}
                    alt={classItem.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute bottom-2 right-2">
                    <Badge className="bg-blue-500 text-white">
                      {classItem.sportType.charAt(0) + classItem.sportType.slice(1).toLowerCase()}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={classItem.coachImage}
                        alt={classItem.coach}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{classItem.coach}</p>
                      <p className="text-xs text-gray-500">Coach</p>
                    </div>
                  </div>
                  <CardTitle className="line-clamp-1">{classItem.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {classItem.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">
                        {classItem.level.charAt(0) + classItem.level.slice(1).toLowerCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-end text-gray-600">
                      <Users className="mr-1 h-4 w-4" />
                      <span>{classItem.enrolledCount}/{classItem.capacity}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>{classItem.duration}</span>
                    </div>
                    <div className="flex items-center justify-end text-gray-600">
                      <DollarSign className="mr-1 h-4 w-4" />
                      <span>${classItem.price}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/coaching/${classItem.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
            <div className="text-center">
              <p className="mb-2 text-xl font-semibold">No coaching classes found</p>
              <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
            <Button variant="outline" className="mt-4" onClick={resetFilters}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
