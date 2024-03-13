import styled from "@emotion/styled";

const breakpoint = "565px";
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Noto Sans Kr;
`;

export const Content = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mediaQuery} {
    width: calc(100% - 40px);
  }
`;

export const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  color: #d67070;
  border-bottom: 1px solid #d67070;
  padding: 5px 0;
  margin-top: 35px;

  .top__title {
    font-size: 2rem;
  }
  .top__detail {
    font-size: 1.4rem;
    
    ${mediaQuery} {
      font-size: 1.2rem;
    }
  }
`;

export const ListBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ListTop = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  border-bottom: 1px solid #d5d5d5;
  color: #616161;
  font-size: 1.4rem;
  font-weight: 500;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .list-top__number {
    width: 70px;
  }

  .list-top__content {
    width: calc(100% - 70px);
  }
`;

export const Lists = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const List = styled.div<{ read: boolean }>`
  width: 100%;
  height: 45px;
  display: flex;
  color: ${(props) => (props.read ? "#D9D9D9" : "#616161")};
  font-size: 1.2rem;
  border-bottom: 1px solid #d5d5d5;
`;

export const ListNumber = styled.div`
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
`;

export const ListContent = styled.div`
  width: calc(100% - 70px);
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;

  div {
    width: 100%;
    text-align: start;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  div:first-child {
    font-size: 1.1rem;
  }

  div:last-child {
    font-size: 1.4rem;
  }
`;

export const Info = styled.div`
  display: flex;
  justify-content: end;
  font-size: 1.2rem;
  color: #616161;
`;

export const NoData = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #616161;
`;
