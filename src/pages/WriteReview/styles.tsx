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

export const PerfumeNameKR=styled.div`
  label: perfume-name-kr;
  margin-top:50px;

`

export const PerfumeArea=styled.div`
  label: perfume-area;
  display:flex;
  flex-direction:column;
  align-items:center;
  
`
export const PerfumeImage=styled.img`
  label:perfume-image;
  width:300px;
  height:300px;
  object-fit:cover;
  box-shadow: 5px 5px 5px 5px #F3F3F3;
  border-radius:20px;
  margin-bottom:30px;
`

export const BrandNameKR=styled.div`
  label: brand-name-kr;

`

export const PageTitle=styled.div`
  label: page-title;
`

export const PerfumeName=styled.div`
  label: perfume-name;
`

export const KeywordArea=styled.div`
  label:keyword-area;
  width:100%;
  margin-top:40px;
`

export const AreaTitle=styled.div`
  label: area-title;
  width:fit-content;
  font-size:20px;
  margin-right:auto;
`

export const KeywordCellArea=styled.div`
  label: keyword-cell-area;
  display:flex;
  flex-direction:row;
`

export const KeywordCell=styled.div`
  label: keyword-cell;
  background-color:black;
  color:white;
  border:1px solid blue;
  border-radius:20px;
  padding:8px 10px;
  cursor :pointer;
`

export const AddCell=styled.div`
  label: add-cell;
  border:1px solid red;
  border-radius:20px;
  padding:8px 10px;
  cursor :pointer;
`

export const ReviewArea=styled.div`
  label: review-area;
  width:100%;
  display:flex;
  flex-direction:column;
  margin-top:50px;
`

export const QuestionRow=styled.div`
  label: question-row;
  width:100%;
  margin-right:auto;
  margin-top:40px;
`

export const Question=styled.div`
  label: question;
  width:fit-content;
`

export const AnswerRow=styled.div`
  label:answer-row;
  width:fit-content;
  display:flex;
  flex-direction:row;
  margin-left:auto;
  margin-right:auto;
  margin-top:10px;
`


export const Answer=styled.div`
  label:answer;
  cursor:pointer;
  margin-left:5px;
  margin-right:5px;
  border:1px solid red;
  padding:8px 10px;
  border-radius:20px;

`

export const DetailReviewRow=styled.div`
  label: detail-review-row;
  width:100%;
  margin-top:50px;
  margin-right:auto;
`

export const DetailReviewAnswer=styled.textarea`
  label: detail-review-answer;
  width:100%;
  border:1px solid red;
  resize:none;
  margin-top:15px;
  margin-bottom:40px;
  :focus{
    outline:none;
  }
`

export const UploadButton=styled.div`
  label: upload-button;
  margin-bottom:100px;
  cursor:pointer;
`