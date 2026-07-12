import { mergeClasses } from '@fv-ui/shared'

export interface ToastOptions {
  message: string
  type?: 'success' | 'warning' | 'danger' | 'accent'
  duration?: number
}

let toastContainer: HTMLDivElement | null = null

function getContainer(): HTMLDivElement {
  if (!toastContainer) {
    toastContainer = document.createElement('div')
    toastContainer.className = 'fv-toast-container'
    document.body.appendChild(toastContainer)
  }
  return toastContainer
}

export function Toast(options: ToastOptions): HTMLDivElement {
  const { message, type = 'accent', duration = 3000 } = options

  const container = getContainer()

  const toast = document.createElement('div')
  toast.className = mergeClasses('fv-toast', `fv-toast--${type}`)
  toast.textContent = message

  container.appendChild(toast)

  requestAnimationFrame(() => {
    toast.classList.add('show')
  })

  setTimeout(() => {
    toast.classList.remove('show')
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast)
      }
    }, 300)
  }, duration)

  return toast
}