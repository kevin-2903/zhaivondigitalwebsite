import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Zhaivon Digital: Rooting Innovations';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const logo = 'data:image/png;base64,' + (await readFile(join(process.cwd(), 'public/logo.png'))).toString('base64');
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', background: '#080A0F', color: '#F5F2EE', display: 'flex', alignItems: 'center', padding: 80, gap: 60 }}>
        <img src={logo} width={380} height={380} alt="" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 110, fontWeight: 700, letterSpacing: -4 }}>Zhaivon</div>
          <div style={{ fontSize: 40, color: '#C9A84C', marginTop: 10 }}>Rooting Innovations</div>
          <div style={{ fontSize: 30, color: '#9CA3AF', marginTop: 28 }}>Websites, apps and branding for brands that want to be remembered.</div>
        </div>
      </div>
    ),
    size,
  );
}
