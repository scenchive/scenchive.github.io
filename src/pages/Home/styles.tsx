import styled from "@emotion/styled";

export const Container = styled.div`
  label: container;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-width: 992px;
`;


export const Top = styled.div`
  label: top;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 130px;
  position: relative;
  margin-bottom: 50px;
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
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const MainTop = styled.div`
  label: main-top;
  display: flex;
  height: 40px;
  font-family: NanumSquareRound;
  font-size: 20px;
  align-items: start;
  .main-top__text {
    color: #c597ff;
    line-height: 42px;
  }
  margin-bottom: 50px;
`;

export const Select = styled.div`
  label: select;
  font-family: NanumSquareRound;
  font-size: 20px;
  width: 80px;
  height: fit-content;
  margin: 0 10px;
  position: relative;
  border: 1px solid #dedddd;
  border-radius: 5px;
  padding: 3px 5px 3px 0;
  background-color: white;
  img {
    width: 12px;
    position: absolute;
    top: 15px;
    right: 7px;
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
  & > img {
    width: 15px;
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
  .content-text__rate {
    img {
      margin-right: 5px;
      width: 15px;
    }
    display: flex;
    margin-top: 10px;
    font-size: 15px;
  }
`;
