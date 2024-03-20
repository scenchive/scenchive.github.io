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

export const MainTop = styled.div`
  label: main-top;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  font-size: 2.3rem;
  align-items: start;
  word-wrap: break-word;
  margin-bottom: 50px;

  .main-top__text {
    color: #e3a6a1;
    line-height: 42px;
    font-weight: 700;
  }

  span {
    color: #bc5f6a;
  }

  .main-top__text--big {
    font-size: 4.5rem;
  }

  ${mediaQuery} {
    font-size: 1.8rem;
    margin: 50px 0 30px 0;
    .main-top__text--big {
      font-size: 2.5rem;
    }
  }
`;

export const Select = styled.div`
  label: select;
  width: 100px;
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  color: #bc5f6a;
  font-weight: 700;

  ${mediaQuery} {
    width: 67px;
    margin: 0 10px;
  }
`;

export const Selected = styled.div`
  label: selected;
  width: 100%;
  font-size: 2.5rem;
  height: fit-content;
  position: relative;
  border: 1px solid #bc5f6a;
  border-radius: 10px;

  ${mediaQuery} {
    font-size: 1.8rem;
    padding: 2px 0;
  }
`;

export const Options = styled.div`
  label: options;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  cursor: pointer;

  ${mediaQuery} {
    font-size: 1.1rem;
  }
`;

export const Option = styled.div`
  label: option;
  padding: 3px 0;
  box-sizing: border-box;
`;

export const MainBottom = styled.div`
  label: main-bottom;
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: Noto Sans KR;
  & > img {
    width: 20px;

    ${mediaQuery} {
      width: 15px;
    }
  }
`;

export const MainBottomContent = styled.div`
  label: main-bottom-content;
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 30px;
  & > img {
    width: 50%;
    max-width: 150px;
  }

  ${mediaQuery} {
    margin: 0 10px;
  }
`;

export const SlickSlider = styled(Slider)`
  label: slick-slider;
  width: 600px;

  ${mediaQuery} {
    display: block;
    width: 200px;
  }
`;

export const ContentText = styled.div`
  label: content-text;
  display: flex;
  flex-direction: column;
  align-items: start;
  font-size: 1.5rem;

  .content-text__name {
    font-size: 2rem;
    margin-bottom: 10px;
    text-align: start;
  }
  .content-text__brand-kr {
    color: #a5a5a5;
  }
  .content-text__brand-en {
    color: #a5a5a5;
  }
  .content-text__rate {
    display: flex;
    align-items: center;
    margin-top: 10px;
    img {
      margin-right: 5px;
      width: 20px;
    }
  }

  ${mediaQuery} {
    font-size: 1.2rem;
    .content-text__name {
      font-size: 1.6rem;
    }
    .content-text__rate {
      img {
        margin-right: 3px;
        width: 15px;
      }
    }
  }
`;

export const PerfumeBox = styled.div<{ index: number }>`
  label: prefume-box;
  width: 200px;
  height: 100%;

  img {
    width: 180px;
    margin: 0 5px;
  }

  .perfume-box__text {
    width: 200px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    font-size: 1.5rem;
  }

  & > div {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export const ColorPick = styled.div<{
  color: string | undefined;
  index: number;
}>`
  width: 30px;
  height: 10px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.color === undefined ? colors[props.index % 3] : props.color};
`;
