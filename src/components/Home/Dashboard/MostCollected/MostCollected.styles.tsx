import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const breakpoint = '565px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;
const colors = ['#F5D0CD', '#E3A6A1', '#D67070'];

export const MostCollectedArea = styled.div`
  label: most-collected-area;
  width: 70%;
  min-width: 600px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-bottom: 50px;

  ${mediaQuery} {
    width: 100%;
    min-width: 0px;
    box-sizing: border-box;
  }
`;

export const MostCollectedPerfumeArea = styled.div`
  label: most-collected-perfume-area;
  width: 50%;
`;

export const Title = styled.h1`
  label: title;
  width: fit-content;
  font-size: 2rem;
  color: #bc5f6a;
  margin-right: auto;
  margin-left: auto;

  ${mediaQuery} {
    font-size: 1.3rem;
    white-space: nowrap;
  }

  ${`@media(max-width:330px)`} {
    font-size: 1.15rem;
    white-space: nowrap;
  }
`;

export const MostCollectedBrandArea = styled.div`
  label: most-collected-brand-area;
  width: 50%;
`;
