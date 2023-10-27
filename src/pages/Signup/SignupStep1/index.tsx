import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Header,
  Content,
  PfpArea,
  PreviewProfileImage,
  PfpUploadTitle,
  InfoArea,
  RowArea,
  QuestionRow,
  AnswerArea,
  AnswerRow,
  AlertMessage,
  GoToStep2Button,
}
  // @ts-ignore
  from './styles.tsx';
// import ApiService from "../ApiService.js";
import axios from "axios";

const SignupStep1 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<any>("/assets/icon/icon-profile-picture.svg");
  const [profileImageName, setProfileImageName] = useState<string>("/assets/icon/icon-profile-picture.svg");
  const [previewImage, setPreviewImage] = useState<any>();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [isNameValid, setIsNameValid] = useState<boolean>();
  const [nameMessage, setNameMessage] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>();
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const imageRef = useRef<any>();

  const goToHome = () => {
    navigate("/")
  }
  const goBack = () => {
    navigate(-1);
  }
  const goToStep2 = () => {
    if (profileImageName.length > 0 &&isEmailValid===true && isNameValid===true && isPasswordValid===true) {
      navigate("/signupstep2", {
        state: {
          profileImage: profileImage,
          email: email,
          name: name,
          password: password,
        }
      });
    } else {
      alert('모든 항목을 입력해 주세요.')
    }
  }

  const getUploadImage = () => {
    if (imageRef.current.files[0]) {
      const file = imageRef.current.files[0]
      setProfileImage(file)
      setProfileImageName(file.name);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      }
    } else {
      setProfileImage(profileImage)
    }
  }

  const onChangeEmail = (e: { target: { value: string; }; }) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegularExpression = new RegExp('[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\\.[a-zA-Z]{2,3}$');
    if (e.target.value.length === 0) {
      setEmailMessage("이메일을 입력해주세요");
      setIsEmailValid(false);
    } else {
      if (!emailRegularExpression.test(currentEmail)) {
        setEmailMessage("이메일 형식에 맞게 입력해 주세요.");
        setIsEmailValid(false);
      } else {
        setEmailMessage("");
        setIsEmailValid(true);
      }
    }
  }

  const onChangePassword = (e: { target: { value: string; }; }) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegularExpression = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/
    if (e.target.value.length === 0) {
      setPasswordMessage("비밀번호를 입력해주세요");
      setIsPasswordValid(false);
    } else {
      if (!passwordRegularExpression.test(currentPassword)) {
        setPasswordMessage("영문,숫자,특수기호로 이루어진 8~20자의 비밀번호를 입력해주세요.");
        setIsPasswordValid(false);
      } else {
        setPasswordMessage("");
        setIsPasswordValid(true);
      }
    }
  }

  const onChangeName = (e: { target: { value: string; }; }) => {
    const currentName = e.target.value;
    setName(currentName);
    const nameRegularExpression = new RegExp('^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$');
    if (e.target.value.length === 0) {
      setNameMessage("닉네임을 입력해주세요");
      setIsNameValid(false);
    } else {
      if (!nameRegularExpression.test(currentName)) {
        setNameMessage("영문/숫자/한글로 이루어진 2~10자의 닉네임을 입력해주세요.");
        setIsNameValid(false);
      } else {
        setNameMessage("");
        setIsNameValid(true);
      }
    }
  }

  return (
    <div>
      <Header>가입하기</Header>
      <Content>
        <PfpArea>
          <PreviewProfileImage
            src={previewImage ? previewImage : "/assets/icon/icon-profile-picture.svg"}
          />
          <input type="file" id="profileImageFile" accept="image/*" ref={imageRef} onChange={getUploadImage}
            style={{ width: 0, height: 0, padding: 0, overflow: "hidden", border: 0 }}
          />
          <PfpUploadTitle htmlFor="profileImageFile" style={{ cursor: 'pointer' }}>
            {profileImageName !== "/assets/icon/icon-profile-picture.svg" ? profileImageName : "프로필 사진 업로드"}
          </PfpUploadTitle>
        </PfpArea>
        <InfoArea>
          <RowArea>
            <QuestionRow>이메일</QuestionRow>
            <AnswerArea>
              <AnswerRow type="text" placeholder="이메일을 입력해주세요." onChange={onChangeEmail} />
              <AlertMessage>{emailMessage}</AlertMessage>
            </AnswerArea>
          </RowArea>
          <RowArea>
            <QuestionRow>닉네임</QuestionRow>
            <AnswerArea>
              <AnswerRow type="text" placeholder="영문/숫자/한글로 이루어진 2~10자의 닉네임을 입력해주세요." onChange={onChangeName} />
              <AlertMessage>{nameMessage}</AlertMessage>
            </AnswerArea>
          </RowArea>
          <RowArea >
            <QuestionRow>비밀번호</QuestionRow>
            <AnswerArea>
              <AnswerRow type="password" placeholder="영문,숫자,특수기호로 이루어진 8~20자의 비밀번호를 입력해주세요." onChange={onChangePassword} />
              <AlertMessage>{passwordMessage}</AlertMessage>
            </AnswerArea>
          </RowArea>

        </InfoArea>

        <GoToStep2Button onClick={goToStep2}>다음</GoToStep2Button>
      </Content>
    </div>
  );
};

export default SignupStep1;