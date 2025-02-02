import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const breakpoint = '565px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;
const colors = ['#F5D0CD', '#E3A6A1', '#D67070'];

export const ScenchiverStatArea = styled.div`
  label: scenchiver-stat-area;
  width: 70%;
  min-width: 600px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  margin-bottom: 80px;

  ${mediaQuery} {
    width: 100%;
    min-width: 0px;
    box-sizing: border-box;
    margin-bottom: 60px;
  }
`;

export const ScenchiverMasterArea = styled.div`
  label: scenchiver-master-area;
  width: 50%;
`;

export const ScenchiverMaster = styled.div`
  label: scenchiver-master;
  display: flex;
  height: 200px;
  flex-direction: column;
  position: relative;
  background-image: url('/assets/image/image_perfume_flowers.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  ${mediaQuery} {
    height: 80px;
    flex-direction: row;
  }
`;

export const ScenchiverMasterRankingIcon = styled.img`
  label: scenchiver-master-ranking-icon;
  width: 40px;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  ${mediaQuery} {
    width: 1.5rem;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 5px;
  }
`;

export const ScenchiverMasterName = styled.div`
  label: scenchiver-master-name;
  font-family: Noto Sans Kr;
  font-size: 3.6rem;
  font-weight: 600;
  color: #242424;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
  ${mediaQuery} {
    font-size: 1.5rem;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 0px;
    margin-right: auto;
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
  }
`;

export const ScenchiverAverageArea = styled.div`
  label: scenchiver-average-area;
  width: 50%;
`;

export const ScenchiverAverage = styled.div`
  label: scenchiver-average;
  height: 200px;
  display: flex;
  flex-direction: column;
  position: relative;
  background-image: url('/assets/image/image_flowers.svg');
  background-size: 120%;
  background-position: center;
  background-repeat: no-repeat;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  ${mediaQuery} {
    height: 80px;
  }
`;

export const ScenchiverAverageNumber = styled.div`
  label: scenchiver-average-number;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  color: #616161;
  font-size: 2.5rem;
  font-family: Noto Sans Kr;
  font-weight: 600;
  margin-bottom: 20px;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: auto;
  & span {
    height: 9rem;
    display: flex;
    font-family: Noto Sans Kr;
    font-size: 8rem;
    line-height: 8rem;
    color: #242424;
    margin-right: 4px;
    ${mediaQuery} {
      height: 2.4rem;
      font-size: 2.4rem;
      line-height: 2.4rem;
      margin-right: 3px;
    }
  }
  ${mediaQuery} {
    font-size: 1.5rem;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: auto;
  }
`;
