import { supabase } from "@/integrations/supabase/client";

// Fetch an Airbnb iCal feed through the site backend, with browser-side cache
// so guests do not need to refresh if a temporary network retry is happening.

type ICalPayload = {
  dates: string[];
  fetchedAt?: string;
  source?: string;
  eventCount?: number;
};

type CachedICal = {
  dates: string[];
  fetchedAt: string;
  savedAt: number;
};

export type ICalSyncResult = {
  dates: string[];
  fetchedAt: string;
  source?: string;
  eventCount?: number;
  cacheFallback?: boolean;
};

const CACHE_TTL_MS = 12 * 60 * 60 * 1000;

const cacheKey = (url: string) => `otg.ical.${btoa(url).replace(/=+$/, "")}`;

export const getCachedICalBlocked = (url: string): string[] => {
  return getCachedICalSync(url)?.dates ?? [];
};

export const getCachedICalSync = (url: string): CachedICal | null => {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(cacheKey(url));
    if (!raw) return null;

    const cached = JSON.parse(raw) as CachedICal;
    if (!Array.isArray(cached.dates) || Date.now() - cached.savedAt > CACHE_TTL_MS) return null;
    return cached;
  } catch {
    return null;
  }
};

const saveCachedICalBlocked = (url: string, dates: string[], fetchedAt?: string) => {
  if (typeof window === "undefined") return;

  try {
    const value: CachedICal = {
      dates,
      fetchedAt: fetchedAt || new Date().toISOString(),
      savedAt: Date.now(),
    };
    localStorage.setItem(cacheKey(url), JSON.stringify(value));
  } catch {
    // Ignore storage errors; live sync still works without cache.
  }
};

const toKey = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const parseICSDate = (raw: string): Date => {
  // Supports YYYYMMDD and YYYYMMDDTHHMMSSZ
  const y = +raw.slice(0, 4);
  const m = +raw.slice(4, 6) - 1;
  const d = +raw.slice(6, 8);
  return new Date(y, m, d);
};

export const parseICS = (text: string): string[] => {
  const out = new Set<string>();
  const events = text.replace(/\r?\n[ \t]/g, "").split("BEGIN:VEVENT").slice(1);
  for (const ev of events) {
    const s = ev.match(/DTSTART[^:\n]*:([0-9]{8}(?:T[0-9]{6}Z?)?)/);
    const e = ev.match(/DTEND[^:\n]*:([0-9]{8}(?:T[0-9]{6}Z?)?)/);
    if (!s || !e) continue;
    const start = parseICSDate(s[1]);
    const end = parseICSDate(e[1]); // exclusive per iCal spec
    const cur = new Date(start);
    let guard = 0;
    while (cur < end && guard < 370) {
      out.add(toKey(cur));
      cur.setDate(cur.getDate() + 1);
      guard += 1;
    }
  }
  return [...out].sort();
};

export const fetchICalSync = async (url: string, options: { forceRefresh?: boolean } = {}): Promise<ICalSyncResult> => {
  const cached = getCachedICalSync(url);

  try {
    const { data, error } = await supabase.functions.invoke<ICalPayload>("fetch-ical", {
      body: { url, forceRefresh: options.forceRefresh === true },
    });

    if (error) throw error;
    if (!data || !Array.isArray(data.dates)) throw new Error("Calendar sync returned no dates");

    saveCachedICalBlocked(url, data.dates, data.fetchedAt);
    return {
      dates: data.dates,
      fetchedAt: data.fetchedAt || new Date().toISOString(),
      source: data.source,
      eventCount: data.eventCount,
    };
  } catch (error) {
    if (cached && cached.dates.length > 0) {
      return {
        dates: cached.dates,
        fetchedAt: cached.fetchedAt,
        source: "browser-cache",
        cacheFallback: true,
      };
    }
    throw error;
  }
};

export const fetchICalBlocked = async (url: string): Promise<string[]> => {
  const result = await fetchICalSync(url);
  return result.dates;
};
