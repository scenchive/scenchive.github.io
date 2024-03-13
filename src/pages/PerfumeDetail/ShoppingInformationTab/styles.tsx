import styled from "@emotion/styled";


export const ShoppingInformationTabArea = styled.div`
  label:shopping-information-tab-area;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items:center; 
  margin-top:20px;

`;

export const ShoppingTabTitle = styled.div`
  label:shopping-tab-title;
  width:fit-content;
  display:flex;
  font-size:2rem;
  font-family: Noto Sans KR;
  color:#4C4538;
  margin-top: 50px;
  margin-right:auto;
  margin-bottom:20px;
`

export const WarningBox = styled.div`
  label: warning-box;
  display:flex;
  flex-direction:column;
  border:1px solid #D67070;
  border-radius:10px;
  padding: 20px 25px;
  margin-bottom:20px;

`

export const WarningTitle = styled.div`
  label: warning-title;
  font-size:1.8rem;
  font-family: Noto Sans KR;
  color:#242424;
  margin-bottom:20px;
`

export const WarningContent = styled.div`
  label: warning-content;
  font-family: Noto Sans KR;
  font-size: 1.5rem;
  text-align:left;
`

export const ShoppingInformationRow = styled.div`
  label: shopping-information-row;
  width:100%;
  display:flex;
  flex-direction:row;
  align-self:start;
  margin-bottom:15px;
  cursor:pointer;
`

export const PerfumeImage = styled.img`
  label: perfume-image;
  width:50px;
  height:50px;
  object-fit:cover;
  margin-right:10px;
`

export const ShoppingInformationArea = styled.div`
  label:shopping-information-area;
  display:flex;
  flex-direction:column;
  align-items:start;
`

export const ProductName = styled.div`
  label: product-name;
  font-size:15px;
  text-align:start;

`

export const ShoppingMallName = styled.div`
  label: shopping-mall-name;
  font-size:15px;
`

export const Price = styled.div`
  label:price;

`