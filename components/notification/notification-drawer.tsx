"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, FileText, Settings } from "lucide-react";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  notifications as initialNotifications,
  notificationTabs,
  type NotificationItem,
  type NotificationTabId,
} from "@/lib/notifications";
import { cn, getInitials } from "@/lib/utils";

type NotificationDrawerProps = {
  variant?: "default" | "empty";
};

export function NotificationDrawer({
  variant = "default",
}: NotificationDrawerProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    variant === "empty" ? [] : initialNotifications,
  );
  const isEmpty = notifications.length === 0;

  const tabs = notificationTabs.map((tab) => ({
    ...tab,
    count: getNotificationsByTab(notifications, tab.id).length,
  }));

  function handleMarkAllAsRead() {
    setNotifications([]);
  }

  return (
    <section className="p-8 flex h-160 w-full flex-col gap-8 border border-border bg-background text-foreground">
      <header className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">
          Notifications
        </h2>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-8 rounded-full text-muted-foreground"
          aria-label="Notification settings"
        >
          <Settings className="size-4" aria-hidden="true" />
        </Button>
      </header>

      <Tabs defaultValue="unread" className="min-h-0 flex-1 gap-8">
        <TabsList
          variant="line"
          className="justify-start gap-1"
          aria-label="Notification filters"
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="group/tab-trigger flex-none gap-2 px-1 pb-3 text-sm font-semibold after:bg-primary data-[state=active]:text-primary hover:text-primary"
            >
              <span>{tab.label}</span>
              <Badge
                variant="secondary"
                className="px-2 py-0.5 text-xs font-medium group-data-[state=active]/tab-trigger:bg-primary/10 group-data-[state=active]/tab-trigger:text-primary hover:text-primary"
              >
                {tab.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => {
          const tabNotifications = getNotificationsByTab(notifications, tab.id);

          return (
            <TabsContent
              key={tab.id}
              value={tab.id}
              className="min-h-0 data-[state=active]:flex data-[state=active]:flex-1"
            >
              {tabNotifications.length === 0 ? (
                <EmptyNotifications />
              ) : (
                <NotificationList notifications={tabNotifications} />
              )}
            </TabsContent>
          );
        })}
      </Tabs>

      <footer className="flex h-16 items-center justify-end">
        <Button
          type="button"
          variant="ghost"
          onClick={handleMarkAllAsRead}
          className={cn(
            "text-primary",
            isEmpty && "text-muted-foreground",
          )}
          disabled={isEmpty}
        >
          <Check className="size-4" aria-hidden="true" />
          Mark All as Read
        </Button>
      </footer>
    </section>
  );
}

function getNotificationsByTab(
  notifications: NotificationItem[],
  tabId: NotificationTabId,
) {
  if (tabId === "unread") {
    return notifications.filter((notification) => notification.unread);
  }

  if (tabId === "read") {
    return notifications.filter((notification) => !notification.unread);
  }

  return notifications;
}

function EmptyNotifications() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2.5 text-center">
      <div className="relative size-50">
        <Image
          src="/notification/bell.png"
          alt="notification bell"
          fill
          sizes="200px"
          className="relative object-contain"
          priority={false}
        />
      </div>

      <div className="flex-col gap-1">
        <h3 className="text-xl font-semibold text-foreground">
          You're all caught up!
        </h3>
        <p className="text-sm text-muted-foreground">
          Check back later for new notifications.
        </p>
      </div>
    </div>
  );
}

function NotificationList({
  notifications,
}: {
  notifications: NotificationItem[];
}) {
  return (
    <div className="min-h-0 flex-1">
      <div className="h-full overflow-y-auto py-4">
        <ul className="grid gap-8">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className="relative grid grid-cols-[32px_1fr_8px] gap-3"
            >
              <div className="relative size-8 shrink-0">
                <Avatar>
                  <AvatarImage
                    src={notification.avatar}
                    alt={`${notification.name} avatar`}
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {getInitials(notification.name)}
                  </AvatarFallback>
                </Avatar>
                <AvatarBadge
                  className={cn(
                    "size-2.5 bg-muted-foreground",
                    notification.unread && "bg-emerald-500",
                  )}
                />
              </div>

              <div className="min-w-0 text-xs leading-tight">
                <div className="flex min-w-0 items-center gap-1.5">
                  <p className="truncate font-medium text-foreground">
                    {notification.name}
                  </p>
                  <span className="shrink-0 text-[10px] text-muted-foreground">
                    {notification.time}
                  </span>
                </div>
                <p className="mt-0.5 text-muted-foreground">
                  {notification.action}
                  {notification.target ? (
                    <>
                      {" "}
                      <span className="font-medium text-primary">
                        {notification.target}
                      </span>
                    </>
                  ) : null}
                </p>

                {notification.attachment ? (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded bg-red-50 text-red-500">
                      <FileText className="size-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 text-[11px] leading-tight">
                      <p className="truncate text-foreground">
                        {notification.attachment.name}
                      </p>
                      <p className="text-muted-foreground">
                        {notification.attachment.size}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>

              <span
                className={cn(
                  "mt-1 size-1.5 rounded-full bg-transparent",
                  notification.unread && "bg-emerald-500",
                )}
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
