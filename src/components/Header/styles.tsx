import styled from "@emotion/styled";

export const Container = styled.div`
  label: container;
  width: 100%;
  height: 80px;
  background-color: #e3a6a1;
  display: flex;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  color: white;
`;

export const Logo = styled.div`
  width: 15%;
  display: flex;
  justify-content: space-between;
  align-items: end;
  font-family: Gowun Batang;
  font-weight: bold;
  display: flex;

  .logo__kr {
    font-size: 30px;
  }

  .logo__en {
    font-size: 15px;
    padding-bottom: 5px;
  }
`;

export const Menu = styled.div`
  width: 70%;
  display: flex;
  justify-content: start;
  font-family: Noto Sans Kr;
  padding: 0 50px;
  box-sizing: border-box;
`;

export const MenuItem = styled.div`
  padding: 0 10px;
`;

export const HeaderRight = styled.div`
  width: 15%;
  display: flex;
  justify-content: end;
`;

export const HeaderRightText = styled.div`
  font-family: Noto Sans Kr;
  padding: 0 3px;
`;
