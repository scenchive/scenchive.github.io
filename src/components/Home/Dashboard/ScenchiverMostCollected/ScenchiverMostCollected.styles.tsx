import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const breakpoint = '565px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;
const colors = ['#F5D0CD', '#E3A6A1', '#D67070'];

export const SeasonBestPerfumeArea = styled.div`
  label: season-best-perfume-area;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 200px;
`;

export const Title = styled.h1`
  label: title;
  font-size: 2rem;
  color: #bc5f6a;
  margin-right: auto;
`;

export const SliderArea = styled.div`
  label: slider-area;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const SlickSlider = styled(Slider)`
  label: slick-slider;
  width: calc(100% - 40px);

  ${mediaQuery} {
    display: block;
    width: 200px;
  }
`;

export const PerfumeRowBox = styled.div`
  label: perfume-row-box;
  width: 100%;
  border: 1px solid #dfdfdf;
  border-radius: 8px;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  padding: 15px 10px;
  ${mediaQuery} {
    width: 330px;
    padding: 10px 5px;
  }
`;

export const LeftArrow = styled.img`
  label: left-arrow;
  margin-right: 10px;
`;

export const RightArrow = styled.img`
  label: right-arrow;
  margin-left: 10px;
`;
