import { NextResponse } from "next/server"
import { calculateRoute } from "@/Utils/Route-Calculator"
import { getStationByName } from "@/library/metro-data"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { origin, destination } = body

    // Get station IDs from names
    const originStation = getStationByName(origin)
    const destinationStation = getStationByName(destination)

    if (!originStation || !destinationStation) {
      return NextResponse.json({ success: false, message: "Origin or destination station not found" }, { status: 400 })
    }

    // Calculate route
    const route = calculateRoute(originStation.id, destinationStation.id)

    if (!route) {
      return NextResponse.json({ success: false, message: "No route found between these stations" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      route,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 })
  }
}

