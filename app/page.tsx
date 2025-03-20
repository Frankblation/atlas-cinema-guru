'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import MovieCard from '@/components/MovieCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Title {
  id: string
  title: string
  synopsis: string
  released: number
  genre: string
  image: string
  favorited: boolean
  watchLater: boolean
}

const GENRES = [
  'Romance', 'Horror', 'Drama', 'Action', 'Mystery',
  'Fantasy', 'Thriller', 'Western', 'Sci-Fi', 'Adventure'
]

export default function CinemaGuruHomePage() {
  const [titles, setTitles] = useState<Title[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  const [search, setSearch] = useState('')
  const [minYear, setMinYear] = useState(1990)
  const [maxYear, setMaxYear] = useState(2024)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  const observer = useRef<IntersectionObserver | null>(null)

  const lastMovieRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1)
      }
    })

    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  const fetchTitles = async () => {
    setLoading(true)

    try {
      const genreQuery = selectedGenres.join(',')
      const res = await fetch(
        `/api/titles?page=${page}&minYear=${minYear}&maxYear=${maxYear}&genres=${genreQuery}&search=${search}`,
        { credentials: 'include' }
      )

      const data = await res.json()

      setTitles((prevTitles) => page === 1 ? data.title : [...prevTitles, ...data.title])

      if (!data.title || data.title.length === 0) {
        setHasMore(false)
      } else {
        setHasMore(true)
      }
    } catch (error) {
      console.error('Error fetching titles:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setPage(1)
    fetchTitles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGenres, minYear, maxYear, search])

  useEffect(() => {
    fetchTitles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre))
    } else {
      setSelectedGenres([...selectedGenres, genre])
    }
  }

  const handleFavoriteChange = () => {
    fetchTitles() // Refetch titles to update favorite state after change
  }

  const handleWatchLaterChange = () => {
    fetchTitles() // Refetch titles to update watch later state after change
  }

  return (
    <div className="flex flex-col bg-[#00003c]">
      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-3">
        <Input
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#000061] border-[#1dd2af] text-[#9ca3af] rounded-full px-4 py-2 w-full sm:w-64"
        />
        <div className="flex gap-4">
          <Input
            type="number"
            placeholder="Min Year"
            value={minYear}
            onChange={(e) => setMinYear(Number(e.target.value))}
            className="w-32"
          />
          <Input
            type="number"
            placeholder="Max Year"
            value={maxYear}
            onChange={(e) => setMaxYear(Number(e.target.value))}
            className="w-32"
          />
        </div>
      </div>

      {/* Genres */}
      <div className="flex flex-wrap gap-2">
        {GENRES.map((genre) => (
          <Button
            key={genre}
            variant={selectedGenres.includes(genre) ? 'default' : 'outline'}
            onClick={() => toggleGenre(genre)}
            className="text-xs px-4 py-2 rounded-full"
          >
            {genre}
          </Button>
        ))}
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {titles.map((movie, index) => (
          <div
            key={movie.id}
            ref={titles.length === index + 1 ? lastMovieRef : null}
          >
            <MovieCard
              movie={movie}
              onFavoriteChange={handleFavoriteChange}
              onWatchLaterChange={handleWatchLaterChange}
            />
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <Button
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          className='bg-[#54f4d0] text-[#000061] hover:bg-[#54f4d0]/80 text-sm px-6 py-2 rounded-l-full'
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

      {loading && (
        <p className="text-center mt-4 text-gray-400">Loading...</p>
      )}
    </div>
  )
}
