"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar, Clock, DollarSign, MapPin } from "lucide-react";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for bookings - this would come from your API in production
const MOCK_BOOKINGS = [
  {
    id: "1",
    arenaId: "1",
    arenaName: "Downtown Basketball Court",
    sportType: "BASKETBALL",
    date: "2025-04-15",
    startTime: "10:00",
    endTime: "12:00",
    totalPrice: 100,
    status: "UPCOMING",
    imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "2",
    arenaId: "2",
    arenaName: "Sunshine Tennis Club",
    sportType: "TENNIS",
    date: "2025-04-20",
    startTime: "14:00",
    endTime: "16:00",
    totalPrice: 80,
    status: "UPCOMING",
    imageUrl: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "3",
    arenaId: "3",
    arenaName: "Green Valley Football Field",
    sportType: "FOOTBALL",
    date: "2025-03-10",
    startTime: "15:00",
    endTime: "17:00",
    totalPrice: 150,
    status: "COMPLETED",
    imageUrl: "https://images.unsplash.com/photo-1551958219-acbc608c6377?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "4",
    arenaId: "4",
    arenaName: "Volley Beach Arena",
    sportType: "VOLLEYBALL",
    date: "2025-03-05",
    startTime: "18:00",
    endTime: "20:00",
    totalPrice: 90,
    status: "CANCELLED",
    imageUrl: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
];

// Helper function to get status badge - moved outside component to be accessible to BookingsList
const getStatusBadge = (status: string) => {
  switch (status) {
    case "UPCOMING":
      return <Badge variant="secondary">Upcoming</Badge>;
    case "COMPLETED":
      return <Badge variant="success">Completed</Badge>;
    case "CANCELLED":
      return <Badge variant="destructive">Cancelled</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("all");
  
  const getFilteredBookings = () => {
    if (activeTab === "all") return MOCK_BOOKINGS;
    return MOCK_BOOKINGS.filter(booking => {
      if (activeTab === "upcoming") return booking.status === "UPCOMING";
      if (activeTab === "completed") return booking.status === "COMPLETED";
      if (activeTab === "cancelled") return booking.status === "CANCELLED";
      return true;
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">My Bookings</h1>
          <p className="text-gray-600 dark:text-gray-400">View and manage your arena bookings</p>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 md:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <BookingsList bookings={getFilteredBookings()} />
          </TabsContent>
          <TabsContent value="upcoming" className="mt-6">
            <BookingsList bookings={getFilteredBookings()} />
          </TabsContent>
          <TabsContent value="completed" className="mt-6">
            <BookingsList bookings={getFilteredBookings()} />
          </TabsContent>
          <TabsContent value="cancelled" className="mt-6">
            <BookingsList bookings={getFilteredBookings()} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

interface BookingsListProps {
  bookings: typeof MOCK_BOOKINGS;
}

function BookingsList({ bookings }: BookingsListProps) {
  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="mb-4 text-lg font-medium">No bookings found</p>
        <p className="mb-8 text-gray-500 dark:text-gray-400">You don't have any bookings in this category yet.</p>
        <Button asChild>
          <a href="/arenas">Browse Arenas</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {bookings.map((booking) => (
        <Card key={booking.id} className="overflow-hidden">
          <div className="relative h-48 w-full">
            <img
              src={booking.imageUrl}
              alt={booking.arenaName}
              className="h-full w-full object-cover"
            />
          </div>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <CardTitle className="text-xl">{booking.arenaName}</CardTitle>
              {getStatusBadge(booking.status)}
            </div>
            <CardDescription>{booking.sportType}</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid gap-2">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                <span>{format(new Date(booking.date), "MMMM d, yyyy")}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-gray-500" />
                <span>{booking.startTime} - {booking.endTime}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4 text-gray-500" />
                <span>${booking.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <div className="flex w-full gap-2">
              {booking.status === "UPCOMING" && (
                <>
                  <Button variant="outline" className="flex-1">Reschedule</Button>
                  <Button variant="destructive" className="flex-1">Cancel</Button>
                </>
              )}
              {booking.status === "COMPLETED" && (
                <Button variant="outline" className="w-full">Book Again</Button>
              )}
              {booking.status === "CANCELLED" && (
                <Button variant="outline" className="w-full">Book Again</Button>
              )}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
