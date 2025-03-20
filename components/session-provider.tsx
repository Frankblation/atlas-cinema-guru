"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

// Define the session type
type User = {
  id: string
  name: string
  email: string
  image?: string
}

type Session = {
  user: User | null
  status: "authenticated" | "loading" | "unauthenticated"
}

// Create the context
const SessionContext = createContext<{
  session: Session
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}>({
  session: { user: null, status: "loading" },
  signIn: async () => {},
  signOut: async () => {},
})

// Hook to use the session
export const useSession = () => useContext(SessionContext)

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session>({
    user: null,
    status: "loading",
  })

  // Simulate fetching the session on component mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // In a real app, you would fetch the session from an API
        const storedUser = localStorage.getItem("user")

        if (storedUser) {
          setSession({
            user: JSON.parse(storedUser),
            status: "authenticated",
          })
        } else {
          setSession({
            user: null,
            status: "unauthenticated",
          })
        }
      } catch (error) {
        console.error("Failed to fetch session:", error)
        setSession({
          user: null,
          status: "unauthenticated",
        })
      }
    }

    checkSession()
  }, [])

  // Sign in function
  const signIn = async (email: string, password: string) => {
    // In a real app, you would call an API to authenticate
    // This is just a simulation
    const user = {
      id: "1",
      name: "Test User",
      email,
    }

    localStorage.setItem("user", JSON.stringify(user))

    setSession({
      user,
      status: "authenticated",
    })
  }

  // Sign out function
  const signOut = async () => {
    localStorage.removeItem("user")

    setSession({
      user: null,
      status: "unauthenticated",
    })
  }

  return <SessionContext.Provider value={{ session, signIn, signOut }}>{children}</SessionContext.Provider>
}

