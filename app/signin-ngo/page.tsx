import { Metadata } from "next";
import SigninPage from "./signin";

export const metadata: Metadata = {
  title: "Sign In | TRAYA",
  description:
    "Access your TRAYA account to track your recycling efforts, view your points, and redeem rewards. Join us in making waste management smarter and more sustainable.",
};

export default function Page() {
  return <SigninPage />;
}
