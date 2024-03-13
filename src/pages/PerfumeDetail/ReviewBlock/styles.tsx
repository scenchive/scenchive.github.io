import styled from "@emotion/styled";


export const ReviewArea=styled.div`
  label: review-area;
  width:100%;
  display:flex;
  flex-direction:column;
  margin-top:80px;
  margin-bottom:100px;

`

export const ReviewHeaderArea=styled.div`
  label:review-header-area;
  display:flex;
  flex-direction:row;
  margin-bottom: 30px;

`

export const ReviewAreaTitle=styled.div`
  label:review-area-title;
  margin-right:auto;
  width:fit-content;
  display:flex;
  font-size:2rem;
  font-family: Noto Sans KR;
  color:#4C4538;
`

export const WriteReviewButton=styled.div`
  label:write-review-button;
  color: #FFFFFF;
  font-size: 1.4rem;
  font-family: Noto Sans KR;
  background-color: #D67070;
  border: 1px solid #EFC6C6;
  border-radius: 3px;
  margin-left:auto;
  padding: 3px 13px;
  text-align: center;
  cursor:pointer;
`


export const ReviewRow=styled.div`
  label: review-row;
  text-align:left;
  margin-bottom:40px;  
  font-size: 1.5rem;
  font-family: Noto Sans KR;
  color: #616161;
`

export const UserInformationArea=styled.div`
  label:user-information-area;
  display:flex;
  flex-direction:row;
  margin-bottom:7px;
`

export const UserProfilePicture=styled.img`
  label:user-profile-picture;
  width:50px;
  height:50px;
  object-fit:cover;
  box-shadow: 1px 1px 3px 1px #EAEAEA;
  border-radius: 12px;
`

export const UserInformation=styled.div`
  label:user-information;
  display:flex;
  flex-direction:row;
  font-size: 1.3rem;
  font-family: Noto Sans KR;
  color: #616161;
  margin-left:15px;
`

export const UserName=styled.div`
  label:user-name;
  font-size: 1.3rem;
  font-family: Noto Sans KR;
  color: #616161;
  margin-right: 6px;
`

export const UpdatedAt=styled.div`
  label:updated-at;
  font-size: 1.3rem;
  font-family: Noto Sans KR;
  color: #616161;
  margin-left: 6px;
`