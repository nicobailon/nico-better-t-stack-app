import type { Meta, StoryObj } from '@storybook/react'
import { toast } from 'sonner'
import { Button } from './button'
import { Toaster } from './sonner'

const meta = {
  title: 'UI/Toaster',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <>
      <Button onClick={() => toast('Event has been created')}>Show Toast</Button>
      <Toaster />
    </>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <>
      <Button
        onClick={() =>
          toast('Event Created', {
            description: 'Your event has been successfully created.',
          })}
      >
        With Description
      </Button>
      <Toaster />
    </>
  ),
}

export const Success: Story = {
  render: () => (
    <>
      <Button
        onClick={() =>
          toast.success('Success!', {
            description: 'Your changes have been saved.',
          })}
      >
        Success Toast
      </Button>
      <Toaster />
    </>
  ),
}

export const Error: Story = {
  render: () => (
    <>
      <Button
        variant="destructive"
        onClick={() =>
          toast.error('Error!', {
            description: 'There was a problem with your request.',
          })}
      >
        Error Toast
      </Button>
      <Toaster />
    </>
  ),
}

export const WithAction: Story = {
  render: () => (
    <>
      <Button
        onClick={() =>
          toast('File deleted', {
            description: 'The file has been deleted.',
            action: {
              label: 'Undo',
              onClick: () => console.warn('Undo action clicked'),
            },
          })}
      >
        With Action
      </Button>
      <Toaster />
    </>
  ),
}
