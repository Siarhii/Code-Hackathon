import { Metadata } from "next";
import SignupPage from "./signup";

export const metadata: Metadata = {
  title: "Sign Up | TRAYA ",
  description:
    "Join TRAYA's smart waste management community. Create an account to start tracking your recycling efforts, earning points, and contributing to a more sustainable future.",
};

export default function Page() {
  return <SignupPage />;
}
