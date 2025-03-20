'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import Image from 'next/image'

interface Activity {
  id: string
  user_id: string
  title_id: string
  activity: string // 'Favorited' or 'Added to Watch Later'
  timestamp: string
  movie_title?: string
}

export default function LatestActivity() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  const fetchActivities = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/activities?page=1', {
        credentials: 'include'
      })
      const data = await res.json()

      setActivities(data.activities || [])
    } catch (error) {
      console.error('❌ Error fetching activities:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  return (
    <div className="bg-[#7CE6C9] rounded-xl px-4 py-6 w-full">
      {/* Icon + Title */}
      <div className="flex items-center mb-4">
        <h3 className="text-[#00003C] text-sm font-bold uppercase tracking-wide">
          Latest Activities
        </h3>
      </div>

      {/* Activities List */}
      {loading ? (
        <p className="text-xs text-[#00003C]">Loading activities...</p>
      ) : activities.length === 0 ? (
        <p className="text-xs text-[#00003C]">No recent activity found.</p>
      ) : (
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="text-[#00003C] text-xs leading-snug">
              <p className="font-medium">
                {format(new Date(activity.timestamp), 'M/d/yyyy, h:mm:ss a')}
              </p>
              <p>
                {activity.activity}{' '}
                <span className="font-bold">{activity.movie_title}</span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
