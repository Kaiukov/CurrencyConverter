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
  flag: string;
};

export const SUPPORTED: CurrencyMeta[] = [
  { code: 'UAH', name: 'Hryvnia', precision: 2, flag: '🇺🇦' },
  { code: 'GBP', name: 'Pound', precision: 2, flag: '🇬🇧' },
  { code: 'USD', name: 'Dollar', precision: 2, flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', precision: 2, flag: '🇪🇺' },
  { code: 'RON', name: 'Leu', precision: 2, flag: '🇷🇴' },
  { code: 'SEK', name: 'Krona', precision: 2, flag: '🇸🇪' },
];
