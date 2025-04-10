/**
 * Content management system utility
 * Provides functions to load and manage content from JSON files
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
 * Load content from JSON files
 * @param section - The section name (e.g., 'home', 'about')
 * @param contentName - The content file name without extension (e.g., 'hero', 'features')
 * @returns The content data from the JSON file
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
 * Load hero content
 * @returns Hero content data
 */
export async function loadHeroContent(): Promise<HeroContent> {
  return loadContent<HeroContent>('home', 'hero');
}

/**
 * Load features content
 * @returns Features content data
 */
export async function loadFeaturesContent(): Promise<FeaturesContent> {
  return loadContent<FeaturesContent>('home', 'features');
}

/**
 * Load team content
 * @returns Team content data
 */
export async function loadTeamContent(): Promise<TeamContent> {
  return loadContent<TeamContent>('about', 'team');
}

/**
 * Cache for content
 */
const contentCache: Record<string, any> = {};
const CACHE_EXPIRATION = 1000 * 60 * 5; // 5 minutes

/**
 * Load content with caching
 * @param section - The section name (e.g., 'home', 'about')
 * @param contentName - The content file name without extension (e.g., 'hero', 'features')
 * @param forceRefresh - Force refresh the cache
 * @returns The content data from the cache or file
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
