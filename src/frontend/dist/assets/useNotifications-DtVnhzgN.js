import { c as createLucideIcon, r as reactExports, f as rtdbListen, i as rtdbSet, Q as rtdbPush } from "./index-CiicjzrK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
];
const Bell = createLucideIcon("bell", __iconNode);
const STORAGE_KEY = "askspark_notifications";
const MAX_NOTIFICATIONS = 50;
function getLocalNotifications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
function saveLocalNotifications(list) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(list.slice(0, MAX_NOTIFICATIONS))
  );
}
function addNotification(n, userId) {
  const id = `notif_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const entry = {
    ...n,
    id,
    read: false,
    createdAt: Date.now()
  };
  if (userId) {
    try {
      rtdbPush(`notifications/${userId}`, entry);
    } catch {
    }
  } else {
    const list = getLocalNotifications();
    const isDuplicate = list.some(
      (existing) => existing.type === n.type && existing.message === n.message && Date.now() - existing.createdAt < 5 * 60 * 1e3
    );
    if (isDuplicate) return;
    list.unshift(entry);
    saveLocalNotifications(list);
  }
}
function markRead(id, userId) {
  if (userId) {
    rtdbSet(`notifications/${userId}/${id}/read`, true);
  } else {
    const list = getLocalNotifications().map(
      (n) => n.id === id ? { ...n, read: true } : n
    );
    saveLocalNotifications(list);
  }
}
function useNotifications(userId) {
  const [notifications, setNotifications] = reactExports.useState(
    () => getLocalNotifications()
  );
  const unsubRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!userId) {
      saveLocalNotifications(notifications);
    }
  }, [notifications, userId]);
  reactExports.useEffect(() => {
    if (!userId) {
      let reload = function() {
        setNotifications(getLocalNotifications());
      };
      window.addEventListener("focus", reload);
      return () => window.removeEventListener("focus", reload);
    }
    unsubRef.current = rtdbListen(`notifications/${userId}`, (value) => {
      if (!value || typeof value !== "object") {
        setNotifications([]);
        return;
      }
      const map = value;
      const list = Object.entries(map).map(([key, val]) => ({ ...val, id: key })).sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0)).slice(0, MAX_NOTIFICATIONS);
      setNotifications(list);
    });
    return () => {
      var _a;
      (_a = unsubRef.current) == null ? void 0 : _a.call(unsubRef);
    };
  }, [userId]);
  const unreadCount = notifications.filter((n) => !n.read).length;
  function handleMarkRead(id) {
    if (userId) {
      markRead(id, userId);
    } else {
      setNotifications(
        (prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n)
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
  function handleAdd(n) {
    if (userId) {
      addNotification(n, userId);
    } else {
      const id = `notif_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const entry = {
        ...n,
        id,
        read: false,
        createdAt: Date.now()
      };
      setNotifications((prev) => {
        const isDuplicate = prev.some(
          (existing) => existing.type === n.type && existing.message === n.message && Date.now() - existing.createdAt < 5 * 60 * 1e3
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
    clearAll: handleClearAll
  };
}
export {
  Bell as B,
  useNotifications as u
};
