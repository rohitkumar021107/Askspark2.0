import { useNavigate } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNotifications } from "../hooks/useNotifications";

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

const TYPE_ICONS: Record<string, string> = {
  call: "📞",
  class: "🎥",
  doubt_answered: "✅",
  new_doubt: "❓",
  call_request: "📲",
};

export default function NotificationBell() {
  const navigate = useNavigate();
  const { notifications, unreadCount, markRead, markAllRead } =
    useNotifications();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const recent = notifications.slice(0, 10);

  // Proper click-outside detection using mousedown on document
  useEffect(() => {
    if (!open) return;
    function handleOutsideClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    // Use mousedown so it fires before any click handlers on children
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  function handleNotificationClick(id: string, navigateTo: string) {
    markRead(id);
    setOpen(false);
    if (navigateTo) {
      navigate({ to: navigateTo as "/" });
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      data-ocid="notifications.panel"
    >
      {/* Bell button */}
      <button
        type="button"
        className="relative w-9 h-9 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-200"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Notifications"
        aria-expanded={open}
        aria-haspopup="true"
        data-ocid="notifications.open_modal_button"
      >
        <Bell className="w-4 h-4 text-foreground" />
        {/* Unread badge */}
        {unreadCount > 0 && (
          <span
            className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center px-1 animate-pulse"
            aria-label={`${unreadCount} unread notifications`}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <div
        className={`absolute top-full mt-2 right-0 w-80 sm:w-96 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl overflow-hidden z-[100] shadow-2xl transition-all duration-200 origin-top-right ${
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
        aria-label="Notifications"
        data-ocid="notifications.popover"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/20">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            <span className="font-bold text-sm text-foreground">
              Notifications
            </span>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold">
                {unreadCount} new
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              type="button"
              className="text-xs text-primary hover:text-primary/80 hover:underline transition-colors"
              onClick={markAllRead}
              data-ocid="notifications.secondary_button"
            >
              Mark all read
            </button>
          )}
        </div>

        {/* Notification list */}
        <div className="max-h-80 overflow-y-auto overscroll-contain">
          {recent.length === 0 ? (
            <div
              className="py-10 flex flex-col items-center gap-2 text-muted-foreground"
              data-ocid="notifications.empty_state"
            >
              <Bell className="w-8 h-8 opacity-30" />
              <span className="text-sm">No notifications yet</span>
              <span className="text-xs opacity-60">
                We&apos;ll notify you when something happens
              </span>
            </div>
          ) : (
            recent.map((n, idx) => (
              <button
                key={n.id}
                type="button"
                className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-white/10 active:bg-white/15 transition-colors border-b border-white/10 last:border-0 ${
                  n.read ? "opacity-50" : ""
                }`}
                onClick={() => handleNotificationClick(n.id, n.navigateTo)}
                data-ocid={`notifications.item.${idx + 1}`}
              >
                <span
                  className="text-base flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  {TYPE_ICONS[n.type] ?? "🔔"}
                </span>
                <div className="flex-1 min-w-0">
                  {n.title && (
                    <div className="text-sm font-semibold text-foreground truncate">
                      {n.title}
                    </div>
                  )}
                  <div className="text-sm text-foreground/80 leading-snug break-words">
                    {n.message}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {timeAgo(n.createdAt)}
                  </div>
                </div>
                {!n.read && (
                  <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5 animate-pulse" />
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
