import Link from 'next/link';
import style from './page2021.module.css';
import Links21 from '@/lib/links21';

export default function AmyPage21() {
  return (
    <>
      <ul className={style.container}>
        {Links21.map((link) => (
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
