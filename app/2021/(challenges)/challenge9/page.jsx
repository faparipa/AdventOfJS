'use client';
import { useState } from 'react';
import styles from './Carousel.module.css';

const content = [
  {
    id: 1,
    image: 'dave-hoefler-okUIdo6NxGo-unsplash.jpg',
    caption: 'Photo by Dave Hoefler on Unsplash',
  },
  {
    id: 2,
    image: 'sherman-yang-VBBGigIuaDY-unsplash.jpg',
    caption: 'Photo by Sherman Yang on Unsplash',
  },
  {
    id: 3,
    image: 'jakob-owens-EwRM05V0VSI-unsplash.jpg',
    caption: 'Photo by Jakob Owens on Unsplash',
  },
  {
    id: 4,
    image: 'finding-dan-dan-grinwis-O35rT6OytRo-unsplash.jpg',
    caption: 'Photo by Dan Grinwis on Unsplash',
  },
  {
    id: 5,
    image: 'vincentiu-solomon-ln5drpv_ImI-unsplash.jpg',
    caption: 'Photo by Vincentiu Solomon on Unsplash',
  },
  {
    id: 6,
    image: 'silas-baisch-Wn4ulyzVoD4-unsplash.jpg',
    caption: 'Photo by Silas Baisch on Unsplash',
  },
  {
    id: 7,
    image: 'eugene-golovesov-EXdXp7Z4X4w-unsplash.jpg',
    caption: 'Photo by Eugene Golovesov on Unsplash',
  },
  {
    id: 8,
    image: 'jennifer-reynolds-_8HI5xf4TkE-unsplash.jpg',
    caption: 'Photo by Jennifer Reynolds on Unsplash',
  },
  {
    id: 9,
    image: 'kellen-riggin-SIBOiXKg0Ds-unsplash.jpg',
    caption: 'Photo by Kellen Riggin on Unsplash',
  },
  {
    id: 10,
    image: 'rafael-hoyos-weht-zhkAp8DGkxw-unsplash.jpg',
    caption: 'Photo by Rafael Hoyos on Unsplash',
  },
  {
    id: 11,
    image: 'sonya-romanovska-wzdXhyi3AiM-unsplash.jpg',
    caption: 'Photo by Sonya Romanovska on Unsplash',
  },
];

export default function CarouselPage() {
  // Az aktuálisan kijelölt kép indexe
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Kép kattintásra változik a kijelölt kép
  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
  };

  // Jobbra navigálás
  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % content.length);
  };

  // Balra navigálás
  const handlePrev = () => {
    setSelectedIndex(
      (prevIndex) => (prevIndex - 1 + content.length) % content.length
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.feature}>
        <img src={`/${content[selectedIndex].image}`} alt='Featured' />
        <div className={styles.caption}>{content[selectedIndex].caption}</div>
      </div>

      <div className={styles.thumbnails}>
        <ul>
          {content.map((image, index) => (
            <li
              key={image.id}
              className={selectedIndex === index ? styles.selected : ''}
              onClick={() => handleThumbnailClick(index)} // Kattintás kezelés
            >
              <a href='#'>
                <img src={`/${image.image}`} alt={image.caption} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Chevron navigáció */}
      <a href='#' className={styles.right} onClick={handleNext}>
        <img src='/chevron.svg' alt='chevron' />
      </a>
      <a href='#' className={styles.left} onClick={handlePrev}>
        <img src='/chevron.svg' alt='chevron' />
      </a>
    </div>
  );
}
