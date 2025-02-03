import Link from 'next/link';
import style from './amypage.module.css';
import Links from '@/lib/links';

export default function AmyPage() {
  return (
    <>
      <ul className={style.container}>
        {Links.map((link) => (
          <li key={link.num} className={style.link}>
            <Link href={link.href}>
              <img src='/AdventOfJs2024.png' alt='bacground image' />
              <p>Challange #{link.num}</p>
              <h3>{link.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
