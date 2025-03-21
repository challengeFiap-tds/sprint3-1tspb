
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
  
  