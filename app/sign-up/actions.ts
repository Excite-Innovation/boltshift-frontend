"use server"

import { renderWelcomeEmail } from "@/lib/email"

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim()
}

export async function sendWelcomeEmailAction(formData: FormData) {
  const firstName = getString(formData, "firstName") || "there"
  const email = getString(formData, "email")
  const temporaryPassword = getString(formData, "password") || "Passwrd2023#"

  if (!email) {
    return {
      success: false,
      message: "Email is required.",
    }
  }

  const { html, text } = await renderWelcomeEmail({
    firstName,
    email,
    temporaryPassword,
  })

  console.info("Welcome email rendered for signup", {
    email,
    subject: "Welcome to Boltshift - Let's Get Started!",
    html,
    text,
  })

  return {
    success: true,
    message: "Welcome email rendered successfully.",
  }
}
