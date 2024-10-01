"use client"

import { useContext, useEffect, useRef, useState } from "react"
import {
  AlertCircle,
  Briefcase,
  CheckCircle2,
  Clock,
  MapPin,
  Send,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import { TokenRefresherContext } from "../../contexts/apiWrapper"
import { useAuth } from "../../contexts/authContext"

interface NGO {
  name: string
  ngoName: string
  location: { lat: number; lon: number }
  address: string
  skillsNeeded: string[]
  timeCommitment: string
  _id: string // Assuming _id is a string (as in MongoDB ObjectId)
}

export default function VolunteerMatcher() {
  const { isAuthenticated, user } = useAuth()
  const [chatHistory, setChatHistory] = useState<
    { role: string; content: string }[]
  >([])
  const [userInput, setUserInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    address: "",
    skills: "",
    availability: "",
  })
  const [nearestNGO, setNearestNGO] = useState<NGO | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState("name")
  const [ngoList, setNgoList] = useState<NGO[]>([])
  const chatContainerRef = useRef<HTMLDivElement | null>(null)
  const { makeRequest } = useContext(TokenRefresherContext) || {}

  const questions = {
    name: "What's your name?",
    phone: "Great! What's your phone number?",
    address: "Thanks! What's your address?",
    skills:
      "What skills can you offer for volunteering? (Separate multiple skills with commas)",
    availability: "When are you available to volunteer?",
  }

  useEffect(() => {
    setChatHistory([{ role: "bot", content: questions.name }])
  }, [])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatHistory])

  useEffect(() => {
    const fetchNGOs = async () => {
      if (!makeRequest) {
        setError("Request service is unavailable.")
        return
      }
      try {
        const response = await makeRequest(`/api/projects/fetchall`, {
          method: "GET",
        })
        if (response.error) {
          setError("Error fetching NGOs.")
        } else {
          setNgoList(response)
        }
      } catch (err) {
        setError("Failed to fetch NGOs.")
      }
    }

    fetchNGOs()
  }, [makeRequest])

  const handleUserInput = async () => {
    if (!userInput.trim() && currentQuestion !== "availability") return

    setIsLoading(true)
    setError(null)

    setChatHistory((prev) => [...prev, { role: "user", content: userInput }])
    processUserInput(userInput)
    setUserInput("")

    setIsLoading(false)
  }

  const processUserInput = (input: string) => {
    setUserInfo((prev) => ({ ...prev, [currentQuestion]: input }))

    const questionKeys = Object.keys(questions)
    const currentIndex = questionKeys.indexOf(currentQuestion)
    if (currentIndex < questionKeys.length - 1) {
      const nextQuestion = questionKeys[currentIndex + 1]
      setCurrentQuestion(nextQuestion)
      setChatHistory((prev) => [
        ...prev,
        { role: "bot", content: questions[nextQuestion] },
      ])
    } else {
      setChatHistory((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "Thank you for providing all the information. I'll now find the nearest NGO for you.",
        },
      ])
      findNearestNGO()
    }
  }

  const findNearestNGO = () => {
    if (ngoList.length === 0) {
      setError("No NGOs available.")
      return
    }
    const randomNGO = ngoList[Math.floor(Math.random() * ngoList.length)]
    setNearestNGO(randomNGO)
    setSuccess("Nearest NGO found!")
    setChatHistory((prev) => [
      ...prev,
      {
        role: "bot",
        content: `I've found the nearest NGO for you: ${randomNGO.name}.`,
      },
    ])
  }

  const applyToNGO = async () => {
    if (nearestNGO) {
      try {
        const response = (await makeRequest?.(
          `/api/projects/${nearestNGO._id}/volunteer-request`,
          {
            method: "POST",
            data: {
              status: "Pending",
              name: user?.name,
              skills: userInfo.skills, // or any relevant status value
            },
          }
        )) ?? { error: "makeRequest is not available" }

        setSuccess("You have successfully applied!")

        setChatHistory((prev) => [
          ...prev,
          {
            role: "bot",
            content:
              "Great news! Your application has been submitted successfully.",
          },
        ])
      } catch (error) {
        console.error("Error while applying:", error)
        setSuccess("Something went wrong. Please try again.")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-indigo-300 py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <Card className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center">
            Volunteer Matcher Chatbot
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4 sm:p-6">
          <div
            ref={chatContainerRef}
            className="h-[300px] sm:h-[400px] md:h-[500px] rounded-md border-2 border-indigo-200 p-3 sm:p-4 overflow-y-auto bg-white shadow-inner"
          >
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`mb-3 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block p-2 sm:p-3 rounded-lg shadow-md text-xs sm:text-sm md:text-base ${
                    message.role === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.content}
                </span>
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            {currentQuestion === "availability" ? (
              <select
                value={userInfo.availability}
                onChange={(e) =>
                  setUserInfo((prev) => ({
                    ...prev,
                    availability: e.target.value,
                  }))
                }
                className="flex-grow p-2 text-xs sm:text-sm md:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select availability</option>
                <option value="weekdays">Weekdays</option>
                <option value="weekends">Weekends</option>
                <option value="both">Both</option>
              </select>
            ) : (
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow text-xs sm:text-sm md:text-base"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleUserInput()
                  }
                }}
              />
            )}
            <Button
              onClick={handleUserInput}
              disabled={isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 px-2 sm:px-4"
            >
              <Send className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Send</span>
            </Button>
          </div>

          {isLoading && (
            <div className="text-center text-indigo-600 font-bold">
              Loading...
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="bg-green-100 border-green-400 text-green-700">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          {nearestNGO && (
            <Card className="bg-indigo-50 border-2 border-indigo-200">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl md:text-2xl text-indigo-700">
                  Nearest NGO: {nearestNGO.ngoName}
                </CardTitle>
                <CardTitle className="text-lg sm:text-xl md:text-lg text-indigo-700">
                  Project Name: {nearestNGO.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{nearestNGO.address}</p>
                <p className="text-sm text-gray-600">
                  Skills Needed: {nearestNGO.skillsNeeded.join(", ")}
                </p>
                <Button
                  onClick={applyToNGO}
                  className="mt-4 bg-indigo-600 hover:bg-indigo-700"
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
