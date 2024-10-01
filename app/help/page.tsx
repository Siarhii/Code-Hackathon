"use client"

import { useState } from "react"
import { Mail, MapPin, Phone, Send } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactAndHelpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { name, email, message })
    setName("")
    setEmail("")
    setMessage("")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
        Contact Us & Help Center
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Get in Touch
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              We'd love to hear from you. Send us a message!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white dark:bg-gray-700"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white dark:bg-gray-700"
              />
              <Textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="bg-white dark:bg-gray-700 min-h-[150px]"
              />
              <Button
                type="submit"
                className="w-full bg-gray-900 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300"
              >
                <Send className="mr-2 h-4 w-4" /> Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="shadow-lg dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  support@ngoplatform.com
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  123 NGO Street, Charity City, 12345
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-gray-900 dark:text-gray-100">
                    How do I sign up as a volunteer?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 dark:text-gray-300">
                    To sign up as a volunteer, click on the "Sign In" button at
                    the top of the page, then choose "Sign in as Volunteer". If
                    you don't have an account, you'll see an option to create
                    one.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-gray-900 dark:text-gray-100">
                    How can my NGO join the platform?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 dark:text-gray-300">
                    NGOs can join by selecting "Sign in as NGO" on the sign-in
                    page and then choosing the "Register New NGO" option. You'll
                    need to provide some information about your organization and
                    wait for approval.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-gray-900 dark:text-gray-100">
                    Is there a fee for using the platform?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 dark:text-gray-300">
                    Our platform is free for volunteers. NGOs have a free tier
                    with basic features, and premium tiers with additional
                    capabilities. Check our pricing page for more details.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-gray-900 dark:text-gray-100">
                    How do I reset my password?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 dark:text-gray-300">
                    On the sign-in page, click on "Forgot Password". You'll be
                    prompted to enter your email address, and we'll send you
                    instructions to reset your password.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
