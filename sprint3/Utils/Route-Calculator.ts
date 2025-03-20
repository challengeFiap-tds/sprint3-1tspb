// import { type Station, getStationById } from "@/data/metro-data"

// interface RouteNode {
//   stationId: number
//   parent: RouteNode | null
//   line: string
//   transferCount: number
//   distance: number
// }

// interface RouteSegment {
//   from: Station
//   to: Station
//   line: string
//   stations: Station[]
//   isTransfer: boolean
// }

// export interface CalculatedRoute {
//   segments: RouteSegment[]
//   totalStations: number
//   transferCount: number
//   estimatedTime: number
// }

// // Calculate the shortest path using Dijkstra's algorithm
// export function calculateRoute(originId: number, destinationId: number): CalculatedRoute | null {
//   if (originId === destinationId) return null

//   const visited = new Set<number>()
//   const queue: RouteNode[] = []

//   // Start with the origin station
//   const startNode: RouteNode = {
//     stationId: originId,
//     parent: null,
//     line: getStationById(originId)?.lines[0] || "",
//     transferCount: 0,
//     distance: 0,
//   }

//   queue.push(startNode)

//   while (queue.length > 0) {
//     // Sort queue by distance (prioritize shorter paths)
//     queue.sort((a, b) => a.distance - b.distance)

//     const current = queue.shift()!

//     // If we've reached the destination
//     if (current.stationId === destinationId) {
//       return reconstructRoute(current)
//     }

//     // Skip if we've already visited this station
//     if (visited.has(current.stationId)) continue

//     // Mark as visited
//     visited.add(current.stationId)

//     // Get the current station
//     const station = getStationById(current.stationId)
//     if (!station) continue

//     // Add connected stations to the queue
//     for (const connectedId of station.connections) {
//       const connectedStation = getStationById(connectedId)
//       if (!connectedStation || visited.has(connectedId)) continue

//       // Check if we're changing lines
//       const isTransfer = !connectedStation.lines.includes(current.line)
//       const newLine = isTransfer ? connectedStation.lines[0] : current.line

//       const node: RouteNode = {
//         stationId: connectedId,
//         parent: current,
//         line: newLine,
//         transferCount: current.transferCount + (isTransfer ? 1 : 0),
//         distance: current.distance + 1 + (isTransfer ? 3 : 0), // Penalty for transfers
//       }

//       queue.push(node)
//     }

//     // Add transfer stations to the queue
//     if (station.transferTo) {
//       for (const transferId of station.transferTo) {
//         const transferStation = getStationById(transferId)
//         if (!transferStation || visited.has(transferId)) continue

//         // Always a transfer since it's a different station ID
//         const newLine = transferStation.lines[0]

//         const node: RouteNode = {
//           stationId: transferId,
//           parent: current,
//           line: newLine,
//           transferCount: current.transferCount + 1,
//           distance: current.distance + 2, // Smaller penalty for same-station transfers
//         }

//         queue.push(node)
//       }
//     }
//   }

//   // No route found
//   return null
// }

// // Reconstruct the route from the destination back to the origin
// function reconstructRoute(finalNode: RouteNode): CalculatedRoute {
//   const segments: RouteSegment[] = []
//   let currentNode: RouteNode | null = finalNode
//   let previousNode: RouteNode | null = null
//   let currentSegment: RouteSegment | null = null

//   // Work backwards from destination to origin
//   while (currentNode) {
//     const station = getStationById(currentNode.stationId)

//     if (!station) {
//       currentNode = currentNode.parent
//       continue
//     }

//     // If we're starting a new segment or changing lines
//     if (!currentSegment || (previousNode && previousNode.line !== currentNode.line)) {
//       // If we have a previous segment, finalize it
//       if (currentSegment) {
//         currentSegment.stations.reverse() // Reverse to get correct order
//         segments.push(currentSegment)
//       }

//       // Start a new segment
//       currentSegment = {
//         from: station,
//         to: station, // Will be updated when we reach the start of this segment
//         line: currentNode.line,
//         stations: [station],
//         isTransfer: previousNode ? true : false,
//       }
//     } else if (currentSegment) {
//       // Add station to current segment
//       currentSegment.stations.push(station)
//       // Update the "from" station as we're going backwards
//       currentSegment.from = station
//     }

//     previousNode = currentNode
//     currentNode = currentNode.parent
//   }

//   // Add the final segment
//   if (currentSegment) {
//     currentSegment.stations.reverse() // Reverse to get correct order
//     segments.push(currentSegment)
//   }

//   // Reverse segments to get them in the correct order (origin to destination)
//   segments.reverse()

//   // Calculate total stations (avoiding double-counting transfer stations)
//   const totalStations = segments.reduce((total, segment) => total + segment.stations.length, 0) - (segments.length - 1)

//   // Count transfers
//   const transferCount = segments.filter((segment) => segment.isTransfer).length

//   // Estimate time (2 minutes per station + 4 minutes per transfer)
//   const estimatedTime = totalStations * 2 + transferCount * 4

//   return {
//     segments,
//     totalStations,
//     transferCount,
//     estimatedTime,
//   }
// }

export interface RouteSegment {
    from: {
      id: number
      name: string
      line: string
    }
    to: {
      id: number
      name: string
      line: string
    }
    line: string
    stations: Array<{
      id: number
      name: string
      line: string
    }>
    isTransfer: boolean
  }
  
  export interface CalculatedRoute {
    segments: RouteSegment[]
    totalStations: number
    transferCount: number
    estimatedTime: number
  }
  
  // Simple mock function to calculate a route between two stations
  export function calculateRoute(originId: number, destinationId: number): CalculatedRoute | null {
    // This is a mock implementation
    // In a real app, this would use actual metro data and pathfinding algorithms
  
    // Mock data for demonstration
    const mockRoute: CalculatedRoute = {
      segments: [
        {
          from: { id: originId, name: "Estação Origem", line: "Vermelha" },
          to: { id: 11, name: "Sé", line: "Vermelha" },
          line: "Vermelha",
          stations: [
            { id: originId, name: "Estação Origem", line: "Vermelha" },
            { id: 65, name: "Marechal Deodoro", line: "Vermelha" },
            { id: 66, name: "Santa Cecília", line: "Vermelha" },
            { id: 67, name: "República", line: "Vermelha" },
            { id: 68, name: "Anhangabaú", line: "Vermelha" },
            { id: 11, name: "Sé", line: "Vermelha" },
          ],
          isTransfer: false,
        },
        {
          from: { id: 11, name: "Sé", line: "Azul" },
          to: { id: destinationId, name: "Estação Destino", line: "Azul" },
          line: "Azul",
          stations: [
            { id: 11, name: "Sé", line: "Azul" },
            { id: 12, name: "Liberdade", line: "Azul" },
            { id: 13, name: "São Joaquim", line: "Azul" },
            { id: 14, name: "Vergueiro", line: "Azul" },
            { id: destinationId, name: "Estação Destino", line: "Azul" },
          ],
          isTransfer: true,
        },
      ],
      totalStations: 10,
      transferCount: 1,
      estimatedTime: 25,
    }
  
    return mockRoute
  }
  
  