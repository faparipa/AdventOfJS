import Link from 'next/link';
import style from './amypage.module.css';
import Links24 from '@/lib/links24';

export default function AmyPage() {
  return (
    <>
      <ul className={style.container}>
        {Links24.map((link) => (
          <li key={link.num} className={style.link}>
            <Link href={link.href}>
              <img src={link.image} alt='bacground image' />
              <p>Challange #{link.num}</p>
              <h3>{link.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
