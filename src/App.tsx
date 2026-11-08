import { useState } from 'react'
import styled from 'styled-components'
import { Body, Title, colors } from './lib/styles'
import Button from './components/Button'
import HeroBackground from './components/HeroBackground'
import MessageModal from './components/MessageModal'

const Page = styled.main`
  width: 100%;
  height: 100svh;
  height: 100dvh;
  overflow: hidden;
`

const Hero = styled.section`
  position: relative;
  isolation: isolate;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${colors.text.black};
  color: ${colors.text.white};
`

const Content = styled.div`
  position: relative;
  width: min(100%, 1120px);
  padding: clamp(24px, 6vw, 80px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: clamp(16px, 3dvh, 28px);

  @media (max-height: 450px) {
    padding-block: 16px;
    gap: 12px;
  }
`

const Heading = styled(Title)`
  max-width: 9ch;
  font-size: clamp(40px, min(8vw, 13dvh), 100px);
  line-height: 1.02;
  letter-spacing: -0.055em;
  overflow-wrap: anywhere;
`

const Description = styled(Body)`
  max-width: 29ch;
  text-wrap: pretty;
`

function App() {
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
        <Hero>
          <HeroBackground />
          <Content>
            <Heading>Meet Hypha.</Heading>
            <Description>Turn your notes into a Sprout anyone can text. Your knowledge, shared through iMessage.</Description>
            <Button onClick={startConversation}>Create a Sprout</Button>
          </Content>
        </Hero>
      </Page>
      <MessageModal open={modalOpen} onClose={() => setModalOpen(false)} phone={phone} href={smsHref} />
    </>
  )
}

export default App
