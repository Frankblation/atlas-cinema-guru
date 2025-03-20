'use client'

import { useState } from 'react'
import { Clock, Clock9 } from 'lucide-react'

interface WatchLaterButtonProps {
  movieId: string
  initialWatchLater: boolean
  onWatchLaterChange?: () => void // ✅ Added callback
}

export default function WatchLaterButton({
  movieId,
  initialWatchLater,
  onWatchLaterChange, // ✅ Destructure callback
}: WatchLaterButtonProps) {
  const [watchLater, setWatchLater] = useState(initialWatchLater)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (loading) return
    setLoading(true)

    try {
      const method = watchLater ? 'DELETE' : 'POST'
      const res = await fetch(`/api/watch-later/${movieId}`, {
        method,
        credentials: 'include'
      })

      if (!res.ok) {
        console.error('Failed to toggle watch later')
        return
      }

      setWatchLater(!watchLater)

      // ✅ Call the callback after toggle success
      if (onWatchLaterChange) {
        onWatchLaterChange()
      }

    } catch (error) {
      console.error('Error updating watch later status:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="p-1 rounded-full bg-[#54f4d100] hover:bg-[#54f4d0]/80 transition-all"
      title={watchLater ? 'Remove from Watch Later' : 'Add to Watch Later'}
    >
      {watchLater ? (
        <Clock9 className="text-white w-5 h-5" />
      ) : (
        <Clock className="text-white w-5 h-5" />
      )}
    </button>
  )
}
