import { NextResponse } from "next/server"

import { sendWelcomeEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      firstName?: string
      email?: string
      password?: string
    }

    if (!body.email) {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 },
      )
    }

    const result = await sendWelcomeEmail({
      firstName: body.firstName,
      email: body.email,
      password: body.password,
    })

    return NextResponse.json({
      success: true,
      message: "Welcome email sent successfully.",
      id: result.data?.id,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to send welcome email."

    return NextResponse.json(
      { success: false, message },
      { status: 500 },
    )
  }
}
