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

export const ContentLogo = styled.div`
  label: content-logo;
  width: fit-content;
  display: flex;
  justify-content: start;
  align-items: end;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  color: #d67070;
  font-family: Gowun Batang;
  font-weight: bold;
  display: flex;

  .logo__kr {
    width: fit-content;
    font-size: 3rem;
    margin-right: 10px;
  }

  .logo__en {
    width: fit-content;
    font-size: 2rem;
    padding-bottom: 5px;
  }

  ${mediaQuery} {
    width: 100%;
    justify-content: center;
    .logo__kr {
      font-size: 2.5rem;
      margin-right: 5px;
    }

    .logo__en {
      font-size: 1.2rem;
      padding-bottom: 5px;
    }
  }
`;

export const LoginArea = styled.div`
  label: info-area;
  align-items: start;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Notice = styled.div`
  label: notice;
  color: #616161;
  font-size: 1rem;
  margin-bottom: 25px;
  margin-left: auto;
  margin-right: auto;
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
  border: none;
  border-bottom: 1px solid #dfdfdf;
  background-color: transparent;
  outline: none;
  -webkit-box-shadow: 0 0 0 1000px white inset;
`;

export const AlertMessage = styled.div`
  label: alert-message;
  color: red;
  font-size: 10px;
  text-align: left;
  width: inherit;
  position: absolute;
`;

export const LoginButton = styled.button`
  label: signup-button;
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

export const JoinArea = styled.div`
  label: join-area;
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`;

export const JoinTitle = styled.div`
  label: join-title;
  color: #616161;
  font-size: 1rem;
  font-family: Noto Sans KR;
  margin-bottom: 8px;
`;

export const JoinButton = styled.div`
  label: join-button;
  color: #e3a6a1;
  font-size: 1.1rem;
  font-family: Noto Sans KR;
  font-weight: 500;
  cursor: pointer;
`;
