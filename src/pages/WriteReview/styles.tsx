import styled from '@emotion/styled';
const breakpoint = '565px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const Container = styled.div`
  label: container;
  width: 100%;
  min-height: 800px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;

  ${mediaQuery} {
  }
`;

export const Main = styled.div`
  label: main;
  width: 60%;
  margin-top: 80px;
  display: flex;
  flex-direction: column;

  ${mediaQuery} {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
`;
export const PageTitle = styled.div`
  label: page-title;
  color: #616161;
  font-size: 2.2rem;
  font-family: Noto Sans KR;
  margin-bottom: 40px;

  ${mediaQuery} {
  }
`;
export const PerfumeNameKR = styled.div`
  label: perfume-name-kr;
  margin-top: 50px;

  ${mediaQuery} {
  }
`;

export const PerfumeInformationArea = styled.div`
  label: perfume-information-area;
  width: calc(100% - 26px);
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #dfdfdf;
  padding: 13px;
  word-break: keep-all;
  text-align: left;

  ${mediaQuery} {
  }
`;
export const PerfumeImage = styled.img`
  label: perfume-image;
  width: 105px;
  height: 105px;
  object-fit: cover;
  border-radius: 20px;
  margin-right: 20px;
  margin-left: auto;

  ${mediaQuery} {
  }
`;

export const PerfumeInformation = styled.div`
  label: perfume-information;
  display: flex;
  flex-direction: column;
  margin-right: auto;

  ${mediaQuery} {
  }
`;

export const BrandNameKR = styled.div`
  label: brand-name-kr;
  width: fit-content;
  font-size: 1.8rem;
  font-family: Noto Sans KR;
  color: #616161;
  margin-bottom: 10px;

  ${mediaQuery} {
  }
`;

export const PerfumeName = styled.div`
  label: perfume-name;
  width: fit-content;
  font-size: 2rem;
  font-family: Noto Sans KR;
  color: #242424;

  ${mediaQuery} {
  }
`;

export const KeywordArea = styled.div`
  label: keyword-area;
  width: 100%;
  margin-top: 40px;

  ${mediaQuery} {
  }
`;

export const AreaTitle = styled.div`
  label: area-title;
  width: fit-content;
  font-size: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;

  ${mediaQuery} {
  }
`;

export const KeywordCellArea = styled.div`
  label: keyword-cell-area;
  width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  flex-wrap: wrap;
  ${mediaQuery} {
  }
`;

export const KeywordCell = styled.div`
  label: keyword-cell;
  background-color: #e3a6a1;
  color: white;
  font-family: Noto Sans KR;
  font-size: 1.4rem;
  border: 1.5px solid #e3a6a1;
  border-radius: 20px;
  padding: 7px 10px;
  margin-right: 5px;
  margin-bottom: 6px;
  box-shadow: 2px 3px 2.5px #d9d9d9;
  cursor: pointer;

  ${mediaQuery} {
  }
`;

export const AddCell = styled.div`
  label: add-cell;
  display: flex;
  align-items: center;
  justify-content: centers;
  color: #bbbbbb;
  font-family: Noto Sans KR;
  font-size: 1.4rem;
  font-weight: 600;
  border: 2px solid #e3e3e3;
  border-radius: 20px;
  padding: 5px 10px;
  cursor: pointer;

  ${mediaQuery} {
  }
`;

export const ReviewArea = styled.div`
  label: review-area;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 30px;

  ${mediaQuery} {
  }
`;

export const QuestionRow = styled.div`
  label: question-row;
  width: 100%;
  margin-right: auto;
  margin-top: 40px;

  ${mediaQuery} {
  }
`;

export const Question = styled.div`
  label: question;
  color: #616161;
  font-family: Noto Sans KR;
  font-size: 1.6rem;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 12px;

  ${mediaQuery} {
  }
`;

export const AnswerRow = styled.div`
  label: answer-row;
  width: fit-content;
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;

  ${mediaQuery} {
  }
`;

export const Answer = styled.div`
  label: answer;
  color: #b3b3b3;
  font-family: Noto Sans KR;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
  border: 1.5px solid #b3b3b3;
  padding: 8px 10px;
  border-radius: 20px;
  line-height: 1.3rem;

  ${mediaQuery} {
  }
`;

export const DetailReviewRow = styled.div`
  label: detail-review-row;
  width: 100%;
  margin-top: 50px;
  margin-right: auto;

  ${mediaQuery} {
  }
`;

export const DetailReviewAnswer = styled.textarea`
  label: detail-review-answer;
  width: calc(100% - 52px);
  height: 240px;
  color: #b6b6b6;
  font-size: 1.3rem;
  font-family: Noto Sans KR;
  border: 1px solid #dddddd;
  border-radius: 10px;
  resize: none;
  margin-top: 15px;
  margin-bottom: 40px;
  padding: 20px 26px;
  :focus {
    outline: none;
  }

  ${mediaQuery} {
  }
`;

export const UploadButton = styled.div`
  label: upload-button;
  width: fit-content;
  color: #ffffff;
  font-family: Noto Sans KR;
  font-size: 1.6rem;
  background-color: #d67070;
  padding: 7px 46px;
  margin-bottom: 150px;
  margin-left: auto;
  cursor: pointer;
  border-radius: 2px;

  ${mediaQuery} {
  }
`;
