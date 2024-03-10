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
  label: menu-item;
  padding: 0 10px;
  font-size: 1.7rem;
  cursor: pointer;
`;

export const MenuSmall = styled.div`
  label: menu-small;
  display: none;

  ${mediaQuery} {
    width: 130px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    padding: 0;
    background-color: white;
    border: 1px solid #e3a6a1;
    position: absolute;
    top: 60px;
    left: 5px;
    z-index: 99999;
  }
`;

export const MenuItemSmall = styled.div<{ border: boolean }>`
  label: menu-item-small;
  display: none;

  ${mediaQuery} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #e3a6a1;
    padding: 5px 10px;
    border-bottom: ${(props) => (props.border ? "1px solid #e3a6a1" : "none")};
    cursor:pointer;

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
`;
