import { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { colors } from '../lib/styles'
import heroVideo from '../assets/hero-animation-fast.mp4'
import heroStill from '../assets/hero-final.jpg'

const rainfall = keyframes`
  to { background-position: -24px 240px, -12px 360px; }
`

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
    transition: transform 1800ms ease-out;
  }

  video { visibility: ${({ $finished }) => $finished ? 'hidden' : 'visible'}; }

  @media (prefers-reduced-motion: reduce) {
    img { transform: scale(1.1); transition: none; }
    video { display: none; }
  }
`

const Atmosphere = styled.div`
  position: absolute;
  inset: 0;
  backdrop-filter: blur(1px);
  background: linear-gradient(90deg,
    color-mix(in srgb, ${colors.text.black} 64%, transparent),
    color-mix(in srgb, ${colors.text.black} 24%, transparent));

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.13;
    background-image:
      repeating-linear-gradient(100deg, transparent 0 39px, ${colors.text.white} 40px, transparent 41px 80px),
      repeating-linear-gradient(100deg, transparent 0 69px, ${colors.text.white} 70px, transparent 71px 130px);
    background-size: 180px 240px, 260px 360px;
    mask-image: repeating-linear-gradient(transparent 0 15px, ${colors.text.black} 25px 42px, transparent 65px 120px);
    animation: ${rainfall} 1.3s linear infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after { animation: none; }
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
