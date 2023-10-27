import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 992px;
`;

export const Header = styled.div`
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
  width: fit-content;
  margin-right: 20px;
  display: flex;
  align-items: center;
`;

export const Title = styled.div`
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
  display: flex;
  margin-left: 50px;
  font-size: 17px;
`;

export const MenuList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  line-height: 49px;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderText = styled.div`
  padding: 0 5px;
  font-size: 15px;
`;

export const Top = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 130px;
`;

export const Search = styled.div`
  width: 80%;
  position: relative;
  margin-bottom: 35px;
  .search__input {
    border: 1px #dabdff solid;
    border-radius: 30px;
    height: 50px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .search__input::placeholder {
    color: #b2b2b2;
    font-size: 15px;
  }
  .search__input:focus {
    outline: 1.5px #dabdff solid;
  }
  .search__img {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 15px;
    top: 15px;
  }
`;

export const Main = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const MainTop = styled.div`
  display: flex;
  height: 50px;
  font-family: NanumSquareRound;
  font-size: 20px;
  align-items: start;
  .main-top__text {
    color: #c597ff;
    line-height: 42px;
  }
  margin-bottom: 30px;
`;

export const Select = styled.div`
  font-family: NanumSquareRound;
  font-size: 20px;
  width: 80px;
  height: fit-content;
  margin: 0 10px;
  position: relative;
  border: 1px solid #dedddd;
  border-radius: 5px;
  padding: 3px 5px 3px 0;
  img {
    width: 12px;
    position: absolute;
    top: 15px;
    right: 7px;
  }
`;

export const Option = styled.div`
  padding: 3px 0;
  box-sizing: border-box;
`;

export const MainBottom = styled.div`
  display: flex;
  & > img {
    width: 15px;
  }
`;

export const MainBottomContent = styled.div`
  display: flex;
  align-items: center;
  & > img {
    width: 150px;
    height: 200px;
    margin-right: 20px;
  }
  margin: 0 50px;
`;

export const ContentText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  .content-text__name {
    font-size: 20px;
    margin-bottom: 10px;
  }
  .content-text__brand-kr {
    font-size: 15px;
    color: #a5a5a5;
  }
  .content-text__brand-en {
    font-size: 15px;
    color: #a5a5a5;
  }
  .content-text__rate{
    img{
      margin-right: 5px;
      width: 15px;
    }
    display: flex;
    margin-top: 10px;
    font-size: 15px;
  }
`;
