import { ComponentPropsWithoutRef, forwardRef } from "react";
import styled from "styled-components";

const StyledSection = styled.section`
  margin: 0 auto;
  margin-top: -1px;
  width: 100%;
  position: relative;
`;

type Props = ComponentPropsWithoutRef<"section"> & {
  id?: string;
};

const SectionWrapper = forwardRef<HTMLElement, Props>(
  ({ id, children, ...props }, ref) => (
    <StyledSection id={id} ref={ref} {...props}>
      {children}
    </StyledSection>
  )
);

export default SectionWrapper;
