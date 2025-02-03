import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const breakpoint = '565px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;
const colors = ['#F5D0CD', '#E3A6A1', '#D67070'];

export const PerfumeRowArea = styled.div<{ addStyle?: string }>`
  label: perfume-row-area;
  width: fit-content;
  height: 70px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${(props) => props.addStyle};
`;

export const PerfumeImage = styled.img`
  label: perfume-image;
  margin-left: 10px;
  margin-right: 20px;

  ${mediaQuery} {
    margin-left: 5px;
    margin-right: 8px;
  }
`;

export const PerfumeInfo = styled.div`
  label: perfume-info;
  max-width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: start;
`;

export const BrandNameArea = styled.div<{ flexDirection: string }>`
  label: brand-name-area;
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  flex-wrap: wrap;
  max-width: 100%;
`;

export const BrandNameKorean = styled.span<{ fontSize: number }>`
  label: brand-name-korean;
  font-weight: 500;
  font-size: ${(props) => props.fontSize}rem;
  color: #616161;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BrandNameEnglish = styled.span<{ fontSize: number }>`
  label: brand-name-english;
  font-weight: 500;
  font-size: ${(props) => props.fontSize}rem;
  color: #616161;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PerfumeName = styled.div<{ fontSize: number }>`
  label: perfume-name;
  font-size: ${(props) => props.fontSize}rem;
  font-weight: 550;
  color: #242424;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  max-width: 100%;
`;
