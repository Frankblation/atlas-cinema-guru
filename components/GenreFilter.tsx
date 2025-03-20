'use client'

import { Button } from '@/components/ui/button'

interface GenreFilterProps {
  genres: string[]
  selectedGenres: string[]
  onToggle: (genre: string) => void
}

export default function GenreFilter({
  genres,
  selectedGenres,
  onToggle,
}: GenreFilterProps) {
  return (
    <div className="flex justify-end w-full">
      <div className="flex flex-wrap max-w-[400px] gap-2">
        {genres.map((genre) => (
          <Button
            key={genre}
            variant={selectedGenres.includes(genre) ? 'default' : 'outline'}
            onClick={() => onToggle(genre)}
            className="text-xs px-4 py-2 rounded-full whitespace-nowrap"
          >
            {genre}
          </Button>
        ))}
      </div>
    </div>
  )
}
