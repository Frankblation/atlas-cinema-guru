'use client'

import { Button } from '@/components/ui/button'

interface PaginationProps {
  page: number
  hasMore: boolean
  onPageChange: (page: number) => void
}

export default function PaginationControls({
  page,
  hasMore,
  onPageChange
}: PaginationProps) {
  return (
    <div className="flex justify-center gap-4 mt-8">
      <Button
        disabled={page <= 1}
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        className="bg-[#54f4d0] text-[#000061] hover:bg-[#54f4d0]/80 text-sm px-6 py-2 rounded-l-full"
      >
        Previous
      </Button>
      <Button
        disabled={!hasMore}
        onClick={() => onPageChange(page + 1)}
        className="bg-[#54f4d0] text-[#000061] hover:bg-[#54f4d0]/80 text-sm px-6 py-2 rounded-r-full"
      >
        Next
      </Button>
    </div>
  )
}
