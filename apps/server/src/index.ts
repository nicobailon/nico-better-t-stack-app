import process from 'node:process'
import { serve } from '@hono/node-server'
import { trpcServer } from '@hono/trpc-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { createContext } from './lib/context'
import { appRouter } from './routers/index'
import 'dotenv/config'

const app = new Hono()

app.use(logger())

app.use(
  '/*',
  cors({
    origin: process.env.CORS_ORIGIN || '',
    allowMethods: ['GET', 'POST', 'OPTIONS'],
  }),
)

app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
    createContext: (_opts, context) => {
      return createContext({ context })
    },
  }),
)

app.get('/', (c) => {
  return c.text('OK')
})

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.warn(`Server is running on http://localhost:${info.port}`)
  },
)
