import type { HeroContent } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { MoveRight, PhoneCall } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface HeroProps {
  content?: HeroContent | null
  isLoading?: boolean
}

function Hero({ content, isLoading = false }: HeroProps) {
  const [titleNumber, setTitleNumber] = useState(0);

  // Default animation titles or use content from the JSON
  const titles = useMemo(
    () =>
      content?.subtitle.split(' ')
      || ['amazing', 'new', 'wonderful', 'beautiful', 'smart'],
    [content?.subtitle],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      }
      else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  // If loading, show a skeleton version
  if (isLoading) {
    return (
      <div className="w-full animate-pulse">
        <div className="container mx-auto">
          <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
            <div className="h-8 w-40 bg-gray-200 rounded"></div>
            <div className="flex gap-4 flex-col items-center">
              <div className="h-16 w-96 bg-gray-200 rounded"></div>
              <div className="h-8 w-48 bg-gray-200 rounded my-4"></div>
              <div className="h-24 w-96 bg-gray-200 rounded"></div>
            </div>
            <div className="flex flex-row gap-3">
              <div className="h-12 w-36 bg-gray-200 rounded"></div>
              <div className="h-12 w-36 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Gradient background style using content values
  const gradientStyle = content?.backgroundGradient
    ? {
      background: `linear-gradient(135deg, var(--${content.backgroundGradient.from}), var(--${content.backgroundGradient.to}))`,
      opacity: content.backgroundGradient.opacity,
    }
    : {};

  return (
    <div className="w-full">
      {content?.backgroundGradient && (
        <div
          className="absolute inset-0 -z-10"
          style={gradientStyle}
        />
      )}
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <Button variant="secondary" size="sm" className="gap-4">
              {content?.ctaSecondary.text || 'Read our launch article'}
{' '}
<MoveRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">{content?.title || 'This is something'}</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={title}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: '-100' }}
                    transition={{
                      type: 'spring',
                      stiffness: content?.animationSettings?.speed === 'fast'
                        ? 80
                        : content?.animationSettings?.speed === 'slow' ? 30 : 50,
                    }}
                    animate={
                      titleNumber === index
                        ? {
                          y: 0,
                          opacity: 1,
                        }
                        : {
                          y: titleNumber > index ? -150 : 150,
                          opacity: 0,
                        }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              {content?.description
                || 'Managing a small business today is already tough. Avoid further complications by ditching outdated, tedious trade methods. Our goal is to streamline SMB trade, making it easier and faster than ever.'}
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button size="lg" className="gap-4" variant="outline">
              {content?.ctaSecondary.text || 'Jump on a call'}
{' '}
<PhoneCall className="w-4 h-4" />
            </Button>
            <Button size="lg" className="gap-4">
              {content?.ctaPrimary.text || 'Sign up here'}
{' '}
<MoveRight className="w-4 h-4" />
            </Button>
          </div>
          {content?.imageUrl && (
            <div className="mt-8">
              <img
                src={content.imageUrl}
                alt={content.imageAlt}
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { Hero };
