import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const breakpoint = '565px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;
const colors = ['#F5D0CD', '#E3A6A1', '#D67070'];

export const PerfumeRowArea = styled.div`
  label: perfume-row-area;
  width: fit-content;
  height: fit-content;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-left: auto;
  margin-right: auto;
`;

export const PerfumeImage = styled.img`
  label: perfume-image;
  margin-left: 10px;
  margin-right: 20px;
`;

export const PerfumeInfo = styled.div`
  label: perfume-info;
  display: flex;
  flex-direction: column;
  text-align: start;
`;

export const BrandNameArea = styled.div<{ flexDirection: string }>`
  label: brand-name-area;
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
`;

export const BrandNameKorean = styled.span<{ fontSize: number }>`
  label: brand-name-korean;
  font-weight: 500;
  font-size: ${(props) => props.fontSize}rem;
  color: #616161;
`;

export const BrandNameEnglish = styled.span<{ fontSize: number }>`
  label: brand-name-english;
  font-weight: 500;
  font-size: ${(props) => props.fontSize}rem;
  color: #616161;
`;

export const PerfumeName = styled.div<{ fontSize: number }>`
  label: perfume-name;
  font-size: ${(props) => props.fontSize}rem;
  font-weight: 550;
  color: #242424;
`;
