import type { ComponentPropsWithRef } from 'react'
import styled, { css } from 'styled-components'
import { colors } from '../lib/styles'

type ButtonProps = ComponentPropsWithRef<'button'> & {
  variant?: 'primary' | 'secondary' | 'tertiary'
}

const StyledButton = styled.button<{ $variant: NonNullable<ButtonProps['variant']> }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75em;
  width: fit-content;
  max-width: 100%;
  padding: 0.9em 1.5em;
  border: 1px solid ${colors.text.black};
  border-radius: 999px;
  background: ${colors.text.black};
  color: ${colors.text.white};
  font: inherit;
  font-weight: 700;
  line-height: 1.3;
  cursor: pointer;
  transition: background 180ms ease, color 180ms ease;

  &:hover:not(:disabled) {
    background: ${colors.background};
    color: ${colors.text.black};
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 5px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ $variant }) => $variant === 'secondary' && css`
    background: ${colors.background};
    color: ${colors.text.black};

    &:hover:not(:disabled) {
      background: ${colors.text.black};
      color: ${colors.text.white};
    }
  `}

  ${({ $variant }) => $variant === 'tertiary' && css`
    padding: 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    color: inherit;

    &::after {
      content: '';
      position: absolute;
      inset: auto 0 -3px;
      height: 1px;
      background: currentColor;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 220ms ease;
    }

    &:hover:not(:disabled) {
      background: transparent;
      color: inherit;
    }

    &:hover:not(:disabled)::after, &:focus-visible::after {
      transform: scaleX(1);
    }
  `}

  @media (prefers-reduced-motion: reduce) {
    &, &::after { transition: none; }
  }
`

export default function Button({ variant = 'primary', type = 'button', ...props }: ButtonProps) {
  return <StyledButton $variant={variant} type={type} {...props} />
}
