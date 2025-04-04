import type { Video } from '../../lib/video-data'
import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player/youtube'

export interface FullScreenVideoBackgroundProps {
  videos?: Video[]
  videoId?: string
  changeIntervalSeconds?: number
}

export function FullScreenVideoBackground({ videos, videoId, changeIntervalSeconds = 15 }: FullScreenVideoBackgroundProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const playerRef = useRef<ReactPlayer>(null)

  useEffect(() => {
    if (videos && !videoId) {
      const timer = setInterval(() => {
        setCurrentVideoIndex(prevIndex =>
          (prevIndex + 1) % videos.length,
        )
      }, changeIntervalSeconds * 1000)
      return () => clearInterval(timer)
    }
    else if (videoId && !videos) {
      const timer = setInterval(() => {
        playerRef.current?.seekTo(0)
      }, changeIntervalSeconds * 1000)
      return () => clearInterval(timer)
    }
  }, [videos, videoId, changeIntervalSeconds])

  const currentVideo = videoId
    ? { id: videoId, url: `https://www.youtube.com/watch?v=${videoId}` }
    : videos?.[currentVideoIndex]

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 h-full w-full overflow-hidden bg-black">
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <ReactPlayer
          ref={playerRef}
          url={currentVideo?.url}
          playing={true}
          loop={true}
          muted={true}
          controls={false}
          width="100%"
          height="100%"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1.2)',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.99,
          }}
          config={{
            playerVars: {
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
              iv_load_policy: 3,
              autoplay: 1,
              loop: 1,
              playlist: videoId || currentVideo?.id,
              controls: 0,
              disablekb: 1,
              fs: 0,
              playsinline: 1,
              enablejsapi: 1,
              origin: window.location.origin,
              widget_referrer: window.location.origin,
              cc_load_policy: 0, // Disable closed captions
              color: 'white', // Use white progress bar
              wmode: 'transparent',
            },
          }}
        />
      </div>
    </div>
  )
}
