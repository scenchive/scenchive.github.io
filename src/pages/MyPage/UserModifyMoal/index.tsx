import React, { useEffect, useState } from "react";
import {
  ModalBackgroundArea,
  ModalArea,
  ModalTitle,
  NameArea,
  NameTitle,
  NameInput,
  ModifyButton,
  CancelButton,
} from "./styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const UserModifyModal = (props: {
  oldName: string | null | undefined,
  setName:  React.Dispatch<React.SetStateAction<string | null | undefined>>,
  ModalBackground: any,
  isModalOpen2: boolean,
  setIsModalOpen2: React.Dispatch<React.SetStateAction<boolean>>,
  myToken: string | null | undefined,
}) => {

  const navigate = useNavigate();
  const [name, setName] = useState<string>();


  const modifyInformation = () => {
    if (props?.oldName && props?.oldName !== name) {
      axios.put('/member/name', { 'name': name }, { headers: { 'Authorization': `Bearer ${props.myToken}` } })
        .then((data) => {
          if (data?.data === '닉네임이 변경되었습니다.') {
            alert('닉네임이 변경되었습니다.');
            props?.setName(name);
            props.setIsModalOpen2(false);
          } else if (data?.data === '이미 존재하는 닉네임입니다.') {
            alert('이미 존재하는 닉네임입니다.');
          }

        }
        ).catch(function (err) {
          console.log(`Error Message: ${err}`);
        }
        )
    }
  }


  useEffect(() => {
    if (props?.oldName) {
      setName(props?.oldName)
    }
  }, [props?.oldName])



  return (
    <div style={{ width: "100%", display: "contents", paddingTop: "100px" }}>
      <ModalBackgroundArea isModalOpen={props.isModalOpen2} ref={props.ModalBackground}>
      </ModalBackgroundArea>
      <ModalArea isModalOpen={props.isModalOpen2} ref={props.ModalBackground}>
        <CancelButton onClick={() => props.setIsModalOpen2(false)} src="/assets/icon/icon_modal_x.svg" />
        <ModalTitle>내 정보 수정</ModalTitle>
        <NameArea >
          <NameTitle>닉네임</NameTitle>
          <NameInput type="text" value={name ? name : ""} onChange={(e) => setName(e.target.value)} />

        </NameArea>
        <ModifyButton onClick={() => modifyInformation()}>수정하기</ModifyButton>
      </ModalArea>
    </div>
  );
};

export default UserModifyModal;
