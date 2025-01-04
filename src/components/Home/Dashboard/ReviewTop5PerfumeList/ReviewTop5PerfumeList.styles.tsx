import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const breakpoint = '565px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;
const colors = ['#F5D0CD', '#E3A6A1', '#D67070'];

export const ReviewTop5PerfumeListArea = styled.div`
  label: review-top5-perfume-list-area;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  ${mediaQuery} {
    width: 100%;
    box-sizing: border-box;
  }
`;

export const Title = styled.h1`
  label: title;
  font-size: 2rem;
  color: #bc5f6a;
  margin-right: auto;
  margin-left: auto;
`;

export const EachPerfumeRowArea = styled.div<{ index: number }>`
  label: each-perfume-row-area;
  box-sizing: border-box;
  width: ${(props) => (props.index === 0 ? '100%' : '95%')};
  border: ${(props) => (props.index === 0 ? '1px solid #FFF6CC' : '')};
  box-shadow: ${(props) => (props.index === 0 ? '0 0 7px 2px #FFF6CC' : '')};
  border-radius: 10px;
  padding: 5px 15px;
  margin-bottom: 6px;
`;
