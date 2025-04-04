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
    changeIntervalSeconds: 15,
  },
  argTypes: {
    changeIntervalSeconds: {
      control: { type: 'number' },
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
    videoId: 'In7e1knX7rQ',
  },
  argTypes: {
    videoId: { control: 'text' },
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
