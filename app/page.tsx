import { Search, Home, Heart, Clock, Settings, Bell, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function CinemaGuru() {
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-16 md:w-64 bg-[#54f4d0] flex flex-col items-center md:items-start">
        <div className="p-4 w-full">
          <h1 className="text-black font-bold text-xl hidden md:block">Cinema Guru</h1>
          <div className="md:hidden flex justify-center">
            <Menu className="text-black" />
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start gap-6 mt-8 w-full">
          <Link href="#" className="flex items-center gap-3 px-4 py-2 w-full">
            <Home className="h-5 w-5 text-black" />
            <span className="text-black hidden md:block">Home</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 w-full">
            <Heart className="h-5 w-5 text-black" />
            <span className="text-black hidden md:block">Favorites</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 w-full">
            <Clock className="h-5 w-5 text-black" />
            <span className="text-black hidden md:block">Watch Later</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 w-full">
            <Settings className="h-5 w-5 text-black" />
            <span className="text-black hidden md:block">Settings</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 w-full">
            <Bell className="h-5 w-5 text-black" />
            <span className="text-black hidden md:block">Notifications</span>
          </Link>
        </div>

        {/* Activity Feed - Only visible on larger screens */}
        <div className="hidden md:block mt-12 px-4 w-full">
          <h3 className="text-black font-semibold text-sm mb-2">Latest Activities</h3>
          <div className="text-xs text-black space-y-3">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="border-b border-black/10 pb-2">
                <p className="font-medium">
                  VICTORIA added the movie <span className="font-bold">Beyond the Surface</span> to watch later
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-[#000033] p-4">
        <div className="flex justify-between items-center mb-6">
          <div className="w-full max-w-md">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input placeholder="Search" className="pl-8 bg-[#000033] border-[#4a5568] rounded-full text-white" />
            </div>
          </div>
          <div className="hidden md:block text-xs text-[#54f4d0]">
            <span>Welcome, person!</span> <span className="text-white">|</span>{" "}
            <Link href="#" className="underline">
              Sign Out
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              variant="outline"
              className="rounded-full bg-[#54f4d0] text-black hover:bg-[#54f4d0]/80 border-none"
            >
              All
            </Button>
            <Button
              variant="outline"
              className="rounded-full bg-transparent text-white border-[#4a5568] hover:bg-[#4a5568]/20"
            >
              Action
            </Button>
            <Button
              variant="outline"
              className="rounded-full bg-transparent text-white border-[#4a5568] hover:bg-[#4a5568]/20"
            >
              Comedy
            </Button>
            <Button
              variant="outline"
              className="rounded-full bg-transparent text-white border-[#4a5568] hover:bg-[#4a5568]/20"
            >
              Drama
            </Button>
            <Button
              variant="outline"
              className="rounded-full bg-transparent text-white border-[#4a5568] hover:bg-[#4a5568]/20"
            >
              Horror
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#4a5568]">Year:</span>
              <Button
                variant="outline"
                className="h-7 text-xs rounded-full bg-transparent text-white border-[#4a5568] hover:bg-[#4a5568]/20"
              >
                All
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#4a5568]">Rating:</span>
              <Button
                variant="outline"
                className="h-7 text-xs rounded-full bg-transparent text-white border-[#4a5568] hover:bg-[#4a5568]/20"
              >
                All
              </Button>
            </div>
          </div>
        </div>

        {/* Content Header */}
        <h2 className="text-2xl font-bold mb-6">Favorites</h2>

        {/* Movie Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "After The Rain", image: "/placeholder.svg?height=400&width=300" },
            { title: "Aurora's Light", image: "/placeholder.svg?height=400&width=300" },
            { title: "Distant Shores", image: "/placeholder.svg?height=400&width=300" },
            { title: "Crimson Legacy", image: "/placeholder.svg?height=400&width=300" },
            { title: "Shadow Castle", image: "/placeholder.svg?height=400&width=300" },
            { title: "Beyond the Surface", image: "/placeholder.svg?height=400&width=300" },
          ].map((movie, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg">
              <Image
                src={movie.image || "/placeholder.svg"}
                alt={movie.title}
                width={300}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full">
                  <h3 className="text-white font-bold">{movie.title}</h3>
                  <div className="flex gap-2 mt-2">
                    <Button className="bg-[#54f4d0] text-black hover:bg-[#54f4d0]/80 text-xs px-3 py-1 h-7 rounded-full">
                      Watch
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white text-white hover:bg-white/20 text-xs px-3 py-1 h-7 rounded-full"
                    >
                      Info
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

