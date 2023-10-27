import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Header,
  Content,
  KeywordArea,
  AreaTitle,
  Keywords,
  KeywordButton,
  SignupButton,
}
  // @ts-ignore
  from './styles.tsx';
import axios from "axios";
import ApiService from "../../../ApiServices";

const SignupStep2 = () => {
  const location = useLocation();
  const profileImage: any = location.state.profileImage;
  const email: string = location.state.email;
  const name: string = location.state.name;
  const password: string = location.state.password;

  const baseUrl = "http://localhost:8080";
  const navigate = useNavigate();

  const imageRef = useRef<any>();

  const goToLogin = () => {
    navigate("/login");

  }
  const goBack = () => {
    navigate(-1);
  }

  type FRAGRANCEWHEELKEYWORDSTYPE = { id: number; utag: string; utag_kr: string, utagtype_id: number }
  type MOODKEYWORDSTYPE = { id: number; utag: string; utag_kr: string, utagtype_id: number }
  const [fragranceWheelKeywords, setFragranceWheelKeywords] = useState<FRAGRANCEWHEELKEYWORDSTYPE[]>([]);
  const [moodKeywords, setMoodKeywords] = useState<MOODKEYWORDSTYPE[]>([]);

  type KEYWORDTAGSTYPE = { id: number; utag: string; utag_kr: string; utagtype_id: number }
  const [keywordTagsArray, setKeywordTagsArray] = useState<KEYWORDTAGSTYPE[]>([]);
  let addOrDeleteKeywordArray: { id: number; utag: string; utag_kr: string; utagtype_id: number; }[] = [];



  const getKeywords = async () => {
    await axios.get('/survey')
      .then((res) => {
        let fragranceWheelKeywordsArray: KEYWORDTAGSTYPE[] = [];
        let moodKeywordsArray: KEYWORDTAGSTYPE[] = [];
        res.data.map((el: KEYWORDTAGSTYPE) => el.utagtype_id === 1 ? fragranceWheelKeywordsArray.push(el) : moodKeywordsArray.push(el))
        setFragranceWheelKeywords(fragranceWheelKeywordsArray);
        setMoodKeywords(moodKeywordsArray);
      })
      .catch((error) => {
        console.log(error);
      })
  }


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



  const signupAccount = async () => {
    const formData = new FormData();
    if (profileImage === "/assets/icon/icon-profile-picture.svg") {
      formData.append('image', "")
    } else {
      formData.append('image', profileImage)
    }
    const data = {
      email: email,
      name: name,
      password: password,
    }
    formData.append('memberForm', new Blob([JSON.stringify(data)], { type: 'application/json' }))


    await axios.post('/signup', formData,
      { headers: { 'Content-Type': 'multipart/form-data', accept: 'application/json' } }
    )
      .then((res) => {
        if (res.data.email) {
          console.log('계정 생성 성공');
          signupKeyword();
        }
        else {
          console.log('data', data)
        }
      }
      ).catch((res) => {
        console.log(res)
        console.log('계정 생성에 실패했습니다.');
        alert('회원가입에 실패했습니다.');

      }
      )

  }


  const signupKeyword = async () => {
    const keyword_data = {
      name: name,
      utags: keywordTagsArray,
    }
    await axios.post('/survey', keyword_data)
      .then((res) => {
        if (res.data[0].utagId> 0) {
          console.log('키워드 저장 성공');
          alert('회원가입에 성공했습니다.');
          goToLogin();
        }
      }
      ).catch((res) => {
        console.log(res)
        console.log('키워드 저장에 실패했습니다.')
        alert('회원가입에 실패했습니다.');
      }
      )

  }

  const Signup = () => {
    if (keywordTagsArray.length > 0) {
      signupAccount();
    } else {
      alert('키워드를 1개 이상 선택해주세요.')
    }
  }

  useEffect(() => {
    getKeywords();
  }, []);




  return (
    <div>
      <Header>가입하기</Header>
      <Content>
        <KeywordArea>
          <AreaTitle>계열</AreaTitle>
          <Keywords>
            {fragranceWheelKeywords.map((el) =>
              <KeywordButton key={el.id} onClick={() => addOrDeleteKeyword(el)} style={{ color: (keywordTagsArray.filter((item) => item.id === el.id)?.length) ? "#FFFFFF" : "#616161" ,  backgroundColor: (keywordTagsArray.filter((item) => item.id === el.id)?.length) ? "#B592FF" : "#F6F2FF"  }}>
                {el.utag_kr}
              </KeywordButton>
            )}
          </Keywords>
        </KeywordArea>
        <KeywordArea>
          <AreaTitle>분위기</AreaTitle>
          <Keywords>
            {moodKeywords.map((el) =>
              <KeywordButton key={el.id} onClick={() => addOrDeleteKeyword(el)} style={{ color: (keywordTagsArray.filter((item) => item.id === el.id)?.length) ? "#FFFFFF" : "#616161", backgroundColor: (keywordTagsArray.filter((item) => item.id === el.id)?.length) ? "#B592FF" : "#F6F2FF"  }} >
                {el.utag_kr}
              </KeywordButton>
            )}
          </Keywords>
        </KeywordArea>

        <SignupButton onClick={Signup}>가입하기</SignupButton>
      </Content>
    </div>
  );
};

export default SignupStep2;