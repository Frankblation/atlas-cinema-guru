'use client'

import { useEffect, useState } from 'react'
import MovieCard from '@/components/MovieCard'
import { UsersTitle } from '@/lib/definitions'
import { Button } from '@/components/ui/button'

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<UsersTitle[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  // Fetch favorites
  const fetchFavorites = async (pageNum: number) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/favorites?page=${pageNum}`, { credentials: 'include' })
      const data = await res.json()

      if (!data || !data.favorites || data.favorites.length === 0) {
        setHasMore(false)
        return
      }

      setFavorites(data.favorites)
    } catch (error) {
      console.error('Error fetching favorites:', error)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchFavorites(page)
  }, [page])

  // Handle removing a movie when unfavorited
  const handleFavoriteChange = () => {
    fetchFavorites(page) // Refetch the page after favorite toggle
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#00003c] text-white">
      {/* Header */}
      <header className="flex items-center justify-center px-6 py-4 bg-[#00003c]">
        <h1 className="text-3xl font-bold">Favorites</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.length === 0 && !loading && (
            <p className="text-center col-span-full">No favorites found!</p>
          )}

          {favorites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavoriteChange={handleFavoriteChange}
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
