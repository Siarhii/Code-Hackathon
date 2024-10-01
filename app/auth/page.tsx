import Link from "next/link"
import { Building2, UserCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function SignInOptions() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-blue-900 dark:text-blue-100 mb-2">
            Welcome Back
          </h1>
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-4">
            Choose your sign-in option
          </h2>
          <p className="text-lg text-blue-600 dark:text-blue-400">
            Select whether you're a volunteer or an NGO representative
          </p>
        </div>
        <Card className="shadow-lg dark:bg-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-blue-900 dark:text-blue-100">
              Sign In
            </CardTitle>
            <CardDescription className="text-blue-600 dark:text-blue-400">
              Choose your account type to proceed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Link href="/signin" passHref>
              <Button
                className="w-full h-16 text-lg transition-all duration-300 ease-in-out transform hover:scale-105 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                variant="outline"
              >
                <UserCircle className="mr-3 h-8 w-8 text-blue-500 dark:text-blue-400" />
                <span className="font-semibold">Sign in as Volunteer</span>
              </Button>
            </Link>
            <Link href="/signin-ngo" passHref>
              <Button
                className="w-full h-16 text-lg transition-all mt-4 duration-300 ease-in-out transform hover:scale-105 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                variant="outline"
              >
                <Building2 className="mr-3 h-8 w-8 text-green-500 dark:text-green-400" />
                <span className="font-semibold">Sign in as NGO</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
        <p className="text-center text-sm text-blue-500 dark:text-blue-400 mt-8">
          Need help?{" "}
          <a href="/help" className="font-medium hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  )
}
