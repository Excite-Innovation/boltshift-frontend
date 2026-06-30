import { Metadata } from "next";

import { SignUpDesktop } from "@/components/auth/desktop/sign_up";
import { SignUpMobile } from "@/components/auth/mobile/sign_up";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your Boltshift account.",
};

export default function SignUpPage() {
  return (
    <>
      <div className="lg:hidden">
        <SignUpMobile />
      </div>
      <div className="hidden lg:block">
        <SignUpDesktop />
      </div>
    </>
  );
}
