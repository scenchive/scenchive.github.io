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

export const InputRow=styled.div`
  labeL: title-row;
  width:100%;
  display:flex;
  flex-direction:row;
  margin-bottom:20px;
`

export const RowTitle=styled.div`
  label: row-title;
  width:10%;
  text-align:left;
  
`

export const TitleInput=styled.input`
  label: title-input;
  width:-webkit-fill-available;
  height:25px;
  padding: 2px 10px;
  border:1px solid #DFDFDF;
  border-radius:5px;
  white-space:nowrap;
  overflow-y:hidden;
  resize:none;
  overflow:hidden;
  :focus{
    outline:none;
  }

`

export const MenuInputArea=styled.div`
  label: menu-input-area;
  width:-webkit-fill-available;
  display:flex;
  flex-direction:row;
`

export const CommunityMenu=styled.div<{isSelected:boolean}>`
  label: community-menu;
  margin-right:10px;
  padding: 3px 8px;
  border: ${(props)=>props.isSelected?"1px solid #B592FF": "1px solid #BABABA"};
  border-radius:20px;
  color:${(props)=>props.isSelected?"#B592FF": "#BABABA"};
  cursor:pointer;
`

export const CommunityContentInput=styled.textarea`
  label: community-content-input;
  width: -webkit-fill-available;
  height:300px;
  padding: 15px;
  border:1px solid #DFDFDF;
  border-radius:5px;
  resize:none;
  :focus{
    outline:none;
  }
`

export const ImageUploadButton=styled.input`
  label: image-upload-button;
`

export const WriteButton=styled.div`
  label: write-button;
  width:fit-content;
  margin-top:40px;
  margin-left:auto;
  padding: 5px 10px;
  background-color:#B592FF;
  border-radius:5px;
  color:#FFFFFF;
  cursor:pointer;
`