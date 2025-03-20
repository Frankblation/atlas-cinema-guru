'use client'

import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'

interface Activity {
  id: string
  user_id: string
  user_name: string
  title_id: string
  movie_title: string
  activity: string
  timestamp: string
}

export default function LatestActivity() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch('/api/activities', { credentials: 'include' })
        const data = await res.json()

        // Assuming the backend returns related user + title data already
        const formattedActivities = data.map((item: any) => ({
          id: item.id,
          user_id: item.userId,
          user_name: item.user?.email || 'Unknown User', // change as per your schema
          title_id: item.titleId,
          movie_title: item.title?.title || 'Unknown Movie',
          activity: item.activity,
          timestamp: item.timestamp
        }))

        setActivities(formattedActivities)
      } catch (error) {
        console.error('Error fetching activities:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  return (
    <div className="mt-12 px-4 w-full bg-blue-500">
      <h3 className="text-black font-semibold text-lg mb-4">Latest Activities</h3>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {activities.length === 0 && <p>No activities found.</p>}

          {activities.map((activity) => (
            <div key={activity.id} className="flex justify-between items-center border-b border-black/10 pb-3">
              <p className="font-medium text-sm text-gray-800">
                <span className="font-bold">{activity.user_name}</span> {activity.activity} the movie{' '}
                <span className="font-semibold">{activity.movie_title}</span> on{' '}
                {format(new Date(activity.timestamp), 'MMM d, yyyy h:mm a')}.
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
