import styled from "@emotion/styled"

export const Header = styled.div`
    label:header;
    color:#616161;
    font-size:18px;
    margin-top:40px;
`
export const Content=styled.div`
    label:content;
    display:inline-block;
    flex-direction:column;
    jusify-content:center;
    margin-top:20px;
    margin-bottom:60px;
    padding-left:20px;
    padding-right:20px;
    align-items:center;
    border:1px solid rgba(181, 146, 255, 0.6);
    border-radius:20px;
    padding: 40px;
`
export const PfpArea=styled.div`
    label:pfp-area;
    justify-content:center;
    display:flex;
    flex-direction:column;
`
export const PreviewProfileImage=styled.img`
    label:pfp-upload-image;
    width:80px;
    height:80px;
    border-radius:20px;
    object-fit:cover;
    margin-left:auto;
    margin-right:auto;
    
` 
export const PfpUploadTitle=styled.label`
    label:pfp-upload-title;
    color:#B592FF;
    font-size:13px;
    margin-top:10px;
    margin-left:auto;
    margin-right:auto;
`
export const InfoArea=styled.div`
    label:info-area;
    align-items:start;
    margin-top:44px;
    display:flex;
    flex-direction:column;

`

export const RowArea=styled.div`
    width:250px;
    margin-bottom:30px;
`

export const QuestionRow=styled.div`
    label:question-row;
    width:fit-content;
    color:#616161;
    margin-right:auto;
    margin-bottom:2px;
`
export const AnswerArea=styled.div`
    label:answer-area;
    position:relative;
`

export const AnswerRow=styled.input`
    label:answer-row;
    height:25px;
    width:-webkit-fill-available;
    border:none;
    border-bottom:1px solid #DFDFDF;
    background-color:transparent;
    outline:none;
    -webkit-box-shadow: 0 0 0 1000px white inset;
    ::placeholder{
        font-size:8px;   
        color:#B2B2B2;
    }
`

export const AlertMessage=styled.div`
    label:alert-message;
    color:red;
    font-size:10px;
    text-align:left;
    width:inherit;
    position:absolute;
`

export const GoToStep2Button=styled.button`
    label:go-to-step2-button;
    width:43%;
    max-width:200px;
    color:#FFFFFF;
    border:0;
    border-radius:20px;
    background-color:#B592FF;
    padding-top:6px;
    padding-bottom:6px;
    padding-right:10px;
    padding-left:10px;
    margin-top:25px;
    cursor:pointer;

`