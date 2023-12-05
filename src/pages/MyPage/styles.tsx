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

export const ContentArea = styled.div`
  label:content-area;
  display:flex;
  flex-direction:column;
  width:60%;
  margin-top:130px;
  justify-content: center;
 

`
export const PageName = styled.div`
  label: page-name;
  font-size: 20px;
  color:#616161;
`

export const ProfileArea = styled.div`
  label: profile-area;
  display:flex;
  flex-direction:row;
  margin-left:auto;
  margin-right:auto;
  margin-top:30px;
`

export const ProfileImage = styled.img`
  label:profile-image
  min-width:100px;
  max-width:30%;
  height:auto;
  max-width:100px;
  border-radius:20px;
  object-fit:cover;
  box-shadow: 0.1px 0.1px 3px 1px #DDDDDD;
`

export const NameEmailArea = styled.div`
  label:name-email-area;
  display:flex;
  margin-left:15px;
  align-items:start;
  flex-direction:column;
  margin-top:auto;
  margin-bottom:auto;
  .name_text{
    color:#616161;
    font-size:20px;
    line-height:17px;
  }
  .email_text{
    color:#616161;
    font-size: 18px;
    font-weight:400;
    line-height:17px;
    margin-top:5px;
  }
`

export const ChangeInfoButton = styled.button`
  label:change-info-button;
  color:#A2A2A2;
  font-size:12px;
  margin-top:12px;
  border:none;
  padding:0px;
  background-color:transparent;
  cursor:pointer;
`


export const KeywordArea = styled.div`
  label:keyword-area;
  width:100%;
  margin-top:39px;
  margin-bottom:25px;
  text-align:left;
`

export const KeywordAreaTitle = styled.div`
  label:keyword-area-title;
  color:#000000;
  font-size:16px;
  margin-bottom:25px;
`

export const MyKeywordsArea = styled.div`
  label:my-keywords-area;
  width:inherit;
  height:auto;
  display:flex;
  flex-direction:row;
  margin-bottom:55px;
  flex-flow:wrap;
`

export const Keyword = styled.div<{ isModify: boolean | undefined }>`
  label:keyword;
  width: fit-content;
  padding:11px 16px;
  border:1.5px solid #A281FF;
  background-color:${(props) => (props.isModify === true ? "#B592FF" : "#F7F4FF")};
  border-radius:30px;
  white-space:nowrap;
  cursor:${(props) => (props.isModify === true ? "pointer" : null)};
  color:${(props) => (props.isModify === true ? "#FFFFFF" : "#616161")};
`

export const TabButtonArea = styled.div`
  label:tab-button-area;
  width:100%;
  display:flex;
  flex-direction:row;

`

export const BookmarkedTabButton = styled.div<{ clickedTabMenu: string }>`
  label:bookmarked-button;
  width:50%;
  color:${(props) => (props.clickedTabMenu === "북마크한 향수" ? "#FFFFFF" : "#A9A9A9")};
  background-color:${(props) => (props.clickedTabMenu === "북마크한 향수" ? "#A281FF" : "#E6E4FF")};
  font-size:16px;
  padding-top:11px;
  padding-bottom:11px;

`
export const RecommendTabButton = styled.div<{ clickedTabMenu: string }>`
  label:recommend-button;
  width:50%;
  color:${(props) => (props.clickedTabMenu === "맞춤 추천 향수" ? "#FFFFFF" : "#A9A9A9")};
  background-color:${(props) => (props.clickedTabMenu === "맞춤 추천 향수" ? "#A281FF" : "#E6E4FF")};
  font-size:16px;
  padding-top:11px;
  padding-bottom:11px;
`
