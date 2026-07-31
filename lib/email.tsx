import { render } from "@react-email/render"

import { WelcomeEmail } from "@/components/emails/welcome-email"

export type WelcomeEmailInput = {
  firstName?: string
  email: string
  temporaryPassword?: string
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
      temporaryPassword={input.temporaryPassword}
      siteUrl={siteUrl}
      loginUrl="/sign-in"
      shopUrl="/catalog"
    />,
  )

  const text = await render(
    <WelcomeEmail
      firstName={input.firstName}
      email={input.email}
      temporaryPassword={input.temporaryPassword}
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
