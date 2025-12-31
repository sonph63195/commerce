export function trackEvent(name: string, payload?: Record<string, unknown>) {
  // Basic event dispatcher: prefer dataLayer (GA), fall back to window.__analytics if any, otherwise console.log
  if (typeof window !== 'undefined') {
    try {
      // Google Tag Manager / GA dataLayer
      if ((window as any).dataLayer) {
        (window as any).dataLayer.push({ event: name, ...payload });
        return;
      }

      // Common global analytics hooks
      if ((window as any).__analytics && typeof (window as any).__analytics.track === 'function') {
        (window as any).__analytics.track(name, payload);
        return;
      }
    } catch (err) {
      // ignore
    }
  }

  // fallback for dev
  // eslint-disable-next-line no-console
  console.log('trackEvent', name, payload ?? {});
}
