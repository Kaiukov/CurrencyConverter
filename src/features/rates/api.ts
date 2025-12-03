import { RateRow, RateMap, SUPPORTED } from './types';
import sample from './sample.json';

const NBU_URL = 'https://bank.gov.ua/NBU_Exchange/exchange?json';

function normalize(rows: RateRow[]): RateMap {
  const map: RateMap = {
    UAH: { code: 'UAH', rate: 1, date: rows[0]?.StartDate || '' },
  };
  for (const row of rows) {
    const alpha = row.CurrencyCodeL.toUpperCase();
    const isNeeded = SUPPORTED.some((c) => c.code === alpha);
    if (!isNeeded) continue;
    const rate = row.Amount / row.Units;
    map[alpha] = { code: alpha, rate, date: row.StartDate };
  }
  return map;
}

async function fetchJson(): Promise<RateRow[]> {
  const res = await fetch(NBU_URL);
  if (!res.ok) throw new Error('NBU fetch failed');
  return (await res.json()) as RateRow[];
}

export async function fetchRates(): Promise<RateMap> {
  try {
    const live = await fetchJson();
    const normalized = normalize(live);
    localStorage.setItem('rates:last', JSON.stringify(normalized));
    return normalized;
  } catch (err) {
    console.warn('Using cached/sample rates', err);
    const cached = localStorage.getItem('rates:last');
    if (cached) {
      try {
        return JSON.parse(cached) as RateMap;
      } catch {
        /* ignore */
      }
    }
    return normalize(sample as RateRow[]);
  }
}
