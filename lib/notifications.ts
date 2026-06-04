export type NotificationTabId = "unread" | "read" | "all";

export type NotificationTab = {
  id: NotificationTabId;
  label: string;
  count: number;
};

export type NotificationItem = {
  id: number;
  name: string;
  avatar: string;
  time: string;
  action: string;
  target?: string;
  attachment?: {
    name: string;
    size: string;
  };
  unread: boolean;
};

export const notifications: NotificationItem[] = [
  {
    id: 1,
    name: "Phoenix Baker",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    time: "Just now",
    action: "Added a file to",
    target: "Marketing site redesign",
    attachment: {
      name: "Tech requirements.pdf",
      size: "720 KB",
    },
    unread: true,
  },
  {
    id: 2,
    name: "Demi Wilkinson",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91",
    time: "2 mins ago",
    action: "Invited Alisa Hester to the team",
    unread: true,
  },
  {
    id: 3,
    name: "Candice Wu",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    time: "3 hours ago",
    action: "Commented in",
    target: "Marketing site redesign",
    unread: true,
  },
  {
    id: 4,
    name: "Candice Wu",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    time: "3 hours ago",
    action: "Was added to Marketing site redesign",
    unread: false,
  },
  {
    id: 5,
    name: "Natali Craig",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    time: "6 hours ago",
    action: "Added 3 labels to the project Marketing site redesign",
    unread: true,
  },
  {
    id: 6,
    name: "Natali Craig",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    time: "6 hours ago",
    action: "Invited Lana Steiner to the team",
    unread: false,
  },
];

export function getNotificationsByTab(tabId: NotificationTabId) {
  if (tabId === "unread") {
    return notifications.filter((notification) => notification.unread);
  }

  if (tabId === "read") {
    return notifications.filter((notification) => !notification.unread);
  }

  return notifications;
}

export const notificationTabs: NotificationTab[] = [
  {
    id: "unread",
    label: "Unread",
    count: getNotificationsByTab("unread").length,
  },
  {
    id: "read",
    label: "Read",
    count: getNotificationsByTab("read").length,
  },
  {
    id: "all",
    label: "All",
    count: getNotificationsByTab("all").length,
  },
];
