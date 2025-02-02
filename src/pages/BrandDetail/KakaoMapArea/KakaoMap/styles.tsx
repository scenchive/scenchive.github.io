import styled from '@emotion/styled';

const breakpoint = '768px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const MapArea = styled.div`
  label: map-area;
  width: 60vw;
  height: 60vh;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 10px;

  ${mediaQuery} {
    width: 70vw;
    height: 50vh;
  }
`;
