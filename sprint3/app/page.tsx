"use client"
import Image from "next/image"
import type React from "react"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import { useAuth } from "./auth-provider"

export default function Home() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()
  const { user, login } = useAuth()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/rotas")
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Basic validation
    if (!email || !password) {
      setError("Por favor, preencha todos os campos")
      setLoading(false)
      return
    }

    const result = await login(email, password)

    if (!result.success) {
      setError(result.message || "Erro ao fazer login")
      setLoading(false)
      return
    }

    // Redirect to routes page
    router.push("/rotas")
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-primary flex flex-col">
        <div className="container mx-auto px-4 py-8 flex-1 flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Left side - Siga Direto */}
          <div className="w-full md:w-1/2 flex flex-col items-start">
            <h1 className="text-4xl font-bold text-white mb-6">Siga Direto</h1>

            <div className="w-full space-y-4 mb-8">
              <div className="bg-secondary h-12 w-full rounded-full"></div>
              <div className="bg-secondary h-12 w-3/4 rounded-full"></div>
            </div>

            <div className="bg-light-blue rounded-lg p-6 w-full max-w-md shadow-lg transform transition-transform hover:scale-105">
              <p className="text-primary-dark mb-4 text-sm">Não tem uma conta?</p>
              <Link
                href="/cadastro"
                className="bg-white text-primary-dark hover:bg-gray-100 transition-colors py-3 px-6 rounded-md block text-center font-medium"
              >
                Clique Aqui Cadastre-Se
              </Link>
            </div>
          </div>

          {/* Right side - Login form */}
          <div className="w-full md:w-1/2 max-w-md">
            <div className="bg-light-blue rounded-lg p-8 shadow-lg transform transition-all hover:shadow-xl">
              <h2 className="text-3xl font-bold text-center text-primary-dark mb-6">Login</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu email"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-black"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Senha:
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Digite sua senha"
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-black"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                            clipRule="evenodd"
                          />
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <Link href="/esqueci-senha" className="text-sm text-primary-dark hover:underline">
                    Esqueceu a senha?
                  </Link>
                </div>

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-md transition-colors"
                >
                  {loading ? "Entrando..." : "Entrar"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Metro illustration */}
        <div className="w-full">
          <Image
            src="/metro-illustration.jpg"
            alt="Ilustração do metrô com pessoas diversas"
            width={1440}
            height={300}
            className="w-full h-48 object-cover"
          />
        </div>
      </main>
      <Footer />
    </>
  )
}

