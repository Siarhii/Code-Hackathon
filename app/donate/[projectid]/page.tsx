"use client"

import { useEffect, useState } from "react"
// import QRCode from "qrcode.react"
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

import "react-toastify/dist/ReactToastify.css"

// Simulated API call for volunteer opportunities
const fetchVolunteerOpportunities = () => {
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
  const [opportunities, setOpportunities] = useState([])
  const [loading, setLoading] = useState(true)
  const [raisedAmount, setRaisedAmount] = useState(45000)
  const [showQRCode, setShowQRCode] = useState(false)
  const goalAmount = 100000

  useEffect(() => {
    const getOpportunities = async () => {
      const data = await fetchVolunteerOpportunities()
      setOpportunities(data)
      setLoading(false)
    }
    getOpportunities()
  }, [])

  const progressPercentage = Math.min((raisedAmount / goalAmount) * 100, 100)

  const handleDonateClick = (e) => {
    e.preventDefault()
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/payment-button.js"
    script.setAttribute("data-payment_button_id", "pl_P3TQXyi6E75cr2")
    script.async = true
    document.body.appendChild(script)
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-12"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
      }}
    >
      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 mb-6 text-center">
            NGO Connect
          </h1>
          <p className="text-xl text-indigo-700 mb-12 text-center max-w-2xl mx-auto">
            Empowering NGOs and volunteers to make a bigger impact through
            seamless collaboration and efficient fundraising.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/50 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-indigo-800">
                  Create a Fundraising Campaign
                </CardTitle>
                <CardDescription>
                  Launch your project and start collecting donations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <Input placeholder="Campaign Title" className="bg-white/70" />
                  <Input
                    placeholder="Fundraising Goal"
                    type="number"
                    className="bg-white/70"
                  />
                  <textarea
                    className="w-full p-2 border rounded-md focus:ring focus:ring-indigo-200 bg-white/70"
                    placeholder="Campaign Description"
                    rows={4}
                  ></textarea>
                  <Button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    Launch Campaign
                  </Button>
                </form>
              </CardContent>
              <CardFooter />
            </Card>

            <div className="space-y-6">
              <Card className="bg-white/50 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-indigo-800">
                    Featured Campaign
                  </CardTitle>
                  <CardDescription>
                    Support our latest initiative
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-semibold mb-2">
                    Clean Water for All
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Help us provide clean water to remote villages in need.
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div
                      className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Rs. {raisedAmount.toLocaleString()} raised of Rs.{" "}
                    {goalAmount.toLocaleString()} goal
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col items-center space-y-4">
                  {showQRCode ? (
                    <>
                      <p className="text-indigo-800 font-semibold">
                        Scan to Donate via Razorpay
                      </p>
                      <QRCode
                        value="https://razorpay.com/payment/example"
                        size={200}
                      />
                      <p className="text-sm text-gray-600">
                        Or visit:{" "}
                        <a
                          href="https://razorpay.com/payment/example"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:underline"
                        >
                          https://razorpay.com/payment/example
                        </a>
                      </p>
                      <Button
                        onClick={() => setShowQRCode(false)}
                        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
                      >
                        Back to Campaign
                      </Button>
                    </>
                  ) : (
                    <form>
                      <Button
                        type="button"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                      >
                        <a
                          href="https://razorpay.me/@tanushbidkar"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Donate Now
                        </a>
                      </Button>
                      <script
                        src="https://checkout.razorpay.com/v1/payment-button.js"
                        data-payment_button_id="pl_P3TQXyi6E75cr2"
                        async
                      ></script>
                    </form>
                  )}
                </CardFooter>
              </Card>

              <Card className="bg-white/50 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-indigo-800">
                    Volunteer Opportunities
                  </CardTitle>
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
                          <span className="text-gray-700">
                            {opportunity.name} - {opportunity.date}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    Sign Up to Volunteer
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  )
}
