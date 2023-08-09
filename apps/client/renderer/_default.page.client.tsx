import { hydrateRoot, createRoot } from 'react-dom/client';

import type { PageContextClient } from '@open-screen-shop/vite-plugin-ssr-utils';

import { PageShell } from './PageShell';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

let root: ReturnType<typeof createRoot> | undefined;

// This render() hook only supports SSR, see https://vite-plugin-ssr.com/render-modes for how to modify render() to support SPA
export async function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext;
  if (!Page)
    throw new Error(
      'Client-side render() hook expects pageContext.Page to be defined'
    );
  if (pageContext.isHydration) {
    const documentRoot = document.getElementById('react-root');
    if (!documentRoot) throw new Error('DOM element #react-root not found');
    root = hydrateRoot(
      documentRoot,
      <PageShell pageContext={pageContext}>
        <Page {...pageProps} />
      </PageShell>
    );
    await import('../src/on-client-init').then(({ onClientInit }) =>
      onClientInit()
    );
  } else {
    if (!root) throw new Error('DOM element #react-root not found');
    root.render(
      <PageShell pageContext={pageContext}>
        <Page {...pageProps} />
      </PageShell>,
    );
  }
}

/* To enable Client-side Routing:
// !! WARNING !! Before doing so, read https://vite-plugin-ssr.com/clientRouting */
export const clientRouting = true;
