import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronRight, Globe, Heart, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}

      {/* Hero Section */}
      <section className="py-20 px-4 bg-blue-50 dark:bg-blue-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Make a Difference, One Act at a Time
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join our platform and connect with NGOs making real change in the
              world. Your skills can transform lives.
            </p>
            <div className="flex space-x-4">
              <Button size="lg">
                Start Volunteering <ArrowRight className="ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/placeholder.svg"
              alt="Volunteers in action"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Featured NGOs */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Featured NGOs
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Green Earth", "Helping Hands", "Education for All"].map(
              (ngo, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{ngo}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/placeholder.svg"
                      alt={ngo}
                      width={300}
                      height={200}
                      className="mb-4 rounded"
                    />
                    <CardDescription>
                      Join {ngo} in their mission to make the world a better
                      place.
                    </CardDescription>
                    <Button className="mt-4" variant="outline">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-20 px-4 bg-blue-600 dark:bg-blue-800 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-xl">Volunteers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-xl">NGOs</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-xl">Lives Impacted</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Sign Up",
                description: "Create your volunteer profile",
              },
              {
                icon: Globe,
                title: "Find Projects",
                description: "Browse and apply to NGO projects",
              },
              {
                icon: Heart,
                title: "Make an Impact",
                description: "Contribute your skills and time",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 dark:bg-blue-800 rounded-full p-4 inline-block mb-4">
                  <step.icon className="w-8 h-8 text-blue-600 dark:text-blue-300" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join our community of volunteers and start contributing to
            meaningful projects today.
          </p>
          <Button size="lg">
            Get Started Now <ChevronRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
    </div>
  )
}
