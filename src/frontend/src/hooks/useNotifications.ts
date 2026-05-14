import { useEffect, useRef, useState } from "react";
import { rtdbListen, rtdbPush, rtdbSet } from "./useFirebaseRTDB";

export interface AppNotification {
  id: string;
  type:
    | "call"
    | "class"
    | "doubt_answered"
    | "new_doubt"
    | "call_request"
    | string;
  title?: string;
  message: string;
  navigateTo: string;
  read: boolean;
  createdAt: number;
}

const STORAGE_KEY = "askspark_notifications";
const MAX_NOTIFICATIONS = 50;

function getLocalNotifications(): AppNotification[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as AppNotification[];
  } catch {
    return [];
  }
}

function saveLocalNotifications(list: AppNotification[]): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(list.slice(0, MAX_NOTIFICATIONS)),
  );
}

// Legacy standalone functions (used by some components)
export function getNotifications(): AppNotification[] {
  return getLocalNotifications();
}

export function addNotification(
  n: Omit<AppNotification, "id" | "read" | "createdAt">,
  userId?: string,
): void {
  const id = `notif_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const entry: AppNotification = {
    ...n,
    id,
    read: false,
    createdAt: Date.now(),
  };
  if (userId) {
    try {
      rtdbPush(`notifications/${userId}`, entry);
    } catch {
      /* ignore */
    }
  } else {
    const list = getLocalNotifications();
    // Deduplicate: skip if same type+message in last 5 minutes
    const isDuplicate = list.some(
      (existing) =>
        existing.type === n.type &&
        existing.message === n.message &&
        Date.now() - existing.createdAt < 5 * 60 * 1000,
    );
    if (isDuplicate) return;
    list.unshift(entry);
    saveLocalNotifications(list);
  }
}

export function markAllRead(userId?: string): void {
  if (!userId) {
    const list = getLocalNotifications().map((n) => ({ ...n, read: true }));
    saveLocalNotifications(list);
  }
}

export function markRead(id: string, userId?: string): void {
  if (userId) {
    rtdbSet(`notifications/${userId}/${id}/read`, true);
  } else {
    const list = getLocalNotifications().map((n) =>
      n.id === id ? { ...n, read: true } : n,
    );
    saveLocalNotifications(list);
  }
}

export function clearAllNotifications(userId?: string): void {
  if (!userId) {
    saveLocalNotifications([]);
  }
}

export function useNotifications(userId?: string) {
  const [notifications, setNotifications] = useState<AppNotification[]>(() =>
    getLocalNotifications(),
  );
  const unsubRef = useRef<(() => void) | null>(null);

  // Persist to localStorage whenever notifications state changes (non-RTDB mode)
  useEffect(() => {
    if (!userId) {
      saveLocalNotifications(notifications);
    }
  }, [notifications, userId]);

  useEffect(() => {
    if (!userId) {
      // Reload from localStorage when tab regains focus (cross-tab sync)
      function reload() {
        setNotifications(getLocalNotifications());
      }
      window.addEventListener("focus", reload);
      return () => window.removeEventListener("focus", reload);
    }

    // Real-time from RTDB
    unsubRef.current = rtdbListen(`notifications/${userId}`, (value) => {
      if (!value || typeof value !== "object") {
        setNotifications([]);
        return;
      }
      const map = value as Record<string, AppNotification>;
      const list = Object.entries(map)
        .map(([key, val]) => ({ ...val, id: key }))
        .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
        .slice(0, MAX_NOTIFICATIONS);
      setNotifications(list);
    });

    return () => {
      unsubRef.current?.();
    };
  }, [userId]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  function handleMarkRead(id: string) {
    if (userId) {
      markRead(id, userId);
      // RTDB version: state updates via listener
    } else {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
      );
    }
  }

  function handleMarkAllRead() {
    if (userId) {
      for (const n of notifications) {
        if (!n.read) rtdbSet(`notifications/${userId}/${n.id}/read`, true);
      }
    } else {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }
  }

  function handleAdd(n: Omit<AppNotification, "id" | "read" | "createdAt">) {
    if (userId) {
      addNotification(n, userId);
      // RTDB listener will update state
    } else {
      const id = `notif_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const entry: AppNotification = {
        ...n,
        id,
        read: false,
        createdAt: Date.now(),
      };
      setNotifications((prev) => {
        // Deduplicate
        const isDuplicate = prev.some(
          (existing) =>
            existing.type === n.type &&
            existing.message === n.message &&
            Date.now() - existing.createdAt < 5 * 60 * 1000,
        );
        if (isDuplicate) return prev;
        return [entry, ...prev].slice(0, MAX_NOTIFICATIONS);
      });
    }
  }

  function handleClearAll() {
    if (!userId) {
      setNotifications([]);
    }
  }

  return {
    notifications,
    unreadCount,
    markRead: handleMarkRead,
    markAllRead: handleMarkAllRead,
    addNotification: handleAdd,
    clearAll: handleClearAll,
  };
}
