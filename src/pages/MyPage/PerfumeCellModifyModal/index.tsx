import React, { useEffect, useState } from "react";
import {
  ModalBackgroundArea,
  ModalArea,
  ModalTitle,
  SectionArea,
  KeywordTitle,
  KeywordArea,
  KeywordCell,
  ModifyButton,
  CancelButton,

} from "./styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface KeywordType {
  id: number;
  utag: string;
  utag_kr: string;
  utagtype_id: number;
}

const PerfumeCellModifyModal = (props: {
  fragranceWheelKeywords: KeywordType[] | undefined,
  moodKeywords: KeywordType[] | undefined,
  ModalBackground: any,
  isModalOpen: boolean,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  userKeyword: KeywordType[] | undefined,
  setUserKeyword: React.Dispatch<React.SetStateAction<KeywordType[] | undefined>>,
  myToken: string | null | undefined,
}) => {

  const navigate = useNavigate();
  const [keywordTagsArray, setKeywordTagsArray] = useState<KeywordType[]>([]);
  let addOrDeleteKeywordArray: { id: number; utag: string; utag_kr: string; utagtype_id: number; }[] = [];


  const addOrDeleteKeyword = (el: { id: number; utag: string; utag_kr: string; utagtype_id: number; }) => {
    if (keywordTagsArray.length > 0) {
      let exists = false;
      keywordTagsArray.map((item) => {
        if (item.id === el.id) {
          exists = true;
        }
      })
      if (exists) {
        addOrDeleteKeywordArray = keywordTagsArray.filter(keyword => keyword.id !== el.id)
        setKeywordTagsArray(addOrDeleteKeywordArray)
      } else if (!exists) {
        setKeywordTagsArray((prevState) => [...prevState, el])

      }
    }
    else {
      setKeywordTagsArray((prevState) => [...prevState, el])
    }
  }


  const modifyMyKeywords = () => {
    let modify_body = keywordTagsArray;
    axios.put('/keyword', modify_body, { headers: { 'Authorization': `Bearer ${props.myToken}` } })
      .then((data) => {
        if (data?.data === 'update') {
          alert('향세포가 수정되었습니다.');
          props.setUserKeyword(modify_body)
          props.setIsModalOpen(false);
        }

      }
      ).catch(function (err) {
        console.log(`Error Message: ${err}`);
      }
      )

  }


  useEffect(() => {
    if (props.userKeyword !== undefined) {
      setKeywordTagsArray(props.userKeyword);
    }
  }, [])


  return (
    <div style={{ width: "100%", display: "contents", paddingTop: "100px" }}>
      <ModalBackgroundArea isModalOpen={props.isModalOpen} ref={props.ModalBackground}>
      </ModalBackgroundArea>
      <ModalArea isModalOpen={props.isModalOpen} ref={props.ModalBackground}>
        <CancelButton onClick={() => props.setIsModalOpen(false)} src="/assets/icon/icon_modal_x.svg"/>
        <ModalTitle>나의 향수 세포 수정</ModalTitle>
        <SectionArea>
          <KeywordTitle>선호하는 향 계열</KeywordTitle>
          <KeywordArea>
            {props.fragranceWheelKeywords?.map((el) =>

              <KeywordCell key={el.id} style={{
                backgroundColor: (keywordTagsArray.filter((item) => item.id === el.id)?.length) ? "#D67070" : "#F5D0CD",
                color: (keywordTagsArray.filter((item) => item.id === el.id)?.length) ? "#FFFFFF" : "#616161",
                border: (keywordTagsArray.filter((item) => item.id === el.id)?.length) ? "1.5px solid #D67070" : "1.5px solid #E3A6A1",

              }}
                onClick={() => addOrDeleteKeyword(el)}
              >
                {el.utag_kr}
              </KeywordCell>
            )}
          </KeywordArea>
        </SectionArea>

        <SectionArea style={{ marginTop: "30px" }}>
          <KeywordTitle>선호하는 분위기</KeywordTitle>
          <KeywordArea>
            {props.moodKeywords?.map((el) =>
              <KeywordCell key={el.id} style={{
                backgroundColor: (keywordTagsArray.filter((item) => item.id === el.id)?.length) ? "#D67070" : "#F5D0CD",
                color: (keywordTagsArray.filter((item) => item.id === el.id)?.length) ? "#FFFFFF" : "#616161",
                border: (keywordTagsArray.filter((item) => item.id === el.id)?.length) ? "1.5px solid #D67070" : "1.5px solid #E3A6A1",
              }}
                onClick={() => addOrDeleteKeyword(el)}
              >
                {el.utag_kr}
              </KeywordCell>
            )}
          </KeywordArea>
        </SectionArea>
        <ModifyButton onClick={() => modifyMyKeywords()}>수정</ModifyButton>
      </ModalArea>
    </div>
  );
};

export default PerfumeCellModifyModal;
