import type { Metadata } from "next";

import { PasswordResetFlow } from "@/components/password-reset/password-reset-flow";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Request a password reset for your Boltshift account.",
};

export default function ForgotPasswordPage() {
  return <PasswordResetFlow />;
}
