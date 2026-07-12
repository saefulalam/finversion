import { mergeClasses } from '@fv-ui/shared'

export interface SkeletonProps {
  variant?: 'text' | 'title' | 'avatar' | 'card'
  width?: string
  height?: string
}

export function Skeleton(props: SkeletonProps): HTMLDivElement {
  const { variant = 'text', width, height } = props

  const skeleton = document.createElement('div')
  skeleton.className = mergeClasses(
    'fv-skeleton',
    variant !== 'text' && `fv-skeleton--${variant}`
  )

  if (width) skeleton.style.width = width
  if (height) skeleton.style.height = height

  return skeleton
}