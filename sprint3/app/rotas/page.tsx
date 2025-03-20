"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import RouteVisualization from "@/components/routevizualizator/Route-Vizualization"
import { stations, lineColors } from "@/library/metro-data"
import { calculateRoute, type CalculatedRoute } from "@/Utils/Route-Calculator"
import { useAuth } from "@/app/auth-provider"

interface Route {
  id: string
  origin: string
  destination: string
}

export default function Rotas() {
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [routes, setRoutes] = useState<Route[]>([])
  const [originSuggestions, setOriginSuggestions] = useState<typeof stations>([])
  const [destSuggestions, setDestSuggestions] = useState<typeof stations>([])
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false)
  const [showDestSuggestions, setShowDestSuggestions] = useState(false)
  const [selectedOrigin, setSelectedOrigin] = useState<(typeof stations)[0] | null>(null)
  const [selectedDestination, setSelectedDestination] = useState<(typeof stations)[0] | null>(null)
  const [calculatedRoute, setCalculatedRoute] = useState<CalculatedRoute | null>(null)
  const [highContrast, setHighContrast] = useState(false)

  const originRef = useRef<HTMLDivElement>(null)
  const destRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { user, logout } = useAuth()

  // Check authentication
  useEffect(() => {
    if (!user) {
      router.push("/")
    }
  }, [user, router])

  // Load saved routes from localStorage on component mount
  useEffect(() => {
    const savedRoutes = localStorage.getItem("savedRoutes")
    if (savedRoutes) {
      setRoutes(JSON.parse(savedRoutes))
    }
  }, [])

  // Save routes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("savedRoutes", JSON.stringify(routes))
  }, [routes])

  // Handle clicks outside the suggestion boxes
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (originRef.current && !originRef.current.contains(event.target as Node)) {
        setShowOriginSuggestions(false)
      }
      if (destRef.current && !destRef.current.contains(event.target as Node)) {
        setShowDestSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Filter suggestions based on input
  useEffect(() => {
    if (origin.length > 1) {
      const filtered = stations.filter((station) => station.name.toLowerCase().includes(origin.toLowerCase()))
      setOriginSuggestions(filtered)
    } else {
      setOriginSuggestions([])
    }
  }, [origin])

  useEffect(() => {
    if (destination.length > 1) {
      const filtered = stations.filter((station) => station.name.toLowerCase().includes(destination.toLowerCase()))
      setDestSuggestions(filtered)
    } else {
      setDestSuggestions([])
    }
  }, [destination])

  const selectOrigin = (station: (typeof stations)[0]) => {
    setOrigin(station.name)
    setSelectedOrigin(station)
    setShowOriginSuggestions(false)
  }

  const selectDestination = (station: (typeof stations)[0]) => {
    setDestination(station.name)
    setSelectedDestination(station)
    setShowDestSuggestions(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedOrigin || !selectedDestination) {
      alert("Por favor, selecione estações de origem e destino válidas.")
      return
    }

    // Calculate route using our algorithm
    const route = calculateRoute(selectedOrigin.id, selectedDestination.id)
    setCalculatedRoute(route)

    // Create a new saved route
    const newRoute: Route = {
      id: Date.now().toString(),
      origin: selectedOrigin.name,
      destination: selectedDestination.name,
    }

    // Add the new route to the list
    setRoutes([...routes, newRoute])
  }

  const deleteRoute = (id: string) => {
    setRoutes(routes.filter((route) => route.id !== id))
  }

  const toggleContrast = () => {
    setHighContrast(!highContrast)
  }

  const handleLogout = () => {
    logout()
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <>
      <Header />
      <div className="flex justify-between items-center px-5 py-2 bg-primary-dark">
        <div className="flex items-center">
          <span className="text-white text-sm mr-4">Olá, {user.nome}</span>
          {user.accessibility?.hasDeficiency && (
            <span className="bg-secondary text-black text-xs px-2 py-1 rounded-full">
              {user.accessibility.deficiencyType}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleContrast}
            className="bg-gray-200 hover:bg-gray-300 text-primary-dark px-3 py-1 rounded-md text-sm font-medium transition-colors"
          >
            {highContrast ? "Contraste Normal" : "Alto Contraste"}
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Sair
          </button>
        </div>
      </div>
      <div className="px-5 flex flex-col items-center gap-8 max-w-[600px] mx-auto py-6">
        <div
          className={`${highContrast ? "bg-gray-800 text-white" : "bg-light-blue"} w-full p-7 rounded-xl shadow-md transition-colors`}
        >
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              <div className="relative" ref={originRef}>
                <label
                  htmlFor="origin"
                  className={`text-sm font-medium ${highContrast ? "text-white" : "text-gray-700"}`}
                >
                  Estação que você está:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="origin"
                    placeholder="Origem"
                    className={`form-input pr-10 ${highContrast ? "bg-gray-700 text-white border-gray-600" : ""}`}
                    value={origin}
                    onChange={(e) => {
                      setOrigin(e.target.value)
                      setShowOriginSuggestions(true)
                      setSelectedOrigin(null)
                    }}
                    onFocus={() => setShowOriginSuggestions(true)}
                  />
                </div>

                {showOriginSuggestions && originSuggestions.length > 0 && (
                  <div
                    className={`absolute z-10 w-full mt-1 ${highContrast ? "bg-gray-700" : "bg-white"} rounded-md shadow-lg max-h-60 overflow-auto border ${highContrast ? "border-gray-600" : "border-gray-200"}`}
                  >
                    {originSuggestions.map((station) => (
                      <div
                        key={`${station.id}-${station.lines[0]}`}
                        className={`flex items-center px-4 py-3 hover:${highContrast ? "bg-gray-600" : "bg-gray-50"} cursor-pointer transition-colors`}
                        onClick={() => selectOrigin(station)}
                      >
                        <div
                          className={`w-4 h-4 rounded-full mr-3 ${lineColors[station.lines[0] as keyof typeof lineColors]}`}
                        ></div>
                        <span className={`font-medium ${highContrast ? "text-white" : ""}`}>{station.name}</span>
                        <span className={`ml-2 text-xs ${highContrast ? "text-gray-300" : "text-gray-500"}`}>
                          Linha {station.lines.join(", ")}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative" ref={destRef}>
                <label
                  htmlFor="destination"
                  className={`text-sm font-medium ${highContrast ? "text-white" : "text-gray-700"}`}
                >
                  Estação para qual você quer ir:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="destination"
                    placeholder="Destino"
                    className={`form-input pr-10 ${highContrast ? "bg-gray-700 text-white border-gray-600" : ""}`}
                    value={destination}
                    onChange={(e) => {
                      setDestination(e.target.value)
                      setShowDestSuggestions(true)
                      setSelectedDestination(null)
                    }}
                    onFocus={() => setShowDestSuggestions(true)}
                  />
                </div>

                {showDestSuggestions && destSuggestions.length > 0 && (
                  <div
                    className={`absolute z-10 w-full mt-1 ${highContrast ? "bg-gray-700" : "bg-white"} rounded-md shadow-lg max-h-60 overflow-auto border ${highContrast ? "border-gray-600" : "border-gray-200"}`}
                  >
                    {destSuggestions.map((station) => (
                      <div
                        key={`${station.id}-${station.lines[0]}`}
                        className={`flex items-center px-4 py-3 hover:${highContrast ? "bg-gray-600" : "bg-gray-50"} cursor-pointer transition-colors`}
                        onClick={() => selectDestination(station)}
                      >
                        <div
                          className={`w-4 h-4 rounded-full mr-3 ${lineColors[station.lines[0] as keyof typeof lineColors]}`}
                        ></div>
                        <span className={`font-medium ${highContrast ? "text-white" : ""}`}>{station.name}</span>
                        <span className={`ml-2 text-xs ${highContrast ? "text-gray-300" : "text-gray-500"}`}>
                          Linha {station.lines.join(", ")}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className={`btn ${highContrast ? "bg-blue-600 hover:bg-blue-700 text-white" : "btn-secondary"} mt-2 transform transition-transform hover:scale-105`}
              >
                Gerar Rota
              </button>
            </div>
          </form>
        </div>

        {/* Route Visualization */}
        {calculatedRoute && selectedOrigin && selectedDestination && (
          <div className="w-full">
            <RouteVisualization
              route={calculatedRoute}
              originName={selectedOrigin.name}
              destinationName={selectedDestination.name}
              highContrast={highContrast}
            />
          </div>
        )}

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <h3 className={`col-span-full ${highContrast ? "text-gray-200" : "text-white"} text-xl font-bold mb-2`}>
            Rotas Salvas
          </h3>
          {routes.length > 0 ? (
            routes.map((route) => (
              <div
                key={route.id}
                className={`${highContrast ? "bg-gray-700 text-white" : "bg-secondary"} p-4 rounded-lg flex justify-center items-center relative shadow-md hover:translate-y-[-3px] transition-transform cursor-pointer`}
              >
                <span className={`text-base font-bold ${highContrast ? "text-white" : "text-gray-800"} text-center`}>
                  {route.origin} <span className="mx-1">→</span> {route.destination}
                </span>
                <button
                  className={`absolute top-1 right-1 ${highContrast ? "bg-gray-600" : "bg-white/70"} rounded-full w-5 h-5 flex items-center justify-center text-sm font-bold opacity-70 hover:opacity-100 hover:${highContrast ? "bg-gray-500" : "bg-white/90"} transition-opacity`}
                  onClick={() => deleteRoute(route.id)}
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <div
              className={`col-span-full text-center p-5 ${highContrast ? "bg-gray-700 text-white" : "bg-white/70 text-gray-600"} rounded-lg text-sm`}
            >
              Nenhuma rota salva. Gere uma nova rota acima.
            </div>
          )}
        </div>

        <div className="w-full rounded-xl overflow-hidden">
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

