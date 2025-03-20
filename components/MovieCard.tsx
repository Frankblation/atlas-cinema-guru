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
    <div className="relative group rounded-xl overflow-hidden border border-blue-700 bg-[#001F3F] shadow-lg transition-transform hover:scale-105">
      
      {/* Floating Buttons */}
      <div className="absolute top-3 right-3 flex gap-2 z-20">
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
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={movie.image || '/placeholder.svg'}
          alt={movie.title}
          width={400}
          height={500}
          className="object-cover w-full h-full transition-transform duration-300"
        />

        {/* Genre Tag */}
        <div className="absolute bottom-3 left-3 bg-[#1DD2AF] text-black text-xs font-semibold px-3 py-1 rounded-full z-10">
          {movie.genre}
        </div>

        {/* Hover Info Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-4 z-10">
          <h3 className="text-lg font-bold mb-2">
            {movie.title} ({movie.released})
          </h3>
          <p className="text-sm text-gray-300 line-clamp-4">
            {movie.synopsis}
          </p>
        </div>
      </div>
    </div>
  )
}
