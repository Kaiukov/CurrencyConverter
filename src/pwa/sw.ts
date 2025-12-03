/// <reference lib="webworker" />
// Minimal placeholder service worker (Vite handles registration when configured)
const sw = self as unknown as ServiceWorkerGlobalScope;

sw.addEventListener('install', () => {
  sw.skipWaiting();
});

sw.addEventListener('activate', () => {
  // no-op
});
