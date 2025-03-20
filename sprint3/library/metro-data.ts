// Metro line colors
export const lineColors = {
    Azul: "bg-blue-400",
    Verde: "bg-green-400",
    Vermelha: "bg-red-400",
    Amarela: "bg-yellow-300",
    Lilás: "bg-purple-300",
  }
  
  export const lineTextColors = {
    Azul: "text-blue-600",
    Verde: "text-green-600",
    Vermelha: "text-red-600",
    Amarela: "text-yellow-500",
    Lilás: "text-purple-600",
  }
  
  export interface Station {
    id: number
    name: string
    lines: string[]
    connections: number[] // IDs of directly connected stations
    transferTo?: number[] // IDs of stations you can transfer to (different line, same physical location)
  }
  
  // Complete database of all stations with their connections
  export const stations: Station[] = [
    // Linha 1 - Azul (Blue Line)
    { id: 1, name: "Tucuruvi", lines: ["Azul"], connections: [2] },
    { id: 2, name: "Parada Inglesa", lines: ["Azul"], connections: [1, 3] },
    { id: 3, name: "Jardim São Paulo", lines: ["Azul"], connections: [2, 4] },
    { id: 4, name: "Santana", lines: ["Azul"], connections: [3, 5] },
    { id: 5, name: "Carandiru", lines: ["Azul"], connections: [4, 6] },
    { id: 6, name: "Portuguesa-Tietê", lines: ["Azul"], connections: [5, 7] },
    { id: 7, name: "Armênia", lines: ["Azul"], connections: [6, 8] },
    { id: 8, name: "Tiradentes", lines: ["Azul"], connections: [7, 9] },
    { id: 9, name: "Luz", lines: ["Azul"], connections: [8, 10], transferTo: [63] }, // Transfer to Yellow Line
    { id: 10, name: "São Bento", lines: ["Azul"], connections: [9, 11] },
    { id: 11, name: "Sé", lines: ["Azul"], connections: [10, 12], transferTo: [69] }, // Transfer to Red Line
    { id: 12, name: "Liberdade", lines: ["Azul"], connections: [11, 13] },
    { id: 13, name: "São Joaquim", lines: ["Azul"], connections: [12, 14] },
    { id: 14, name: "Vergueiro", lines: ["Azul"], connections: [13, 15] },
    { id: 15, name: "Paraíso", lines: ["Azul"], connections: [14, 16], transferTo: [48] }, // Transfer to Green Line
    { id: 16, name: "Ana Rosa", lines: ["Azul"], connections: [15, 17], transferTo: [47] }, // Transfer to Green Line
    { id: 17, name: "Vila Mariana", lines: ["Azul"], connections: [16, 18] },
    { id: 18, name: "Santa Cruz", lines: ["Azul"], connections: [17, 19], transferTo: [39] }, // Transfer to Lilac Line
    { id: 19, name: "Praça da Árvore", lines: ["Azul"], connections: [18, 20] },
    { id: 20, name: "Saúde", lines: ["Azul"], connections: [19, 21] },
    { id: 21, name: "São Judas", lines: ["Azul"], connections: [20, 22] },
    { id: 22, name: "Conceição", lines: ["Azul"], connections: [21, 23] },
    { id: 23, name: "Jabaquara", lines: ["Azul"], connections: [22] },
  
    // Linha 2 - Verde (Green Line)
    { id: 41, name: "Vila Prudente", lines: ["Verde"], connections: [42] },
    { id: 42, name: "Tamanduateí", lines: ["Verde"], connections: [41, 43] },
    { id: 43, name: "Sacomã", lines: ["Verde"], connections: [42, 44] },
    { id: 44, name: "Alto do Ipiranga", lines: ["Verde"], connections: [43, 45] },
    { id: 45, name: "Santos-Imigrantes", lines: ["Verde"], connections: [44, 46] },
    { id: 46, name: "Chácara Klabin", lines: ["Verde"], connections: [45, 47], transferTo: [40] }, // Transfer to Lilac Line
    { id: 47, name: "Ana Rosa", lines: ["Verde"], connections: [46, 48], transferTo: [16] }, // Transfer to Blue Line
    { id: 48, name: "Paraíso", lines: ["Verde"], connections: [47, 49], transferTo: [15] }, // Transfer to Blue Line
    { id: 49, name: "Brigadeiro", lines: ["Verde"], connections: [48, 50] },
    { id: 50, name: "Trianon-Masp", lines: ["Verde"], connections: [49, 51] },
    { id: 51, name: "Consolação", lines: ["Verde"], connections: [50, 52], transferTo: [60] }, // Transfer to Yellow Line
    { id: 52, name: "Clínicas", lines: ["Verde"], connections: [51, 53] },
    { id: 53, name: "Sumaré", lines: ["Verde"], connections: [52, 54] },
    { id: 54, name: "Vila Madalena", lines: ["Verde"], connections: [53] },
  
    // Linha 3 - Vermelha (Red Line)
    { id: 64, name: "Barra Funda", lines: ["Vermelha"], connections: [65] },
    { id: 65, name: "Marechal Deodoro", lines: ["Vermelha"], connections: [64, 66] },
    { id: 66, name: "Santa Cecília", lines: ["Vermelha"], connections: [65, 67] },
    { id: 67, name: "República", lines: ["Vermelha"], connections: [66, 68], transferTo: [62] }, // Transfer to Yellow Line
    { id: 68, name: "Anhangabaú", lines: ["Vermelha"], connections: [67, 69] },
    { id: 69, name: "Sé", lines: ["Vermelha"], connections: [68, 70], transferTo: [11] }, // Transfer to Blue Line
    { id: 70, name: "Pedro II", lines: ["Vermelha"], connections: [69, 71] },
    { id: 71, name: "Brás", lines: ["Vermelha"], connections: [70, 72] },
    { id: 72, name: "Bresser-Mooca", lines: ["Vermelha"], connections: [71, 73] },
    { id: 73, name: "Belém", lines: ["Vermelha"], connections: [72, 74] },
    { id: 74, name: "Tatuapé", lines: ["Vermelha"], connections: [73, 75] },
    { id: 75, name: "Carrão", lines: ["Vermelha"], connections: [74, 76] },
    { id: 76, name: "Penha", lines: ["Vermelha"], connections: [75, 77] },
    { id: 77, name: "Vila Matilde", lines: ["Vermelha"], connections: [76, 78] },
    { id: 78, name: "Guilhermina-Esperança", lines: ["Vermelha"], connections: [77, 79] },
    { id: 79, name: "Patriarca", lines: ["Vermelha"], connections: [78, 80] },
    { id: 80, name: "Artur Alvim", lines: ["Vermelha"], connections: [79, 81] },
    { id: 81, name: "Corinthians-Itaquera", lines: ["Vermelha"], connections: [80] },
  
    // Linha 4 - Amarela (Yellow Line)
    { id: 55, name: "Vila Sônia", lines: ["Amarela"], connections: [56] },
    { id: 56, name: "Morumbi", lines: ["Amarela"], connections: [55, 57] },
    { id: 57, name: "Butantã", lines: ["Amarela"], connections: [56, 58] },
    { id: 58, name: "Pinheiros", lines: ["Amarela"], connections: [57, 59] },
    { id: 59, name: "Faria Lima", lines: ["Amarela"], connections: [58, 60] },
    { id: 60, name: "Paulista", lines: ["Amarela"], connections: [59, 61], transferTo: [51] }, // Transfer to Green Line
    { id: 61, name: "Higienópolis-Mackenzie", lines: ["Amarela"], connections: [60, 62] },
    { id: 62, name: "República", lines: ["Amarela"], connections: [61, 63], transferTo: [67] }, // Transfer to Red Line
    { id: 63, name: "Luz", lines: ["Amarela"], connections: [62], transferTo: [9] }, // Transfer to Blue Line
  
    // Linha 5 - Lilás (Lilac Line)
    { id: 24, name: "Capão Redondo", lines: ["Lilás"], connections: [25] },
    { id: 25, name: "Campo Limpo", lines: ["Lilás"], connections: [24, 26] },
    { id: 26, name: "Vila das Belezas", lines: ["Lilás"], connections: [25, 27] },
    { id: 27, name: "Giovanni Gronchi", lines: ["Lilás"], connections: [26, 28] },
    { id: 28, name: "Santo Amaro", lines: ["Lilás"], connections: [27, 29] },
    { id: 29, name: "Largo Treze", lines: ["Lilás"], connections: [28, 30] },
    { id: 30, name: "Adolfo Pinheiro", lines: ["Lilás"], connections: [29, 31] },
    { id: 31, name: "Alto da Boa Vista", lines: ["Lilás"], connections: [30, 32] },
    { id: 32, name: "Borba Gato", lines: ["Lilás"], connections: [31, 33] },
    { id: 33, name: "Brooklin", lines: ["Lilás"], connections: [32, 34] },
    { id: 34, name: "Campo Belo", lines: ["Lilás"], connections: [33, 35] },
    { id: 35, name: "Eucaliptos", lines: ["Lilás"], connections: [34, 36] },
    { id: 36, name: "Moema", lines: ["Lilás"], connections: [35, 37] },
    { id: 37, name: "AACD-Servidor", lines: ["Lilás"], connections: [36, 38] },
    { id: 38, name: "Hospital São Paulo", lines: ["Lilás"], connections: [37, 39] },
    { id: 39, name: "Santa Cruz", lines: ["Lilás"], connections: [38, 40], transferTo: [18] }, // Transfer to Blue Line
    { id: 40, name: "Chácara Klabin", lines: ["Lilás"], connections: [39], transferTo: [46] }, // Transfer to Green Line
  ]
  
  // Helper function to get station by name
  export function getStationByName(name: string): Station | undefined {
    return stations.find((station) => station.name.toLowerCase() === name.toLowerCase())
  }
  
  // Helper function to get station by ID
  export function getStationById(id: number): Station | undefined {
    return stations.find((station) => station.id === id)
  }
  
  // Helper function to get all stations on a specific line
  export function getStationsByLine(line: string): Station[] {
    return stations.filter((station) => station.lines.includes(line))
  }
  
  // Helper function to get all transfer stations
  export function getTransferStations(): Station[] {
    return stations.filter((station) => station.transferTo && station.transferTo.length > 0)
  }
  
  // Helper function to get all possible transfers for a station
  export function getAllTransfers(stationId: number): Station[] {
    const station = getStationById(stationId)
    if (!station || !station.transferTo) return []
  
    return station.transferTo.map((id) => getStationById(id)).filter(Boolean) as Station[]
  }
  
  