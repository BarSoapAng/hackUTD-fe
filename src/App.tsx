import { Fragment, useState } from 'react'
import styled from 'styled-components'
import { Body, Title, colors } from './lib/styles'
import Button from './components/Button'
import HeroBackground from './components/HeroBackground'
import MessageModal from './components/MessageModal'

const Page = styled.main`
  width: 100%;
  height: 100svh;
  height: 100dvh;
  padding: max(12px, env(safe-area-inset-top)) max(12px, env(safe-area-inset-right))
    max(12px, env(safe-area-inset-bottom)) max(12px, env(safe-area-inset-left));
  background: ${colors.text.white};
  overflow: hidden;
`

const Hero = styled.section`
  position: relative;
  isolation: isolate;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  place-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${colors.text.black};
  color: ${colors.text.white};
`

const Header = styled.header`
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: clamp(12px, 2vw, 20px) clamp(16px, 3vw, 40px);

  > button {
    justify-self: end;
    min-height: 44px;
    font-size: clamp(12px, 2vw, 16px);
    line-height: 1;
    white-space: nowrap;
  }
`

const Brand = styled(Title)`
  display: flex;
  align-items: center;
  min-height: 44px;
  font-size: clamp(24px, 3vw, 32px);
  line-height: 1;
  letter-spacing: -0.04em;
`

const Content = styled.div`
  position: relative;
  width: min(100%, 1120px);
  padding: clamp(16px, 3vw, 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: clamp(16px, 3dvh, 28px);

  @media (max-height: 450px) {
    padding-block: 16px;
    gap: 12px;
  }
`

const Heading = styled(Title)<{ $ready: boolean }>`
  max-width: 15ch;
  font-size: clamp(40px, min(8vw, 13dvh), 100px);
  line-height: 1.02;
  letter-spacing: -0.055em;
  overflow-wrap: anywhere;
  text-wrap: balance;
  > span {
    display: inline-block;
    opacity: ${({ $ready }) => $ready ? 1 : 0};
    transform: translateY(${({ $ready }) => $ready ? '0' : '32px'});
    transition: opacity 1200ms ease, transform 1400ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  @media (prefers-reduced-motion: reduce) {
    > span {
      transform: none;
      transition: none;
    }
  }
`

const Description = styled(Body)`
  max-width: 42ch;
  text-wrap: pretty;
`

function App() {
  const [ready, setReady] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const phone = import.meta.env.VITE_SMS_PHONE?.trim() || '+1 628-316-6196'
  const message = import.meta.env.VITE_SMS_MESSAGE || "Hi Hypha! I'd like to create a Sprout."
  const smsHref = `sms:${phone.replace(/[^+\d]/g, '')}?&body=${encodeURIComponent(message)}`

  function startConversation() {
    if (phone && /Android|iPhone|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = smsHref
    } else {
      setModalOpen(true)
    }
  }

  return (
    <>
      <Page>
        <Hero aria-busy={!ready} inert={!ready}>
          <HeroBackground onReady={setReady} />
          <Header>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 21v-8M12 17C6 17 3 14 3 8c6 0 9 3 9 9ZM12 13c0-6 3-10 9-10 0 6-3 10-9 10ZM8 21h8" />
            </svg>
            <Brand as="p">Hypha</Brand>
            <Button variant="tertiary" onClick={startConversation}>Try a demo</Button>
          </Header>
          <Content>
            <Heading $ready={ready}>
              {'Make something worth texting.'.split(' ').map((word, index) => (
                <Fragment key={word}>
                  <span style={{ transitionDelay: `${index * 100}ms` }}>{word}</span>{' '}
                </Fragment>
              ))}
            </Heading>
            <Description>Build an iMessage agent for your people, your projects, or your next big idea. Just tell HIFA what you have in mind.</Description>
            <Button onClick={startConversation}>Start with a text</Button>
          </Content>
        </Hero>
      </Page>
      <MessageModal open={modalOpen} onClose={() => setModalOpen(false)} phone={phone} href={smsHref} />
    </>
  )
}

export default App
