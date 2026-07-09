// Fetch an Airbnb (or any) iCal feed and return blocked YYYY-MM-DD date strings.
// Uses a CORS proxy since browsers can't call airbnb.com directly.

const PROXY = "https://api.allorigins.win/raw?url=";

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
  const out: string[] = [];
  const events = text.split("BEGIN:VEVENT").slice(1);
  for (const ev of events) {
    const s = ev.match(/DTSTART[^:\n]*:([0-9T]+Z?)/);
    const e = ev.match(/DTEND[^:\n]*:([0-9T]+Z?)/);
    if (!s || !e) continue;
    const start = parseICSDate(s[1]);
    const end = parseICSDate(e[1]); // exclusive per iCal spec
    const cur = new Date(start);
    while (cur < end) {
      out.push(toKey(cur));
      cur.setDate(cur.getDate() + 1);
    }
  }
  return out;
};

export const fetchICalBlocked = async (url: string): Promise<string[]> => {
  const res = await fetch(PROXY + encodeURIComponent(url), { cache: "no-store" });
  if (!res.ok) throw new Error(`iCal fetch failed: ${res.status}`);
  const text = await res.text();
  return parseICS(text);
};
