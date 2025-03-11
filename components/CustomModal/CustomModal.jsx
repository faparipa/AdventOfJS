import Link from 'next/link';
import styles from './CustomModal.module.css';
import Image from 'next/image';
export default function CustomModal({ handleClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={handleClose}>
          <img src='/close.svg' alt='Close' />
        </button>

        <div className={styles.content}>
          <h1>Elgato Key Lights</h1>
          <div className={styles.description}>
            <p>These lights are great if you shoot video at your desk.</p>
            <p>
              My desk is pushed up against the wall, so I didn’t have room for a
              large soft box. These lights still deliver on the look that I
              wanted. Plus, it comes with a desktop app where you can adjust the
              brightness and temperature.
            </p>
          </div>
          <Link
            href='http://amazon.com'
            passHref
            prefetch={false}
            className={styles.buyNow}
            target='_blank'
          >
            BUY NOW for $169.99
          </Link>
        </div>

        <div className={styles.productImage}>
          <Image
            src='/elgato-key-light.png'
            alt='Elgato Key Light'
            width={400} // specify dimensions
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
