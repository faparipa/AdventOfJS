'use client';
import ResponsiveEmbed from '@/components/responsiveEmbed/ResponsiveEmbed';
import { useState } from 'react';

const YoutobeEmbedPage = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState('');

  const extractVideoId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|(?:\S*\?)?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleInputChange = (event) => {
    const inputUrl = event.target.value;
    setVideoUrl(inputUrl);
    const extractedId = extractVideoId(inputUrl);
    setVideoId(extractedId || '');
  };

  return (
    <div>
      <h2>Responsive YouTube Video Embed</h2>
      <h3>Enter YouTube Video URL</h3>
      <div style={{ width: '40rem', padding: '8px', margin: '3rem' }}>
        <input
          type='text'
          placeholder='Enter video Url'
          value={videoId}
          onChange={handleInputChange}
          style={{ width: '100%', padding: '8px' }}
        />
      </div>
      {videoId && <ResponsiveEmbed videoId={videoId} />}
    </div>
  );
};

export default YoutobeEmbedPage;
