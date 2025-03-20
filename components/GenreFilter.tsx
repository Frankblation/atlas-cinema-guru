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
         onClick={() => onToggle(genre)}
         className={`text-xs px-4 py-2 rounded-full whitespace-nowrap border
           ${
             selectedGenres.includes(genre)
               ? 'bg-[#54f4d0] text-black border-[#54f4d0]'
               : 'bg-transparent text-white border-[#54f4d0] hover:bg-[#54f4d0]/20'
           }
         `}
       >
         {genre}
       </Button>
        ))}
      </div>
    </div>
  )
}
