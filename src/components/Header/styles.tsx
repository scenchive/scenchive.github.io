import styled from "@emotion/styled";

const breakpoint = "768px";
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const Container = styled.div`
  label: container;
  width: 100%;
  height: 70px;
  background-color: #e3a6a1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 35px;
  box-sizing: border-box;
  color: white;
`;

export const Logo = styled.div`
  width: 25%;
  display: flex;
  justify-content: start;
  align-items: end;
  font-family: Gowun Batang;
  font-weight: bold;
  display: flex;

  .logo__kr {
    font-size: 2.7rem;
    margin-right: 5px;
  }

  .logo__en {
    font-size: 1.6rem;
    padding-bottom: 5px;
  }
`;

export const Menu = styled.div`
  width: 50%;
  display: flex;
  justify-content: start;
  font-family: Noto Sans Kr;
  box-sizing: border-box;
  padding: 5px;
`;

export const MenuItem = styled.div`
  padding: 0 10px;
  font-size: 1.7rem;
`;

export const HeaderRight = styled.div`
  width: 25%;
  display: flex;
  justify-content: end;

  img {
    width: 25px;
  }
`;

export const HeaderRightText = styled.div`
  font-family: Noto Sans Kr;
  padding: 0 3px;
  font-size: 1.7rem;
`;
