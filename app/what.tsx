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
    name: "Teach for India",
    location: { lat: 19.076, lon: 72.8777 },
    address: "",
    skillsNeeded: ["teaching"],
    timeCommitment: "weekends",
  },
  {
    name: "Akanksha Foundation",
    location: { lat: 19.0881, lon: 72.8817 },
    address: "",
    skillsNeeded: ["mentoring", "education"],
    timeCommitment: "weekends",
  },
  {
    name: "Sneha",
    location: { lat: 19.0738, lon: 72.8997 },
    address: "",
    skillsNeeded: ["healthcare", "nutrition"],
    timeCommitment: "weekdays",
  },
  {
    name: "Magic Bus",
    location: { lat: 19.076, lon: 72.8777 },
    address: "",
    skillsNeeded: ["mentoring", "poverty alleviation"],
    timeCommitment: "weekends",
  },
  {
    name: "Goonj",
    location: { lat: 19.076, lon: 72.8777 },
    address: "",
    skillsNeeded: ["disaster relief", "logistics"],
    timeCommitment: "weekdays",
  },
  {
    name: "Smile Foundation",
    location: { lat: 19.076, lon: 72.8777 },
    address: "",
    skillsNeeded: ["healthcare", "education"],
    timeCommitment: "weekdays",
  },
  {
    name: "CRY",
    location: { lat: 19.076, lon: 72.8777 },
    address: "",
    skillsNeeded: ["child rights", "advocacy"],
    timeCommitment: "weekends",
  },
  {
    name: "Apnalaya",
    location: { lat: 19.0881, lon: 72.8817 },
    address: "",
    skillsNeeded: ["healthcare", "education"],
    timeCommitment: "weekdays",
  },
  {
    name: "Pratham",
    location: { lat: 19.0738, lon: 72.8997 },
    address: "",
    skillsNeeded: ["teaching", "literacy"],
    timeCommitment: "weekdays",
  },
  {
    name: "Muktangan",
    location: { lat: 19.076, lon: 72.8777 },
    address: "",
    skillsNeeded: ["teaching", "inclusive education"],
    timeCommitment: "weekdays",
  },
  {
    name: "Mumbai Mobile Creches",
    location: { lat: 19.076, lon: 72.8777 },
    address: "",
    skillsNeeded: ["healthcare", "childcare"],
    timeCommitment: "weekdays",
  },
  {
    name: "St. Jude India ChildCare Centres",
    location: { lat: 19.076, lon: 72.8777 },
    address: "",
    skillsNeeded: ["healthcare", "cancer care"],
    timeCommitment: "weekdays",
  },
  {
    name: "Save The Children India",
    location: { lat: 19.076, lon: 72.8777 },
    address: "",
    skillsNeeded: ["child protection", "education"],
    timeCommitment: "weekdays",
  },
  {
    name: "Shanti Avedna Sadan",
    location: { lat: 19.076, lon: 72.8777 },
    address: "",
    skillsNeeded: ["hospice care"],
    timeCommitment: "weekdays",
  },
  {
    name: "WOTR",
    location: { lat: 19.076, lon: 72.8777 },
    address: "",
    skillsNeeded: ["environmental conservation", "sustainable agriculture"],
    timeCommitment: "weekdays",
  },
]

const calculateTravelTime = async (
  userLoc: { lat: number; lon: number },
  ngoLoc: { lat: number; lon: number }
) => {
  const apiKey = "5b3ce3597851110001cf6248db21a9fe42bb46ceb1c939913151ce1a"
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
        await axios.post(
          `${process.env.NEXT_PUBLIC_MY_BACKEND_URL}/api/volunteer`,
          {
            name: userName,
            phone: userPhone,
            skills: userSkills.split(",").map((skill) => skill.trim()),
            location: userFormattedAddress,
            availability: userAvailability,
            appliedNGO: nearestNGO.name,
          }
        )
        setSuccess("You have successfully applied!")
      } catch (err) {
        console.error(err)
        setError("Failed to submit your application. Please try again.")
      }
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="bg-pattern" />
      </div>
      {/* Background Image */}
      <div className="absolute inset-0 background-image" />

      <div className="w-full max-w-4xl relative z-10">
        <h1 className="text-4xl font-bold text-teal-800 text-center mb-12">
          Find Your Perfect Volunteer Opportunity
        </h1>
        <div className="space-y-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-teal-600 text-white text-center">
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
            <CardFooter className="flex justify-center">
              <Button
                onClick={findNearestNGO}
                disabled={isLoading}
                className="w-full max-w-xs bg-teal-600 hover:bg-teal-700 text-white"
              >
                {isLoading ? "Searching..." : "Find Nearest NGO"}
              </Button>
            </CardFooter>
          </Card>

          {nearestNGO && (
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-cyan-600 text-white text-center">
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
              <CardFooter className="flex justify-center">
                <Button
                  onClick={applyToNGO}
                  disabled={isLoading}
                  className="w-full max-w-xs bg-cyan-600 hover:bg-cyan-700 text-white"
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
