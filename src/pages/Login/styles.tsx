import styled from "@emotion/styled"

export const Header = styled.div`
    label:header;
    color:#616161;
    font-size:15px;
    margin-top:80px;
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

export const LoginArea=styled.div`
    label:info-area;
    align-items:start;
    display:flex;
    flex-direction:column;

`

export const RowArea=styled.div`
    max-width:90%;
    min-width:250px;
`

export const QuestionRow=styled.div`
    label:question-row;
    width:fit-content;
    color:#616161;
    font-size:14px;
    font-weight:400;
    margin-right:auto;
    margin-bottom:2px;
`

export const AnswerRow=styled.input`
    label:answer-row;
    height:25px;
    width:-webkit-fill-available;
    margin-bottom:25px;
    border:none;
    border-bottom:1px solid #DFDFDF;
    background-color:transparent;
    outline:none;
    -webkit-box-shadow: 0 0 0 1000px white inset;
`
export const LoginButton=styled.button`
    label:signup-button;
    width:43%;
    max-width:200px;
    color:#FFFFFF;
    border:0;
    border-radius:20px;
    background-color:#B592FF;
    padding: 6px 10px;
    margin-top:10px;
`