import styled from "@emotion/styled";
const breakpoint = "565px";
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const CellArea = styled.div`
    label: cell-area;
    width: calc( 25% - 20px );
    height: 220px;
    display: flex;
    flex-direction: column;
    padding: 20px 10px ;
    cursor: pointer;
    align-items: center;

`

export const PerfumeImage = styled.img`
    label: perfume-image;
    width: 100%;
    height: 120px;
    object-fit: contain;
    margin-bottom: 10px;

`



export const PerfumeNameEnglish = styled.div`
    label: perfume-name-english;
    color: #2E2E2E;
    font-size: 1.2rem;
    font-family: Noto Sans KR;
    margin-bottom: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical

`

export const BrandNameKorean = styled.div`
    label: brand-name-korean;
    color: #A9A9A9;
    font-size: 1rem;
    font-family: Noto Sans KR;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical
`

export const BrandNameEnglish = styled.div`
    label: brand-name-english;
    color: #A9A9A9;
    font-size: 1rem;
    font-family: Noto Sans KR;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical
`