import styled from "@emotion/styled";

const breakpoint = "768px";
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const Container = styled.div`
  label: container;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const Main = styled.div`
  label: main;
  width: 60%;
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
  font-size: 3rem;
  font-weight: 700;
  align-items: start;
  word-wrap: break-word;
  .main-top__text {
    color: #e3a6a1;
    line-height: 42px;
  }
  margin-bottom: 50px;

  ${mediaQuery} {
    font-size: 1.8rem;
  }
`;

export const Select = styled.div`
  label: select;
  width: 100px;
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  color: #bc5f6a;

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
  display: flex;
  align-items: center;
  justify-content: center;
  & > img {
    width: 50%;
    max-width: 150px;
  }
  margin: 0 30px;
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
      font-size: 1.8rem;
    }
    .content-text__rate {
      img {
        margin-right: 3px;
        width: 15px;
      }
    }
  }
`;
