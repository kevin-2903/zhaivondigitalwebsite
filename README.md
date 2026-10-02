# Zhaivon Digital (Next.js)

    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

- **Projects:** edit `lib/projects.ts` (name, category, result, year, `image` screenshot URL, live `url`). Add the remaining projects there.
- **WhatsApp:** replace `910000000000` in `components/WhatsApp.tsx` with your number (country code first, digits only).
- **Contact details:** `components/Footer.tsx` (phone, socials) and the email links in `Footer.tsx` / `CTA.tsx`.
- **Testimonials:** the `T` array in `lib/site.ts` (sample copy for now).
- **Logo:** `public/logo-mask.png` is a transparent mask of the tiger logo, tinted by CSS (`--logo` in `app/globals.css`). `app/icon.png` is the favicon.
- **Motion:** `lib/site.ts` holds all GSAP/ScrollTrigger logic; `components/Motion.tsx` starts it.

## Form
`components/Form.tsx` posts to `app/api/contact/route.ts`. Copy `.env.example` to `.env.local` and set `RESEND_API_KEY` and `CONTACT_TO` (Resend, free tier works). Without them the form opens the visitor's email app instead.

## SEO
- Set `NEXT_PUBLIC_SITE_URL` to your real domain (sitemap, canonical, Open Graph and schema all use it).
- Metadata, Open Graph and Twitter cards: `app/layout.tsx` and `lib/seo.ts`. JSON-LD (Organization, WebSite, ProfessionalService) is in `app/layout.tsx`; add your social URLs to `sameAs`.
- `app/sitemap.ts`, `app/robots.ts` and `app/opengraph-image.tsx` are generated automatically.
- After launch: add the site to Google Search Console (set `GOOGLE_SITE_VERIFICATION`), submit `/sitemap.xml` and add a Google Business Profile.
