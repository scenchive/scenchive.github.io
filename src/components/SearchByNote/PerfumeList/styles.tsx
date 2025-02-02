import styled from '@emotion/styled';

const breakpoint = '565px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const PerfumeListArea = styled.div`
  label: perfume-list-area;
  width: 70%;
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px 10px;
  margin-bottom: 30px;
  margin-top: 40px;

  ${`@media(max-width:670px)`} {
    width: 70%;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px 10px;
  }

  ${mediaQuery} {
    width: calc(100% - 40px);
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
  label: card-text;
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

//
export const PerfumeListRow = styled.div`
  label: perfume-list-row;
  width: inherit;
  min-height: 28px;
  height: auto;
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 13px;
  font-weight: 500;
  color: #08799c;
  border-top: 1px solid #ececec;
  align-content: center;
  cursor: pointer;
  :hover {
    background-color: #e0f1fd;
  }
`;
