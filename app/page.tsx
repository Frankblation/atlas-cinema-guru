'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import MovieCard from '@/components/MovieCard'
import Filters from '@/components/Filters'
import PaginationControls from '@/components/PaginationControls'

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

  // Fetch movies from the API
  const fetchTitles = async (reset = false) => {
    setLoading(true)
    try {
      // Build params cleanly
      const params = new URLSearchParams()
  
      params.append('page', page.toString())
      params.append('minYear', minYear.toString())
      params.append('maxYear', maxYear.toString())
  
      // Only add genres if something is selected
      if (selectedGenres.length > 0) {
        params.append('genres', selectedGenres.join(','))
      }
  
      // Always add search (even if empty)
      params.append('search', search)
  
      const queryString = `/api/titles?${params.toString()}`
  
      console.log('🚀 Fetching:', queryString) // Debug output
  
      const res = await fetch(queryString, { credentials: 'include' })
      const data = await res.json()
  
      // Reset the list or append depending on pagination
      if (reset) {
        setTitles(data.title || [])
      } else {
        setTitles((prev) => [...prev, ...(data.title || [])])
      }

      // Check if more pages exist
      if (!data.title || data.title.length < 12) {
        setHasMore(false)
      } else {
        setHasMore(true)
      }
    } catch (error) {
      console.error('❌ Error fetching titles:', error)
    } finally {
      setLoading(false)
    }
  }


  // Initial fetch for page 1
  useEffect(() => {
    fetchTitles(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Refetch when filters/search change (reset to page 1)
  useEffect(() => {
    setPage(1)
    fetchTitles(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, minYear, maxYear, selectedGenres])

  // Fetch next page when page changes (skip on initial load)
  useEffect(() => {
    if (page === 1) return // Already fetched page 1 above
    fetchTitles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    )
  }

  const handleClearFilters = () => {
    setSearch('')
    setMinYear(1990)
    setMaxYear(2024)
    setSelectedGenres([])
  }

  const handleFavoriteChange = () => {
    setPage(1)
    fetchTitles(true)
  }

  const handleWatchLaterChange = () => {
    setPage(1)
    fetchTitles(true)
  }

  return (
    <div className="flex flex-col bg-[#00003C] min-h-screen p-6">
      {/* Filters */}
      <Filters
        genres={GENRES}
        selectedGenres={selectedGenres}
        onToggleGenre={toggleGenre}
        search={search}
        onSearchChange={setSearch}
        minYear={minYear}
        maxYear={maxYear}
        onMinYearChange={setMinYear}
        onMaxYearChange={setMaxYear}
        onClearFilters={handleClearFilters}
      />

      {/* Movie Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {titles.length === 0 && !loading && (
          <p className="text-center col-span-full text-gray-400">No movies found!</p>
        )}

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
      <PaginationControls
        page={page}
        hasMore={hasMore}
        onPageChange={setPage}
      />

      {loading && (
        <p className="text-center mt-4 text-gray-400">Loading movies...</p>
      )}
    </div>
  )
}
