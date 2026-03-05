'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PushNotificationManager } from "@/components/push-notification-manager"
import  InstallPrompt  from "@/components/install-prompt"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-6">
      <PushNotificationManager />
      <InstallPrompt />
      {/* <Button>Click me</Button> */}
    </div>
  )
}
