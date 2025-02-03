'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const links = [
  { href: '/contact', path: 'Contact' },
  { href: '/2023', path: '2023' },
  { href: '/2024', path: '2024' },
];

export default function MainHeader() {
  const path = usePathname();
  console.log(path);

  return (
    <header id='main-header'>
      <div id='logo'>
        <Link href='/'>Advent Of JavaScript</Link>
      </div>
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={path.startsWith(link.href) ? 'active' : undefined}
              >
                {link.path}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
