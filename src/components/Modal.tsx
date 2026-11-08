import { useEffect, useRef, type ReactNode } from 'react'
import styled from 'styled-components'
import { colors } from '../lib/styles'
import Button from './Button'

const Dialog = styled.dialog`
  position: fixed;
  inset: 0;
  width: min(1100px, calc(100% - 32px));
  max-width: none;
  max-height: calc(100dvh - 32px);
  margin: auto;
  padding: 0;
  border: 1px solid ${colors.background};
  border-radius: clamp(24px, 4vw, 40px);
  overflow: auto;
  overscroll-behavior: contain;
  background: ${colors.text.white};
  color: ${colors.text.black};

  &::backdrop {
    background: color-mix(in srgb, ${colors.text.black} 65%, transparent);
    backdrop-filter: blur(6px);
  }
`

const CloseButton = styled(Button)`
  position: absolute;
  z-index: 1;
  top: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  padding: 0;
  border: 0;
  font-size: 28px;
  font-weight: 400;
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
    if (!open && element?.open) element.close()
  }, [open])

  return (
    <Dialog
      ref={dialog}
      aria-labelledby={labelledBy}
      onCancel={(event) => { event.preventDefault(); onClose() }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return
        const bounds = event.currentTarget.getBoundingClientRect()
        if (event.clientX < bounds.left || event.clientX > bounds.right ||
          event.clientY < bounds.top || event.clientY > bounds.bottom) onClose()
      }}
    >
      <CloseButton variant="secondary" aria-label="Close dialog" onClick={onClose} autoFocus>
        <span aria-hidden="true">×</span>
      </CloseButton>
      {children}
    </Dialog>
  )
}
