const onIdle = window.requestIdleCallback || window.requestAnimationFrame || (fn => setTimeout(fn, 50));

const getGA = () => window.ga || (() => {});

const trackEvent = (...args) => onIdle(() => getGA()('send', 'event', ...args));

export const trackEoi = blogSlug => trackEvent(blogSlug, 'starred', 'Blog');
