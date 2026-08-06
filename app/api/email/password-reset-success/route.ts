import { NextResponse } from "next/server"

import { sendPasswordResetSuccessEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      firstName?: string
      email?: string
    }

    if (!body.email) {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 },
      )
    }

    const result = await sendPasswordResetSuccessEmail({
      firstName: body.firstName,
      email: body.email,
    })

    return NextResponse.json({
      success: true,
      message: "Password reset success email sent successfully.",
      id: result.data?.id,
    })
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to send password reset success email."

    return NextResponse.json({ success: false, message }, { status: 500 })
  }
}
