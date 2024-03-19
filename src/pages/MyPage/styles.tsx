import styled from "@emotion/styled";
const breakpoint = "565px";
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
`;

export const Main = styled.div`
  label: main;
  width:60%;
  margin-top:40px;
  display:flex;
  flex-direction:column;

  ${mediaQuery} {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
`

export const ProfileArea = styled.div`
  label: profile-area;
  display:flex;
  flex-direction:row;

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

export const ButtonArea = styled.div`
  label: button-area;
  display: flex;
  flex-direction: row;


  .split{
    color:#A2A2A2;
    font-size:1.2rem;
    font-family: Noto Sans KR;
    border:none;
    margin-top:12px;
    margin-left: 10px;
    margin-right: 10px;
    cursor:pointer;
  }
`

export const ProfileButton = styled.div<{ isPink: boolean | undefined }>`
  label: profile-button;
  height: 20px;
  color:${(props) => (props?.isPink === true ? "#E3A6A1" : "#A2A2A2")};
  font-size:1.2rem;
  font-family: Noto Sans KR;
  margin-top:12px;
  border:none;
  padding:0px;
  background-color:transparent;
  cursor:pointer;
`

export const SettingIcon= styled.img`
  label: setting-icon;
  width: 14px;
  height: 15px;
  margin-top:12px;
  margin-right: 3px;
  align-self: center;
  object-fit: cover;
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
  margin-bottom:25px;
  flex-flow:wrap;
`

export const Keyword = styled.div<{ isModify: boolean | undefined }>`
  label:keyword;
  width: fit-content;
  font-family: Noto Sans KR;
  font-size: 1.2rem;
  padding:5px 10px;
  border:1.5px solid #E3A6A1;
  background-color:${(props) => (props.isModify === true ? "#F5D0CD" : "#D67070")};
  margin-right: 2px;
  margin-bottom: 3px;
  border-radius:30px;
  white-space:nowrap;
  cursor:${(props) => (props.isModify === true ? "pointer" : null)};
  color:${(props) => (props.isModify === true ? "#616161" : "#FFFFFF")};
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
  color: #FFFFFF;
  background-color:${(props) => (props.clickedTabMenu === "북마크한 향수" ? "#E3A6A1" : "#F5D0CD")};
  font-size:1.5rem;
  font-family: Noto Sans KR;
  padding-top:11px;
  padding-bottom:11px;
  cursor: pointer;
`

export const RecommendTabButton = styled.div<{ clickedTabMenu: string }>`
  label:recommend-button;
  width:50%;
  color: #FFFFFF;
  background-color:${(props) => (props.clickedTabMenu === "맞춤 추천 향수" ? "#E3A6A1" : "#F5D0CD")};
  font-size:1.5rem;
  font-family: Noto Sans KR;
  padding-top:11px;
  padding-bottom:11px;
  cursor:pointer;
`

export const ListArea = styled.div`
  label: list-area;
  display:flex;
  flex-wrap:wrap;
  margin-top: 10px;
  // margin-bottom: 200px;
`

export const NoticeComment = styled.div`
  label: notice-comment;
  color: #929292;
  font-size:1.4rem;
  font-family: Noto Sans KR;
  margin-top: 50px;
`