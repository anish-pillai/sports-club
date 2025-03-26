"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  CalendarDays, 
  Clock, 
  MapPin, 
  User, 
  Settings, 
  LogOut, 
  ChevronRight,
  Dumbbell, 
  GraduationCap
} from "lucide-react";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { signOut } from "next-auth/react";

// Mock data for user bookings
const MOCK_BOOKINGS = [
  {
    id: "1",
    arenaId: "1",
    arenaName: "Downtown Basketball Court",
    sportType: "BASKETBALL",
    date: "2023-06-15",
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
    date: "2023-05-20",
    startTime: "14:00",
    endTime: "16:00",
    totalPrice: 80,
    status: "COMPLETED",
    imageUrl: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "3",
    arenaId: "3",
    arenaName: "Green Valley Football Field",
    sportType: "FOOTBALL",
    date: "2023-07-10",
    startTime: "16:00",
    endTime: "18:00",
    totalPrice: 150,
    status: "UPCOMING",
    imageUrl: "https://images.unsplash.com/photo-1551958219-acbc608c6377?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  }
];

// Mock data for user enrollments
const MOCK_ENROLLMENTS = [
  {
    id: "1",
    classId: "1",
    className: "Elite Basketball Training",
    sportType: "BASKETBALL",
    startDate: "2023-06-15",
    endDate: "2023-08-10",
    schedule: "Tuesdays and Thursdays, 6:00 PM - 8:00 PM",
    price: 120,
    status: "ACTIVE",
    progress: 3,
    totalWeeks: 8,
    imageUrl: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "2",
    classId: "4",
    className: "Volleyball Basics",
    sportType: "VOLLEYBALL",
    startDate: "2023-05-05",
    endDate: "2023-06-15",
    schedule: "Fridays, 4:00 PM - 6:00 PM",
    price: 80,
    status: "COMPLETED",
    progress: 6,
    totalWeeks: 6,
    imageUrl: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  }
];

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  
  const [activeTab, setActiveTab] = useState("bookings");
  
  // Redirect if not authenticated
  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }
  
  // Loading state
  if (status === "loading") {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="container mx-auto flex flex-1 items-center justify-center px-4 py-8">
          <div className="text-center">
            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto"></div>
            <p>Loading your profile...</p>
          </div>
        </div>
      </div>
    );
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "UPCOMING":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "ACTIVE":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "COMPLETED":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const user = session?.user;
  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          {/* Profile Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
                    <AvatarFallback className="text-xl">{userInitials}</AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>{user?.name}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <button
                    className={`flex w-full items-center justify-between rounded-md p-2 text-left transition-colors ${
                      activeTab === "bookings"
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setActiveTab("bookings")}
                  >
                    <div className="flex items-center">
                      <Dumbbell className="mr-3 h-5 w-5" />
                      <span>My Bookings</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button
                    className={`flex w-full items-center justify-between rounded-md p-2 text-left transition-colors ${
                      activeTab === "classes"
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setActiveTab("classes")}
                  >
                    <div className="flex items-center">
                      <GraduationCap className="mr-3 h-5 w-5" />
                      <span>My Classes</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button
                    className={`flex w-full items-center justify-between rounded-md p-2 text-left transition-colors ${
                      activeTab === "settings"
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setActiveTab("settings")}
                  >
                    <div className="flex items-center">
                      <Settings className="mr-3 h-5 w-5" />
                      <span>Settings</span>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            {activeTab === "bookings" && (
              <div>
                <h2 className="mb-6 text-2xl font-bold">My Arena Bookings</h2>
                
                {MOCK_BOOKINGS.length > 0 ? (
                  <div className="space-y-4">
                    {MOCK_BOOKINGS.map((booking) => (
                      <Card key={booking.id} className="overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div className="relative h-48 sm:h-auto sm:w-48">
                            <Image
                              src={booking.imageUrl}
                              alt={booking.arenaName}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex flex-wrap items-start justify-between">
                              <div>
                                <Badge className={`mb-2 ${getStatusColor(booking.status)}`}>
                                  {booking.status}
                                </Badge>
                                <h3 className="text-xl font-bold">{booking.arenaName}</h3>
                                <p className="text-sm text-gray-500">{booking.sportType}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold">${booking.totalPrice}</p>
                              </div>
                            </div>
                            
                            <div className="mt-4 grid grid-cols-2 gap-2">
                              <div className="flex items-center">
                                <CalendarDays className="mr-2 h-4 w-4 text-gray-500" />
                                <span className="text-sm">{booking.date}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4 text-gray-500" />
                                <span className="text-sm">{booking.startTime} - {booking.endTime}</span>
                              </div>
                            </div>
                            
                            <div className="mt-4 flex justify-end">
                              <Button asChild variant="outline" size="sm" className="mr-2">
                                <Link href={`/arenas/${booking.arenaId}`}>View Arena</Link>
                              </Button>
                              {booking.status === "UPCOMING" && (
                                <Button variant="destructive" size="sm">
                                  Cancel Booking
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <Dumbbell className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                    <h3 className="mb-2 text-xl font-semibold">No bookings yet</h3>
                    <p className="mb-4 text-gray-500">You haven't made any arena bookings yet.</p>
                    <Button asChild>
                      <Link href="/arenas">Browse Arenas</Link>
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === "classes" && (
              <div>
                <h2 className="mb-6 text-2xl font-bold">My Coaching Classes</h2>
                
                {MOCK_ENROLLMENTS.length > 0 ? (
                  <div className="space-y-4">
                    {MOCK_ENROLLMENTS.map((enrollment) => (
                      <Card key={enrollment.id} className="overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div className="relative h-48 sm:h-auto sm:w-48">
                            <Image
                              src={enrollment.imageUrl}
                              alt={enrollment.className}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                          <div className="flex-1 p-4">
                            <div className="flex flex-wrap items-start justify-between">
                              <div>
                                <Badge className={`mb-2 ${getStatusColor(enrollment.status)}`}>
                                  {enrollment.status}
                                </Badge>
                                <h3 className="text-xl font-bold">{enrollment.className}</h3>
                                <p className="text-sm text-gray-500">{enrollment.sportType}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold">${enrollment.price}</p>
                              </div>
                            </div>
                            
                            <div className="mt-3">
                              <div className="mb-1 flex justify-between text-sm">
                                <span>Progress</span>
                                <span>{enrollment.progress}/{enrollment.totalWeeks} weeks</span>
                              </div>
                              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                <div
                                  className="h-full rounded-full bg-blue-600"
                                  style={{ width: `${(enrollment.progress / enrollment.totalWeeks) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            <div className="mt-4 grid grid-cols-1 gap-2">
                              <div className="flex items-center">
                                <CalendarDays className="mr-2 h-4 w-4 text-gray-500" />
                                <span className="text-sm">{enrollment.startDate} to {enrollment.endDate}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4 text-gray-500" />
                                <span className="text-sm">{enrollment.schedule}</span>
                              </div>
                            </div>
                            
                            <div className="mt-4 flex justify-end">
                              <Button asChild variant="outline" size="sm">
                                <Link href={`/coaching/${enrollment.classId}`}>View Class</Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <GraduationCap className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                    <h3 className="mb-2 text-xl font-semibold">No classes yet</h3>
                    <p className="mb-4 text-gray-500">You haven't enrolled in any coaching classes yet.</p>
                    <Button asChild>
                      <Link href="/coaching">Browse Classes</Link>
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === "settings" && (
              <div>
                <h2 className="mb-6 text-2xl font-bold">Account Settings</h2>
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your account details and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium">Profile Picture</label>
                        <div className="flex items-center">
                          <Avatar className="h-16 w-16 mr-4">
                            <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
                            <AvatarFallback>{userInitials}</AvatarFallback>
                          </Avatar>
                          <Button variant="outline" size="sm" disabled>
                            Change Picture
                          </Button>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          Your profile picture is managed by your Google account
                        </p>
                      </div>
                      
                      <div>
                        <label className="mb-2 block text-sm font-medium">Name</label>
                        <Input 
                          type="text" 
                          value={user?.name || ""} 
                          disabled 
                          className="bg-gray-50"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          Your name is managed by your Google account
                        </p>
                      </div>
                      
                      <div>
                        <label className="mb-2 block text-sm font-medium">Email</label>
                        <Input 
                          type="email" 
                          value={user?.email || ""} 
                          disabled 
                          className="bg-gray-50"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          Your email is managed by your Google account
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" disabled>
                      Update Profile
                    </Button>
                    <Button disabled>
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


