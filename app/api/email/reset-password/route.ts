import { NextResponse } from "next/server"

import { sendPasswordResetEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      firstName?: string
      email?: string
      resetUrl?: string
    }

    if (!body.email) {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 },
      )
    }

    const result = await sendPasswordResetEmail({
      firstName: body.firstName,
      email: body.email,
      resetUrl: body.resetUrl,
    })

    return NextResponse.json({
      success: true,
      message: "Password reset email sent successfully.",
      id: result.data?.id,
    })
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to send password reset email."

    return NextResponse.json(
      { success: false, message },
      { status: 500 },
    )
  }
}
