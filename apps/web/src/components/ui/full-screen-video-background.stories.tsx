import type { Meta } from '@storybook/react'
import type { FullScreenVideoBackgroundProps } from './full-screen-video-background'
import { BACKGROUND_VIDEOS } from '../../lib/video-data'
import { FullScreenVideoBackground } from './full-screen-video-background'

const meta: Meta<typeof FullScreenVideoBackground> = {
  title: 'ui/FullScreenVideoBackground',
  component: FullScreenVideoBackground,
  tags: ['autodocs'],
}

export default meta

export const Playlist = {
  args: {
    videos: BACKGROUND_VIDEOS,
    loop: true,
    muted: true,
    darken: 0,
    scanlines: false,
    retro: false,
    zoom: 1.2,
    positionFixed: false,
  },
  argTypes: {
    videos: {
      control: { type: 'object' },
      description: 'Array of videos to cycle through. If provided, will override videoId.',
    },
    videoId: {
      control: { type: 'text' },
      description: 'Single YouTube video ID to play. Will be ignored if videos array is provided.',
    },
    loop: {
      control: { type: 'boolean' },
      description: 'Whether the video should loop. Default: true',
      defaultValue: true,
    },
    changeIntervalSeconds: {
      control: { type: 'number', min: 1, max: 60, step: 1 },
      description: 'Interval in seconds for changing videos when using videos array. Default: 15',
      defaultValue: 15,
    },
    muted: {
      control: { type: 'boolean' },
      description: 'Whether the video should be muted. Default: true',
      defaultValue: true,
    },
    darken: {
      control: { type: 'number', min: 0, max: 1, step: 0.1 },
      description: 'Amount of dark overlay (0-1) to apply to the video. Default: 0',
      defaultValue: 0,
    },
    scanlines: {
      control: { type: 'boolean' },
      description: 'Whether to show scanline effect. Default: false',
      defaultValue: false,
    },
    retro: {
      control: { type: 'boolean' },
      description: 'Whether to show retro CRT effect. Default: false',
      defaultValue: false,
    },
    zoom: {
      control: { type: 'number', min: 1, max: 5, step: 0.1 },
      description: 'Zoom level of the video. Default: 1.2',
      defaultValue: 1.2,
    },
    dynamicZoom: {
      control: { type: 'boolean' },
      description: 'Whether to dynamically adjust zoom based on screen width. Default: false',
      defaultValue: false,
    },
    positionFixed: {
      control: { type: 'boolean' },
      description: 'Whether to use fixed positioning (true) or relative (false). Default: true',
      defaultValue: true,
    },
  },
  render: (args: FullScreenVideoBackgroundProps) => (
    <div className="relative h-screen w-screen">
      <FullScreenVideoBackground {...args} />
    </div>
  ),
  parameters: {
    chromatic: { disable: true },
  },
}

export const SingleVideo = {
  args: {
    videoId: 'R5GzVPZW8G0',
    muted: true,
    darken: 0,
    loop: true,
    changeIntervalSeconds: 15,
    scanlines: true,
    retro: false,
    zoom: 1.2,
    dynamicZoom: false,
    positionFixed: false,
  },
  argTypes: {
    videos: {
      control: { type: 'object' },
      description: 'Array of videos to cycle through. If provided, will override videoId.',
    },
    videoId: {
      control: { type: 'text' },
      description: 'Single YouTube video ID to play. Will be ignored if videos array is provided.',
    },
    loop: {
      control: { type: 'boolean' },
      description: 'Whether the video should loop. Default: true',
      defaultValue: true,
    },
    changeIntervalSeconds: {
      control: { type: 'number', min: 1, max: 60, step: 1 },
      description: 'Interval in seconds for changing videos when using videos array. Default: 15',
      defaultValue: 15,
    },
    muted: {
      control: { type: 'boolean' },
      description: 'Whether the video should be muted. Default: true',
      defaultValue: true,
    },
    darken: {
      control: { type: 'number', min: 0, max: 1, step: 0.1 },
      description: 'Amount of dark overlay (0-1) to apply to the video. Default: 0',
      defaultValue: 0,
    },
    scanlines: {
      control: { type: 'boolean' },
      description: 'Whether to show scanline effect. Default: false',
      defaultValue: false,
    },
    retro: {
      control: { type: 'boolean' },
      description: 'Whether to show retro CRT effect. Default: false',
      defaultValue: false,
    },
    zoom: {
      control: { type: 'number', min: 1, max: 5, step: 0.1 },
      description: 'Zoom level of the video. Default: 1.2',
      defaultValue: 1.2,
    },
    dynamicZoom: {
      control: { type: 'boolean' },
      description: 'Whether to dynamically adjust zoom based on screen width. Default: false',
      defaultValue: false,
    },
    positionFixed: {
      control: { type: 'boolean' },
      description: 'Whether to use fixed positioning (true) or relative (false). Default: true',
      defaultValue: true,
    },
  },
  render: (args: FullScreenVideoBackgroundProps) => (
    <div className="relative h-screen w-screen overflow-hidden">
      <FullScreenVideoBackground {...args} />
    </div>
  ),
  parameters: {
    chromatic: { disable: true },
  },
}
