"use server";

import { redirect } from "next/navigation";

import { sendWelcomeEmail } from "@/lib/email";

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function sendWelcomeEmailAction(
  formData: FormData,
): Promise<void> {
  const firstName = getString(formData, "firstName") || "there";
  const email = getString(formData, "email");
  const password = getString(formData, "password") || "Passwrd2023#";

  if (!email) {
    console.error("Signup submission rejected because email is missing");
    return;
  }

  try {
    const { data } = await sendWelcomeEmail({
      firstName,
      email,
      password,
    });

    console.info("Welcome email sent for signup", {
      email,
      messageId: data?.id,
    });
  } catch (error) {
    console.error("Failed to send welcome email", { email, error });
    return;
  }

  redirect("/catalog");
}
