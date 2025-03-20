'use client'

import Image from 'next/image'
import { UsersTitle } from '@/lib/definitions'
import FavoriteButton from '@/components/FavoriteButton'
import WatchLaterButton from '@/components/WatchLaterButton'

interface MovieCardProps {
  movie: UsersTitle
  onFavoriteChange?: () => void
  onWatchLaterChange?: () => void
}

export default function MovieCard({
  movie,
  onFavoriteChange,
  onWatchLaterChange,
}: MovieCardProps) {
  return (
    <div className="relative rounded-xl overflow-hidden border border-blue-700 bg-[#001F3F] shadow-lg transition-transform hover:scale-105">
      
      {/* Floating Buttons */}
      <div className="absolute top-3 right-3 flex gap-2 z-10">
        <FavoriteButton
          movieId={movie.id}
          initialFavorited={movie.favorited}
          onFavoriteChange={onFavoriteChange}
        />
        <WatchLaterButton
          movieId={movie.id}
          initialWatchLater={movie.watchLater}
          onWatchLaterChange={onWatchLaterChange}
        />
      </div>

      {/* Movie Image */}
      <Image
        src={movie.image || '/placeholder.svg'}
        alt={movie.title}
        width={400}
        height={500}
        className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
      />

      {/* Movie Info */}
      <div className="bg-[#000033] p-4 text-white">
        <h3 className="text-lg font-semibold mb-1">
          {movie.title} ({movie.released})
        </h3>
        <p className="text-sm text-gray-400 mb-3">{movie.synopsis}</p>

        {/* Genre Tag */}
        <div className="inline-block bg-[#1DD2AF] text-white text-xs font-semibold px-3 py-1 rounded-full">
          {movie.genre}
        </div>
      </div>
    </div>
  )
}
