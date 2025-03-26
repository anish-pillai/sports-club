import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const sportTypes = [
  { name: "Basketball", icon: "🏀", href: "/arenas?sport=BASKETBALL" },
  { name: "Tennis", icon: "🎾", href: "/arenas?sport=TENNIS" },
  { name: "Football", icon: "⚽", href: "/arenas?sport=FOOTBALL" },
  { name: "Volleyball", icon: "🏐", href: "/arenas?sport=VOLLEYBALL" },
  { name: "Badminton", icon: "🏸", href: "/arenas?sport=BADMINTON" },
  { name: "Swimming", icon: "🏊‍♂️", href: "/arenas?sport=SWIMMING" },
];

const featuredArenas = [
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
];

const featuredCoaching = [
  {
    id: "1",
    title: "Elite Basketball Training",
    description: "Learn from professional coaches with experience coaching national teams.",
    imageUrl: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    sportType: "BASKETBALL",
    classType: "GROUP",
    price: 30,
  },
  {
    id: "2",
    title: "Tennis Pro Lessons",
    description: "One-on-one coaching sessions tailored to improve your tennis game.",
    imageUrl: "https://images.unsplash.com/photo-1542144582-1ba00456b5e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    sportType: "TENNIS",
    classType: "INDIVIDUAL",
    price: 60,
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Dynamic background with multiple layers */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-800 to-violet-900"></div>
          <div className="absolute inset-0 opacity-20 mix-blend-overlay">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 0 0 L 8 0 L 8 8 L 0 8 L 0 0" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.2"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          <div className="absolute inset-0 opacity-30">
            <Image 
              src="https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Dynamic sports action background"
              fill
              priority
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        
        {/* Content container */}
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-4 py-20 md:grid-cols-2 md:py-28 lg:py-32">
          {/* Left content */}
          <div className="text-center md:text-left">
            <div className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">
              <span className="text-sm font-medium tracking-wide text-white">⚡ The Ultimate Sports Experience</span>
            </div>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
              <span className="block mb-2">Elevate Your</span>
              <span className="block bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">Game Day</span>
            </h1>
            <p className="mb-8 max-w-xl text-lg text-white/80 md:text-xl">
              Book premium sports venues, join elite coaching sessions, and connect with a community of athletes. Your journey to greatness starts here.  
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              <Button asChild size="lg" className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 font-semibold transition-all hover:from-blue-600 hover:to-indigo-700">
                <Link href="/arenas" className="z-10 flex items-center">
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 12L12 8M12 8L16 12M12 8V20M4 4H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Book Now
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="backdrop-blur-sm font-semibold text-white ring-1 ring-white/30 hover:bg-white/10">
                <Link href="/classes" className="flex items-center">
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Explore Coaching
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Right content - Sports cards (desktop/tablet only) */}
          <div className="hidden md:block relative">
            <div className="relative rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
              <div className="grid grid-cols-3 gap-4">
                {sportTypes.slice(0, 6).map((sport) => (
                  <Link 
                    key={sport.name}
                    href={sport.href}
                    className="aspect-square flex items-center justify-center rounded-lg bg-gradient-to-br from-white/20 to-white/5 p-4 transition-all hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/20 hover:from-white/30 hover:to-white/10"
                  >
                    <span className="text-4xl">{sport.icon}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex justify-between items-center">
                <div>
                  <h3 className="text-white font-semibold">Multiple Sports</h3>
                  <p className="text-white/70 text-sm">One platform</p>
                </div>
                <div className="flex -space-x-2">
                  {["👨‍🦱", "👩‍🦰", "🧑‍🦱", "👱‍♀️"].map((emoji, i) => (
                    <div key={i} className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm">
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlapping wave divider */}
        <div className="absolute -bottom-1 left-0 w-full overflow-hidden">
          <svg className="relative block w-full h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-white dark:fill-black"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-white dark:fill-black"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-white dark:fill-black"></path>
          </svg>
        </div>
      </section>

      {/* Sport Types Section (mobile only) */}
      <section className="container mx-auto px-4 py-16 md:hidden">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">Explore By Sport</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {sportTypes.map((sport) => (
            <Link
              key={sport.name}
              href={sport.href}
              className="flex flex-col items-center justify-center rounded-lg border border-gray-200 p-6 text-center transition hover:border-blue-500 hover:shadow-md dark:border-gray-800"
            >
              <span className="mb-2 text-4xl">{sport.icon}</span>
              <span className="font-medium">{sport.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Arenas Section */}
      <section className="bg-gray-50 px-4 py-16 dark:bg-gray-900/50">
        <div className="container mx-auto">
          <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-bold tracking-tight">Featured Arenas</h2>
            <Button asChild variant="outline">
              <Link href="/arenas">View All Arenas</Link>
            </Button>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredArenas.map((arena) => (
              <Card key={arena.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={arena.imageUrl}
                    alt={arena.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <CardHeader>
                  <CardTitle>{arena.name}</CardTitle>
                  <CardDescription>{arena.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm">{arena.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      {arena.sportType.charAt(0) + arena.sportType.slice(1).toLowerCase()}
                    </span>
                    <span className="font-medium">${arena.hourlyRate}/hour</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/arenas/${arena.id}`}>Book Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coaching Classes Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Coaching Classes</h2>
          <Button asChild variant="outline">
            <Link href="/classes">View All Classes</Link>
          </Button>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {featuredCoaching.map((coaching) => (
            <Card key={coaching.id} className="overflow-hidden md:flex">
              <div className="relative h-56 md:h-auto md:w-1/3">
                <Image
                  src={coaching.imageUrl}
                  alt={coaching.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="flex flex-1 flex-col md:w-2/3">
                <CardHeader>
                  <CardTitle>{coaching.title}</CardTitle>
                  <CardDescription>
                    {coaching.classType === "INDIVIDUAL" ? "Individual Coaching" : "Group Class"} • 
                    {coaching.sportType.charAt(0) + coaching.sportType.slice(1).toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="line-clamp-3 text-sm">{coaching.description}</p>
                  <p className="mt-4 font-semibold">${coaching.price} per session</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/classes/${coaching.id}`}>Enroll Now</Link>
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 px-4 py-16 dark:bg-gray-900/50">
        <div className="container mx-auto">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">1</div>
              <h3 className="mb-2 text-xl font-semibold">Browse & Choose</h3>
              <p className="text-gray-600 dark:text-gray-400">Find the perfect arena or coaching class based on sport, location, and availability.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">2</div>
              <h3 className="mb-2 text-xl font-semibold">Book & Pay</h3>
              <p className="text-gray-600 dark:text-gray-400">Reserve your slot and make a secure payment online in just a few clicks.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">3</div>
              <h3 className="mb-2 text-xl font-semibold">Play & Learn</h3>
              <p className="text-gray-600 dark:text-gray-400">Show up and enjoy your game or coaching session at your scheduled time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 px-4 py-16 text-center text-white">
        <div className="container mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">Ready to Book Your Next Game?</h2>
          <p className="mb-8 text-lg">Join thousands of sports enthusiasts who use our platform to find and book sports facilities.</p>
          <Button asChild size="lg" variant="secondary" className="font-semibold">
            <Link href="/arenas">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 px-4 py-12 text-gray-300">
        <div className="container mx-auto">
          <div className="mb-8 grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">SportSpot</h3>
              <p className="text-sm">Book sports arenas and coaching classes with ease.</p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/arenas" className="hover:text-white">Arenas</Link></li>
                <li><Link href="/classes" className="hover:text-white">Coaching</Link></li>
                <li><Link href="/profile" className="hover:text-white">My Profile</Link></li>
                <li><Link href="/bookings" className="hover:text-white">My Bookings</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">Sports</h4>
              <ul className="space-y-2 text-sm">
                {sportTypes.slice(0, 4).map((sport) => (
                  <li key={sport.name}>
                    <Link href={sport.href} className="hover:text-white">{sport.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-white">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>Email: info@sportspot.com</li>
                <li>Phone: (123) 456-7890</li>
                <li>Address: 123 Sports Ave, New York, NY 10001</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-sm">
            <p>© {new Date().getFullYear()} SportSpot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
