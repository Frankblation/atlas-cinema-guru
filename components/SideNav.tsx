"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LatestActivity from "./LatestActivity";
import useNavigation from "@/hooks/useNavigation";

import folderIcon from "@/assets/Icon/Solid/folder.svg";
import starIcon from "@/assets/Icon/Solid/star.svg";
import clockIcon from "@/assets/Icon/Solid/clock.svg";

interface NavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPath?: string;
}

export default function Navigation({ currentPath }: NavigationProps) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const { status } = useSession();
  const { navigateTo } = useNavigation();

  const isActive = (path: string) => currentPath === path ? "active" : "";

  return (
    <>
      {/* Mobile Nav */}
      <div className="flex max-h-15 sm:hidden w-full bg-[#54f4d0] justify-around py-3 px-2 border-b border-[#00003C]">
        <Link href="/">
          <div className="flex flex-col items-center gap-1">
            <Image src={folderIcon} alt="Home" width={20} height={20} />
            <span className="text-xs text-[#ffffff]">Home</span>
          </div>
        </Link>
        <Link href="/favorites">
          <div className="flex flex-col items-center gap-1">
            <Image src={starIcon} alt="Favorites" width={20} height={20} />
            <span className="text-xs text-[#ffffff]">Favorites</span>
          </div>
        </Link>
        <Link href="/watch-later">
          <div className="flex flex-col items-center gap-1">
            <Image src={clockIcon} alt="Watch Later" width={20} height={20} />
            <span className="text-xs text-[#ffffff]">Watch Later</span>
          </div>
        </Link>
      </div>

      {/* Desktop Sidebar */}
      <div
        className={`hidden sm:flex bg-[#1dd2af] min-h-screen transition-[width] duration-300 ease-in-out overflow-hidden ${
          isSidebarExpanded ? "w-[20vw] max-w-[225px]" : "w-[7vw] max-w-[97px]"
        }`}
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => setIsSidebarExpanded(false)}
      >
        <nav className="flex-grow mt-6 h-full flex flex-col justify-between">
          <ul className="space-y-6">
            <li className={`nav-item px-4 py-2 rounded ${isActive("/")}`}>
              <Link href="/" aria-current={isActive("/") ? "page" : undefined}>
                <div className="flex items-center gap-3">
                  <Image src={folderIcon} alt="Home" width={24} height={24} />
                  {isSidebarExpanded && (
                    <span className="text-[#ffffff] font-semibold">Home</span>
                  )}
                </div>
              </Link>
            </li>

            <li className={`nav-item px-4 py-2 rounded ${isActive("/favorites")}`}>
              <Link href="/favorites" aria-current={isActive("/favorites") ? "page" : undefined}>
                <div className="flex items-center gap-3">
                  <Image src={starIcon} alt="Favorites" width={24} height={24} />
                  {isSidebarExpanded && (
                    <span className="text-[#ffffff] font-semibold">Favorites</span>
                  )}
                </div>
              </Link>
            </li>

            <li className={`nav-item px-4 py-2 rounded ${isActive("/watch-later")}`}>
              <Link href="/watch-later" aria-current={isActive("/watch-later") ? "page" : undefined}>
                <div className="flex items-center gap-3">
                  <Image src={clockIcon} alt="Watch Later" width={24} height={24} />
                  {isSidebarExpanded && (
                    <span className="text-[#ffffff] font-semibold">Watch Later</span>
                  )}
                </div>
              </Link>
            </li>
          </ul>

          {isSidebarExpanded && (
            <div className="mt-6 px-4 pb-60">
              <LatestActivity />
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
