import styled from "@emotion/styled";


export const Container = styled.div`
  label:container;
  width: 100%;
  min-height:800px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 992px;
  align-items:center; 
`;

export const Header = styled.div`
  label:header;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 50px;
  box-sizing: border-box;
  color: #bf8dff;
  font-family: NanumSquareRound;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  box-shadow: 0px 5px 5px #f6f2ff;
`;

export const HeaderLeft = styled.div`
  width: fit-content;
  margin-right: 20px;
  display: flex;
  align-items: center;
`;

export const Title = styled.div`
  width: fit-content;
  display: flex;
  align-items: end;
  .title__kr {
    font-size: 30px;
    margin-right: 10px;
  }
  .title__en {
    font-size: 15px;
    padding-bottom: 5px;
  }
`;

export const Menu = styled.div`
  display: flex;
  margin-left: 50px;
  font-size: 17px;
`;

export const MenuList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  line-height: 49px;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderText = styled.div`
  padding: 0 5px;
  font-size: 15px;
`;

export const ContentArea=styled.div`
  label: content-area;
  width:60%;
  margin-top:230px;
  display:flex;
  flex-direction:column;

`

export const BoardMenu=styled.div`
  label: board-menu;
  width:fit-content;
  color: #FFFFFF;
  background-color:#B592FF;
  border-radius:20px;
  padding: 5px 10px;
  margin-right:auto;
  margin-bottom:15px;
`

export const BoardTitle=styled.div`
  label: board-title;
  width:100%;
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
  padding-right:10px;
`

export const UploadTime=styled.div`
  label: upload-time;
  
`

export const BoardContent=styled.div`
  label: board-content;
  width:100%;
  text-align:start;
  margin-top:40px;
  margin-bottom:100px;
`

export const WriteCommentArea=styled.div`
  label: write-comment-area;
  width:100%;
  display:flex;
  flex-direction:row;
`

export const CommentInput=styled.textarea`
  label: write-comment;
  width:-webkit-fill-available;
  height:50px;
  resize:none;
  border:1px solid #DFDFDF;
  padding:15px;
  :focus{
    outline:none;
  }
`

export const CommentButton=styled.div`
  label: write-comment-button;
  width:10%;
  cursor:pointer;

`

export const CommentArea=styled.div`
  label: comment-area;
  margin-top:40px;
`

export const CommentRow=styled.div<{isLast:boolean}>`
  label: comment-row;
  display:flex;
  flex-direction:column;
  margin-bottom:20px;
  padding-bottom:20px;
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
  margin-top:4px;

`

export const MinorArea=styled.div`
  label: minor-area;
  display:flex;
  flex-direction:row;
`

export const CommentTime=styled.div`
  label: comment-time;
  font-size:12px;
  color:#A0A0A0;
  margin-top:6px;
  
`

export const ReplyButton=styled.div`
  label: reply-button;
  font-size:12px;
  color:#A0A0A0;
  margin-top:6px;
  margin-left:20px;
  cursor:pointer;
`

export const DeleteButton=styled.div`
  label: delete-button;
  width:10%;
  font-size: 12px;
  cursor:pointer;

`

export const DeletedComment=styled.div`
  label: deleted-comment;
  color:#717171;
  margin-left:20px;
  margin-top:5px;
  margin-bottom:5px;
`