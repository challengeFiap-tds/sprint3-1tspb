import type { CalculatedRoute } from "./Route-Calculator"

// Format route information into a clear, structured text for speech synthesis
export function formatRouteForSpeech(route: CalculatedRoute, originName: string, destinationName: string): string {
  let speechText = `Rota de ${originName} para ${destinationName}. `

  // Add summary information
  speechText += `A viagem tem um total de ${route.totalStations} estações, `
  speechText += `${route.transferCount} transferência${route.transferCount !== 1 ? "s" : ""}, `
  speechText += `e tempo estimado de ${route.estimatedTime} minutos. `

  // Add detailed route information
  speechText += "Detalhes da rota: "

  route.segments.forEach((segment, index) => {
    if (index === 0) {
      speechText += `Embarque na Linha ${segment.line} na estação ${segment.stations[0].name}. `
    } else {
      speechText += `Faça transferência para a Linha ${segment.line} na estação ${segment.stations[0].name}. `
    }

    if (segment.stations.length > 2) {
      speechText += `Passe pelas estações `
      segment.stations.slice(1, -1).forEach((station, stationIndex, array) => {
        speechText += station.name
        if (stationIndex < array.length - 1) {
          speechText += ", "
        } else {
          speechText += ". "
        }
      })
    }

    if (index === route.segments.length - 1) {
      speechText += `Desembarque na estação ${segment.stations[segment.stations.length - 1].name}. `
    }
  })

  return speechText
}

// Function to speak text using the Web Speech API
export function speakText(text: string, lang = "pt-BR"): void {
  // Check if the browser supports speech synthesis
  if ("speechSynthesis" in window) {
    // Create a new speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(text)

    // Set language
    utterance.lang = lang

    // Set rate slightly slower for better comprehension
    utterance.rate = 0.9

    // Speak the text
    window.speechSynthesis.speak(utterance)
  } else {
    console.error("Text-to-speech not supported in this browser")
  }
}

// Function to stop any ongoing speech
export function stopSpeaking(): void {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel()
  }
}

