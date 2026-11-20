import { useEffect, useRef } from 'react';
import { SEOHead } from '../components/SEOHead';
import { isPrerender } from '../utils/prerender';
import '../styles/Screen.css';

const VIDEO_SRC = '/screen/screen_display.mp4';

export const Screen = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isPrerender()) return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.src = VIDEO_SRC;

    const play = () => {
      if (document.visibilityState === 'hidden') return;
      video.play().catch(() => {});
    };

    play();
    video.addEventListener('canplay', play);
    video.addEventListener('ended', play);
    document.addEventListener('visibilitychange', play);

    return () => {
      video.removeEventListener('canplay', play);
      video.removeEventListener('ended', play);
      document.removeEventListener('visibilitychange', play);
    };
  }, []);

  return (
    <>
      <SEOHead
        title="PT7"
        description="PT7 studio display."
        keywords="PT7"
        canonical="https://www.pt7.nl/screen/"
        robots="noindex, nofollow"
        ogTitle="PT7"
        ogDescription="PT7 studio display."
      />
      <div className="screen-display">
        <h1 className="screen-display-title">PT7</h1>
        <video
          ref={videoRef}
          className="screen-display-video"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          disablePictureInPicture
          aria-label="PT7"
        />
      </div>
    </>
  );
};
