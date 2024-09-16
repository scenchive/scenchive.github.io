import styled from '@emotion/styled';

const breakpoint = '565px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const Container = styled.div`
  label: container;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 50px;
`;

export const Text = styled.div`
  width: 70%;
  display: flex;
  margin-bottom: 5px;
  padding: 5px 5px;
  box-sizing: border-box;
  border-bottom: 1px solid #bc5f6a;
  cursor: pointer;

  div {
    width: fit-content;
    display: inline-block;
    font-size: 1.4rem;
    color: #616161;
    margin-right: auto;
  }

  ${mediaQuery} {
    width: calc(100% - 40px);
  }
`;

export const ArrowImage = styled.img`
  width: 15px;
  height: 15px;
  margin-left: auto;
`;

export const StoreListArea = styled.div`
  label: store-list-area;
  width: 70%;

  ${mediaQuery} {
    width: calc(100% - 40px);
  }
`;

export const StoreListRow = styled.div`
  label: store-list-row;
  width: calc(100% - 100px);
  display: flex;
  flex-direction: row;
  padding: 10px 50px;
  border-bottom: 1px solid #f1f1f1;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
`;

export const StoreNameAddress = styled.div`
  label: store-name-address;
  display: flex;
  flex-direction: column;
  // margin-right: auto;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
`;

export const StoreName = styled.div`
  label: store-name;
  font-family: Noto Sans KR;
  font-size: 1.4rem;
  color: #d67070;
  margin-bottom: 4px;
  margin-left: auto;
  margin-right: auto;
`;

export const Address = styled.div`
  label: address;
  color: #a2a2a2;
  font-family: Noto Sans KR;
  font-size: 1rem;
  margin-left: auto;
  margin-right: auto;
`;
