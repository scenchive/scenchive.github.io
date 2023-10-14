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
  AnswerRow,
}
  // @ts-ignore
  from './styles.tsx';
// import ApiService from "../ApiService.js";
import axios from "axios";

const SignupStep1 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<any>("/assets/icon/icon-profile-picture.svg");
  const [profileImageName, setProfileImageName]=useState<string>("/assets/icon/icon-profile-picture.svg");
  const [previewImage, setPreviewImage] = useState<any>();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const imageRef = useRef<any>();

  const goToHome = () => {
    navigate("/")
  }
  const goBack = () => {
    navigate(-1);
  }
  const goToStep2 = () => {
    if (profileImageName.length > 0 && email.length > 0 && name.length > 0 && password.length > 0) {
     console.log('step1', profileImage)
      navigate("/signupstep2", {
        state: {
          profileImage: profileImage,
          email: email,
          name: name,
          password: password,
        }
      });
    }else{
      alert('모든 항목을 입력해 주세요.')
    }
  }

  const getUploadImage =  () => {
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


  return (
    <div>
      <Header>가입하기</Header>
      <Content>
        <PfpArea>
          {/* <PreviewProfileImage> */}
          <PreviewProfileImage src={previewImage ? previewImage : "/assets/icon/icon-profile-picture.svg"} />
          {/* </PreviewProfileImage> */}
          <input type="file" id="profileImageFile" accept="image/*" ref={imageRef} onChange={getUploadImage}
            style={{ width: 0, height: 0, padding: 0, overflow: "hidden", border: 0 }}
          />
          <PfpUploadTitle htmlFor="profileImageFile" style={{ cursor: 'pointer' }}>{profileImageName !== "/assets/icon/icon-profile-picture.svg" ? profileImageName : "프로필 사진 업로드"}</PfpUploadTitle>
          {/* <PfpUploadTitle>프로필 사진 업로드</PfpUploadTitle> */}
        </PfpArea>
        <InfoArea>
          <RowArea>
            <QuestionRow>이메일</QuestionRow>
            <AnswerRow type="text" onChange={(e: { target: { value: React.SetStateAction<string>; }; })=>setEmail(e.target.value)}/>
          </RowArea>
          <RowArea>
            <QuestionRow>닉네임</QuestionRow>
            <AnswerRow type="text" onChange={(e: { target: { value: React.SetStateAction<string>; }; })=>setName(e.target.value)} />
          </RowArea>
          <RowArea>
            <QuestionRow>비밀번호</QuestionRow>
            <AnswerRow type="password" onChange={(e: { target: { value: React.SetStateAction<string>; }; })=>setPassword(e.target.value)} />
          </RowArea>

        </InfoArea>

        <button onClick={goToStep2}>다음</button>
      </Content>
    </div>
  );
};

export default SignupStep1;