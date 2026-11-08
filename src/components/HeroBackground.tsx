import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { colors } from '../lib/styles'
import heroVideo from '../assets/hero-animation-fast.mp4'
import heroStill from '../assets/hero-final.jpg'
import grain from '../assets/grain.avif'

const Background = styled.div<{ $finished: boolean }>`
  position: absolute;
  inset: 0;
  pointer-events: none;

  img, video {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  img {
    transform: scale(${({ $finished }) => $finished ? 1.1 : 1});
  }

  video { visibility: ${({ $finished }) => $finished ? 'hidden' : 'visible'}; }

  @media (prefers-reduced-motion: reduce) {
    img { transform: scale(1.1); }
    video { display: none; }
  }
`

const Atmosphere = styled.div`
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 clamp(24px, 4vmin, 56px)
    color-mix(in srgb, ${colors.text.white} 45%, transparent);
  background: linear-gradient(90deg,
    color-mix(in srgb, ${colors.text.black} 64%, transparent),
    color-mix(in srgb, ${colors.text.black} 24%, transparent));

  &::after {
    content: '';
    position: absolute;
    inset: -1px;
    background: url(${grain}) repeat;
    mix-blend-mode: screen;
    opacity: 0.28;
    filter: blur(0.4px);
  }
`

export default function HeroBackground() {
  const video = useRef<HTMLVideoElement>(null)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    function updatePlayback() {
      if (preference.matches) {
        video.current?.pause()
      } else if (!video.current?.ended) {
        video.current?.play().catch(() => setFinished(true))
      }
    }
    updatePlayback()
    preference.addEventListener('change', updatePlayback)
    return () => preference.removeEventListener('change', updatePlayback)
  }, [])

  return (
    <Background $finished={finished} aria-hidden="true">
      <img src={heroStill} alt="" fetchPriority="high" />
      <video ref={video} src={heroVideo} poster={heroStill} muted playsInline preload="auto"
        onEnded={() => setFinished(true)} onError={() => setFinished(true)} />
      <Atmosphere />
    </Background>
  )
}
