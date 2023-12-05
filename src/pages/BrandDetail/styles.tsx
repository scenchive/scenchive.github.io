import styled from "@emotion/styled";

export const Container = styled.div`
  label: container;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-width: 992px;
  margin-bottom: 50px;
`;

export const Header = styled.div`
  label: header;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 50px;
  box-sizing: border-box;
  color: #bf8dff;
  font-family: NanumSquareRound;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  box-shadow: 0px 5px 5px #f6f2ff;
`;

export const HeaderLeft = styled.div`
  label: header-left;
  width: fit-content;
  margin-right: 20px;
  display: flex;
  align-items: center;
`;

export const Title = styled.div`
  label: title;
  width: fit-content;
  display: flex;
  align-items: end;
  .title__kr {
    font-size: 30px;
    margin-right: 10px;
  }
  .title__en {
    font-size: 15px;
    padding-bottom: 5px;
  }
`;

export const Menu = styled.div`
  label: menu;
  display: flex;
  margin-left: 50px;
  font-size: 17px;
`;

export const MenuList = styled.div`
  label: menu-list;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  line-height: 49px;
`;

export const HeaderRight = styled.div`
  label: header-right;
  display: flex;
  align-items: center;
`;

export const HeaderText = styled.div`
  label: header-text;
  padding: 0 5px;
  font-size: 15px;
`;

export const Top = styled.div`
  label: top;
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
  margin-bottom: 50px;
  position: relative;
  padding: 5px 0;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 1px 1px 3px #a9a9a9;
  img {
    height: 100px;
  }
`;

export const Text = styled.div`
  width: 80%;
  font-size: 14px;
  color: #a9a9a9;
  text-align: start;
  margin-bottom: 5px;
`;

export const Cards = styled.div`
  label: main;
  width: 80%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px 10px;
`;

export const TopText = styled.div`
  label: list-text;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin-left: 10px;
  .top-text__title {
    width: fit-content;
    white-space: nowrap;
    font-size: 14px;
    text-align: left;
    margin-bottom: 5px;
  }
  .top-text__sub-title {
    color: #a9a9a9;
    font-size: 12px;
  }
`;

export const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  img {
    width: 100%;
    box-shadow: 0px 0px 1px #a9a9a9;
    border-radius: 12px;
    margin-bottom: 5px;
    min-height: 90%;
  }
`;

export const CardText = styled.div`
  display: flex;
  flex-direction: column;
  .card-text__title {
    font-size: 14px;
  }
  .card-text__sub-title {
    color: #a9a9a9;
    font-size: 12px;
  }
`;

export const PageNation = styled.div`
  label: pagenation;
  width: 60%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  img {
    margin: 0 5px;
  }
`;
export const PageButton = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid #bf8dff;
  margin: 0px 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  line-height: 14px;
`;
