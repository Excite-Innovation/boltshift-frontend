import type { Metadata } from "next";

import { ForgotPassword } from "@/components/password-reset/forgot-password";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Request a password reset for your Boltshift account.",
};

export default function ForgotPasswordPage() {
  return <ForgotPassword />;
}
