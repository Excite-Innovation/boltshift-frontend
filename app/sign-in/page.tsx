import { Metadata } from "next";

import { SignInDesktop } from "@/components/auth/desktop/sign_in";
import { SignInMobile } from "@/components/auth/mobile/sign_in";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Boltshift account.",
};

export default function SignInPage() {
  return (
    <>
      <div className="lg:hidden">
        <SignInMobile />
      </div>
      <div className="hidden lg:block">
        <SignInDesktop />
      </div>
    </>
  );
}
