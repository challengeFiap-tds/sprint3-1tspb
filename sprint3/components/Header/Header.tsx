"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export default function Header() {
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("currentUser")
      if (userData) {
        setUser(JSON.parse(userData))
      }
    }
  }, [])

  return (
    <header className="p-5 flex flex-col gap-4 bg-primary">
      <div className="flex justify-between items-center">
        <div className="logo">
          <Link href="/" className="text-white text-4xl font-bold no-underline">
            Smart Guide
          </Link>
        </div>

        {user && pathname !== "/" && (
          <div className="flex items-center gap-2">
            <span className="text-white text-sm">Olá, {user.nome}</span>
            {user.accessibility?.hasDeficiency && (
              <span className="bg-secondary text-black text-xs px-2 py-1 rounded-full">
                {user.accessibility.deficiencyType}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="h-5 bg-secondary w-4/5 rounded-lg mb-1"></div>
      <div className="h-5 bg-secondary w-3/5 rounded-lg mb-4"></div>
    </header>
  )
}

