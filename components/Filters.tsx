'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import GenreFilter from '@/components/GenreFilter'

interface FiltersProps {
  genres: string[]
  selectedGenres: string[]
  onToggleGenre: (genre: string) => void
  search: string
  onSearchChange: (value: string) => void
  minYear: number
  maxYear: number
  onMinYearChange: (value: number) => void
  onMaxYearChange: (value: number) => void
  onClearFilters: () => void
}

export default function Filters({
  genres,
  selectedGenres,
  onToggleGenre,
  search,
  onSearchChange,
  minYear,
  maxYear,
  onMinYearChange,
  onMaxYearChange,
  onClearFilters
}: FiltersProps) {
  return (
    <div className="flex flex-col gap-4 bg-[#00003c] p-4 rounded-xl">
      {/* Search Input */}
      <text className='flex text-sm'>Search</text>
      <div className="flex justify-left items-center gap-4">
        <Input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-[#000061] border-[#54f4d0] text-white rounded-full px-4 py-2"
        />
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="text-xs px-4 py-2 rounded-full text-white border-[#54f4d0] hover:[#54f4d0]/20"
        >
          Clear Filters
        </Button>
      </div>
      <text className='flex text-sm'>Min Year<span className='px-11'></span> Max Year</text>
      {/* Year Range */}
      <div className="flex justify-left items-center gap-4">

        <Input
          type="number"
          placeholder="Min Year"
          value={minYear}
          onChange={(e) => onMinYearChange(Number(e.target.value))}
          className="w-32  bg-[#000061] border-[#54f4d0] text-white rounded-full px-4 py-2"
        />
        <Input
          type="number"
          placeholder="Max Year"
          value={maxYear}
          onChange={(e) => onMaxYearChange(Number(e.target.value))}
          className="w-32  bg-[#000061] border-[#54f4d0] text-white rounded-full px-4 py-2"
        />
      </div>

      {/* Genre Buttons */}
      <text className='flex justify-end px-88 text-sm'>Genre</text>
      <GenreFilter
        genres={genres}
        selectedGenres={selectedGenres}
        onToggle={onToggleGenre}
      />
    </div>
  )
}
