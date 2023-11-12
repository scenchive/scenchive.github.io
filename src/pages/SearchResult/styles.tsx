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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 130px;
  position: relative;
  margin-bottom: 30px;
`;

export const Search = styled.div<{ isSearching: boolean }>`
  label: search;
  width: 80%;
  position: relative;

  .search__input {
    border: ${(props) =>
      props.isSearching ? "1.5px #dabdff solid" : "1px #dabdff solid"};
    border-radius: 30px;
    height: 50px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    border-bottom-left-radius: ${(props) => (props.isSearching ? "0" : "30px")};
    border-bottom-right-radius: ${(props) =>
      props.isSearching ? "0" : "30px"};
  }
  .search__input::placeholder {
    color: #b2b2b2;
    font-size: 15px;
  }
  .search__input:focus {
    outline: ${(props) =>
      props.isSearching ? "0px #dabdff solid" : "0.5px #dabdff solid"};
  }
  .search__img {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 15px;
    top: 15px;
  }
`;

export const SearchList = styled.div`
  label: search-list;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 80%;
  height: fit-content;
  border: 1.5px #dabdff solid;
  border-top: none;
  background-color: white;
  padding: 14px;
  box-sizing: border-box;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  top: 50px;
  z-index: 9999;
  font-size: 15px;
`;

export const ListContent = styled.div`
  label: list-content;
  width: 100%;
  .list-content__title {
    width: fit-content;
    color: #9a9a9a;
  }
  margin-bottom: 10px;
`;

export const ListDetail = styled.div`
  label: list-detail;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px;
  img {
    width: 15px;
  }
  .list-detail__name {
    width: 93%;
    text-align: start;
    color: #b2b2b2;
  }
`;

export const Main = styled.div`
  label: main;
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
`;

export const Content = styled.div`
  label: content;
  width: 50%;
  height: 100%;
  margin: 0 5px;

  .content__title {
    width: 70px;
    font-size: 15px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    color: #a9a9a9;
  }
  .content__none {
    //height: 200px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Lists = styled.div`
  label: lists;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const List = styled.div`
  label: list;
  width: 100%;
  height: 70px;
  margin: 2px 0;
  box-sizing: border-box;
  display: flex;
  img {
    width: auto;
    height: 70px;
  }
`;

export const ListText = styled.div`
  label: list-text;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin-left: 10px;
  .list-text__title {
    width: fit-content;
    white-space: nowrap;
    font-size: 14px;
    text-align: left;
    margin-bottom: 5px;
  }
  .list-text__sub-title {
    color: #a9a9a9;
    font-size: 12px;
  }
`;
