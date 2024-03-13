import styled from "@emotion/styled";

const breakpoint = "565px";
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const Container = styled.div`
  label: container;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Top = styled.div`
  label: top;
  width: 100%;
  font-size: 2.5rem;
  font-family: Gowun Batang;
  margin: 50px 0;

  div {
    display: flex;
    justify-content: center;
    align-items: start;
    line-height: 40px;
  }

  span {
    color: #bc5f6a;
  }

  .top__text--big {
    font-size: 4rem;
  }

  ${mediaQuery} {
    font-size: 1.5rem;
    margin: 50px 0 30px 0;

    div {
      line-height: 20px;
    }

    .top__text--big {
      font-size: 2rem;
    }
  }
`;

export const Main = styled.div`
  label: main;
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mediaQuery} {
    width: 100%;
    min-height: 40%;
    padding: 0 20px;
    box-sizing: border-box;
  }
`;

export const Box = styled.div<{ borderColor: string }>`
  label: box;
  width: 45%;
  height: 150px;
  padding: 50px 5px;
  box-sizing: border-box;
  border: 1px solid ${(props) => props.borderColor};
  color: #242424;
  font-family: Gowun Batang;
  font-size: 2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mediaQuery} {
    font-size: 1.5rem;
  }
`;

