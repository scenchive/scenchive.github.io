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
  margin-top:80px;
  display:flex;
  flex-direction:column;

`

export const MenuArea=styled.div`
  label: menu-area;
  display:flex;
  flex-direction:row;
  margin-top:150px;
`

export const CommunityMenu=styled.div`
  label: community-menu;
  width:fit-content;
  margin-left:10px;
  margin-rigth:10px;
  cursor:pointer;
`

export const CommunityArea=styled.div`
  label: community-area;
  display:flex;
  flex-direction:column;
`

export const CommunityRow=styled.div`
  label: community-row;
  display:flex;
  flex-direction:row;
  cursor:pointer;
`

export const RowNumber=styled.div`
  label: row-number;
  width: 10%;
`

export const RowMenu=styled.div`
  label: row-menu;
  width: 15%;
`

export const RowTitle=styled.div`
  label: row-title;
  width:75%;
`

export const WriteButton=styled.div`
  label: write-button;
  width:fit-content;
  margin-top:40px;
  margin-left:auto;
  padding: 5px 10px;
  background-color:#B592FF;
  border-radius:20px;
  color:#FFFFFF;
  cursor:pointer;
`