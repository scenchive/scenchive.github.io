import styled from "@emotion/styled";
const breakpoint = "565px";
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const SliderContainer = styled.div`
  label: slider-container;
  display: block;

  .slick-slider{
    display: flex;
    justify-content: space-evenly;
  }
  .slick-list{
    width: 100%;
  }
  .slick-slide.slick-active {
  }

`


export const ShoppingCell = styled.div`
  label: shopping-cell;
  width: inherit;
  cursor: pointer;


  ${mediaQuery} {
    width: 100px;

  }
`;

export const ShoppingImage = styled.img`
  label: shopping-image;
  width: calc( 100% - 10px );
  height: auto;
  max-height: 150px;
  border-radius: 4px;
  object-fit: cover;

  ${mediaQuery} {

  }
`;

export const ShoppingInfo = styled.div`
  label: shopping-info;
  width: calc( 100% - 10px );
  font-size: 1.4rem;
  font-family: Noto Sans KR;
  color: #242424;


  ${mediaQuery} {

  }
`;

export const MallName = styled.div`
  label: mall-name;
  width: calc( 100% - 10px );
  font-size: 1rem;
  font-family: Noto Sans KR;
  color: #616161;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-align: left;
  margin-bottom: 4px;


  ${mediaQuery} { 

  }
`;

export const GoodsTitle = styled.div`
  lable: goods-title;
  width: calc( 100% - 20px );
  font-size: 1.2rem;
  font-family: Noto Sans KR;
  color: #242424;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-align: left;
  margin-bottom: 7px;


  ${mediaQuery} {

  }
`

export const Price = styled.div`
  label: price;
  width: calc( 100% - 20px );
  font-size: 1.2rem;
  font-family: Noto Sans KR;
  font-weight: 500;
  color: #242424;

  text-align: left;
  ${mediaQuery} {

  }
`;

