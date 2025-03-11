// 'use client';
// import { useState, useEffect } from 'react';
// import styles from './YoutubeApi.module.css';
// import VideoThumbnail from '@/components/YoutubeApi/VideoThumbnail';

// export default function YoutubeApiPage() {
//   const [data, setData] = useState(null);
//   const [selectedVideoId, setSelectedVideoId] = useState('');

//   // Fetch data from the backend API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/youtube-api');
//         const result = await response.json();
//         setData(result);
//         setSelectedVideoId(result.items[0].id.videoId); // Set the first video by default
//       } catch (error) {
//         console.error('Error fetching YouTube data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Handle video click
//   const handleVideoClick = (videoId) => {
//     setSelectedVideoId(videoId);
//   };

//   if (!data) {
//     return <div>Loading...</div>; // Show a loading message until data is fetched
//   }

//   const selectedVideo = data.items.find(
//     (video) => video.id.videoId === selectedVideoId
//   );

//   return (
//     <div className={styles.container}>
//       <div className={styles.wrapper}>
//         <header>
//           <img src='/logo.png' alt='YouTube' />
//         </header>

//         <div className={styles.feature}>
//           <div className={styles.embed}>
//             <iframe
//               width='100%'
//               height='500'
//               src={`https://www.youtube.com/embed/${selectedVideoId}`}
//               title='YouTube video player'
//               frameBorder='0'
//               allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
//               allowFullScreen
//             ></iframe>
//           </div>
//           <h1>{selectedVideo.snippet.title}</h1>
//           <p>{selectedVideo.snippet.description}</p>
//         </div>

//         <aside className={styles.aside}>
//           <ul className={styles.gallery}>
//             {data.items.map((video) => (
//               <VideoThumbnail
//                 key={video.id.videoId}
//                 video={video}
//                 onClick={handleVideoClick}
//               />
//             ))}
//           </ul>
//         </aside>
//       </div>
//     </div>
//   );
// }

import VideoDetails from '@/components/YoutubeApi/VideoDetails';

export default async function YoutubeApiPage() {
  const response = await fetch('http://localhost:3000/api/youtube-api');
  const data = await response.json();

  return <VideoDetails initialData={data} />;
}
