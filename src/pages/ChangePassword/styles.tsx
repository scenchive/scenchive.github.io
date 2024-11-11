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
`;

export const Main = styled.div`
  label: main;
  width: 60%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

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

export const InputArea = styled.div`
  label: input-area;
  align-items: start;
  display: flex;
  flex-direction: column;
`;

export const RowArea = styled.div`
  max-width: 90%;
  min-width: 250px;
`;

export const QuestionRow = styled.div`
  label: question-row;
  width: fit-content;
  color: #616161;
  font-family: Noto Sans KR;
  font-size: 14px;
  font-weight: 400;
  margin-right: auto;
  margin-bottom: 2px;
`;

export const AnswerRow = styled.input`
  label: answer-row;
  height: 25px;
  width: -webkit-fill-available;
  font-family: Noto Sans KR;
  font-size: 1.1rem;
  margin-bottom: 25px;
  border: none;
  border-bottom: 1px solid #dfdfdf;
  background-color: transparent;
  outline: none;
  -webkit-box-shadow: 0 0 0 1000px white inset;
`;

export const ChangeButton = styled.button`
  label: change-button;
  width: 43%;
  max-width: 200px;
  color: #ffffff;
  font-family: Noto Sans KR;
  font-size: 1.6rem;
  border: 0;
  border-radius: 5px;
  background-color: #d67070;
  padding: 6px 10px;
  margin-top: 10px;
  cursor: pointer;
`;
