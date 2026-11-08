import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { colors } from '../lib/styles'
import heroVideo from '../assets/hero-animation-fast.mp4'
import heroStill from '../assets/hero-final.jpg'
import grain from '../assets/grain.jpg'

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
    opacity: ${({ $finished }) => $finished ? 1 : 0};
    transform: scale(1.1);
    filter: blur(${({ $finished }) => $finished ? '6px' : '0px'});
    transition: filter 1200ms ease;
  }

  video {
    opacity: ${({ $finished }) => $finished ? 0 : 1};
    transition: opacity 1200ms ease;
  }

  @media (prefers-reduced-motion: reduce) {
    img { opacity: 1; filter: blur(6px); transition: none; }
    video { display: none; transition: none; }
  }
`

const Atmosphere = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg,
    color-mix(in srgb, ${colors.text.black} 64%, transparent),
    color-mix(in srgb, ${colors.text.black} 24%, transparent));

  &::after {
    content: '';
    position: absolute;
    inset: -1px;
    background: url(${grain}) center / cover no-repeat;
    mix-blend-mode: soft-light;
    opacity: 0.1;
    filter: blur(0.4px);
  }
`

export default function HeroBackground({ onReady }: { onReady: (ready: boolean) => void }) {
  const video = useRef<HTMLVideoElement>(null)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    const player = video.current
    if (!player) return

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const controller = new AbortController()
    let ready = false
    let fallback = false
    let frame = 0
    let timeout: ReturnType<typeof setTimeout>

    function updatePlayback() {
      if (preference.matches) {
        player?.pause()
      } else if (ready && !fallback && !player?.ended) {
        player?.play().catch(() => {
          if (!controller.signal.aborted) setFinished(true)
        })
      }
    }

    const videoReady = new Promise<void>((resolve) => {
      if (preference.matches || player.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA || player.error) {
        resolve()
        return
      }
      player.addEventListener('canplay', () => resolve(), { once: true, signal: controller.signal })
      player.addEventListener('error', () => resolve(), { once: true, signal: controller.signal })
      preference.addEventListener('change', () => {
        if (preference.matches) resolve()
      }, { signal: controller.signal })
    })

    const assetsReady = Promise.allSettled([
      ...[heroStill, grain].map((src) => {
        const image = new Image()
        image.src = src
        return image.decode()
      }),
      document.fonts.ready,
      videoReady,
    ])
    const loadingTimeout = new Promise<void>((resolve) => {
      timeout = setTimeout(() => {
        fallback = true
        setFinished(true)
        resolve()
      }, 10000)
    })

    Promise.race([assetsReady, loadingTimeout]).then(() => {
      clearTimeout(timeout)
      if (controller.signal.aborted) return
      // Preserve a painted loading state even when all assets are cached.
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          ready = true
          onReady(true)
          updatePlayback()
        })
      })
    })

    preference.addEventListener('change', updatePlayback, { signal: controller.signal })
    return () => {
      controller.abort()
      clearTimeout(timeout)
      cancelAnimationFrame(frame)
      player.pause()
    }
  }, [onReady])

  return (
    <Background $finished={finished} aria-hidden="true">
      <img src={heroStill} alt="" fetchPriority="high" />
      <video ref={video} src={heroVideo} muted playsInline preload="auto"
        onEnded={() => setFinished(true)} onError={() => setFinished(true)} />
      <Atmosphere />
    </Background>
  )
}
