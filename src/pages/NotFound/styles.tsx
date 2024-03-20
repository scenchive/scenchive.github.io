import styled from "@emotion/styled";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const breakpoint = "565px";
const mediaQuery = () => `@media(max-width:${breakpoint})`;
const colors = ["#F5D0CD", "#E3A6A1", "#D67070"];

export const Container = styled.div`
  label: container;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const Main = styled.div<{ width: string }>`
  label: main;
  width: ${(props) => props.width};
  max-width: 700px;
  height: calc(100vh - 170px);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-family: Gowun Batang;

  ${mediaQuery} {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
`;

export const PageNotFoundNotice= styled.div`
  label: page-not-found-notice;
  font-size: 2.5rem;
  font-family: Gowun Batang;

`

export const HomeButton = styled.div`
  label: home-button;
  color: #d67070;
  font-size: 2rem;
  margin-top: 20px;
  cursor:pointer;

  & img{
    margin-right: 7px;
  }


`