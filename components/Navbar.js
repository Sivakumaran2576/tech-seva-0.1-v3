'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ListChecks, Users, Trophy, Disc3, ArrowUpRight, Timer } from 'lucide-react';
import styles from './nav.module.css';

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/problem-statements', label: 'Problems', icon: ListChecks },
  { href: '/participants', label: 'Participants', icon: Users },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/spin-wheel', label: 'Spin wheel', icon: Disc3 },
  { href: '/timer', label: 'Timer', icon: Timer }
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className={styles.nav} aria-label="Primary navigation">
      <div className={styles.links}>
        {links.map(({ href, label, icon: Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link className={`${styles.link} ${active ? styles.active : ''}`} href={href} key={href} aria-current={active ? 'page' : undefined}>
              <Icon size={17} strokeWidth={active ? 2.3 : 1.8} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
