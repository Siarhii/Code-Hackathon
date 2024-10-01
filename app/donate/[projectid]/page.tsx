"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ToastContainer } from "react-toastify"

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
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"

import "react-toastify/dist/ReactToastify.css"

interface Opportunity {
  id: number
  name: string
  date: string
  status: "open" | "upcoming" | "closed"
}

const fetchVolunteerOpportunities = (): Promise<Opportunity[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Local Beach Cleanup",
          date: "This Saturday",
          status: "open",
        },
        {
          id: 2,
          name: "Food Bank Assistance",
          date: "Ongoing",
          status: "open",
        },
        {
          id: 3,
          name: "Literacy Program",
          date: "Starts Next Month",
          status: "upcoming",
        },
      ])
    }, 1000)
  })
}

export default function Page() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [raisedAmount, setRaisedAmount] = useState(45000)
  const [showQRCode, setShowQRCode] = useState(false)
  const goalAmount = 100000

  const router = useRouter()
  function goToSignup() {
    router.push("/signup")
  }
  useEffect(() => {
    const getOpportunities = async () => {
      const data = await fetchVolunteerOpportunities()
      setOpportunities(data)
      setLoading(false)
    }
    getOpportunities()
  }, [])

  const progressPercentage = Math.min((raisedAmount / goalAmount) * 100, 100)

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-4xl font-extrabold text-center mb-4 mt-6">
        NGO Collaboration Platform
      </h1>
      <p className="text-xl text-center mb-12 max-w-2xl mx-auto">
        Empowering NGOs and volunteers to make a bigger impact through seamless
        collaboration and efficient fundraising.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Create a Fundraising Campaign</CardTitle>
            <CardDescription>
              Launch your project and start collecting donations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Input placeholder="Campaign Title" />
              <Input placeholder="Fundraising Goal" type="number" />
              <Textarea placeholder="Campaign Description" />
              <Button type="submit" className="w-full">
                Launch Campaign
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Featured Campaign</CardTitle>
              <CardDescription>Support our latest initiative</CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">
                Clean Water for All
              </h3>
              <p className="text-muted-foreground mb-4">
                Help us provide clean water to remote villages in need.
              </p>
              <Progress value={progressPercentage} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                Rs. {raisedAmount.toLocaleString()} raised of Rs.{" "}
                {goalAmount.toLocaleString()} goal
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <a
                  href="https://razorpay.me/@tanushbidkar"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Donate Now
                </a>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Volunteer Opportunities</CardTitle>
              <CardDescription>
                Join our community and make a difference
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center">Loading opportunities...</p>
              ) : (
                <ul className="space-y-2">
                  {opportunities.map((opportunity) => (
                    <li key={opportunity.id} className="flex items-center">
                      <span
                        className={`w-3 h-3 rounded-full mr-2 ${
                          opportunity.status === "open"
                            ? "bg-green-500"
                            : opportunity.status === "upcoming"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                      <span className="text-muted-foreground">
                        {opportunity.name} - {opportunity.date}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => {
                  goToSignup
                }}
              >
                Sign Up to Volunteer
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  )
}
