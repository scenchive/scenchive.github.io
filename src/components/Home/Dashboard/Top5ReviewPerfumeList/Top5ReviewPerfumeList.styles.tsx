import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const breakpoint = '565px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;
const colors = ['#F5D0CD', '#E3A6A1', '#D67070'];

export const Top5ReviewPerfumeListArea = styled.div`
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
  width: fit-content;
  font-size: 2rem;
  color: #bc5f6a;
  margin-right: auto;
  margin-left: auto;
  ${mediaQuery} {
    font-size: 1.5rem;
    white-space: nowrap;
    margin-right: auto;
    margin-left: 0px;
  }
`;

export const SlickSlider = styled(Slider)`
  label: slick-slider;
  width: calc(100% - 40px);

  ${mediaQuery} {
    display: block;
    width: 100%;
  }
`;

export const SliderArea = styled.div`
  label: slider-area;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const PerfumeRowBox = styled.div`
  label: perfume-row-box;
  width: 100%;
  border: 1px solid #dfdfdf;
  border-radius: 8px;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  padding: 10px 20px;
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
