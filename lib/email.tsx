import { render } from "@react-email/render"
import { Resend } from "resend"

import { WelcomeEmail } from "@/email/welcome-email"

export type WelcomeEmailInput = {
  firstName?: string
  email: string
  password?: string
}

export const WELCOME_EMAIL_SUBJECT = "Welcome to Boltshift - Let's Get Started!"

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set.")
  }

  return new Resend(apiKey)
}

function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "http://localhost:3000"
  )
}

export async function renderWelcomeEmail(input: WelcomeEmailInput) {
  const siteUrl = getSiteUrl()

  const html = await render(
    <WelcomeEmail
      firstName={input.firstName}
      email={input.email}
      password={input.password}
      siteUrl={siteUrl}
      loginUrl="/sign-in"
      shopUrl="/catalog"
    />,
  )

  const text = await render(
    <WelcomeEmail
      firstName={input.firstName}
      email={input.email}
      password={input.password}
      siteUrl={siteUrl}
      loginUrl="/sign-in"
      shopUrl="/catalog"
    />,
    {
      plainText: true,
    },
  )

  return { html, text, siteUrl }
}

export async function sendWelcomeEmail(input: WelcomeEmailInput) {
  const { html, text, siteUrl } = await renderWelcomeEmail(input)
  const resend = getResendClient()
  const from =
    process.env.RESEND_FROM_EMAIL ?? "Boltshift <onboarding@resend.dev>"

  const { data, error } = await resend.emails.send({
    from,
    to: [input.email],
    subject: WELCOME_EMAIL_SUBJECT,
    html,
    text,
  })

  if (error) {
    throw new Error(error.message ?? "Failed to send welcome email.")
  }

  return { data, html, text, siteUrl }
}
