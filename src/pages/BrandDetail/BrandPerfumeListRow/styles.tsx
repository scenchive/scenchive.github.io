import styled from '@emotion/styled';

const breakpoint = '565px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const Container = styled.div`
  label: container;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 50px;
`;

export const Top = styled.div`
  label: top;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 10px;
  position: relative;
  box-sizing: border-box;
  font-family: Noto Sans Kr;
  img {
    height: 100px;
    margin-bottom: 10px;
  }
`;

export const TopText = styled.div`
  label: list-text;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  .top-text__title {
    width: fit-content;
    white-space: nowrap;
    font-size: 1.4rem;
    text-align: left;
    margin-bottom: 5px;
    color: #242424;
  }
  .top-text__sub-title {
    color: #a9a9a9;
    font-size: 1.2rem;
  }
`;

export const Text = styled.div`
  width: 70%;
  font-size: 1.4rem;
  color: #616161;
  text-align: start;
  margin-bottom: 5px;
  padding: 5px 5px;
  box-sizing: border-box;
  border-bottom: 1px solid #bc5f6a;

  ${mediaQuery} {
    width: calc(100% - 40px);
  }
`;

export const Lists = styled.div`
  label: lists;
  width: 70%;
  height: fit-content;
  max-height: 1000px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  display: flex;
  flex-direction: column;

  ${mediaQuery} {
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
  }
`;

export const List = styled.div`
  label: list;
  width: 100%;
  height: 100px;
  padding: 10px 0;
  box-sizing: border-box;
  margin: 3px 0;
  box-sizing: border-box;
  display: flex;
  img {
    width: auto;
    height: 80px;
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
