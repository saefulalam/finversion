import { mergeClasses } from '@fv-ui/shared'

export interface AvatarProps {
  initials?: string
  src?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Avatar(props: AvatarProps): HTMLDivElement {
  const { initials = '', src, size = 'md' } = props

  const avatar = document.createElement('div')
  avatar.className = mergeClasses(
    'fv-avatar',
    size !== 'md' && `fv-avatar--${size}`
  )

  if (src) {
    const img = document.createElement('img')
    img.src = src
    img.alt = initials
    avatar.appendChild(img)
  } else {
    avatar.textContent = initials
  }

  return avatar
}