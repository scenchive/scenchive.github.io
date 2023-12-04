import styled from "@emotion/styled";

export const ModalBackgroundArea=styled.div<{ isModalOpen: boolean | undefined }>`
    label: modal-background-area;
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    background-color:${(props) => (props.isModalOpen === true ? "#000000" : null)};
    opacity:${(props) => (props.isModalOpen === true ? "0.79" : null)};
    z-index:${(props) => (props.isModalOpen === true ? "1000": null)};
`

export const ModalArea=styled.div<{ isModalOpen: boolean | undefined }>`
    label: modal-area;
    width:60%;
    position:absolute;
    left: 50%;
    display:flex;
    flex-direction:column;
    transform: translate(-50%, 0);
    background-color:#FFFFFF;
    margin:100px auto 200px auto;   
    padding:50px;
    flex-flow:wrap;
    z-index:${(props) => (props.isModalOpen === true ? "1000": null)};
`

export const SectionArea=styled.div`
    label:section-area;
    width:fit-content;
    display:flex;
    flex-direction:column;
`

export const KeywordTitle=styled.div`
    label: keyword-title;
    font-size:24px;
    color:#000000;
    margin-right:auto;
    margin-bottom:15px;
`

export const KeywordArea=styled.div`
    label: keyword-area;
    display:flex;
    flex-direction:row;
    flex-flow:wrap;

`

export const KeywordCell=styled.div`
    label: keyword-cell;
    width: fit-content;
    padding: 11px 24px 11px 24px;
    color:#616161;
    border: 1.5px solid #A281FF;
    border-radius:30px;
    background-color:#F6F2FF;
    margin-bottom:5px;
    margin-right:3px;
    cursor:pointer;
`

export const ButtonArea=styled.div`
    label:button-area;
    display:flex;
    flex-direction:row;
    margin: 30px auto 0px auto;

`

export const ModifyButton=styled.div`
    label:modify-button;
    width:fit-content;
    margin-right:5px;
    cursor:pointer;
`

export const CancelButton=styled.div`
    label:cancel-button;
    width:fit-content;
    margin-left:5px;
    cursor:pointer;
`