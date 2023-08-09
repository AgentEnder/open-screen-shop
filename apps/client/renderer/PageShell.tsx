import React from 'react';
import { PageContext } from '@open-screen-shop/vite-plugin-ssr-utils';
import './PageShell.scss';
import { Link } from './Link';
import { MinimumPageShell } from './MinimumPageShell';
import {
  SlSocialTwitter,
  SlSocialInstagram,
  SlSocialFacebook,
  SlPhone,
  SlEnvolope,
} from 'react-icons/sl';
import { Provider } from 'react-redux';
import { store } from '../src/state';

export function PageShell({
  children,
  pageContext,
}: {
  children: React.ReactNode;
  pageContext: PageContext;
}) {
  return (
    <Provider store={store}>
      <MinimumPageShell pageContext={pageContext}>
        <Page>
          <Navbar>
            <Link className="navitem" href="/">
              Home
            </Link>
            <Link className="navitem" href="/order">
              Custom Order
            </Link>
          </Navbar>
          <div className="content">{children}</div>
          <Footer />
        </Page>
      </MinimumPageShell>
    </Provider>
  );
}

function Navbar({ children }: { children?: React.ReactNode }) {
  return (
    <div
      className="navbar"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 1rem',
        height: '3rem',
        backgroundColor: '#eee',
        borderBottom: '1px solid #ddd',
      }}
    >
      <Link
        className="brand"
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textDecoration: 'none',
          color: 'inherit',
        }}
        href="/"
      >
        OSS
      </Link>
      <div
        className="navitems"
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Page({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="page"
      style={{
        display: 'grid',
        minHeight: '100vh',
        gridTemplateRows: 'auto 1fr auto',
      }}
    >
      {children}
    </div>
  );
}

function Footer() {
  return (
    <div
      className="footer"
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'start',
        backgroundColor: '#eee',
        width: '100%',
      }}
    >
      <FooterColumn>
        <FooterSectionTitle text="Socials" />
        <Link href="https://twitter.com">
          <SlSocialTwitter></SlSocialTwitter> Twitter
        </Link>
        <Link href="https://instagram.com">
          <SlSocialInstagram></SlSocialInstagram> Instagram
        </Link>
        <Link href="https://facebook.com">
          <SlSocialFacebook></SlSocialFacebook> Facebook
        </Link>
      </FooterColumn>
      <FooterColumn>
        <FooterSectionTitle text="Contact" />
        <Link href="mailto:ex@ex.com">
          <SlPhone></SlPhone> Email
        </Link>
        <Link href="tel:1234567890">
          <SlEnvolope></SlEnvolope> Phone
        </Link>
      </FooterColumn>
    </div>
  );
}

function FooterSectionTitle(p: { text?: string }) {
  return (
    <div
      style={{
        fontSize: '1.25rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
      }}
    >
      {p.text}
    </div>
  );
}

function FooterColumn(p?: { children?: React.ReactNode }) {
  return (
    <div
      className="footer-col"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      {p?.children}
    </div>
  );
}
