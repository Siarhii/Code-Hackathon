"use client"

import { useState } from "react"
import axios from "axios"
import { AlertCircle, CheckCircle2 } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface NGO {
  name: string
  location: { lat: number; lon: number }
  address: string
  skillsNeeded: string[]
  timeCommitment: string
}

const ngoList: NGO[] = [
  {
    name: "Green Earth Initiative",
    location: { lat: 40.7128, lon: -74.006 },
    address: "123 Green St, New York, NY 10001",
    skillsNeeded: [
      "Environmental Science",
      "Project Management",
      "Public Speaking",
    ],
    timeCommitment: "10 hours per week",
  },
  {
    name: "Tech for All",
    location: { lat: 37.7749, lon: -122.4194 },
    address: "456 Tech Ave, San Francisco, CA 94105",
    skillsNeeded: ["Programming", "Web Design", "Digital Marketing"],
    timeCommitment: "15 hours per week",
  },
  {
    name: "Helping Hands Foundation",
    location: { lat: 41.8781, lon: -87.6298 },
    address: "789 Helper Rd, Chicago, IL 60601",
    skillsNeeded: ["Social Work", "Counseling", "Event Planning"],
    timeCommitment: "20 hours per week",
  },
]

const calculateTravelTime = async (
  userLoc: { lat: number; lon: number },
  ngoLoc: { lat: number; lon: number }
) => {
  const apiKey = "5b3ce3597851110001cf6248972f8f7374794b05829ca58fe17c377e"
  const response = await axios.post(
    "https://api.openrouteservice.org/v2/directions/driving-car",
    {
      coordinates: [
        [userLoc.lon, userLoc.lat],
        [ngoLoc.lon, ngoLoc.lat],
      ],
    },
    { headers: { Authorization: apiKey, "Content-Type": "application/json" } }
  )

  if (response.data && response.data.routes.length > 0) {
    const travelTimeInSeconds = response.data.routes[0].summary.duration
    const travelTimeInMinutes = Math.round(travelTimeInSeconds / 60)
    return `${travelTimeInMinutes} minutes`
  } else {
    return "Travel time not available"
  }
}

const reverseGeocode = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    )
    if (response.data && response.data.address) {
      return response.data.display_name
    }
  } catch (error) {
    console.error("Error in reverse geocoding", error)
  }
  return "Address not available"
}

export default function VolunteerMatcher() {
  const [userLocation, setUserLocation] = useState<{
    lat: number
    lon: number
  }>({ lat: 0, lon: 0 })
  const [nearestNGO, setNearestNGO] = useState<NGO | null>(null)
  const [userName, setUserName] = useState<string>("")
  const [userPhone, setUserPhone] = useState<string>("")
  const [userSkills, setUserSkills] = useState<string>("")
  const [userAvailability, setUserAvailability] = useState<string>("")
  const [userAddress, setUserAddress] = useState<string>("")
  const [travelTime, setTravelTime] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const geocodeLocation = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${userAddress}`
      )
      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0]
        setUserLocation({ lat: parseFloat(lat), lon: parseFloat(lon) })
        return { lat: parseFloat(lat), lon: parseFloat(lon) }
      }
    } catch (error) {
      console.error("Error in geocoding the location", error)
      setError("Failed to geocode the location. Please try again.")
    }
    return null
  }

  const findNearestNGO = async () => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)
    const location = await geocodeLocation()
    if (!location) {
      setIsLoading(false)
      setError(
        "Failed to find your location. Please check your address and try again."
      )
      return
    }

    let closestNGO: NGO | null = null
    let shortestDistance = Infinity

    for (const ngo of ngoList) {
      const distance = Math.sqrt(
        Math.pow(location.lat - ngo.location.lat, 2) +
          Math.pow(location.lon - ngo.location.lon, 2)
      )
      if (distance < shortestDistance) {
        shortestDistance = distance
        closestNGO = ngo
      }
    }

    if (closestNGO) {
      const time = await calculateTravelTime(location, closestNGO.location)
      setTravelTime(time)
      setNearestNGO(closestNGO)
      setSuccess("Nearest NGO found!")
    } else {
      setError("No NGOs found in your area.")
    }
    setIsLoading(false)
  }

  const applyToNGO = async () => {
    if (nearestNGO) {
      setIsLoading(true)
      setError(null)
      setSuccess(null)
      const userFormattedAddress = await reverseGeocode(
        userLocation.lat,
        userLocation.lon
      )

      try {
        await axios.post("http://localhost:5000/api/volunteer", {
          name: userName,
          phone: userPhone,
          skills: userSkills.split(",").map((skill) => skill.trim()),
          location: userFormattedAddress,
          availability: userAvailability,
          appliedNGO: nearestNGO.name,
        })
        setSuccess("You have successfully applied!")
      } catch (err) {
        console.error(err)
        setError("Failed to submit your application. Please try again.")
      }
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-teal-50 to-cyan-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-teal-800 text-center mb-12">
          Find Your Perfect Volunteer Opportunity
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-teal-600 text-white">
              <CardTitle className="text-2xl">Your Information</CardTitle>
              <CardDescription className="text-teal-100">
                Help us find the best NGO match for you
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700"
                >
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Your phone number"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="address"
                  className="text-sm font-medium text-gray-700"
                >
                  Address
                </Label>
                <Input
                  id="address"
                  placeholder="Your address or city"
                  value={userAddress}
                  onChange={(e) => setUserAddress(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="skills"
                  className="text-sm font-medium text-gray-700"
                >
                  Skills
                </Label>
                <Input
                  id="skills"
                  placeholder="Your skills (comma-separated)"
                  value={userSkills}
                  onChange={(e) => setUserSkills(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="availability"
                  className="text-sm font-medium text-gray-700"
                >
                  Availability
                </Label>
                <Input
                  id="availability"
                  placeholder="Your availability"
                  value={userAvailability}
                  onChange={(e) => setUserAvailability(e.target.value)}
                  className="w-full"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={findNearestNGO}
                disabled={isLoading}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              >
                {isLoading ? "Searching..." : "Find Nearest NGO"}
              </Button>
            </CardFooter>
          </Card>

          {nearestNGO && (
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-cyan-600 text-white">
                <CardTitle className="text-2xl">Nearest NGO</CardTitle>
                <CardDescription className="text-cyan-100">
                  Here's the NGO that best matches your profile
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-6 space-y-4">
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-semibold">Name:</span>{" "}
                    {nearestNGO.name}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Address:</span>{" "}
                    {nearestNGO.address}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Skills Needed:</span>{" "}
                    {nearestNGO.skillsNeeded.join(", ")}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Time Commitment:</span>{" "}
                    {nearestNGO.timeCommitment}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Travel Time:</span>{" "}
                    {travelTime}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={applyToNGO}
                  disabled={isLoading}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                >
                  {isLoading ? "Applying..." : "Apply to this NGO"}
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>

        {error && (
          <Alert variant="destructive" className="mt-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert
            variant="default"
            className="mt-8 bg-green-100 border-green-400 text-green-700"
          >
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}
