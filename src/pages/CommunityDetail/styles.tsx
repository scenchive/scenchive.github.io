import styled from "@emotion/styled";
const breakpoint = "768px";
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const Container = styled.div`
  label:container;
  width: 100%;
  min-height:800px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items:center; 

  ${mediaQuery} {

  }
`;

export const Main=styled.div`
  label: main;
  width:60%;
  margin-top:80px;
  display:flex;
  flex-direction:column;

  ${mediaQuery} {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
`

export const BoardMenu=styled.div`
  label: board-menu;
  width:fit-content;
  color: #E3A6A1;
  font-family: Noto Sans KR;
  font-size:1.6rem;
  margin-bottom:8px;
  cursor:pointer;

  ${mediaQuery} {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
`

export const BoardMenuGo=styled.img`
  label: board-menu-go;
  margin-left: 8px;

  ${mediaQuery} {
    
  }
`

export const BoardTitle=styled.div`
  label: board-title;
  width:100%;
  color: #616161;
  font-size: 2.1rem;
  font-family: Noto Sans KR;
  text-align:start;
  margin-bottom:10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #DFDFDF;
`

export const BoardInfoArea=styled.div`
  label: board-info-area;
  display:flex;
  flex-direction:row;

`

export const UserName=styled.div`
  label: user-name;
  width:fit-content;
  color: #818181;
  font-size: 1.2rem;
  font-family: Noto Sans KR;
`

export const UploadTime=styled.div`
  label: upload-time;
  color: #818181;
  font-size: 1.2rem;
  font-family: Noto Sans KR;

`

export const BoardContent=styled.div`
  label: board-content;
  width:100%;
  color: #717171;
  font-size: 1.2rem;
  font-family: Noto Sans KR;
  text-align:start;
  margin-top:20px;
  margin-bottom:100px;
`

export const WriteCommentArea=styled.div`
  label: write-comment-area;
  width:100%;
  display:flex;
  flex-direction:column;
  border:1px solid #EAEAEA;
  border-radius:2px;
`

export const CommentInput=styled.textarea`
  label: write-comment;
  width:-webkit-fill-available;
  height:45px;
  resize:none;
  color: #B2B2B2;
  border:none;
  font-size: 1.2rem;
  font-family: Noto Sans KR;
  margin: 12px 16px;
  :focus{
    outline:none;
  }
`

export const CommentButton=styled.div`
  label: write-comment-button;
  width:fit-content;
  color: #D67070;
  font-size: 1.3rem;
  font-family: Noto Sans KR;
  cursor:pointer;
  margin-left: auto;
  margin-right: 16px;
  margin-bottom: 12px;

`

export const CommentArea=styled.div`
  label: comment-area;
  margin-top:40px;
`

export const CommentRow=styled.div<{isLast:boolean}>`
  label: comment-row;
  display:flex;
  flex-direction:column;
  margin-bottom:10px;
  padding-bottom:10px;
  border-bottom: ${(props)=>props?.isLast===false? "1px solid #E8E8E8": null};
`

export const UserImage=styled.img`
  label: user-image;
  width:50px;
  height:50px;
  object-fit:cover;
  margin-right:10px;
  border:radius:20px;

`

export const CommentDetailArea=styled.div`
  label: comment-detail-area;
  width:-webkit-fill-available;
  text-align:start;
`

export const CommentDetail=styled.div`
  label: comment-detail-area;
  color:#717171;
  font-size: 1.3rem;
  font-family: Noto Sans KR;
  margin-top:4px;

`

export const MinorArea=styled.div`
  label: minor-area;
  display:flex;
  flex-direction:row;
`

export const CommentTime=styled.div`
  label: comment-time;
  font-size:1rem;
  font-family: Noto Sans KR;
  color:#A0A0A0;
  margin-top:6px;
  
`

export const ReplyButton=styled.div`
  label: reply-button;
  font-size:1rem;
  font-family: Noto Sans KR;
  color:#A0A0A0;
  margin-top:6px;
  margin-left:20px;
  cursor:pointer;
`

export const DeleteButton=styled.img`
  label: delete-button;
  width: 15px;
  height: 15px;
  cursor:pointer;

`

export const DeletedComment=styled.div`
  label: deleted-comment;
  color:#616161;
  font-size: 1.2rem;
  font-family: Noto Sans KR;
  margin-left:20px;
  margin-top:5px;
  margin-bottom:5px;
`