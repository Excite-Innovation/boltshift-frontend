import { Metadata } from "next";

import { SignInMobile } from "@/components/auth/mobile/sign_in";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Boltshift account.",
};

export default function SignInPage() {
  return <SignInMobile />;
}
