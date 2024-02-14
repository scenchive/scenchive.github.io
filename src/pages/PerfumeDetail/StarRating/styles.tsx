import styled from "@emotion/styled";
const breakpoint = "768px";
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const StarRatingArea = styled.div`
  label: star-rating-area;
  display: flex;
  align-items: center;
  width: fit-content;
  height: 20px;
  margin-right: 5px;

  ${mediaQuery} {
    
  }
`;

export const StarIcon = styled.span`
  label: star-icon;
  display: inline-flex;
  margin-right: 5px;

  ${mediaQuery} {
    
  }
`;


