'use client'

import { useEffect, useState } from 'react'
import MovieCard from '@/components/MovieCard'
import { UsersTitle } from '@/lib/definitions'
import { Button } from '@/components/ui/button'

export default function WatchLaterPage() {
  const [watchLater, setWatchLater] = useState<UsersTitle[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  const fetchWatchLater = async (pageNum: number) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/watch-later?page=${pageNum}`, {
        credentials: 'include',
      })
      const data = await res.json()

      // ✅ Use watchLater with uppercase "L" to match the API response
      if (!data || !data.watchLater || data.watchLater.length === 0) {
        setHasMore(false)
        return
      }

      setWatchLater(data.watchLater)
    } catch (error) {
      console.error('Error fetching watch later:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWatchLater(page)
  }, [page])

  const handleWatchLaterChange = () => {
    fetchWatchLater(page) // Refetch after toggling watch later
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="flex items-center justify-between px-6 py-4 bg-[#000022]">
        <h1 className="text-3xl font-bold">Watch Later</h1>
      </header>

      <main className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchLater.length === 0 && !loading && (
            <p className="text-center col-span-full">No watch later movies found!</p>
          )}

          {watchLater.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onWatchLaterChange={handleWatchLaterChange}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="bg-[#54f4d0] text-[#000061] hover:bg-[#54f4d0]/80 text-sm px-6 py-2 rounded-l-full"
          >
            Previous
          </Button>
          <Button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!hasMore}
            className="bg-[#54f4d0] text-[#000061] hover:bg-[#54f4d0]/80 text-sm px-6 py-2 rounded-r-full"
          >
            Next
          </Button>
        </div>

        {loading && <p className="text-center mt-4">Loading...</p>}
      </main>
    </div>
  )
}
