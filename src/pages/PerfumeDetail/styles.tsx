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
  flex-direction:row;
  
`
export const PerfumeImage=styled.img`
  label:perfume-image;
  width:300px;
  height:300px;
  object-fit:cover;
  box-shadow: 5px 5px 5px 5px #F3F3F3;
  border-radius:20px;
  margin-right:15px;
`

export const PerfumeInformationArea=styled.div`
  label: perfume-information;
  display:flex;
  flex-direction:column;
  text-align:left;

`

export const BrandNameKR=styled.div`
  label: brand-name-kr;

`

export const BrandNameEN=styled.div`
  label: brand-name-en;

`

export const PerfumeRating=styled.div`
  label: perfume-rating;
`

export const SeasonRatingArea=styled.div`
  label: season-rating-area;
  display:flex;
  flex-direction:row;
`

export const SeasonRating=styled.div`
  label: season-rating;
  font-size:15px;
  margin-right:10px;
`

export const OtherRatingArea=styled.div`
  label: other-rating-area;
  display:flex;
  flex-direction:column;
`

export const ButtonArea=styled.div`
  label: button-area;
  display:flex;
  flex-direction:row;
  
`

export const MenuButton=styled.div`
  label: menu-button;
  display:flex;
  justify-content:center;
  align-items:center;
  width:50%;
  height:30px;
  margin-top:50px;
  cursor:pointer;
`

// export const BasicInformationButton=styled.div`

// `

// export const ShoppingInformationButton=styled.div`

// `