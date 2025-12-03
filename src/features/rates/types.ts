export type RateRow = {
  StartDate: string;
  TimeSign: string;
  CurrencyCode: string; // numeric ISO
  CurrencyCodeL: string; // alpha ISO
  Units: number;
  Amount: number; // price in UAH for Units
};

export type RateMap = Record<string, { code: string; rate: number; date: string }>;

export type CurrencyMeta = {
  code: string;
  name: string;
  precision: number;
  flagCode: string; // ISO country/region for flag-icons
};

export const SUPPORTED: CurrencyMeta[] = [
  { code: 'UAH', name: 'Hryvnia', precision: 2, flagCode: 'ua' },
  { code: 'GBP', name: 'Pound', precision: 2, flagCode: 'gb' },
  { code: 'USD', name: 'Dollar', precision: 2, flagCode: 'us' },
  { code: 'EUR', name: 'Euro', precision: 2, flagCode: 'eu' },
  { code: 'RON', name: 'Leu', precision: 2, flagCode: 'ro' },
  { code: 'SEK', name: 'Krona', precision: 2, flagCode: 'se' },
];
