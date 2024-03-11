import styled from "@emotion/styled";
const breakpoint = "565px";
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const ShoppingCell = styled.div`
  label: shopping-cell;
  width: 100px;
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;

  ${mediaQuery} {

  }
`;

export const ShoppingImage = styled.img`
  label: shopping-image;
  width: 100%;
  height: 100px;
  border-radius: 4px;
  object-fit: cover;

  ${mediaQuery} {

  }
`;

export const ShoppingInfo = styled.div`
  label: shopping-info;
  font-size: 1.4rem;
  font-family: Noto Sans KR;
  color: #242424;
  width: 100%;

  ${mediaQuery} {

  }
`;

export const MallName = styled.div`
  label: mall-name;
  width: fit-content;
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
  width: fit-content;
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
  width: fit-content;
  font-size: 1.2rem;
  font-family: Noto Sans KR;
  font-weight: 500;
  color: #242424;
  margin-right: auto;
  
  ${mediaQuery} {

  }
`;

