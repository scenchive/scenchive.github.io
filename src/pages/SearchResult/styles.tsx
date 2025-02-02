import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const breakpoint = '565px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;

const fade = keyframes`
    0%{
        opacity:100;
    }
    50%{
        opacity:0;
    }
    100%{
        opacity:100;
    }
  `;

export const Container = styled.div`
  label: container;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const Main = styled.div`
  label: main;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 20px 0;
  font-family: Noto Sans Kr;

  ${mediaQuery} {
    width: 100%;
    padding: 20px 20px;
    box-sizing: border-box;
  }
`;

export const Content = styled.div`
  label: content;
  width: 100%;

  .content__title {
    width: 100%;
    font-size: 1.5rem;
    margin-bottom: 20px;
    display: flex;
    justify-content: start;
    color: #616161;
    border-bottom: 1px solid #bc5f6a;
    padding: 10px 5px;
    box-sizing: border-box;
  }
  .content__none {
    height: 400px;
    font-size: 1.5rem;
    color: #616161;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Lists = styled.div`
  label: lists;
  width: 100%;
  height: fit-content;
  max-height: 700px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  display: flex;
  flex-direction: column;
`;

export const List = styled.div`
  label: list;
  width: 100%;
  height: 70px;
  margin: 3px 0;
  box-sizing: border-box;
  display: flex;
  cursor: pointer;
  img {
    width: auto;
    height: 70px;
  }
`;

export const ListText = styled.div`
  label: list-text;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin-left: 10px;
  .list-text__title {
    width: fit-content;
    white-space: nowrap;
    font-size: 1.4rem;
    text-align: left;
    margin-bottom: 5px;
  }
  .list-text__sub-title {
    color: #a9a9a9;
    font-size: 1.2rem;
  }
`;

export const Loading = styled.div`
  label: loading;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Noto Sans Kr;
  font-size: 2rem;
  color: #7f8386;
  animation: ${fade} 2s ease-in-out infinite;
`;
