import styled from "@emotion/styled";
const breakpoint = "768px";
const mediaQuery = () => `@media(max-width:${breakpoint})`;



export const SeasonRatingArea=styled.div`
  label: season-rating-area;
  display:flex;
  flex-direction:row;
  margin-top: 6px;
`

export const SeasonCell=styled.div `
  label: season-cell;
  width: 65px;
  height: 70px;
  text-align: center;
  margin-right: 10px;
  
  ${mediaQuery} {
    width: 60px;
    height: 55px;
  }
`

export const SeasonIcon=styled.img`
  label: season-icon;
  width: 45px;
  height: 35px;
  object-fit: scale-down;
  margin-bottom: 3px;
  
  ${mediaQuery} {
    width: 30px;
    height: 25px;
    margin-bottom: 0px;
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
  ${mediaQuery} {
    height: 8px;
  }
`

export const StatusBar=styled.div<{backgroundColor:string, statusWidth:number}>`
  label: status-bar;
  width: ${(props)=>props.statusWidth}%;
  height: 10px;
  background-color: ${(props)=>props.backgroundColor};
  border-radius: 10px;
  position: absolute;
  z-index: 10;
  ${mediaQuery} {
    height: 8px;
  }
`


export const OtherRatingArea=styled.div`
  label: other-rating-area;
  display:flex;
  flex-direction:row;
  margin-top: 20px;
  ${mediaQuery} {
    margin-top: 10px;
  }
`
