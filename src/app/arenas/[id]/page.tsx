"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { toast } from "sonner";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar as CalendarIcon,
  Info,
  User,
  ChevronLeft
} from "lucide-react";



import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Mock data for a single arena - in production this would come from an API
const MOCK_ARENA = {
  id: "1",
  name: "Downtown Basketball Court",
  description: "Professional-grade indoor basketball court with high-quality flooring and equipment. Perfect for casual games, practice sessions, or competitive matches. The facility includes scoreboards, seating for spectators, and high-quality lighting for optimal visibility.",
  longDescription: "Our Downtown Basketball Court offers a premium basketball experience in the heart of the city. The court features professional-grade flooring designed for optimal performance and player safety, reducing the risk of injuries during intense gameplay.\n\nThe facility is equipped with adjustable basketball hoops, digital scoreboards, and a state-of-the-art sound system. The spacious court allows for both full-court games and multiple half-court setups, making it versatile for different group sizes and training needs.\n\nWith excellent lighting, climate control, and well-maintained equipment, our court provides the perfect environment for players of all skill levels. Whether you're organizing a friendly game, training session, or competitive tournament, our Downtown Basketball Court has everything you need for an exceptional basketball experience.",
  imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  images: [
    "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1505666287802-931582b5fc71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1518529437096-4f94e2c1e99e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  ],
  sportType: "BASKETBALL",
  location: "123 Main Street, Downtown",
  amenities: ["Changing Rooms", "Showers", "Water Fountains", "Equipment Rental", "Parking"],
  rules: ["No food or drinks on the court", "Proper athletic shoes required", "Respect other players and staff"],
  hourlyRate: 50,
  capacity: 20,
  openingTime: "06:00",
  closingTime: "22:00",
  // Mock bookings to disable certain dates
  bookedSlots: [
    {
      date: "2023-06-15",
      slots: ["10:00", "11:00", "12:00"]
    },
    {
      date: "2023-06-16",
      slots: ["18:00", "19:00"]
    }
  ]
};

// Generate time slots from opening to closing time
const generateTimeSlots = (openingTime: string, closingTime: string) => {
  const slots = [];
  let hour = parseInt(openingTime.split(":")[0]);
  const closeHour = parseInt(closingTime.split(":")[0]);
  
  while (hour < closeHour) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    hour++;
  }
  
  return slots;
};

export default function ArenaDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState<string | undefined>();
  const [duration, setDuration] = useState<string>("1");
  
  // Generate time slots
  const timeSlots = generateTimeSlots(MOCK_ARENA.openingTime, MOCK_ARENA.closingTime);
  
  // Calculate total price
  const totalPrice = MOCK_ARENA.hourlyRate * parseInt(duration || "1");
  
  const handleBooking = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to book this arena");
      router.push("/login");
      return;
    }
    
    if (!date || !timeSlot) {
      toast.error("Please select a date and time slot");
      return;
    }
    
    // In a real app, you would make an API call to create a booking
    toast.success("Booking initiated! Redirecting to payment...");
    
    // For demo purposes, we'll just log the booking details
    console.log({
      arenaId: params.id,
      userId: session?.user?.email,
      date: format(date, "yyyy-MM-dd"),
      timeSlot,
      duration,
      totalPrice
    });
    
    // In production, redirect to checkout page
    // router.push("/checkout/[bookingId]");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4 p-0">
            <Link href="/arenas">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to all arenas
            </Link>
          </Button>
          
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{MOCK_ARENA.name}</h1>
              <div className="mt-2 flex items-center text-gray-600 dark:text-gray-400">
                <MapPin className="mr-1 h-4 w-4" />
                <span>{MOCK_ARENA.location}</span>
              </div>
            </div>
            <Badge variant="outline" className="rounded-full bg-blue-100 px-3 py-1 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              {MOCK_ARENA.sportType.charAt(0) + MOCK_ARENA.sportType.slice(1).toLowerCase()}
            </Badge>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            {/* Arena Images */}
            <div className="mb-8 overflow-hidden rounded-xl">
              <div className="relative h-[400px] w-full">
                <Image
                  src={MOCK_ARENA.imageUrl}
                  alt={MOCK_ARENA.name}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {MOCK_ARENA.images.slice(1).map((image, index) => (
                  <div key={index} className="relative h-24 overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={`${MOCK_ARENA.name} view ${index + 2}`}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Arena Details */}
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="rules">Rules</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-6">
                <h3 className="mb-2 text-lg font-semibold">About this arena</h3>
                <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                  {MOCK_ARENA.longDescription}
                </p>
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Capacity</div>
                      <div className="font-medium">{MOCK_ARENA.capacity} people</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Hours</div>
                      <div className="font-medium">{MOCK_ARENA.openingTime} - {MOCK_ARENA.closingTime}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Hourly Rate</div>
                      <div className="font-medium">${MOCK_ARENA.hourlyRate}</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="amenities" className="mt-6">
                <h3 className="mb-4 text-lg font-semibold">Amenities</h3>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {MOCK_ARENA.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                        <Info className="h-4 w-4" />
                      </div>
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="rules" className="mt-6">
                <h3 className="mb-4 text-lg font-semibold">Rules & Regulations</h3>
                <ul className="space-y-2">
                  {MOCK_ARENA.rules.map((rule, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                        {index + 1}
                      </div>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Card */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Book this Arena</CardTitle>
                <CardDescription>
                  Select your preferred date and time slot
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-2 text-sm font-medium">Price</div>
                  <div className="text-2xl font-bold">${MOCK_ARENA.hourlyRate} <span className="text-sm font-normal text-gray-500">/ hour</span></div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="mb-2 text-sm font-medium">Select Date</div>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded border p-2"
                    disabled={(date) => date < new Date()}
                  />
                </div>
                
                <div>
                  <div className="mb-2 text-sm font-medium">Select Time Slot</div>
                  <Select value={timeSlot} onValueChange={setTimeSlot}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="mb-2 text-sm font-medium">Duration (hours)</div>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hour</SelectItem>
                      <SelectItem value="2">2 hours</SelectItem>
                      <SelectItem value="3">3 hours</SelectItem>
                      <SelectItem value="4">4 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <div className="mb-4 flex w-full justify-between">
                  <span>Total Price:</span>
                  <span className="font-bold">${totalPrice}</span>
                </div>
                <Button className="w-full" size="lg" onClick={handleBooking}>
                  {isAuthenticated ? "Book Now" : "Sign in to Book"}
                </Button>
                {!isAuthenticated && (
                  <p className="mt-2 text-center text-sm text-gray-500">
                    You need to be signed in to book this arena
                  </p>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
