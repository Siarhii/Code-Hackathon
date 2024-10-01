import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            About NGO Connect
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Empowering Change Through Collaboration
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              At NGO Connect, we're dedicated to streamlining NGO operations and
              fostering volunteer collaboration. Our platform bridges the gap
              between passionate individuals and impactful organizations,
              creating a synergy that drives positive change in communities
              worldwide.
            </p>
            <Button asChild>
              <Link href="/auth">Join Our Cause</Link>
            </Button>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV_YemtxMCpa19VRnqKlwrnXE2yYgKVIXakg&s"
              alt="Volunteers working together"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-8 text-center">
            What We Do
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Streamline Operations",
                description:
                  "We provide tools and resources to help NGOs optimize their processes and maximize their impact.",
              },
              {
                title: "Connect Volunteers",
                description:
                  "Our platform makes it easy for volunteers to find and engage with causes they're passionate about.",
              },
              {
                title: "Facilitate Fundraising",
                description:
                  "We offer innovative solutions to help NGOs raise funds and manage their campaigns effectively.",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 dark:bg-gray-700 text-white rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-semibold mb-4">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "NGOs Supported" },
              { number: "10,000+", label: "Active Volunteers" },
              { number: "₹100M+", label: "Funds Raised" },
              { number: "50+", label: "Countries Reached" },
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-4xl font-bold mb-2">{stat.number}</p>
                <p className="text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're an NGO looking to amplify your impact or a volunteer
            eager to contribute, NGO Connect is here to support your journey in
            creating positive change.
          </p>
          <div className="space-x-4">
            <Button asChild>
              <Link href="/register">Register Your NGO</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/signin">Become a Volunteer</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
