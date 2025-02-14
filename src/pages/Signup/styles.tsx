import styled from '@emotion/styled';
const breakpoint = '565px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const Content = styled.div`
  label: content;
  max-width: 60%;
  display: inline-block;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  align-items: center;
  border-radius: 20px;
  margin-top: 50px;
  margin-bottom: 60px;
  ${mediaQuery} {
  }
`;

export const PfpArea = styled.div`
  label: pfp-area;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export const PreviewProfileImage = styled.img`
  label: pfp-upload-image;
  width: 70px;
  height: 70px;
  border-radius: 20px;
  object-fit: cover;
  margin-left: auto;
  margin-right: auto;
`;

export const PfpUploadTitle = styled.label`
  label: pfp-upload-title;
  color: #e3a6a1;
  font-size: 1.3rem;
  font-family: Noto Sans KR;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
`;

export const InfoArea = styled.div`
  label: info-area;
  align-items: start;
  margin-top: 44px;
  display: flex;
  flex-direction: column;
`;

export const RowArea = styled.div`
  width: 250px;
  margin-bottom: 30px;
`;

export const QuestionRow = styled.div`
  label: question-row;
  width: fit-content;
  color: #616161;
  font-size: 1.2rem;
  font-family: Noto Sans KR;
  margin-right: auto;
  margin-bottom: 2px;
`;

export const AnswerArea = styled.div`
  label: answer-area;
  position: relative;
`;

export const AnswerRow = styled.input`
  label: answer-row;
  height: 25px;
  width: -webkit-fill-available;
  font-family: Noto Sans KR;
  font-size: 1.1rem;
  border: none;
  border-bottom: 1px solid #dfdfdf;
  outline: none;
  ::placeholder {
    font-size: 8px;
    color: #b2b2b2;
  }
  &:disabled {
    color: #c0c0c0;
    background-color: #ececec;
  }
`;

export const AnswerButton = styled.button`
  label: styled-button;
  position: absolute;
  right: 0;
  width: auto;
  height: 25px;
  font-size: 1.2rem;
  color: #d67070;
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:disabled {
    color: #c0c0c0;
    cursor: default;
  }
`;

export const AlertMessage = styled.div`
  label: alert-message;
  color: red;
  font-size: 10px;
  text-align: left;
  width: inherit;
  position: absolute;
`;

export const KeywordArea = styled.div`
  label: keyword-area;
  width: 250px;
`;

export const AreaTitle = styled.div`
  label: area-title;
  width: fit-content;
  color: #616161;
  font-family: Noto Sans KR;
  font-size: 1.2rem;
  font-weight: 400;
  margin-right: auto;
  margin-bottom: 10px;
`;

export const Keywords = styled.div`
  label: keywords;
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: center;
  column-gap: 3px;
  justify-content: start;
  margin-bottom: 20px;
`;

export const KeywordButton = styled.div`
  label: keyword-button;
  font-size: 1.2rem;
  font-family: Noto Sans KR;
  border: 1.5px solid #e3a6a1;
  align-self: flex-start;
  padding: 4px 8px 4.5px 8px;
  border-radius: 30px;
  background-color: #f6f2ff;
  box-shadow: 2px 3px 2.5px #d9d9d9;
  margin-bottom: 5px;
  cursor: pointer;
`;

export const SignupButton = styled.button`
  label: signup-button;
  width: 43%;
  max-width: 200px;
  color: #ffffff;
  font-family: Noto Sans KR;
  font-size: 1.4rem;
  border: 0;
  border-radius: 2px;
  background-color: #d67070;
  padding: 8px 15px;
  margin-top: 40px;
  cursor: pointer;
`;
