import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const breakpoint = '565px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;
const colors = ['#F5D0CD', '#E3A6A1', '#D67070'];

export const Top5Area = styled.div`
  label: top5-area;
  width: 70%;
  min-width: 600px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-bottom: 200px;

  ${mediaQuery} {
    width: 100%;
    padding: 0px 20px;
    min-width: 0px;
    box-sizing: border-box;
  }
`;

export const ReviewTop5PerfumeListArea = styled.div`
  label: review-top5-perfume-list-area;
  width: 50%;
`;
