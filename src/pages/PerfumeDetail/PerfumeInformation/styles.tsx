import styled from '@emotion/styled';
const breakpoint = '565px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const PerfumeInformationArea = styled.div`
  label: perfume-information;
  display: flex;
  flex-direction: column;
  text-align: left;
  ${mediaQuery} {
    display: none;
  }
`;

export const PerfumeNameKR = styled.div`
  label: perfume-name-kr;
  color: #242424;
  font-size: 1.7rem;
  font-family: Noto Sans KR;
  margin-top: 4px;

  ${mediaQuery} {
  }
`;

export const BrandArea = styled.div`
  label: brand-area;
  height: 22px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  ${mediaQuery} {
  }
`;

export const BrandNameKR = styled.span`
  label: brand-name-kr;
  color: #616161;
  font-size: 1.3rem;
  font-family: Noto Sans KR;
  margin-right: 3px;

  ${mediaQuery} {
  }
`;

export const BrandDetailPageIcon = styled.img`
  label: brand-detail-page-icon;
  width: 13px;
  height: 13px;
  margin-top: auto;
  margin-bottom: auto;

  ${mediaQuery} {
  }
`;

export const PerfumeRating = styled.div`
  label: perfume-rating;
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  font-family: Noto Sans KR;
  font-size: 1.1rem;
  color: #2e2e2e;
  font-weight: 500;

  ${mediaQuery} {
    margin-top: 12px;
  }
`;
