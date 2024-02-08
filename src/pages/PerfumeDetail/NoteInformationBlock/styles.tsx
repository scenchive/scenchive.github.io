import styled from "@emotion/styled";
const breakpoint = "768px";
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const NoteArea=styled.div`
  label: note-area;
  width: 100%;
  position: relative;
  margin-top: 72px;
  padding-top: 40px;
  padding-bottom: 40px;
`

export const ImageNoteUp=styled.img`
  label: image-note-up;
  position: absolute;
  top: 0;
  left: 0;

  ${mediaQuery} {
    display: none;
  }
`

export const ImageNoteDown=styled.img`
  label: image-note-down;
  position: absolute; 
  bottom: 0;
  right: 0;

  ${mediaQuery} {
    display: none;
  }
`

export const NoteTitle=styled.div`
  label: note-title;
  color: #D67070;
  font-size:2rem;
  font-family: Noto Sans KR;
  margin-top:40px;
  margin-bottom:15px;
`

export const NoteInformation=styled.div`
  label:note-information;
  color: #616161;
  font-family: Noto Sans KR;
  font-size: 1.5rem;
`

export const NoteInformationArea=styled.div`
  label:note-information-area;
  display: flex;
  flex-direction: column;
`

