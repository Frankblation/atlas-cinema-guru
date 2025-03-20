import { useState } from 'react'
import { Star } from 'lucide-react'

export default function FavoriteButton({
  movieId,
  initialFavorited,
  onFavoriteChange, // Optional callback to sync favorites page
}: {
  movieId: string
  initialFavorited: boolean
  onFavoriteChange?: () => void
}) {
  const [favorited, setFavorited] = useState(initialFavorited)
  const [loading, setLoading] = useState(false)

  const toggleFavorite = async () => {
    setLoading(true)
    try {
      const method = favorited ? 'DELETE' : 'POST'
      const res = await fetch(`/api/favorites/${movieId}`, {
        method,
        credentials: 'include',
      })

      if (!res.ok) {
        throw new Error('Failed to update favorite')
      }

      setFavorited(!favorited)

      // Notify parent if they passed a callback
      if (onFavoriteChange) {
        onFavoriteChange()
      }

    } catch (error) {
      console.error('Error updating favorite:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`w-8 h-8 flex items-center justify-center rounded-full ${
        favorited ? 'bg-[#54f4d0] text-black' : 'bg-white/20 text-white'
      } hover:bg-[#54f4d0]/80 transition`}
    >
      <Star fill={favorited ? '#54f4d0' : 'none'} stroke="currentColor" />
    </button>
  )
}
