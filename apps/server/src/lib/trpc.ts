import type { Context } from './context'
import { initTRPC } from '@trpc/server'

export const t = initTRPC.context<Context>().create()

export const router = t.router

export const publicProcedure = t.procedure
