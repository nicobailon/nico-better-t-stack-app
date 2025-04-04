import type { Context as HonoContext } from 'hono'

export interface CreateContextOptions {
  context: HonoContext
}

export interface Context {
  session: null
}

export async function createContext(
  _context: CreateContextOptions,
): Promise<Context> {
  return {
    session: null,
  }
}
