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
`;

export const Title = styled.h1`
  label: page-title;
  font-family: Noto Sans Kr;
  font-size: 2.5rem;
  margin-top: 69px;
  color: #616161;
  margin-bottom: 30px;
`;

export const SearchNotice = styled.div`
  label: search-notice;
  font-family: Gowun Batang;
  font-weight: 500;
  font-size: 1.8rem;
  color: #242424;
  margin-bottom: 20px;

  & span {
    color: #d67070;
  }
`;

export const Row = styled.div`
  label: row;
  width: 250px;
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  align-items: start;
`;

export const SelectedPerfumeImage = styled.img`
  label: selected-perfume-image;
  width: 250px;
  height: 250px;
  border-radius: 20px;
  object-fit: constain;
  margin-bottom: 18px;
`;

export const SelectedPerfumeName = styled.strong`
  label: selected-perfume-name;
  width: inherit;
  font-size: 18px;
  font-weight: 400;
  color: #08799c;
`;

export const NoteArea = styled.article`
  label: note-area;
  display: flex;
  flex-direction: column;
`;

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

export const AddButton = styled.button`
  label: add-button;
  width: auto;
  height: 30px;
  font-size: 1.3rem;
  font-weight: 500;
  color: #ffffff;
  margin-top: 15px;
  margin-bottom: 50px;
  background-color: #d67070;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
