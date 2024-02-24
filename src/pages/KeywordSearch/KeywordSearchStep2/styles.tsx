import styled from "@emotion/styled";

export const Container = styled.div`
  label: container;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Top = styled.div`
  width: 70%;
  border-bottom: 1px solid #d67070;
  display: flex;
  justify-content: start;
  font-family: Gowun Batang;
  font-size: 2rem;
  color: #d67070;
  margin: 30px 0;
`;

export const Main = styled.div`
  label: main;
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
  label: content;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

export const Title = styled.div`
  label: title;
  width: 15%;
  font-family: Gowun Batang;
  font-size: 1.4rem;
  display: flex;
  justify-content: center;
`;

export const Keywords = styled.div`
  width: 60%;
  display: flex;
  flex-wrap: wrap;
`;
export const Keyword = styled.div<{ isSelected: boolean }>`
  label: keyword;
  width: fit-content;
  font-family: Noto Sans Kr;
  font-size: 1.2rem;
  border: 1.5px solid #e3a6a1;
  align-self: flex-start;
  padding: 6px 10px 6.5px 10px;
  border-radius: 30px;
  background-color: ${(props) => (props.isSelected ? "#D67070" : "#F5D0CD")};
  color: ${(props) => (props.isSelected ? "white" : "#616161")};
  box-shadow: 2px 3px 2.5px #d9d9d9;
  margin: 5px;
  cursor: pointer;
  &:hover {
    background-color: #d67070;
    color: white;
  }
`;

export const Button = styled.div`
  label: button;
  background-color: #d67070;
  font-family: Gowun Batang;
  color: white;
  font-size: 1.5rem;
  width: 100px;
  height: 35px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
`;
