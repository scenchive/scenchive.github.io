import styled from '@emotion/styled';

const breakpoint = '768px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const RequestPerfumeOrBrandArea = styled.div`
  label: request-perfume-or-brand-area;
  color: #e3a6a1;
  font-size: 1.3rem;
  cursor: pointer;
  margin-top: 4px;
  margin-bottom: 4px;
  font-weight: 400;
  font-family: Noto Sans Kr;
  & span {
    font-size: 1.3rem;
    font-weight: 500;
    color: #d67070;
  }

  ${mediaQuery} {
    font-size: 1.1rem;

    & span {
      font-size: 1.1rem;
      font-weight: 500;
      color: #d67070;
    }
  }
`;

export const BRTag = styled.br`
  label: BRTag;
  display: none;

  ${`@media(max-width:565)`} {
    display: block;
  }
`;

export const GoArrow = styled.img`
  label: go-arrow;
  width: 10px;
  height: 10px;
  width: 0.6rem;
  height: 1.2rem;
  margin-left: 2px;
  ${mediaQuery} {
    width: 0.5rem;
    height: 1rem;
    margin-left: 2px;
  }
`;
