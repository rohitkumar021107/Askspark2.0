/**
 * useFirebaseRTDB — Real Firebase RTDB with localStorage/BroadcastChannel fallback.
 * Keeps the same API surface so WebRTC, live class, and chat features continue working.
 */

import { get, onValue, push, ref, remove, set } from "firebase/database";
import { rtdb } from "../lib/firebase";

// ── Fallback helpers (BroadcastChannel + localStorage) ────────────────────

const BC_CHANNEL = "askspark_rtdb";
const STORE_KEY = "askspark_rtdb_store";

function getStore(): Record<string, unknown> {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
  } catch {
    return {};
  }
}

function setStore(store: Record<string, unknown>) {
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

function getAtPath(obj: Record<string, unknown>, parts: string[]): unknown {
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur == null || typeof cur !== "object") return undefined;
    cur = (cur as Record<string, unknown>)[p];
  }
  return cur;
}

function setAtPath(
  obj: Record<string, unknown>,
  parts: string[],
  value: unknown,
): void {
  let cur: Record<string, unknown> = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    if (cur[p] == null || typeof cur[p] !== "object") {
      cur[p] = {};
    }
    cur = cur[p] as Record<string, unknown>;
  }
  cur[parts[parts.length - 1]] = value;
}

function removeAtPath(obj: Record<string, unknown>, parts: string[]): void {
  if (parts.length === 0) return;
  let cur: Record<string, unknown> = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    if (cur[p] == null || typeof cur[p] !== "object") return;
    cur = cur[p] as Record<string, unknown>;
  }
  delete cur[parts[parts.length - 1]];
}

function broadcastLocal(path: string) {
  try {
    const bc = new BroadcastChannel(BC_CHANNEL);
    bc.postMessage({ path });
    bc.close();
  } catch {
    window.dispatchEvent(new CustomEvent("rtdb_change", { detail: { path } }));
  }
}

function fallbackSet(path: string, data: unknown): void {
  const store = getStore();
  const parts = path.split("/").filter(Boolean);
  setAtPath(store, parts, data);
  setStore(store);
  broadcastLocal(path);
}

function fallbackPush(path: string, data: unknown): string {
  const id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
  const store = getStore();
  const parts = [...path.split("/").filter(Boolean), id];
  setAtPath(store, parts, data);
  setStore(store);
  broadcastLocal(`${path}/${id}`);
  return id;
}

function fallbackGet(path: string): unknown {
  const store = getStore();
  const parts = path.split("/").filter(Boolean);
  return getAtPath(store, parts);
}

function fallbackRemove(path: string): void {
  const store = getStore();
  const parts = path.split("/").filter(Boolean);
  removeAtPath(store, parts);
  setStore(store);
  broadcastLocal(path);
}

function fallbackListen(
  path: string,
  callback: (value: unknown) => void,
): () => void {
  const parts = path.split("/").filter(Boolean);
  const read = () => {
    const store = getStore();
    return getAtPath(store, parts);
  };
  callback(read());

  const handleChange = (e: MessageEvent | CustomEvent) => {
    let changedPath: string;
    if (e instanceof MessageEvent) {
      changedPath = e.data?.path ?? "";
    } else {
      changedPath = (e as CustomEvent).detail?.path ?? "";
    }
    if (
      changedPath.startsWith(path) ||
      path.startsWith(changedPath.split("/").slice(0, parts.length).join("/"))
    ) {
      callback(read());
    }
  };

  let bc: BroadcastChannel | null = null;
  try {
    bc = new BroadcastChannel(BC_CHANNEL);
    bc.addEventListener("message", handleChange as EventListener);
  } catch {
    window.addEventListener("rtdb_change", handleChange as EventListener);
  }

  return () => {
    if (bc) {
      bc.removeEventListener("message", handleChange as EventListener);
      bc.close();
    } else {
      window.removeEventListener("rtdb_change", handleChange as EventListener);
    }
  };
}

// ── Public API ─────────────────────────────────────────────────────────────

export function rtdbSet(path: string, data: unknown): void {
  try {
    set(ref(rtdb, path), data).catch(() => fallbackSet(path, data));
  } catch {
    fallbackSet(path, data);
  }
}

export function rtdbPush(path: string, data: unknown): string {
  try {
    const newRef = push(ref(rtdb, path), data);
    return newRef.key ?? fallbackPush(path, data);
  } catch {
    return fallbackPush(path, data);
  }
}

/**
 * Synchronous get — reads from localStorage fallback (for legacy callers).
 * Use rtdbGetAsync for Firebase-backed async reads.
 */
export function rtdbGet(path: string): unknown {
  // Best-effort: try to return from localStorage fallback
  // Real-time data should use rtdbListen instead
  return fallbackGet(path);
}

/**
 * Async get — reads from Firebase RTDB with localStorage fallback.
 */
export async function rtdbGetAsync(path: string): Promise<unknown> {
  try {
    const snap = await get(ref(rtdb, path));
    return snap.val();
  } catch {
    return fallbackGet(path);
  }
}

export function rtdbRemove(path: string): void {
  try {
    remove(ref(rtdb, path)).catch(() => fallbackRemove(path));
  } catch {
    fallbackRemove(path);
  }
}

export function rtdbListen(
  path: string,
  callback: (value: unknown) => void,
): () => void {
  try {
    const unsubscribe = onValue(
      ref(rtdb, path),
      (snap) => callback(snap.val()),
      () => fallbackListen(path, callback),
    );
    return unsubscribe;
  } catch {
    return fallbackListen(path, callback);
  }
}
