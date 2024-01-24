import styled from "@emotion/styled";

const breakpoint = "768px";
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const Container = styled.div`
  label: container;
  width: 100%;
  height: 60px;
  background-color: #d67070;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  position: relative;
`;

export const InputBox = styled.div`
  label: input-box;
  width: calc(50% - 50px);
  height: 40px;
  position: relative;

  img {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 15px;
    top: 12px;
  }
`;

export const Input = styled.input`
  label: input;
  border: none;
  border-radius: 30px;
  height: 40px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;

  &::placeholder {
    color: #b2b2b2;
    font-size: 1.3rem;
  }

  &:focus {
    outline: none;
  }
`;

export const SearchList = styled.div`
  label: search-list;
  width: calc(50% - 50px);
  height: fit-content;
  position: absolute;
  top: 65px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px #e3a6a1 solid;
  background-color: white;
  padding: 10px 20px;
  box-sizing: border-box;
  border-radius: 20px;
  font-family: Noto Sans KR;
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

export const ListContent = styled.div`
  label: list-content;
  width: 100%;
  .list-content__title {
    width: fit-content;
    font-size: 1.6rem;
    color: #ceb172;
    margin: 10px 0;
  }
  margin-bottom: 10px;
`;

export const ListDetail = styled.div`
  label: list-detail;
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: space-between;
  padding: 7px 0;
  border-bottom: 1px solid #f5d0cd;
  img {
    width: 15px;
  }
  .list-detail__name {
    width: calc(100% - 30px);
    margin: 0 10px;
    text-align: start;
    color: #616161;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;
