import styled from '@emotion/styled';

const breakpoint = '565px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const Container = styled.div`
  label: container;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PageTitle = styled.h1`
  label: page-title;
  label: modal-title;
  color: #616161;
  font-size: 2rem;
  font-family: Noto Sans KR;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  margin-top: 50px;
  margin-bottom: 0px;
`;

export const MyCollectionNumber = styled.h2`
  label: my-collection-number;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  color: #616161;
  font-size: 2.5rem;
  font-family: Noto Sans Kr;
  margin-top: 0px;
  margin-bottom: 20px;
  & span {
    height: 9rem;
    display: flex;
    font-family: Noto Sans Kr;
    font-size: 9rem;
    line-height: 9rem;
    color: #242424;
    margin-right: 4px;
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
  height: fit-content;
  max-height: 750px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px 10px;
  margin-bottom: 30px;

  ${`@media(max-width:670px)`} {
    width: 70%;
    max-height: 1000px;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px 10px;
  }

  ${mediaQuery} {
    width: calc(100% - 40px);
    max-height: 900px;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px 10px;
  }
`;

export const Card = styled.div<{ isAdd?: boolean }>`
  label: card;
  position: relative;
  width: 100%;
  height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: ${(props) => (props.isAdd === true ? '1.5px dashed #F5D0CD' : '')};
  box-shadow: ${(props) => (props.isAdd === true ? '' : '0px 0px 1px #a9a9a9')};
  font-family: Noto Sans Kr;
  padding: 20px 10px;
  box-sizing: border-box;
  cursor: pointer;

  ${mediaQuery} {
    height: 180px;
    padding: 0 15px;
  }
`;

export const DeleteButton = styled.img`
  label: delete-button;
  position: absolute;
  top: 10px;
  right: 8px;
  width: 10px;
  height: 10px;
  object-fit: cover;
  ${mediaQuery} {
    width: 13px;
    height: 13px;
    top: 12px;
    right: 10px;
  }
`;

export const PerfumeImageContainer = styled.img`
  label: perfume-image-container;
  height: 95px;
  height: 95px;
  object-fit: contain;
  border-radius: 10px;
  ${mediaQuery} {
    height: 100px;
    width: 100px;
    object-fit: contain;
  }
`;

export const CardText = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: start;

  .card-text__title {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
  }
  .card-text__brand {
    color: #a9a9a9;
    font-size: 1rem;
    margin-top: 8px;
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
      margin-top: 10px;
    }
  }
`;

export const AddIcon = styled.img`
  label: add-icon;
  width: 40px;
  height: 40px;
`;

export const NoCollectionWarning = styled.div`
  label: no-collection-warning;
  font-size: 1.3rem;
  font-family: Noto Sans Kr;
  font-weight: 500;
  color: #d67070;
  margin-bottom: 20px;
`;
