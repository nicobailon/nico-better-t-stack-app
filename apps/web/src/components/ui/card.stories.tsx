import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card'

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Your new project will be created in your workspace.</p>
      </CardContent>
      <CardFooter>
        <Button>Create project</Button>
      </CardFooter>
    </Card>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>Manage your team members and their roles.</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">Add member</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>You have 3 team members.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  ),
}

export const Pricing: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Pro Plan</CardTitle>
        <CardDescription>$15/month</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2 text-sm">
          <li>✓ Unlimited projects</li>
          <li>✓ Advanced analytics</li>
          <li>✓ Priority support</li>
          <li>✓ Custom domain</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Upgrade to Pro</Button>
      </CardFooter>
    </Card>
  ),
}

export const Notification: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>System Update</CardTitle>
        <CardDescription>A new software update is available</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">Dismiss</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Version 2.0 contains important security fixes and performance improvements.</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Install Update</Button>
      </CardFooter>
    </Card>
  ),
}
