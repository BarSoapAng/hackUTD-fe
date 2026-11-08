import { useId } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import styled from 'styled-components'
import { Body, BodyRegular, Header1, colors } from '../lib/styles'
import Modal from './Modal'

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 200px;
  gap: 16px;
  padding: 16px;

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
  min-width: 0;
`

const Heading = styled(Header1)`
  font-size: 30px;
  line-height: 1.05;
  overflow-wrap: anywhere;
`

const NumberLink = styled.a`
  display: inline-block;
  margin-top: 2px;
  color: inherit;
  font-size: 18px;
  font-weight: 700;
  text-underline-offset: 6px;
  overflow-wrap: anywhere;

  &:hover { color: ${colors.background}; }
`

const CodePanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-width: 0;
  text-align: center;
`

const CodeLink = styled.a`
  display: block;
  width: min(100%, 200px);
  border-radius: 16px;
  background: ${colors.text.white};
  box-shadow: 0 12px 30px color-mix(in srgb, ${colors.text.black} 15%, transparent);

  svg { display: block; width: 100%; height: auto; }
`

type MessageModalProps = {
  open: boolean
  onClose: () => void
  phone: string
  href: string
}

export default function MessageModal({ open, onClose, phone, href }: MessageModalProps) {
  const headingId = useId()

  return (
    <Modal open={open} onClose={onClose} labelledBy={headingId}>
      <Layout>
        <Details>
          <Heading as="h2" id={headingId}>Your first<br />Sprout starts here.</Heading>
          {phone ? (
            <div>
              <BodyRegular>or text</BodyRegular>
              <NumberLink href={href}>{phone}</NumberLink>
            </div>
          ) : <Body>Messaging will be available soon.</Body>}
          <BodyRegular>No new app. No account. Just iMessage.</BodyRegular>
        </Details>
        <CodePanel>
          {phone ? (
            <>
              <CodeLink href={href} aria-label="Open a pre-filled text message">
                <QRCodeSVG value={href} size={320} marginSize={4} fgColor={colors.text.black} bgColor={colors.text.white} />
              </CodeLink>
              <BodyRegular>Scan to create your Sprout.</BodyRegular>
            </>
          ) : <Body>A little knowledge.<br />Room to grow.</Body>}
        </CodePanel>
      </Layout>
    </Modal>
  )
}
