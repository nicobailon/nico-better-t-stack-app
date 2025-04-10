/**
 * Content Management System Utility
 *
 * A centralized system for loading, caching, and managing JSON-based content
 * across the application. Provides strongly-typed interfaces and helper functions
 * for working with content from different sections.
 *
 * @module content
 */

// Content type definitions
export interface HeroContent {
  title: string
  subtitle: string
  description: string
  ctaPrimary: {
    text: string
    href: string
  }
  ctaSecondary: {
    text: string
    href: string
  }
  backgroundGradient: {
    from: string
    to: string
    opacity: number
  }
  animationSettings: {
    speed: 'slow' | 'normal' | 'fast'
    pattern: 'wave' | 'fade' | 'slide'
    intensity: number
  }
  imageUrl: string
  imageAlt: string
}

export interface FeatureItem {
  title: string
  description: string
  icon: string
}

export interface FeaturesContent {
  title: string
  subtitle: string
  description: string
  features: FeatureItem[]
  ctaText: string
  ctaLink: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  imageUrl: string
  socialLinks: {
    twitter?: string
    github?: string
    linkedin?: string
    dribbble?: string
    [key: string]: string | undefined
  }
}

export interface TeamContent {
  title: string
  subtitle: string
  description: string
  team: TeamMember[]
}

/**
 * Content types for use with loadContent
 */
export interface ContentTypes {
  hero: HeroContent
  features: FeaturesContent
  team: TeamContent
  // Add more content types as needed
}

/**
 * Generic function to load content from JSON files in the content directory
 *
 * This is the core function used by all content loaders. It dynamically imports
 * JSON files based on the section and content name parameters.
 *
 * @template T - The type of content being loaded
 * @param section - The section name (e.g., 'home', 'about')
 * @param contentName - The content file name without extension (e.g., 'hero', 'features')
 * @returns Promise that resolves to the content data of type T
 * @throws Error if the content file cannot be found or loaded
 */
export async function loadContent<T>(section: string, contentName: string): Promise<T> {
  try {
    // Using dynamic import to load JSON files
    const content = await import(`../content/${section}/${contentName}.json`);
    return content.default as T;
  }
  catch (error) {
    console.error(`Failed to load content: ${section}/${contentName}`, error);
    throw new Error(`Content not found: ${section}/${contentName}`);
  }
}

/**
 * Loads hero section content from the home directory
 *
 * @example
 * ```ts
 * const heroContent = await loadHeroContent();
 * console.log(heroContent.title); // "Build Better Web Experiences"
 * ```
 *
 * @returns Promise that resolves to the hero content data
 */
export async function loadHeroContent(): Promise<HeroContent> {
  return loadContent<HeroContent>('home', 'hero');
}

/**
 * Loads features section content from the home directory
 *
 * @example
 * ```ts
 * const featuresContent = await loadFeaturesContent();
 * console.log(featuresContent.features.length); // Gets number of features
 * ```
 *
 * @returns Promise that resolves to the features content data
 */
export async function loadFeaturesContent(): Promise<FeaturesContent> {
  return loadContent<FeaturesContent>('home', 'features');
}

/**
 * Loads team member information from the about directory
 *
 * @example
 * ```ts
 * const teamContent = await loadTeamContent();
 * const ceo = teamContent.team.find(member => member.role.includes('CEO'));
 * ```
 *
 * @returns Promise that resolves to the team content data
 */
export async function loadTeamContent(): Promise<TeamContent> {
  return loadContent<TeamContent>('about', 'team');
}

/**
 * Content cache type definition
 */
interface CachedContent<T> {
  data: T
  timestamp: number
}

/**
 * Cache for content data to improve performance
 * @private
 */
const contentCache: Record<string, CachedContent<any>> = {};

/**
 * Cache expiration time in milliseconds (5 minutes)
 * @constant
 */
const CACHE_EXPIRATION = 1000 * 60 * 5;

/**
 * Loads content with intelligent caching to improve performance
 *
 * This function wraps the loadContent function with caching logic to minimize unnecessary
 * file operations. It uses a caching strategy with expiration and manual refresh capability.
 *
 * @template T - The type of content being loaded
 * @param section - The section name (e.g., 'home', 'about')
 * @param contentName - The content file name without extension (e.g., 'hero', 'features')
 * @param forceRefresh - Optional flag to force a cache refresh even if the cache is valid
 * @returns Promise that resolves to the content data of type T, either from cache or freshly loaded
 * @example
 * ```ts
 * // Basic usage
 * const content = await loadContentWithCache('home', 'hero');
 *
 * // Force a refresh of cached content
 * const freshContent = await loadContentWithCache('home', 'hero', true);
 * ```
 */
export async function loadContentWithCache<T>(
  section: string,
  contentName: string,
  forceRefresh = false,
): Promise<T> {
  const cacheKey = `${section}:${contentName}`;
  const cachedItem = contentCache[cacheKey];

  // Check if we have a valid cached item
  if (
    !forceRefresh
    && cachedItem
    && cachedItem.timestamp > Date.now() - CACHE_EXPIRATION
  ) {
    return cachedItem.data as T;
  }

  // Load fresh content
  const content = await loadContent<T>(section, contentName);

  // Update cache
  contentCache[cacheKey] = {
    data: content,
    timestamp: Date.now(),
  };

  return content;
}
