import { useEffect, useRef, type ReactNode } from 'react'
import styled, { keyframes } from 'styled-components'
import { colors } from '../lib/styles'

const Dialog = styled.dialog<{ $closing: boolean }>`
  position: fixed;
  inset: 0;
  width: min(500px, calc(100% - 32px));
  max-width: none;
  max-height: calc(100dvh - 32px);
  margin: auto;
  padding: 0;
  border: 0;
  border-radius: 20px;
  overflow: auto;
  overscroll-behavior: contain;
  background: transparent;
  color: ${colors.text.white};

  &::backdrop {
    background: color-mix(in srgb, ${colors.text.black} 65%, transparent);
    backdrop-filter: blur(10px);
  }

  &[open] {
    animation: ${({ $closing }) => $closing ? keyframes`
      from { opacity: 1; transform: translateY(0) scale(1); }
      to { opacity: 0; transform: translateY(12px) scale(0.97); }
    ` : keyframes`
      from { opacity: 0; transform: translateY(12px) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    `} 240ms ${({ $closing }) => $closing ? 'ease-in' : 'ease-out'} forwards;
  }

  &[open]::backdrop {
    animation: ${({ $closing }) => $closing ? keyframes`
      from { opacity: 1; }
      to { opacity: 0; }
    ` : keyframes`
      from { opacity: 0; }
      to { opacity: 1; }
    `} 240ms ${({ $closing }) => $closing ? 'ease-in' : 'ease-out'} forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    &[open], &[open]::backdrop { animation: none; }
  }
`

type ModalProps = {
  open: boolean
  onClose: () => void
  labelledBy: string
  children: ReactNode
}

export default function Modal({ open, onClose, labelledBy, children }: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const element = dialog.current
    if (open && !element?.open) element?.showModal()
    if (!open && element?.open) {
      let cancelled = false
      Promise.allSettled(element.getAnimations().map((animation) => animation.finished))
        .then(() => { if (!cancelled) element.close() })
      return () => { cancelled = true }
    }
  }, [open])

  return (
    <Dialog
      ref={dialog}
      $closing={!open}
      aria-labelledby={labelledBy}
      onCancel={(event) => { event.preventDefault(); onClose() }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return
        const bounds = event.currentTarget.getBoundingClientRect()
        if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) onClose()
      }}
    >
      {children}
    </Dialog>
  )
}
