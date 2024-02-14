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

  ${mediaQuery} {
    padding: 20px 20px;
    height: 55px;
  }
`;

export const Logo = styled.div`
  width: 25%;
  display: flex;
  justify-content: start;
  align-items: end;
  font-family: Gowun Batang;
  font-weight: bold;
  display: flex;
  cursor: pointer;

  .logo__kr {
    font-size: 2.7rem;
    margin-right: 5px;
  }

  .logo__en {
    font-size: 1.6rem;
    padding-bottom: 5px;
  }

  ${mediaQuery} {
    width: 60%;
    justify-content: center;
    .logo__kr {
      font-size: 2.5rem;
      margin-right: 5px;
    }

    .logo__en {
      font-size: 1.2rem;
      padding-bottom: 5px;
    }
  }
`;

export const HeaderLeft = styled.div`
  display: none;

  ${mediaQuery} {
    display: block;
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    img {
      width: 20px;
    }
  }
`;

export const Menu = styled.div`
  width: 50%;
  display: flex;
  justify-content: start;
  font-family: Noto Sans Kr;
  box-sizing: border-box;
  padding: 5px;

  ${mediaQuery} {
    display: none;
  }
`;

export const MenuItem = styled.div`
  padding: 0 10px;
  font-size: 1.7rem;
  cursor: pointer;
`;

export const MenuSmall = styled.div`
  display: none;

  ${mediaQuery} {
    width: 150px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    padding: 0;
    background-color: white;
    border: 1px solid #e3a6a1;
    border-radius: 5px;
    position: absolute;
    top: 60px;
    left: 5px;
    z-index: 99999;
  }
`;

export const MenuSmallTop = styled.div`
  width: 100%;
  height: 30px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5px;
  box-sizing: border-box;
  font-family: Noto Sans Kr;
  font-family: Gowun Batang;
  background-color: #e3a6a1;
  font-size: 1.2rem;
  & > div {
    margin: 0 2px;
    opacity: 1;
  }
`;
export const MenuItemSmall = styled.div<{ border: boolean }>`
  display: none;

  ${mediaQuery} {
    height: 25px;
    display: flex;
    justify-content: space-between;
    justify-content: center;
    align-items: center;
    color: #e3a6a1;
    padding: 5px 20px;
    //font-family: Noto Sans Kr;
    font-family: Gowun Batang;
    border-bottom: ${(props) => (props.border ? "1px solid #e3a6a1" : "none")};

    img {
      width: 15px;
    }

    div {
      width: 70%;
      text-align: center;
      font-size: 1.5rem;
    }
  }
`;

export const HeaderRight = styled.div`
  width: 25%;
  display: flex;
  justify-content: end;

  img {
    width: 25px;
  }

  ${mediaQuery} {
    width: 20%;

    img {
      width: 20px;
    }
  }
`;

export const HeaderRightText = styled.div`
  font-family: Noto Sans Kr;
  padding: 0 3px;
  font-size: 1.7rem;

  ${mediaQuery} {
    font-size: 1rem;
    padding: 0 1px;
  }
`;
