import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
const clean = (v: unknown, n: number) => String(v ?? '').replace(/[\r\u0000]/g, '').trim().slice(0, n);

// Sends enquiries through Resend (https://resend.com). Set RESEND_API_KEY and CONTACT_TO in .env.local.
// If they are missing this returns 503 and the form falls back to the visitor's email app.
export async function POST(req: Request) {
  let d: Record<string, unknown>;
  try { d = await req.json(); } catch { return NextResponse.json({ error: 'Bad request' }, { status: 400 }); }
  if (d.company) return NextResponse.json({ ok: true }); // honeypot: bots fill this
  const name = clean(d.name, 120), email = clean(d.email, 160), phone = clean(d.phone, 40);
  const brand = clean(d.brand, 120), service = clean(d.service, 60), message = clean(d.message, 4000);
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !message) return NextResponse.json({ error: 'Invalid' }, { status: 422 });
  const key = process.env.RESEND_API_KEY, to = process.env.CONTACT_TO;
  if (!key || !to) { console.warn('[contact] RESEND_API_KEY / CONTACT_TO not set'); return NextResponse.json({ error: 'Not configured' }, { status: 503 }); }
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || 'Zhaivon Website <onboarding@resend.dev>',
      to: [to], reply_to: email, subject: `New enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nBrand: ${brand}\nService: ${service}\n\n${message}`,
    }),
  });
  return r.ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: 'Send failed' }, { status: 502 });
}
