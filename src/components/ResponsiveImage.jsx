import { getImage } from '../utils/images.js'

// Responsive <img> for an optimized image key. Explicit width/height keep the
// layout stable while the file loads; lazy loading is the default because
// only the portrait and first project cover are above the fold.
function ResponsiveImage({
  image,
  alt,
  sizes = '100vw',
  className = '',
  priority = false,
  style,
}) {
  const data = getImage(image)

  return (
    <img
      src={data.src}
      srcSet={data.srcSet}
      sizes={sizes}
      width={data.width}
      height={data.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={className}
      style={style}
    />
  )
}

export default ResponsiveImage
