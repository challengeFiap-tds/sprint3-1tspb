"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"




export default function CadastroPerguntas() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [hasDeficiency, setHasDeficiency] = useState<string | null>(null)
  const [deficiencyType, setDeficiencyType] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    // Get user data from localStorage
    const storedData = localStorage.getItem("tempUserData")
    if (storedData) {
      setUserData(JSON.parse(storedData))
    } else {
      // If no temp user data, redirect to registration
      router.push("/cadastro")
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (hasDeficiency === null) {
      setError("Por favor, responda se você tem alguma deficiência")
      return
    }

    if (hasDeficiency === "sim" && !deficiencyType) {
      setError("Por favor, selecione o tipo de deficiência")
      return
    }

    // Update user data with accessibility preferences
    if (userData) {
      const updatedUserData = {
        ...userData,
        accessibility: {
          hasDeficiency: hasDeficiency === "sim",
          deficiencyType: hasDeficiency === "sim" ? deficiencyType : null,
        },
      }

      // Update user in users array
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const updatedUsers = users.map((user: any) => (user.id === userData.id ? updatedUserData : user))

      // Store updated users
      localStorage.setItem("users", JSON.stringify(updatedUsers))

      // Set as current user
      localStorage.setItem("currentUser", JSON.stringify(updatedUserData))

      // Remove temp data
      localStorage.removeItem("tempUserData")

      // Navigate to routes page
      router.push("/rotas")
    }
  }

  if (!userData) {
    return <div>Carregando...</div>
  }

  return (
    <>
      <Header />
      <div className="px-5 py-8">
        <div className="bg-light-blue w-full max-w-[450px] p-7 rounded-xl mx-auto shadow-md mb-8">
          <div className="mb-5">
            <h2 className="text-primary-dark text-3xl text-center font-bold">Cadastro</h2>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="text-center mb-6">
              <p className="text-gray-800 text-sm">
                Antes de concluirmos seu cadastro, <br />
                por favor responda às seguintes perguntas
              </p>
            </div>

            <div className="mb-6">
              <p className="font-medium text-gray-800 mb-3">Você tem alguma deficiência?</p>

              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="deficiency"
                    value="sim"
                    className="w-5 h-5 accent-primary"
                    onChange={() => setHasDeficiency("sim")}
                    checked={hasDeficiency === "sim"}
                  />
                  <span>Sim</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="deficiency"
                    value="nao"
                    className="w-5 h-5 accent-primary"
                    onChange={() => setHasDeficiency("nao")}
                    checked={hasDeficiency === "nao"}
                  />
                  <span>Não</span>
                </label>

                {hasDeficiency === "sim" && (
                  <div className="mt-2">
                    <label htmlFor="deficiencyType" className="block mb-2 text-sm">
                      Opções:
                    </label>
                    <select
                      id="deficiencyType"
                      className="w-full p-3 border border-gray-300 rounded-md text-sm bg-white text-black"
                      value={deficiencyType}
                      onChange={(e) => setDeficiencyType(e.target.value)}
                    >
                      <option value="">Selecione sua deficiência</option>
                      <option value="visual">Deficiente Visual</option>
                      <option value="intelectual">Deficiente Intelectual</option>
                      <option value="movel">Deficiente Móvel</option>
                      <option value="auditivo">Deficiente Auditivo</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-2 italic">
                      Esta informação nos ajuda a melhorar ainda mais a acessibilidade
                    </p>
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-secondary w-full">
              Finalizar Cadastro
            </button>
          </form>
        </div>

        <div className="w-full max-w-[600px] mx-auto rounded-xl overflow-hidden">
          <Image
            src="/metro-deficientes.jpg"
            alt="Várias pessoas incluindo deficientes no vagão do metrô"
            width={600}
            height={300}
            className="w-full object-cover max-h-[300px]"
          />
        </div>
      </div>
      <Footer />
    </>
  )
}

