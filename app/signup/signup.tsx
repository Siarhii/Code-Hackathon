"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useGoogleLogin } from "@react-oauth/google"
import { useTheme } from "next-themes"

import { useAuth } from "../../contexts/authContext"

const SignupPage = () => {
  const router = useRouter()
  const { login } = useAuth()
  const { theme } = useTheme()
  const backendUrl = process.env.NEXT_PUBLIC_MY_BACKEND_URL

  const handleGoogleSuccess = async (tokenResponse: any) => {
    try {
      const res = await fetch(`${backendUrl}/api/auth/google-auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: tokenResponse.code,
          authMethod: "google",
        }),
      })

      const convertToNumber = (value: any) => {
        const num = Number(value)
        return isNaN(num) ? 0 : num
      }

      if (res.ok) {
        const data = await res.json()

        const { accessToken, refreshToken, user } = data
        const userData = {
          name: user.name,
          email: user.email,
          role: user.role,
          points: convertToNumber(user.points),
          profileUrl: user.profilePicture,
        }

        // Save tokens in localStorage
        localStorage.setItem("accessToken", accessToken)
        localStorage.setItem("refreshToken", refreshToken)

        login(userData)
        router.push("/")
      } else {
        const data = await res.json()
        console.error("Google sign-up failed:", data.message)
      }
    } catch (err) {
      console.error("Failed to process Google sign-up:", err)
    }
  }

  const handleGoogleError = () => {
    console.error("Google sign-in was unsuccessful. Please try again.")
  }

  const loginGoogle = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
    flow: "auth-code",
    scope: "openid profile email",
  })

  return (
    <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px] dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[500px] rounded-lg bg-white dark:bg-gray-800 px-6 py-10 shadow-lg sm:p-[60px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                Create your account
              </h3>
              <p className="mb-11 text-center text-base font-medium text-gray-600 dark:text-gray-300">
                It's totally free and super easy
              </p>

              <button
                onClick={() => loginGoogle()}
                className="mb-6 flex w-full items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-6 py-3 text-base text-gray-700 dark:text-gray-200 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              >
                <span className="mr-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_95:967)">
                      <path
                        d="M20.0001 10.2216C20.0122 9.53416 19.9397 8.84776 19.7844 8.17725H10.2042V11.8883H15.8277C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2946 14.7577 13.7416 15.1327L13.722 15.257L16.7512 17.5567L16.961 17.5772C18.8883 15.8328 19.9997 13.266 19.9997 10.2216"
                        fill="#4285F4"
                      />
                      <path
                        d="M10.2042 20.0001C12.9592 20.0001 15.2721 19.1111 16.9616 17.5778L13.7416 15.1332C12.88 15.7223 11.7235 16.1334 10.2042 16.1334C8.91385 16.126 7.65863 15.7206 6.61663 14.9747C5.57464 14.2287 4.79879 13.1802 4.39915 11.9778L4.27957 11.9878L1.12973 14.3766L1.08856 14.4888C1.93689 16.1457 3.23879 17.5387 4.84869 18.512C6.45859 19.4852 8.31301 20.0005 10.2046 20.0001"
                        fill="#34A853"
                      />
                      <path
                        d="M4.39911 11.9777C4.17592 11.3411 4.06075 10.673 4.05819 9.99996C4.0623 9.32799 4.17322 8.66075 4.38696 8.02225L4.38127 7.88968L1.19282 5.4624L1.08852 5.51101C0.372885 6.90343 0.00012207 8.4408 0.00012207 9.99987C0.00012207 11.5589 0.372885 13.0963 1.08852 14.4887L4.39911 11.9777Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M10.2042 3.86663C11.6663 3.84438 13.0804 4.37803 14.1498 5.35558L17.0296 2.59996C15.1826 0.901848 12.7366 -0.0298855 10.2042 -3.6784e-05C8.3126 -0.000477834 6.45819 0.514732 4.8483 1.48798C3.2384 2.46124 1.93649 3.85416 1.08813 5.51101L4.38775 8.02225C4.79132 6.82005 5.56974 5.77231 6.61327 5.02675C7.6568 4.28118 8.91279 3.87541 10.2042 3.86663Z"
                        fill="#EB4335"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_95:967">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                Sign up with Google
              </button>
              <p className="text-center text-base font-medium text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignupPage
