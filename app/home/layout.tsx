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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Choose your sign-in option
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Select whether you're a volunteer or an NGO representative
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Choose your account type to proceed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/signin/volunteer" passHref>
                <Button className="w-full h-16 text-lg" variant="outline">
                  <UserCircle className="mr-2 h-6 w-6" />
                  Sign in as Volunteer
                </Button>
              </Link>
              <Link href="/signin/ngo" passHref>
                <Button className="w-full h-16 text-lg" variant="outline">
                  <Building2 className="mr-2 h-6 w-6" />
                  Sign in as NGO
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
