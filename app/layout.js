import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'TECH SEVA 1.0 — Innovate Today, Serve Tomorrow',
  description: 'The SRM Madurai College hardware hackathon coordination platform.',
  icons: { icon: '/techseva-icon.png' }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="site-noise" aria-hidden="true" />
        <Navbar />
        <main className="site-main">{children}</main>
      </body>
    </html>
  );
}
