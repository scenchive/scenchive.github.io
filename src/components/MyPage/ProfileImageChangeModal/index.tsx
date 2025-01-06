import React, { useEffect, useRef, useState } from 'react';
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
  ProfileImage,
  DeleteProfileImage,
  ProfileImageArea,
  ProfileImageChangeButton,
  ChangeButton,
  ProfileImageNameTitle,
} from './styles';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api';
import useCheckNameAvailabilityTokenY from '../../../hooks/user/useCheckNameAvailabilityTokenY';
import useChangeProfileImage from '../../../hooks/user/useChangeProfileImage';

const ProfileImageModifyModal = (props: {
  ModalBackground: any;
  imageUrl: string;
  isModalOpen3: boolean;
  setIsModalOpen3: React.Dispatch<React.SetStateAction<boolean>>;
  myToken: string | null | undefined;
}) => {
  const [name, setName] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<any>(
    props.imageUrl ? props.imageUrl : '/assets/icon/icon-profile-picture.svg'
  );

  const [profileImage, setProfileImage] = useState<any>(
    props.imageUrl ? props.imageUrl : '/assets/icon/icon-profile-picture.svg'
  );
  const [profileImageName, setProfileImageName] = useState<string>();
  const { changeProfileImage } = useChangeProfileImage();

  const imageRef = useRef<any>();

  const getUploadImage = () => {
    if (imageRef.current.files[0]) {
      const file = imageRef.current.files[0];
      setProfileImage(file);
      setProfileImageName(file.name);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
    } else {
      setProfileImage(profileImage);
    }
  };

  const modifyProfileImage = async () => {
    if (!profileImage && props.imageUrl === profileImage) {
      alert('이미지를 변경해주세요');
    }
    console.log('===================');
    console.log(profileImage);
    const isChanged = await changeProfileImage({ profileImage });

    if (isChanged?.imageUrl) {
      console.log('===================');
      console.log(isChanged);
      alert('프로필 이미지가 변경되었습니다.');
      props.setIsModalOpen3(false);
    } else {
      alert('다시 시도해주세요');
    }
    // if (
    //   props?.oldName &&
    //   props?.oldName.trim() !== name.trim() &&
    //   name.trim() !== ''
    // ) {

    //   if (isAvailable === '사용 가능한 닉네임입니다.') {
    //     const isChanged = await changeProfileImage({ name: name });
    //     if (isChanged === '닉네임이 변경되었습니다.') {
    //       alert(isChanged);
    //       props.setIsModalOpen3(false);
    //     } else {
    //       alert(isChanged);
    //     }
    //   } else {
    //     alert(isAvailable);
    //     setNameMessage(isAvailable);
    //   }
    // } else {
    //   alert('새 닉네임을 입력해주세요');
    // }
  };

  return (
    <div style={{ width: '100%', display: 'contents', paddingTop: '100px' }}>
      <ModalBackgroundArea
        isModalOpen={props.isModalOpen3}
        ref={props.ModalBackground}
      ></ModalBackgroundArea>
      <ModalArea isModalOpen={props.isModalOpen3} ref={props.ModalBackground}>
        <CancelButton
          onClick={() => props.setIsModalOpen3(false)}
          src="/assets/icon/icon_modal_x.svg"
        />
        <ModalTitle>프로필 사진 수정</ModalTitle>
        <NameArea>
          <ProfileImageArea>
            {/* <div style={{ width: '60%' }}> */}
            <ProfileImage
              src={
                previewImage
                  ? previewImage
                  : '/assets/icon/icon-profile-picture.svg'
              }
            />
            {profileImageName && (
              <ProfileImageNameTitle>{profileImageName}</ProfileImageNameTitle>
            )}
            {/* {props?.imageUrl && (
              <DeleteProfileImage src="/assets/icon/icon_trash.svg" />
            )} */}
            {/* <NameInput
              type="text"
              value={name ? name : ''}
              onChange={(e) => setName(e.target.value)}
            /> */}
            {/* <AlertMessage>{nameMessage}</AlertMessage> */}
            {/* </div> */}
            <input
              type="file"
              id="profileImageFile"
              accept="image/*"
              ref={imageRef}
              onChange={getUploadImage}
              style={{
                width: 0,
                height: 0,
                padding: 0,
                overflow: 'hidden',
                border: 0,
              }}
            />
            <ProfileImageChangeButton htmlFor="profileImageFile">
              프로필 사진 수정
            </ProfileImageChangeButton>
          </ProfileImageArea>
        </NameArea>
        <ModifyButton onClick={() => modifyProfileImage()}>
          수정하기
        </ModifyButton>
        {/* <ModifyButton onClick={() => modifyProfileImage()}>
          수정하기
        </ModifyButton> */}
      </ModalArea>
    </div>
  );
};

export default ProfileImageModifyModal;
