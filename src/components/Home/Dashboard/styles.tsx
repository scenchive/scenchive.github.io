import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const breakpoint = '565px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;
const colors = ['#F5D0CD', '#E3A6A1', '#D67070'];

export const DashboardArea = styled.div`
  label: dashboard-area;
  width: 70%;
  min-width: 600px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  ${mediaQuery} {
    width: 100%;
    padding: 0px 20px;
    min-width: 0px;
    box-sizing: border-box;
  }
`;
