"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"

export default function EsqueciSenha() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    // Basic validation
    if (!email) {
      setMessage("Por favor, informe seu email")
      setIsSuccess(false)
      setLoading(false)
      return
    }

    // Check if email exists in users
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u: any) => u.email === email)

    if (!user) {
      setMessage("Email não encontrado")
      setIsSuccess(false)
      setLoading(false)
      return
    }

    // In a real app, this would send a password reset email
    // For this demo, we'll just show a success message
    setTimeout(() => {
      setMessage("Um link para redefinição de senha foi enviado para seu email")
      setIsSuccess(true)
      setLoading(false)
    }, 1000)
  }

  return (
    <>
      <Header />
      <div className="px-5 py-8">
        <div className="bg-light-blue w-full max-w-[450px] p-7 rounded-xl mx-auto shadow-md mb-8">
          <div className="mb-5">
            <h2 className="text-primary-dark text-3xl text-center font-bold">Recuperar Senha</h2>
          </div>

          {message && (
            <div
              className={`${isSuccess ? "bg-green-100 border-green-400 text-green-700" : "bg-red-100 border-red-400 text-red-700"} px-4 py-3 rounded relative mb-4 border`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                Informe seu email cadastrado para receber um link de recuperação de senha.
              </p>

              <label htmlFor="email" className="block mb-1 text-sm font-medium">
                Email:
              </label>
              <input
                type="email"
                id="email"
                placeholder="Seu email"
                className="form-input text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Enviando..." : "Enviar Link"}
            </button>

            <div className="mt-4 text-center">
              <Link href="/" className="text-primary-dark hover:underline text-sm">
                Voltar para o login
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

