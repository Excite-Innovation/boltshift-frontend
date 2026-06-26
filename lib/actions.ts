'use server';

import webpush, { type PushSubscription } from "web-push";

let isConfigured = false;

function configureWebPush() {
  if (isConfigured) {
    return;
  }

  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;

  if (!publicKey || !privateKey) {
    throw new Error("Missing VAPID keys.");
  }

  webpush.setVapidDetails("mailto:exciteinnovationltd@gmail.com", publicKey, privateKey);
  isConfigured = true;
}

let subscription: PushSubscription | null = null;

export async function subscribeUser(sub: PushSubscription) {
  subscription = sub;
  // In a production environment, you would want to store the subscription in a database
  // For example: await db.subscriptions.create({ data: sub })
  return { success: true };
}

export async function unsubscribeUser() {
  subscription = null;
  // In a production environment, you would want to remove the subscription from the database
  // For example: await db.subscriptions.delete({ where: { ... } })
  return { success: true };
}

export async function sendNotification(
  sub: PushSubscription,
  message = "This is a test notification from Boltshift.",
) {
  if (!sub) {
    throw new Error("No subscription available");
  }

  try {
    configureWebPush();

    await webpush.sendNotification(
      sub,
      JSON.stringify({
        title: "Test Notification",
        body: message,
        icon: "/icon.png",
        url: "/",
      }),
    );

    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}
