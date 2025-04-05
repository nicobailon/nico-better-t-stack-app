import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateVideoStyles(zoom: number, darken: number, retro: boolean, scanlines: boolean): React.CSSProperties {
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: `translate(-50%, -50%) scale(${zoom})`,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.99,
    pointerEvents: 'none',
    filter: `brightness(${100 - darken}%) ${retro ? 'grayscale(100%) ' : ''}${scanlines ? 'contrast(1.1) saturate(1.2)' : ''}`,
  }
}
