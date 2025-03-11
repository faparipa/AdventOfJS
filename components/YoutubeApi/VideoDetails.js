'use client';

import { useState } from 'react';

import styles from './YoutubeApi.module.css';
import VideoThumbnail from './VideoThumbnail';

export default function VideoDetails({ initialData }) {
  const [selectedVideoId, setSelectedVideoId] = useState(
    initialData.items[0].id.videoId
  );

  // Kattintás kezelése
  const handleVideoClick = (videoId) => {
    setSelectedVideoId(videoId);
  };

  const selectedVideo = initialData.items.find(
    (video) => video.id.videoId === selectedVideoId
  );

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header>
          <img src='/logo.png' alt='YouTube' />
        </header>

        <div className={styles.feature}>
          <div className={styles.embed}>
            <iframe
              width='100%'
              height='500'
              src={`https://www.youtube.com/embed/${selectedVideoId}`}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>
          <h1>{selectedVideo.snippet.title}</h1>
          <p>{selectedVideo.snippet.description}</p>
        </div>

        <aside className={styles.aside}>
          <ul className={styles.gallery}>
            {initialData.items.map((video) => (
              <VideoThumbnail
                key={video.id.videoId}
                video={video}
                onClick={handleVideoClick}
              />
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
