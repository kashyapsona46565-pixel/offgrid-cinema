const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type CacheValue = {
  dates: string[];
  eventCount: number;
  fetchedAt: string;
};

const memoryCache = new Map<string, { expiresAt: number; value: CacheValue }>();
const FRESH_CACHE_MS = 5 * 60 * 1000;
const STALE_CACHE_MS = 12 * 60 * 60 * 1000;

const toKey = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const unfoldICS = (text: string) => text.replace(/\r?\n[ \t]/g, "").replace(/\r/g, "");

const parseICSDate = (raw: string): Date => {
  const y = Number(raw.slice(0, 4));
  const m = Number(raw.slice(4, 6)) - 1;
  const d = Number(raw.slice(6, 8));
  return new Date(y, m, d);
};

const parseICS = (text: string): { dates: string[]; eventCount: number } => {
  const dates = new Set<string>();
  const events = unfoldICS(text).split("BEGIN:VEVENT").slice(1);

  for (const ev of events) {
    const s = ev.match(/DTSTART[^:\n]*:([0-9]{8}(?:T[0-9]{6}Z?)?)/);
    const e = ev.match(/DTEND[^:\n]*:([0-9]{8}(?:T[0-9]{6}Z?)?)/);
    if (!s || !e) continue;

    const start = parseICSDate(s[1]);
    const end = parseICSDate(e[1]);
    const cur = new Date(start);
    let guard = 0;

    while (cur < end && guard < 370) {
      dates.add(toKey(cur));
      cur.setDate(cur.getDate() + 1);
      guard += 1;
    }
  }

  return { dates: [...dates].sort(), eventCount: events.length };
};

const isAllowedAirbnbCalendar = (url: string) => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.hostname === "www.airbnb.com" && parsed.pathname.startsWith("/calendar/ical/");
  } catch {
    return false;
  }
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchCalendarText = async (url: string) => {
  let lastError = "Airbnb calendar did not respond";

  for (let attempt = 1; attempt <= 4; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 14000);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          Accept: "text/calendar,text/plain,*/*",
          "Cache-Control": "no-cache",
          "User-Agent": "Mozilla/5.0 OffTheGridVillasCalendarSync/1.0",
        },
      });

      if (response.ok) return await response.text();
      lastError = `Airbnb calendar returned ${response.status}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : "Airbnb calendar request failed";
    } finally {
      clearTimeout(timeout);
    }

    await wait(500 * attempt);
  }

  throw new Error(lastError);
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }

  try {
    const { url } = await req.json();

    if (typeof url !== "string" || !isAllowedAirbnbCalendar(url)) {
      return Response.json({ error: "Invalid Airbnb calendar URL" }, { status: 400, headers: CORS_HEADERS });
    }

    const cached = memoryCache.get(url);
    if (cached && cached.expiresAt > Date.now()) {
      return Response.json({ ...cached.value, source: "cache" }, { headers: CORS_HEADERS });
    }

    try {
      const text = await fetchCalendarText(url);
      const parsed = parseICS(text);
      const value = { ...parsed, fetchedAt: new Date().toISOString() };
      memoryCache.set(url, { expiresAt: Date.now() + FRESH_CACHE_MS, value });
      return Response.json({ ...value, source: "airbnb" }, { headers: CORS_HEADERS });
    } catch (error) {
      if (cached && cached.expiresAt > Date.now() - STALE_CACHE_MS) {
        return Response.json({ ...cached.value, source: "stale-cache" }, { headers: CORS_HEADERS });
      }
      throw error;
    }
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Calendar sync failed" },
      { status: 502, headers: CORS_HEADERS },
    );
  }
});