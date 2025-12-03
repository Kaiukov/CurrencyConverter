# CurrencyPlus plan

## Screen cues from reference (captured 12:58, 3 Dec 2025)
- Last-updated label near the top; manual refresh control present.
- Currency rows show flag + code + value; right-hand quick-action icon; active base row highlighted (USD in screenshot).
- Screenshot shows fiat/crypto mix (UAH, GBP, USD, EUR, RON, SEK, ETH, BTC); **plan scope is fiat only** with 2-dec precision.
- Number formatting uses thin-space thousands separator and comma as decimal.
- Calculator-style keypad at bottom: C, digits 0-9, decimal comma, backspace, and basic ops (+, -, ×, ÷); keypad drives active-row input.
- Header has app name, hamburger menu, and an Edit action to manage currencies.

## Stack
- Frontend: React + TypeScript + Vite, Tailwind CSS, `useState` for local UI state, TanStack Query for server/cache state.
- PWA: installable, offline shell; localStorage for cached rates + user list/reorder.
- Backend: single fiat rates endpoint `https://bank.gov.ua/NBU_Exchange/exchange?json`; covers target set UAH (base implied), USD (840), EUR (978), GBP (826), RON (946), SEK (752).

## Requirements to implement next
- Coverage: all 30 pair directions across {UAH, GBP, USD, EUR, RON, SEK}; any row can act as base and convert to all others.
- Tap any row to set base; conversions recalc instantly for remaining rows.
- Manual refresh with timestamp label: "Updated: HH:mm, D MMM YYYY" and spinner/CTA.
- Per-row quick action (copy/share) and highlight active base row.
- Precision rules: fiat 2 decimals; keep thousand thin-space + decimal comma (allow dot override).
- Dark theme with flag icons; resilient to long currency names; edit mode to reorder/hide rows and persist locally.
- Calculator keypad drives base amount; clear/backspace before convert; basic ops (+, -, ×, ÷) on current input.

## Technical plan
- Query layer: TanStack Query fetches rates from NBU endpoint; cache with `staleTime` + manual refetch.
- Base handling: endpoint omits UAH (base); hardcode base rate 1.0 for calculations.
- Conversion formula: amount_target = amount_base * (rate_target / rate_base); must work for all 30 pair directions.
- Source strategy: keep NBU as primary (UAH base). Optional ECB feed (`eurofxref-daily.xml`, EUR base, ~16:00 CET) can act as fallback for USD/GBP/EUR/RON/SEK—only if same calendar date; normalize ECB rates to UAH via NBU's EUR→UAH.
- Data guardrails: reject mixed-day snapshots; if ECB missing or stale, stay on NBU cache; log when fallback used.
- State shape: { baseCode, amount, currencies[{code, precision, value}] }; derived conversions computed client-side.
- Storage: on successful fetch, persist rates + timestamp + visible order in localStorage for offline use; hydrate on load.
- Components: Header (menu, title, edit), UpdateBar (timestamp/refresh), CurrencyList (row, quick action, base toggle), Keypad.
- PWA: manifest + service worker caching static assets and last rates payload.
- Tests: conversion math, locale formatting, base switching, edit-mode reorder, offline hydration paths.

![alt text](image.png)
