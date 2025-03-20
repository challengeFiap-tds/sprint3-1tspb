"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Clock, Volume2, VolumeX } from "lucide-react"
import type { CalculatedRoute } from "@/Utils/Route-Calculator"
import { lineColors, lineTextColors } from "@/library/metro-data"

interface RouteVisualizationProps {
  route: CalculatedRoute
  originName: string
  destinationName: string
  highContrast?: boolean
}

export default function RouteVisualization({
  route,
  originName,
  destinationName,
  highContrast = false,
}: RouteVisualizationProps) {
  const [isSpeaking, setIsSpeaking] = useState(false)

  // Clean up speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const handleReadRoute = () => {
    if (!("speechSynthesis" in window)) {
      alert("Seu navegador não suporta a funcionalidade de leitura de texto.")
      return
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    } else {
      const speechText = `Rota de ${originName} para ${destinationName}. 
        A viagem tem um total de ${route.totalStations} estações, 
        ${route.transferCount} transferência${route.transferCount !== 1 ? "s" : ""}, 
        e tempo estimado de ${route.estimatedTime} minutos.`

      const utterance = new SpeechSynthesisUtterance(speechText)
      utterance.lang = "pt-BR"
      utterance.rate = 0.9

      window.speechSynthesis.speak(utterance)
      setIsSpeaking(true)

      utterance.onend = () => {
        setIsSpeaking(false)
      }
    }
  }

  const bgColor = highContrast ? "bg-gray-900" : "bg-white"
  const textColor = highContrast ? "text-white" : "text-gray-800"
  const headerBgColor = highContrast ? "bg-gray-800" : "bg-gray-100"
  const contentBgColor = highContrast ? "bg-gray-700" : "bg-gray-200"
  const infoBgColor = highContrast ? "bg-gray-800" : "bg-gray-100"
  const borderColor = highContrast ? "border-gray-600" : "border-gray-300"
  const buttonBgColor = highContrast ? "bg-blue-700" : "bg-blue-600"
  const buttonHoverColor = highContrast ? "hover:bg-blue-800" : "hover:bg-blue-700"
  const stopButtonBgColor = highContrast ? "bg-red-700" : "bg-red-600"
  const stopButtonHoverColor = highContrast ? "hover:bg-red-800" : "hover:bg-red-700"

  return (
    <div
      className={`${bgColor} ${textColor} p-6 rounded-lg shadow-lg border ${borderColor} transition-all duration-300`}
      aria-live="polite"
    >
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-lg">
          Você está indo da estação <span className="font-bold">{originName}</span>, até o seu destino final a estação{" "}
          <span className="font-bold">{destinationName}</span>
        </p>

        <button
          onClick={handleReadRoute}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-white font-medium ${
            isSpeaking ? stopButtonBgColor + " " + stopButtonHoverColor : buttonBgColor + " " + buttonHoverColor
          } transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            highContrast ? "focus:ring-blue-400" : "focus:ring-blue-500"
          }`}
          aria-label={isSpeaking ? "Parar leitura da rota" : "Ler rota em voz alta"}
        >
          {isSpeaking ? (
            <>
              <VolumeX size={18} />
              <span>Parar Leitura</span>
            </>
          ) : (
            <>
              <Volume2 size={18} />
              <span>Ler Rota</span>
            </>
          )}
        </button>
      </div>

      {route.segments.map((segment, segmentIndex) => (
        <div key={segmentIndex} className="mb-8 transform hover:scale-[1.01] transition-transform">
          <div className={`${headerBgColor} p-3 rounded-t-lg border-b ${borderColor}`}>
            <h3
              className={`text-xl font-bold uppercase ${
                highContrast ? "text-white" : lineTextColors[segment.line as keyof typeof lineTextColors]
              }`}
            >
              LINHA {segment.line}
            </h3>
          </div>

          <div className={`${contentBgColor} p-4 rounded-b-lg`}>
            <div className="flex flex-wrap items-center gap-2">
              {segment.stations.map((station, stationIndex) => (
                <div key={stationIndex} className="flex items-center">
                  <div className="relative">
                    {stationIndex === 0 && segmentIndex === 0 && (
                      <div
                        className={`absolute -top-6 left-0 text-xs font-medium ${
                          highContrast ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        VOCÊ ESTÁ AQUI
                      </div>
                    )}

                    {stationIndex === segment.stations.length - 1 && segmentIndex === route.segments.length - 1 && (
                      <div
                        className={`absolute -bottom-6 left-0 text-xs font-medium ${
                          highContrast ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        DESTINO
                      </div>
                    )}

                    <div
                      className={`px-4 py-2 rounded-full ${
                        lineColors[segment.line as keyof typeof lineColors]
                      } text-black font-bold shadow-md border ${
                        highContrast ? "border-gray-400" : "border-transparent"
                      } transform transition-transform hover:scale-105`}
                    >
                      {station.name}
                    </div>
                  </div>

                  {stationIndex < segment.stations.length - 1 && (
                    <ArrowRight
                      className={`mx-1 ${highContrast ? "text-gray-400" : "text-gray-700"}`}
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div
        className={`mt-6 p-4 ${infoBgColor} rounded-md flex flex-col md:flex-row md:items-center md:justify-between gap-4 border ${borderColor}`}
      >
        <div>
          <p className="font-medium">Informações da Viagem:</p>
          <p>Número de estações: {route.totalStations}</p>
          <p>Número de transferências: {route.transferCount}</p>
        </div>
        <div className="flex items-center">
          <Clock className="mr-2" aria-hidden="true" />
          <p className="text-xl font-bold">Tempo estimado: {route.estimatedTime} minutos</p>
        </div>
      </div>
    </div>
  )
}

