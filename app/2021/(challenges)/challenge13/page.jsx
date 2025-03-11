'use client';
import dynamic from 'next/dynamic';

const CustomModal = dynamic(
  () => import('@/components/CustomModal/CustomModal'),
  {
    ssr: false, // Ensure it's client-side only
  }
);
//import CustomModal from '@/components/CustomModal/CustomModal';
import styles from './CustomModal.module.css';
import { useState } from 'react';
import Link from 'next/link';

export default function CustomModalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal() {
    setIsModalOpen(true);
  }
  function handleClose() {
    setIsModalOpen(false);
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <svg
          className={styles.spot}
          viewBox='0 0 1440 1024'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
        >
          <image href='/bg.jpg' width='1440' height='1024' />
          <Link
            href='#'
            id='pinkCircle'
            className={styles.pinkCircle}
            onClick={handleOpenModal}
          >
            <circle
              className={styles.dot}
              cx='136.5'
              cy='113.5'
              r='17.5'
              id='elgato-keylight'
            />
            <circle
              id='my-circle'
              cx='136.5'
              cy='113.5'
              r='22'
              stroke='#F41E82'
              strokeWidth='6px'
              opacity='0'
            />
          </Link>
        </svg>
        {isModalOpen && <CustomModal handleClose={handleClose} />}
      </div>
    </div>
  );
}
