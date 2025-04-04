# nico-better-t-stack-app

This project was created with [Better-T-Stack](https://github.com/better-t-stack/Better-T-Stack), a modern TypeScript stack that combines React, TanStack Router, Hono, tRPC, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **TanStack Router** - File-based routing with full type safety
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Hono** - Lightweight, performant server framework
- **tRPC** - End-to-end type-safe APIs
- **Node.js** - Runtime environment

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.

The API is running at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
nico-better-t-stack-app/
├── apps/
│   ├── web/         # Frontend application (React, TanStack Router)
│   └── server/      # Backend API (Hono, tRPC)
```

## Available Scripts

- `npm run dev`: Start both web and server in development mode
- `npm run build`: Build both web and server
- `npm run dev:web`: Start only the web application
- `npm run dev:server`: Start only the server
- `npm run check-types`: Check TypeScript types across all apps
