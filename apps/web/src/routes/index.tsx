import type { HeroContent } from '@/lib/content';
import { Hero } from '@/components/ui/animated-hero'
import { FullScreenVideoBackground } from '@/components/ui/full-screen-video-background'
import { loadHeroContent } from '@/lib/content'
import { trpc } from '@/utils/trpc'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  const healthCheck = useQuery(trpc.healthCheck.queryOptions())
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load hero content from our content system
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true)
        const content = await loadHeroContent()
        setHeroContent(content)
      }
      catch (err) {
        console.error('Failed to load hero content:', err)
        setError(err instanceof Error ? err.message : 'Failed to load content')
      }
      finally {
        setIsLoading(false)
      }
    }

    fetchContent()
  }, [])

  return (
    <div>
      {/* Main Hero Section with Content System */}
      <div className="relative z-[2] flex">
        {error
          ? (
          <div className="container mx-auto text-center p-10">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
              <h2 className="text-red-600 text-xl font-medium mb-2">Failed to load content</h2>
              <p className="text-red-700">{error}</p>
              <button
                className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          </div>
          )
          : (
          <Hero content={heroContent} isLoading={isLoading} />
          )}
      </div>

      {/* Original Content Below */}
      <div className="relative z-[1] flex">
        <FullScreenVideoBackground videoId="R5GzVPZW8G0" scanlines={true} muted={true} loop={true} dynamicZoom={true} />
        <div className="container mx-auto max-w-3xl px-4 py-2 text-white self-center">
          <div className="grid gap-6">
          <section className="rounded-lg border p-4">
            <h2 className="mb-2 font-medium">API Status</h2>
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${healthCheck.data ? 'bg-green-500' : 'bg-red-500'}`}
              />
              <span className="text-muted-foreground text-sm">
                {healthCheck.isLoading
                  ? 'Checking...'
                  : healthCheck.data
                    ? 'Connected'
                    : 'Disconnected'}
              </span>
            </div>
          </section>

          <section>
            <h2 className="mb-3 font-medium">Core Features</h2>
            <ul className="grid grid-cols-2 gap-3">
              <FeatureItem
                title="Type-Safe API"
                description="End-to-end type safety with tRPC"
              />
              <FeatureItem
                title="Modern React"
                description="TanStack Router + TanStack Query"
              />
              <FeatureItem
                title="Fast Backend"
                description="Lightweight Hono server"
              />
              <FeatureItem
                title="Beautiful UI"
                description="TailwindCSS + shadcn/ui components"
              />
            </ul>
          </section>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureItem({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <li className="border-primary border-l-2 py-1 pl-3">
      <h3 className="font-medium">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </li>
  )
}
