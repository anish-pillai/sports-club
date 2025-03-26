"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { 
  MapPin, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  ChevronLeft,
  Award,
  Clock3,
  DollarSign,
  CheckCircle2,
  User
} from "lucide-react";



import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for a single coaching class
const MOCK_CLASS = {
  id: "1",
  title: "Elite Basketball Training",
  description: "Learn from professional coaches with experience coaching national teams. Perfect for intermediate to advanced players looking to elevate their game.",
  longDescription: "Our Elite Basketball Training program is designed for dedicated players looking to take their skills to the next level. Led by former national team coaches with decades of combined experience, this program focuses on advanced techniques, strategic gameplay, and physical conditioning tailored for competitive basketball.\n\nParticipants will benefit from personalized feedback, video analysis of their performance, and competitive scrimmages that simulate real-game scenarios. The program covers all aspects of basketball including shooting mechanics, defensive postures, court vision, and team coordination.\n\nThis is not just a training program, but a comprehensive basketball development experience that will transform your approach to the game. By the end of the program, players will have improved their technical skills, tactical understanding, and mental approach to basketball.",
  imageUrl: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  images: [
    "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1519766304817-4f37bda74a26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
  ],
  sportType: "BASKETBALL",
  level: "ADVANCED",
  coach: "Michael Johnson",
  coachImage: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  coachBio: "Michael Johnson is a former professional basketball player with over 15 years of coaching experience. He has worked with national teams and developed multiple players who went on to professional careers. His coaching philosophy emphasizes skill mastery, basketball IQ, and competitive mindset.",
  price: 120,
  duration: "8 weeks",
  schedule: "Tuesdays and Thursdays, 6:00 PM - 8:00 PM",
  location: "Downtown Basketball Court, 123 Main Street",
  startDate: "June 15, 2023",
  endDate: "August 10, 2023",
  capacity: 15,
  enrolledCount: 8,
  curriculum: [
    {
      week: 1,
      title: "Fundamentals Assessment & Shooting Mechanics",
      description: "Individual skill assessment and introduction to advanced shooting techniques."
    },
    {
      week: 2,
      title: "Defensive Principles & Footwork",
      description: "Development of defensive stances, positioning, and movement patterns."
    },
    {
      week: 3,
      title: "Ball Handling & Court Vision",
      description: "Advanced dribbling skills and reading the court during live play."
    },
    {
      week: 4,
      title: "Team Offense & Spacing",
      description: "Understanding offensive systems and proper floor spacing."
    },
    {
      week: 5,
      title: "Pick & Roll Dynamics",
      description: "Comprehensive breakdown of pick and roll offense and defense."
    },
    {
      week: 6,
      title: "Game Situation Training",
      description: "Practicing specific game scenarios and time management."
    },
    {
      week: 7,
      title: "Competitive Scrimmages",
      description: "Coached 5-on-5 games with real-time feedback and adjustments."
    },
    {
      week: 8,
      title: "Performance Evaluation & Next Steps",
      description: "Final assessment and personalized development plans."
    }
  ],
  requirements: [
    "Previous basketball experience (at least 2 years)",
    "Appropriate athletic wear and basketball shoes",
    "Personal water bottle",
    "Positive attitude and willingness to learn"
  ],
  benefits: [
    "Personalized coaching from experienced professionals",
    "Video analysis of your performance",
    "Small group size ensuring individual attention",
    "Access to professional-grade training facilities",
    "Certificate of completion"
  ]
};

export default function CoachingDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  
  const [isEnrolling, setIsEnrolling] = useState(false);
  
  const handleEnroll = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to enroll in this class");
      router.push("/login");
      return;
    }
    
    setIsEnrolling(true);
    
    // In a real app, you would make an API call to enroll the user
    setTimeout(() => {
      toast.success("Successfully enrolled! Redirecting to payment...");
      setIsEnrolling(false);
      
      // For demo purposes, we'll just log the enrollment details
      console.log({
        classId: params.id,
        userId: session?.user?.email,
        enrollmentDate: new Date().toISOString()
      });
      
      // In production, redirect to checkout page
      // router.push("/checkout/[enrollmentId]");
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4 p-0">
            <Link href="/coaching">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to all classes
            </Link>
          </Button>
          
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">{MOCK_CLASS.title}</h1>
              <div className="mt-2 flex items-center text-gray-600 dark:text-gray-400">
                <MapPin className="mr-1 h-4 w-4" />
                <span>{MOCK_CLASS.location}</span>
              </div>
            </div>
            <Badge className="rounded-full bg-blue-500 text-white px-3 py-1">
              {MOCK_CLASS.sportType.charAt(0) + MOCK_CLASS.sportType.slice(1).toLowerCase()}
            </Badge>
          </div>
          
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="outline">
              {MOCK_CLASS.level.charAt(0) + MOCK_CLASS.level.slice(1).toLowerCase()}
            </Badge>
            <div className="text-sm text-gray-500">
              {MOCK_CLASS.enrolledCount}/{MOCK_CLASS.capacity} Enrolled
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            {/* Class Images */}
            <div className="mb-8 overflow-hidden rounded-xl">
              <div className="relative h-[400px] w-full">
                <Image
                  src={MOCK_CLASS.imageUrl}
                  alt={MOCK_CLASS.title}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {MOCK_CLASS.images.slice(1).map((image, index) => (
                  <div key={index} className="relative h-24 overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={`${MOCK_CLASS.title} view ${index + 2}`}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Class Details */}
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="coach">Coach</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <h3 className="mb-2 text-lg font-semibold">About this class</h3>
                <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                  {MOCK_CLASS.longDescription}
                </p>
                
                <div className="mt-6">
                  <h4 className="mb-3 text-md font-semibold">What you'll need</h4>
                  <ul className="space-y-2">
                    {MOCK_CLASS.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6">
                  <h4 className="mb-3 text-md font-semibold">Benefits</h4>
                  <ul className="space-y-2">
                    {MOCK_CLASS.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="curriculum" className="mt-6">
                <h3 className="mb-4 text-lg font-semibold">8-Week Curriculum</h3>
                <div className="space-y-4">
                  {MOCK_CLASS.curriculum.map((week) => (
                    <div key={week.week} className="rounded-lg border p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                          {week.week}
                        </div>
                        <div>
                          <h4 className="font-medium">{week.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{week.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="coach" className="mt-6">
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                  <div className="relative h-40 w-40 overflow-hidden rounded-lg shrink-0">
                    <Image
                      src={MOCK_CLASS.coachImage}
                      alt={MOCK_CLASS.coach}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">{MOCK_CLASS.coach}</h3>
                    <div className="mb-3 flex items-center">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                        Coach
                      </Badge>
                      <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                        {MOCK_CLASS.sportType.charAt(0) + MOCK_CLASS.sportType.slice(1).toLowerCase()} Specialist
                      </Badge>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {MOCK_CLASS.coachBio}
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-3 text-md font-semibold">Schedule Information</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <CalendarIcon className="mt-0.5 h-5 w-5 text-gray-500" />
                        <div>
                          <div className="font-medium">Duration</div>
                          <div>{MOCK_CLASS.duration}</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <Clock className="mt-0.5 h-5 w-5 text-gray-500" />
                        <div>
                          <div className="font-medium">Schedule</div>
                          <div>{MOCK_CLASS.schedule}</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <CalendarIcon className="mt-0.5 h-5 w-5 text-gray-500" />
                        <div>
                          <div className="font-medium">Start and End Dates</div>
                          <div>{MOCK_CLASS.startDate} - {MOCK_CLASS.endDate}</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-3 text-md font-semibold">Class Information</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <Award className="mt-0.5 h-5 w-5 text-gray-500" />
                        <div>
                          <div className="font-medium">Skill Level</div>
                          <div>{MOCK_CLASS.level.charAt(0) + MOCK_CLASS.level.slice(1).toLowerCase()}</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <Users className="mt-0.5 h-5 w-5 text-gray-500" />
                        <div>
                          <div className="font-medium">Class Size</div>
                          <div>{MOCK_CLASS.enrolledCount} enrolled of {MOCK_CLASS.capacity} maximum</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <MapPin className="mt-0.5 h-5 w-5 text-gray-500" />
                        <div>
                          <div className="font-medium">Location</div>
                          <div>{MOCK_CLASS.location}</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Enrollment Card */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Enroll in this Class</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-2 text-sm font-medium">Price</div>
                  <div className="text-2xl font-bold">${MOCK_CLASS.price} <span className="text-sm font-normal text-gray-500">/ full program</span></div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{MOCK_CLASS.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Schedule:</span>
                    <span className="font-medium text-right">{MOCK_CLASS.schedule}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-medium">{MOCK_CLASS.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Class Size:</span>
                    <span className="font-medium">{MOCK_CLASS.enrolledCount}/{MOCK_CLASS.capacity} enrolled</span>
                  </div>
                </div>
                
                <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                  <div className="flex gap-2">
                    <Clock3 className="h-5 w-5" />
                    <div>
                      <span className="font-medium">Limited spots available!</span> Enroll soon to secure your place.
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleEnroll}
                  disabled={isEnrolling}
                >
                  {isEnrolling ? (
                    <div className="flex items-center">
                      <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-b-2 border-current mr-2"></div>
                      <span>Processing...</span>
                    </div>
                  ) : isAuthenticated ? (
                    "Enroll Now"
                  ) : (
                    "Sign in to Enroll"
                  )}
                </Button>
                {!isAuthenticated && (
                  <p className="mt-2 text-center text-sm text-gray-500">
                    You need to be signed in to enroll in this class
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
