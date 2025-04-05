import type { ErrorInfo } from 'react';
import type { Video } from '../../lib/video-data'
import debounce from 'lodash.debounce'
import React, { Component, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import { calculateVideoStyles } from '../../lib/utils'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Video player error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

function calculateZoom(width: number): number {
  const minWidth = 375;
  const maxWidth = 1850;
  const minZoom = 1.2;
  const maxZoom = 3.4;

  if (width >= maxWidth) {
    return minZoom;
  }
  if (width <= minWidth) {
    return maxZoom;
  }
  // Linear interpolation (decreasing zoom as width increases)
  return maxZoom - ((width - minWidth) / (maxWidth - minWidth)) * (maxZoom - minZoom);
}

export interface FullScreenVideoBackgroundProps {
  videos?: Video[]
  videoId?: string
  loop?: boolean
  changeIntervalSeconds?: number
  muted?: boolean
  darken?: number
  scanlines?: boolean
  retro?: boolean
  zoom?: number
  dynamicZoom?: boolean
  positionFixed?: boolean
}

export function FullScreenVideoBackground({ videos, videoId, loop = true, changeIntervalSeconds = 15, muted = true, darken = 0, scanlines = false, retro = false, zoom = 1.2, dynamicZoom = false, positionFixed = true }: FullScreenVideoBackgroundProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const playerRef = useRef<ReactPlayer>(null)
  const [currentZoom, setCurrentZoom] = useState(() =>
    dynamicZoom && typeof window !== 'undefined' ? calculateZoom(window.innerWidth) : zoom,
  )

  const updateZoom = useCallback(() => {
    if (typeof window !== 'undefined') {
      const newZoom = calculateZoom(window.innerWidth);
      setCurrentZoom(newZoom);
    }
  }, []);

  const debouncedUpdateZoom = useCallback(() => {
    return debounce(updateZoom, 100);
  }, [updateZoom]);

  useLayoutEffect(() => {
    if (dynamicZoom && typeof window !== 'undefined') {
      const debouncedZoomFn = debouncedUpdateZoom();

      const newZoom = calculateZoom(window.innerWidth);
      setCurrentZoom(newZoom);

      window.addEventListener('resize', debouncedZoomFn);
      return () => {
        window.removeEventListener('resize', debouncedZoomFn);
        debouncedZoomFn.cancel();
      };
    }
  }, [dynamicZoom, debouncedUpdateZoom]);

  useEffect(() => {
    if (videoId && !videos) {
      const timer = setInterval(() => {
        playerRef.current?.seekTo(0)
      }, changeIntervalSeconds * 1000)
      return () => clearInterval(timer)
    }
  }, [videos, videoId, changeIntervalSeconds])

  const currentVideo = videoId
    ? { id: videoId, url: `https://www.youtube.com/watch?v=${videoId}` }
    : videos?.[currentVideoIndex]

  // Handler needed to advance video index when 'videos' array is used.
  const handleVideoEnded = () => {
    if (videos && !videoId) {
      setCurrentVideoIndex(prevIndex => (prevIndex + 1) % videos.length);
    }
    // No action needed if it's a single videoId, as looping is handled by the player/useEffect.
  };

  return (
    <div className={`pointer-events-none inset-0 -z-10 h-full w-full overflow-hidden bg-black ${positionFixed ? 'fixed top-0 left-0 right-0 bottom-0' : ''}`}>
      <div>
        <ErrorBoundary
          fallback={(
            <div className="absolute inset-0 flex items-center justify-center bg-black/80">
              <p className="text-white/80">Video failed to load</p>
            </div>
          )}
        >
          <ReactPlayer
            ref={playerRef}
            url={currentVideo?.url}
            playing={true}
            loop={videoId ? loop : false}
            muted={muted}
            onEnded={handleVideoEnded}
            controls={false}
            playsinline={true}
            width="100%"
            height="100%"
            style={calculateVideoStyles(currentZoom, darken, retro, scanlines)}
            config={{
              playerVars: {
                modestbranding: 1,
                rel: 0,
                showinfo: 0,
                iv_load_policy: 3,
                autoplay: 1,
                loop: videoId ? 1 : 0,
                playlist: videoId || currentVideo?.id,
                controls: 0,
                disablekb: 1,
                fs: 0,
                playsinline: 1,
                enablejsapi: 1,
                origin: typeof window !== 'undefined' ? window.location.origin : '',
                widget_referrer: typeof window !== 'undefined' ? window.location.origin : '',
                cc_load_policy: 0, // Disable closed captions
                color: 'white', // Use white progress bar
                wmode: 'transparent',
              },
            }}
          />
        </ErrorBoundary>
      </div>

      {scanlines && !retro && (
        <>
          {/* Horizontal scanlines */}
          <div
            className="pointer-events-none absolute inset-0 h-full w-full z-[2]"
            style={{
              backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.15) 50%, transparent 50%)',
              backgroundSize: '100% 4px',
              mixBlendMode: 'multiply',
              opacity: 0.7,
            }}
          />

          {/* CRT vignette effect */}
          <div
            className="pointer-events-none absolute inset-0 h-full w-full z-[3]"
            style={{
              background: 'radial-gradient(circle at center, transparent 60%, rgba(0, 0, 0, 0.5) 100%)',
              mixBlendMode: 'normal',
            }}
          />

          {/* Occasional flicker animation */}
          <div
            className="pointer-events-none absolute inset-0 h-full w-full z-[4]"
            style={{
              animation: 'flicker 0.15s infinite alternate',
              background: 'rgba(255, 255, 255, 0.03)',
              opacity: 0,
            }}
          />

          <style>
            {`
            @keyframes flicker {
              0%, 95% {
                opacity: 0;
              }
              100% {
                opacity: 0.2;
              }
            }
            `}
          </style>
        </>
      )}

      {retro && (
        <>
          {/* Noise/grain overlay */}
          <div
            className="pointer-events-none absolute inset-0 h-full w-full z-[5]"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%\' height=\'100%\' filter=\'url(%23noiseFilter)\' opacity=\'0.2\'/%3E%3C/svg%3E")',
              mixBlendMode: 'overlay',
              opacity: 0.3,
            }}
          />

          {/* CRT vignette effect */}
          <div
            className="pointer-events-none absolute inset-0 h-full w-full z-[6]"
            style={{
              background: 'radial-gradient(circle at center, transparent 60%, rgba(0, 0, 0, 0.7) 100%)',
              mixBlendMode: 'multiply',
            }}
          />
        </>
      )}
    </div>
  )
}
