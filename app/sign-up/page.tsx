import { Metadata } from "next";

import { SignUpMobile } from "@/components/auth/mobile/sign_up";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your Boltshift account.",
};

export default function SignUpPage() {
  return <SignUpMobile />;
}
