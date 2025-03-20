"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

interface User {
  id: string
  nome: string
  email: string
  accessibility?: {
    hasDeficiency: boolean
    deficiencyType: string | null
  }
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Initialize auth state from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      setUser(JSON.parse(userData))
    }
    setIsLoading(false)
  }, [])

  // Handle protected routes
  useEffect(() => {
    if (!isLoading) {
      const publicRoutes = ["/", "/cadastro", "/cadastro/perguntas", "/esqueci-senha"]
      const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith("/cadastro/")

      if (!user && !isPublicRoute) {
        router.push("/")
      }
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string) => {
    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const foundUser = users.find((u: any) => u.email === email)

      if (!foundUser) {
        return { success: false, message: "Usuário não encontrado" }
      }

      if (foundUser.password !== password) {
        return { success: false, message: "Senha incorreta" }
      }

      // Set current user
      localStorage.setItem("currentUser", JSON.stringify(foundUser))
      setUser(foundUser)

      return { success: true }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "Erro ao fazer login" }
    }
  }

  const logout = () => {
    localStorage.removeItem("currentUser")
    setUser(null)
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

