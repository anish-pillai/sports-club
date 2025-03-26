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

// Mock data for coaching classes - using the same data as in the coaching page
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

export default function ClassesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sportFilter, setSportFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
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
    setSportFilter("all");
    setLevelFilter("all");
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
            <div className="flex gap-2">
              <Button onClick={handleSearch} className="flex-shrink-0">
                <Filter className="mr-2 h-4 w-4" />
                Apply Filters
              </Button>
              <Button onClick={resetFilters} variant="outline" className="flex-shrink-0">
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredClasses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredClasses.map((classItem) => (
              <Card key={classItem.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <img
                    src={classItem.imageUrl}
                    alt={classItem.title}
                    className="h-full w-full object-cover"
                  />
                  <Badge className="absolute right-2 top-2" variant={classItem.level === "BEGINNER" ? "secondary" : classItem.level === "INTERMEDIATE" ? "default" : "success"}>
                    {classItem.level}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{classItem.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <div className="relative mr-2 h-6 w-6 overflow-hidden rounded-full">
                      <img
                        src={classItem.coachImage}
                        alt={classItem.coach}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    Coach: {classItem.coach}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                    {classItem.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4 text-gray-500" />
                      <span>{classItem.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4 text-gray-500" />
                      <span>{classItem.enrolledCount}/{classItem.capacity}</span>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <DollarSign className="mr-1 h-4 w-4 text-gray-500" />
                      <span>${classItem.price}/course</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href={`/coaching/${classItem.id}`}>View Details</Link>
                  </Button>
                  <Button>Enroll Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="mb-4 text-lg font-medium">No classes found</p>
            <p className="mb-8 text-gray-500 dark:text-gray-400">Try adjusting your filters or search terms</p>
            <Button onClick={resetFilters}>Reset Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}
