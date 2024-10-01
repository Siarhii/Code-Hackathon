"use client"

import { useState } from "react"
import {
  BadgeIndianRupee,
  CheckCircle,
  Clock,
  MapPin,
  Send,
  Star,
  Users,
} from "lucide-react"

const FeedbackForm = ({
  onSubmit,
  projectName = "Project",
  organizationName = "NGO",
  customQuestions = [],
}) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [feedbackType, setFeedbackType] = useState("")
  const [volunteerRole, setVolunteerRole] = useState("")
  const [donationAmount, setDonationAmount] = useState("")
  const [timeSpent, setTimeSpent] = useState("")
  const [location, setLocation] = useState("")
  const [impactRating, setImpactRating] = useState(0)
  const [customAnswers, setCustomAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const feedback = {
      rating,
      comment,
      feedbackType,
      volunteerRole,
      donationAmount,
      timeSpent,
      location,
      impactRating,
      customAnswers,
    }
    onSubmit(feedback)
    setSubmitted(true)
    setTimeout(resetForm, 3000)
  }

  const resetForm = () => {
    setRating(0)
    setComment("")
    setFeedbackType("")
    setVolunteerRole("")
    setDonationAmount("")
    setTimeSpent("")
    setLocation("")
    setImpactRating(0)
    setCustomAnswers({})
    setSubmitted(false)
  }

  const handleCustomAnswer = (question, answer) => {
    setCustomAnswers((prev) => ({ ...prev, [question]: answer }))
  }

  const backgroundSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3730a3;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#5b21b6;stop-opacity:1" />
        </linearGradient>
        <radialGradient id="grad2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style="stop-color:#6d28d9;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#4c1d95;stop-opacity:0" />
        </radialGradient>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#grad1)" />
      
      <circle cx="0" cy="0" r="600" fill="url(#grad2)" opacity="0.4">
        <animate attributeName="cx" from="-300" to="1300" dur="20s" repeatCount="indefinite" />
        <animate attributeName="cy" from="-300" to="1300" dur="25s" repeatCount="indefinite" />
      </circle>
      
      <circle cx="1000" cy="1000" r="500" fill="url(#grad2)" opacity="0.4">
        <animate attributeName="cx" from="1300" to="-300" dur="22s" repeatCount="indefinite" />
        <animate attributeName="cy" from="1300" to="-300" dur="18s" repeatCount="indefinite" />
      </circle>
      
      <path d="M0 200 Q 200 100, 400 200 T 800 200" stroke="#8b5cf6" stroke-width="4" fill="none" opacity="0.3">
        <animate attributeName="d" 
                 values="M0 200 Q 200 100, 400 200 T 800 200;
                         M0 200 Q 200 300, 400 200 T 800 200;
                         M0 200 Q 200 100, 400 200 T 800 200"
                 dur="10s" repeatCount="indefinite" />
      </path>
      
      <path d="M0 400 Q 200 300, 400 400 T 800 400" stroke="#a78bfa" stroke-width="4" fill="none" opacity="0.3">
        <animate attributeName="d" 
                 values="M0 400 Q 200 300, 400 400 T 800 400;
                         M0 400 Q 200 500, 400 400 T 800 400;
                         M0 400 Q 200 300, 400 400 T 800 400"
                 dur="12s" repeatCount="indefinite" />
      </path>
    </svg>
  `

  const backgroundUrl = `data:image/svg+xml,${encodeURIComponent(
    backgroundSvg
  )}`

  if (submitted) {
    return (
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
        style={{ backgroundImage: `url("${backgroundUrl}")` }}
      >
        <div className="bg-white bg-opacity-90 rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <CheckCircle className="text-indigo-600 w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
          <p className="text-gray-600">
            Your feedback is invaluable in helping us improve our projects and
            impact.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{ backgroundImage: `url("${backgroundUrl}")` }}
    >
      <div className="bg-white bg-opacity-90 rounded-lg shadow-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-indigo-900 mb-2 text-center">
          {projectName} Feedback
        </h2>
        <p className="text-indigo-700 mb-6 text-center">
          Help {organizationName} improve with your insights
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-indigo-700 mb-2">
              Overall Experience
            </label>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={32}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer ${
                    star <= rating
                      ? "text-indigo-500 fill-indigo-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-indigo-700 mb-2">
              Feedback Type
            </label>
            <select
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value)}
              className="mt-1 block w-full rounded-md border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="">Select a type</option>
              <option value="volunteer">Volunteer</option>
              <option value="donor">Donor</option>
              <option value="beneficiary">Beneficiary</option>
              <option value="partner">Partner Organization</option>
              <option value="other">Other</option>
            </select>
          </div>
          {feedbackType === "volunteer" && (
            <div>
              <label className="block text-sm font-medium text-indigo-700 mb-2">
                Volunteer Role
              </label>
              <div className="flex items-center space-x-2">
                <Users className="text-indigo-600" size={20} />
                <input
                  type="text"
                  value={volunteerRole}
                  onChange={(e) => setVolunteerRole(e.target.value)}
                  placeholder="e.g., Event Coordinator, Tutor"
                  className="mt-1 block w-full rounded-md border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
          )}
          {feedbackType === "donor" && (
            <div>
              <label className="block text-sm font-medium text-indigo-700 mb-2">
                Donation Amount Range
              </label>
              <div className="flex items-center space-x-2">
                <BadgeIndianRupee className="text-indigo-600" size={20} />
                <select
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="mt-1 block w-full rounded-md border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">Select range</option>
                  <option value="0-50">Rs.0 - 4000</option>
                  <option value="51-100">Rs.4001 - 10000</option>
                  <option value="101-500">Rs.10001 - 15000</option>
                  <option value="501-1000">Rs.15001 - 20000</option>
                  <option value="1000+">Rs.20000+</option>
                </select>
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-indigo-700 mb-2">
              Time Spent on Project
            </label>
            <div className="flex items-center space-x-2">
              <Clock className="text-indigo-600" size={20} />
              <input
                type="text"
                value={timeSpent}
                onChange={(e) => setTimeSpent(e.target.value)}
                placeholder="e.g., 2 hours, 1 week"
                className="mt-1 block w-full rounded-md border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-indigo-700 mb-2">
              Project Location
            </label>
            <div className="flex items-center space-x-2">
              <MapPin className="text-indigo-600" size={20} />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Mumbai, Online"
                className="mt-1 block w-full rounded-md border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-indigo-700 mb-2">
              Perceived Impact
            </label>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={32}
                  onClick={() => setImpactRating(star)}
                  className={`cursor-pointer ${
                    star <= impactRating
                      ? "text-indigo-500 fill-indigo-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          {customQuestions.map((question, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-indigo-700 mb-2">
                {question}
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => handleCustomAnswer(question, e.target.value)}
              />
            </div>
          ))}
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-indigo-700 mb-2"
            >
              Additional Comments
            </label>
            <textarea
              id="comment"
              rows={4}
              className="mt-1 block w-full rounded-md border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Share your thoughts, suggestions, or experiences..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Feedback
            <Send className="ml-2" size={16} />
          </button>
        </form>
      </div>
    </div>
  )
}

export default FeedbackForm
