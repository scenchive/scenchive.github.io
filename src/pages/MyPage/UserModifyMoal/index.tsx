import React, { useEffect, useState } from 'react';
import {
  ModalBackgroundArea,
  ModalArea,
  ModalTitle,
  NameArea,
  NameTitle,
  NameInput,
  ModifyButton,
  CancelButton,
  AlertMessage,
} from './styles';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api';
import useCheckNameAvailabilityTokenY from '../../../hooks/user/useCheckNameAvailabilityTokenY';
import useChangeName from '../../../hooks/user/useChangeName';

const UserModifyModal = (props: {
  oldName: string | null | undefined;
  setName: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  ModalBackground: any;
  isModalOpen2: boolean;
  setIsModalOpen2: React.Dispatch<React.SetStateAction<boolean>>;
  myToken: string | null | undefined;
}) => {
  const [name, setName] = useState<string>('');
  const [nameMessage, setNameMessage] = useState<string>();
  const { checkNameAvailabilityTokenY } = useCheckNameAvailabilityTokenY();
  const { changeName } = useChangeName();

  const modifyInformation = async () => {
    if (
      props?.oldName &&
      props?.oldName.trim() !== name.trim() &&
      name.trim() !== ''
    ) {
      const isAvailable = await checkNameAvailabilityTokenY({
        name: name,
      });
      if (isAvailable === '사용 가능한 닉네임입니다.') {
        const isChanged = await changeName({ name: name });
        if (isChanged === '닉네임이 변경되었습니다.') {
          alert(isChanged);
          props.setIsModalOpen2(false);
        } else {
          alert(isChanged);
        }
      } else {
        alert(isAvailable);
        setNameMessage(isAvailable);
      }
    } else {
      alert('새 닉네임을 입력해주세요');
    }
  };

  useEffect(() => {
    if (props?.oldName) {
      setName(props?.oldName);
    }
  }, [props?.oldName]);

  return (
    <div style={{ width: '100%', display: 'contents', paddingTop: '100px' }}>
      <ModalBackgroundArea
        isModalOpen={props.isModalOpen2}
        ref={props.ModalBackground}
      ></ModalBackgroundArea>
      <ModalArea isModalOpen={props.isModalOpen2} ref={props.ModalBackground}>
        <CancelButton
          onClick={() => props.setIsModalOpen2(false)}
          src="/assets/icon/icon_modal_x.svg"
        />
        <ModalTitle>내 정보 수정</ModalTitle>
        <NameArea>
          <NameTitle>닉네임</NameTitle>
          <div style={{ width: '60%' }}>
            <NameInput
              type="text"
              value={name ? name : ''}
              onChange={(e) => setName(e.target.value)}
            />
            <AlertMessage>{nameMessage}</AlertMessage>
          </div>
        </NameArea>
        <ModifyButton onClick={() => modifyInformation()}>
          수정하기
        </ModifyButton>
      </ModalArea>
    </div>
  );
};

export default UserModifyModal;
