import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SITE, TITLE, DESC } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: '%s | Zhaivon Digital' },
  description: DESC,
  applicationName: 'Zhaivon Digital',
  keywords: ['web development agency India', 'website design', 'mobile app development', 'branding agency', 'digital marketing', 'SEO services', 'startup website', 'Zhaivon Digital'],
  authors: [{ name: 'Zhaivon Digital' }],
  creator: 'Zhaivon Digital',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: '/', siteName: 'Zhaivon Digital', title: TITLE, description: DESC, locale: 'en_IN' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  category: 'technology',
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#080A0F' };

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': `${SITE}/#org`, name: 'Zhaivon Digital', alternateName: 'Zhaivon', url: SITE, slogan: 'Rooting Innovations', logo: `${SITE}/logo.png`, email: 'hello@zhaivon.com', sameAs: [] /* TODO: add social profile URLs */ },
    { '@type': 'WebSite', '@id': `${SITE}/#website`, url: SITE, name: 'Zhaivon Digital', inLanguage: 'en', publisher: { '@id': `${SITE}/#org` } },
    { '@type': 'ProfessionalService', '@id': `${SITE}/#service`, name: 'Zhaivon Digital', url: SITE, image: `${SITE}/logo.png`, areaServed: { '@type': 'Country', name: 'India' }, parentOrganization: { '@id': `${SITE}/#org` },
      hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Services', itemListElement: ['Website, web app and mobile app development', 'Digital marketing and SEO', 'Branding and visual identity'].map((n) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: n } })) } },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Syne:wght@600;700&family=Noto+Sans+Tamil:wght@700&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
