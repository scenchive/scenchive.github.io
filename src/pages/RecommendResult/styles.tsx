import styled from "@emotion/styled";

const breakpoint = "565px";
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const Container = styled.div`
  label: container;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Top = styled.div`
  width: 70%;
  border-bottom: 1px solid #d67070;
  font-family: Gowun Batang;
  font-size: 2rem;
  color: #d67070;
  display: flex;
  justify-content: start;
  margin: 50px 0 10px 0;

  ${mediaQuery} {
    width: calc(100% - 40px);
    margin: 30px 0 10px 0;
  }
`;

export const KeywordBox = styled.div`
  label: keyword-box;
  width: 70%;
  display: flex;
  justify-content: start;
  margin-bottom: 50px;
  flex-flow: wrap;

  ${mediaQuery} {
    width: calc(100% - 40px);
    margin-bottom: 30px;
    flex-flow: wrap;

  }
`;

export const Keyword = styled.div`
  label: keyword;
  width: fit-content;
  display: flex;
  align-items: start;
  font-family: Noto Sans Kr;
  font-size: 1.2rem;
  padding: 5px 15px;
  box-sizing: border-box;
  border-radius: 30px;
  background-color: #d67070;
  color: white;
  box-shadow: 2px 3px 2.5px #d9d9d9;
  margin: 2px;
  white-space: nowrap;

`;

export const Cards = styled.div`
  label: cards;
  width: 70%;
  // height: 270px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px 10px;

  ${`@media(max-width:670px)`} {
    width: 70%;
    // height: 950px;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px 10px;
  }

  ${mediaQuery} {
    width: calc(100% - 40px);
    // height: 950px;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px 10px;
  }
`;

export const Card = styled.div`
  label: card;
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  box-shadow: 0px 0px 1px #a9a9a9;
  font-family: Noto Sans Kr;
  padding: 0 5px;
  box-sizing: border-box;
  cursor:pointer;
  img {
    height: 100px;
    margin-bottom: 5px;
  }

  ${`@media(max-width:670px)`} {
    height: 180px;

    img {
      height: 80px;
    }
  }

  ${mediaQuery} {
    height: 180px;

    img {
      height: 80px;
    }
  }
`;

export const CardText = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: start;

  .card-text__title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    margin-bottom: 5px;
  }
  .card-text__brand {
    height: 20px;
    color: #a9a9a9;
    font-size: 1.2rem;
  }

  ${`@media(max-width:670px)`} {
    height: 50px;

    .card-text__title {
      height: 30px;
      font-size: 1.2rem;
    }
    .card-text__brand {
      height: 15px;
      font-size: 1rem;
    }
  }

  ${mediaQuery} {
    height: 50px;

    .card-text__title {
      height: 30px;
      font-size: 1.2rem;
    }
    .card-text__brand {
      height: 15px;
      font-size: 1rem;
    }
  }
`;
