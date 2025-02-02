import styled from "@emotion/styled";
const breakpoint = "565px";
const mediaQuery = () => `@media(max-width:${breakpoint})`;

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

export const UserName=styled.div`
  label: user-name;
  width:fit-content;
  color: #818181;
  font-size: 1.2rem;
  font-family: Noto Sans KR;
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