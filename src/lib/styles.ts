import styled, { createGlobalStyle } from "styled-components";
import { mediaQueries } from "./responsive";

export const colors = {
  text: {
    white: "#ffffff",
    black: "#3b291f"
  },
  background: "#d8bea0",
  accent: "#6b8e45"
};

export const GlobalStyle = createGlobalStyle`
  :root {
    font-family: "DM Sans", sans-serif;
    color: ${colors.text.black};
    background: ${colors.background};
  }

  button, input, select, textarea {
    font-family: inherit;
  }
`;

export const Title = styled.h1`
  margin: 0px;
  font-family: "Maison Neue Bold", sans-serif;
  font-size: 56px;
  font-weight: 700;
  line-height: 145%;
  letter-spacing: 0%;

  ${mediaQueries.tablet} {
    font-size: 36px;
    font-weight: 700;
    line-height: 120%;
  }
`;

export const Header1 = styled.h1`
  margin: 0px;
  font-family: "Maison Neue Bold", sans-serif;
  font-style: normal;
  font-size: 48px;
  font-weight: 700;
  line-height: 120%;
  letter-spacing: -0.02em;

  ${mediaQueries.tablet} {
    font-size: 36px;
  }

  ${mediaQueries.largeMobile} {
    font-size: 24px;
  }
`;

export const Header2 = styled.h2`
  margin: 0px;
  font-family: "Maison Neue Bold", sans-serif;
  font-size: 36px;
  font-weight: 700;
  line-height: 120%;
  letter-spacing: -0.02em;

  ${mediaQueries.tablet} {
    font-size: 20px;
  }
`;

export const Header3 = styled.h3`
  margin: 0px;
  font-family: "Maison Neue Bold", sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 120%;
  letter-spacing: 0%;

  ${mediaQueries.tablet} {
    font-size: 16px;
  }
`;

export const LargeBody = styled.p`
  margin: 0px;
  font-family: "DM Sans", sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: 0%;
`;

export const LargeBodyMedium = styled.p`
  margin: 0px;
  font-family: "DM Sans", sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 160%;
  letter-spacing: 0%;
`;

export const Medium = styled.p`
  margin: 0;
  padding: 0;
  height: 30px;
  font-family: "Maison Neue Bold", sans-serif;
  font-size: 20px;
  font-weight: 900;
  line-height: normal;
  white-space: nowrap;
`;

export const LargeBodyBold = styled.p`
  margin: 0px;
  font-family: "DM Sans", sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 160%;
  letter-spacing: 0%;

  ${mediaQueries.tablet} {
    font-size: 16px;
  }
`;

export const Body = styled.p`
  padding: 0px;
  margin: 0px;
  font-family: "DM Sans", sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: 0%;

  ${mediaQueries.tablet} {
    font-size: 16px;
  }
`;

export const BodyRegular = styled.p`
  padding: 0px;
  margin: 0px;
  font-family: "DM Sans", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: 0%;
`;

export const BodyBold = styled.p`
  margin: 0px;
  font-family: "DM Sans", sans-serif;
  font-size: 16px;
  font-weight: 700;
  padding: 0px;
  margin: 0px;
  line-height: 160%;
  letter-spacing: 0%;

  ${mediaQueries.tablet} {
    font-size: 16px;
  }
`;

export const BodyHeavy = styled.p`
  margin: 0px;
  font-family: "DM Sans", sans-serif;
  font-size: 16px;
  font-weight: 900;
  line-height: 130%;
  letter-spacing: 0%;
`;

export const Caption = styled.p`
  margin: 0px;
  font-family: "DM Sans", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: 0%;
`;

export const Overline = styled.p`
  margin: 0px;
  font-family: "DM Sans", sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 160%;
  letter-spacing: 5%;

  ${mediaQueries.tablet} {
    font-size: 16px;
  }
`;

export const ButtonText = styled.p`
  margin: 0;
  padding: 0;
  font-family: "Maison Neue Bold", sans-serif;
  font-size: 20px;
  font-weight: 900;
  line-height: 24px;
  letter-spacing: 0%;
  white-space: nowrap;
`;

export const ButtonTextMobile = styled.p`
  margin: 0;
  padding: 0;
  font-family: "Maison Neue Bold", sans-serif;
  font-size: 16px;
  font-weight: 900;
  line-height: 24px;
  letter-spacing: 0%;
  white-space: nowrap;
`;
