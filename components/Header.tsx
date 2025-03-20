'use client'

import { signOut, useSession } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="w-full h-16 px-6 bg-[#54f4d0] border-b border-[#00003C] flex items-center justify-between">
      {/* Left Side: Logo + App Name */}
      <div className="flex items-center gap-2">
      <img
          src="/assets/Icon/Outline/film.svg"
          alt="Cinema Guru Logo"
          className="w-6 h-6"
        />
        <div className="text-xl font-bold text-[#00003C]">Cinema Guru</div>
      </div>

      {/* Right Side: User Info + Logout */}
      <div className="flex items-center gap-4">
        {session?.user?.email && (
          <span className="text-sm text-[#00003C]">{session.user.email}</span>)}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="flex items-center gap-2 text-[#00003C]"
        >
          <LogOut className="w-4 h-4 text-[#00003C]" />
          <span className="hidden sm:inline text-[#00003C]">Log out</span>
        </Button>
      </div>
    </header>
  )
}
