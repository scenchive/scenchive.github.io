import styled from "@emotion/styled";

export const Container = styled.div`
  label: container;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Top = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

export const Keyword = styled.div`
  label: keyword;
  width: fit-content;
  font-size: 12px;
  font-weight: 450;
  border: 1.5px solid #a281ff;
  align-self: flex-start;
  padding: 6px 10px 6.5px 10px;
  border-radius: 30px;
  background-color: #b592ff;
  color: white;
  box-shadow: 2px 3px 2.5px #d9d9d9;
  margin-bottom: 5px;
  margin: 5px;
`;

export const Cards = styled.div`
  label: cards;
  width: 80%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px 10px;
`;

export const Card = styled.div`
  label: card;
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  box-shadow: 0px 0px 1px #a9a9a9;
  border-radius: 12px;
  img {
    width: 100%;
    margin-bottom: 5px;
    min-height: 60%;
  }
`;

export const CardText = styled.div`
  display: flex;
  flex-direction: column;
  .card-text__title {
    font-size: 14px;
    margin-bottom: 20px;
  }
  .card-text__brand {
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
  margin-top: 70px;
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
