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
  width: 60%;
  max-width: 700px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-family: Gowun Batang;

  ${mediaQuery} {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
`;


export const PerfumeNameKR=styled.div`
  label: perfume-name-kr;
  color: #242424;
  font-size: 1.7rem;
  font-family: Noto Sans KR;
  margin-top: 4px;

  ${mediaQuery} {
    
  }
  

`

export const PerfumeArea=styled.div`
  label: perfume-area;
  display:flex;
  flex-direction:row;
  margin-top: 50px;

`

export const PerfumeImageArea=styled.div`
  label: perfume-image-area;
  width:250px;
  height:250px;
  position: relative;
  margin-right:15px;

  ${mediaQuery} {
    width:200px;
    height:200px;
    position: relative;
    margin-right:15px;
    
  }
`

export const PerfumeImage=styled.img`
  label:perfume-image;
  width:250px;
  height:250px;
  object-fit:scale-down;
  box-shadow: 2px 2px 10px 2px #EAEAEA;
  
  ${mediaQuery} {
    width:200px;
    height:200px;
    box-sizing: border-box;
  }
`

export const Bookmark=styled.img`
  label: bookmark;
  width: 37.33px;
  height: 59.94px;
  position: absolute;
  top: 0px;
  left: 20px;
  cursor: pointer;
  ${mediaQuery} {


  }
`

export const PerfumeInformationArea=styled.div`
  label: perfume-information;
  display:flex;
  flex-direction:column;
  text-align:left;

`

export const BrandArea=styled.div`
  label: brand-area;
  height: 22px;
  display: flex;
  flex-direction: row;
  cursor:pointer;
  ${mediaQuery} {


  }
`

export const BrandNameKR=styled.span`
  label: brand-name-kr;
  color: #616161;
  font-size: 1.3rem;
  font-family: Noto Sans KR;
  margin-right: 3px;

  ${mediaQuery} {
  }

`

export const BrandDetailPageIcon=styled.img`
  label: brand-detail-page-icon;
  width: 13px;
  height: 13px;
  margin-top: auto;
  margin-bottom: auto;

  ${mediaQuery} {
  }
`

export const BrandNameEN=styled.div`
  label: brand-name-en;

`

export const PerfumeRating=styled.div`
  label: perfume-rating;
  display:flex;
  flex-direction: row;
  margin-top: 5px;
  font-family: Noto Sans KR;
  font-size: 1.1rem;
  color: #2E2E2E;
  font-weight: 500;

`


export const SeasonCell=styled.div `
  label: season-cell;
  width: 65px;
  height: 70px;
  text-align: center;
  margin-right: 10px;
  
  ${mediaQuery} {
  }
`

export const SeasonIcon=styled.img`
  label: season-icon;
  width: 45px;
  height: 35px;
  object-fit: scale-down;
  margin-bottom: 3px;
  
  ${mediaQuery} {
  }
`

export const SeasonRating=styled.div`
  label: season-rating;
  color: #616161;
  font-size:1rem;
  font-family: Noto Sans KR;
  font-weight: 500;

`

export const StatusBarArea=styled.div`
  label: status-bar-area;
  width: 100%;
  height: 10px; 
  border-radius:10px;
  overflow: hidden;
  position: relative;
  margin-top: 5px;
  background-color: #D9D9D9;
`

export const StatusBar=styled.div<{backgroundColor:string, statusWidth:number}>`
  label: status-bar;
  width: ${(props)=>props.statusWidth}%;
  height: 10px;
  background-color: ${(props)=>props.backgroundColor};
  border-radius: 10px;
  position: absolute;
  z-index: 10;
`


export const OtherRatingArea=styled.div`
  label: other-rating-area;
  display:flex;
  flex-direction:row;
  margin-top: 20px;
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