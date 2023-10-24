import styled from "@emotion/styled"

export const Header = styled.div`
    label:header;
    color:#616161;
    font-size:15px;
    margin-top:40px;
`
export const Content=styled.div`
    label:content;
    display:inline-block;
    flex-direction:column;
    justify-content:center;
    padding:40px;
    align-items:center;
    border:1px solid rgba(181, 146, 255, 0.6);
    border-radius:20px;
    margin-top:20px;
    margin-bottom:60px;
`

export const KeywordArea=styled.div`
    label:keyword-area;
    width:250px;
`

export const AreaTitle=styled.div`
    label:area-title;
    font-size:15px;
    font-weight:400;
    margin-bottom:10px;
`

export const Keywords=styled.div`
    label:keywords;
    display:flex;
    width:100%;
    flex-direction:row;
    flex-wrap: wrap;
    align-content:center;
    column-gap:3px;
    justify-content:center;
    margin-bottom:20px;
`

export const KeywordButton=styled.div`
    label:keyword-button;
    font-size:12px;
    font-weight:450;
    border: 1.5px solid #A281FF;
    align-self:flex-start;
    padding : 6px 10px 6.5px 10px;
    border-radius:30px;
    background-color:#F6F2FF;
    box-shadow:2px 3px 2.5px #D9D9D9;
    margin-bottom:5px;
`

export const SignupButton=styled.button`
    label:signup-button;
    width:43%;
    max-width:200px;
    color:#FFFFFF;
    border:0;
    border-radius:20px;
    background-color:#B592FF;
    padding: 6px 10px;
    margin-top:20px;
`