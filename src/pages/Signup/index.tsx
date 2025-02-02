import React, { useRef } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Content,
  PfpArea,
  PreviewProfileImage,
  PfpUploadTitle,
  InfoArea,
  RowArea,
  QuestionRow,
  AnswerArea,
  AnswerRow,
  AnswerButton,
  AlertMessage,
  KeywordArea,
  AreaTitle,
  Keywords,
  KeywordButton,
  SignupButton,
  // @ts-ignore
} from './styles';
import useSendVerificationEmail from '../../hooks/auth/useSendVerificationEmail';
// import ApiService from "../ApiService.js";
import { api } from '../../api';
import Header from '../../common/Header/index';
import {
  FRAGRANCEWHEELKEYWORDSTYPE,
  KEYWORDTAGSTYPE,
  MOODKEYWORDSTYPE,
} from '../../common/types';
import useApi from '../../hooks/useApi';
import useCheckVerificationEmail from '../../hooks/auth/useCheckVerificationCode';
import useCheckEmailAvailability from '../../hooks/auth/useCheckEmailAvailability';
import useCheckNameAvailability from '../../hooks/auth/useCheckNameAvailability';

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    data: keyword,
    loading: keywordLoading,
    error: keywordError,
    fetchApi: fetchKeyword,
  } = useApi<any>();
  const {
    data: signup,
    loading: signupLoading,
    error: signupError,
    fetchApi: fetchSignup,
  } = useApi<any>();

  const imageRef = useRef<any>();
  const [profileImage, setProfileImage] = useState<any>(
    '/assets/icon/icon-profile-picture.svg'
  );
  const [profileImageName, setProfileImageName] = useState<string>(
    '/assets/icon/icon-profile-picture.svg'
  );
  const [previewImage, setPreviewImage] = useState<any>();
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [isVerifySent, setIsVerifySent] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [isNameValid, setIsNameValid] = useState<boolean>();
  const [isNameAvailable, setIsNameAvailable] = useState<boolean>(false);
  const [nameMessage, setNameMessage] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>();
  const [passwordMessage, setPasswordMessage] = useState<string>('');

  const [fragranceWheelKeywords, setFragranceWheelKeywords] = useState<
    FRAGRANCEWHEELKEYWORDSTYPE[]
  >([]);
  const [moodKeywords, setMoodKeywords] = useState<MOODKEYWORDSTYPE[]>([]);
  const [keywordTagsArray, setKeywordTagsArray] = useState<KEYWORDTAGSTYPE[]>(
    []
  );
  let addOrDeleteKeywordArray: {
    id: number;
    utag: string;
    utag_kr: string;
    utagtype_id: number;
  }[] = [];

  const goToLogin = () => {
    alert('로그인이 필요합니다.');
    navigate('/login');
  };

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

  const { checkEmailAvailability } = useCheckEmailAvailability({ email });
  const { sendVerificationEmail, error } = useSendVerificationEmail({
    email,
    setIsVerifySent,
  });

  const handleSendVerificationEmail = async () => {
    if (isEmailValid) {
      const isAvailable = await checkEmailAvailability();
      if (isAvailable === '사용 가능한 이메일입니다.') {
        sendVerificationEmail();
      } else {
        alert(isAvailable);
      }
    } else {
      alert('이메일을 정확히 입력해주세요');
    }
  };

  const { checkVerificationEmail } = useCheckVerificationEmail({
    email,
    verificationCode,
    setIsEmailVerified,
  });

  const handleCheckVerificationCode = () => {
    if (verificationCode.length > 0) {
      checkVerificationEmail();
    } else {
      alert('다시 시도해주세요.');
    }
  };

  const onChangeEmail = (e: { target: { value: string } }) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegularExpression = new RegExp(
      '[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\\.[a-zA-Z]{2,3}$'
    );
    if (e.target.value.length === 0) {
      setEmailMessage('이메일을 입력해주세요');
      setIsEmailValid(false);
    } else {
      if (!emailRegularExpression.test(currentEmail)) {
        setEmailMessage('이메일 형식에 맞게 입력해 주세요.');
        setIsEmailValid(false);
      } else {
        setEmailMessage('');
        setIsEmailValid(true);
      }
    }
  };

  const onChangePassword = (e: { target: { value: string } }) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegularExpression =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    if (e.target.value.length === 0) {
      setPasswordMessage('비밀번호를 입력해주세요');
      setIsPasswordValid(false);
    } else {
      if (!passwordRegularExpression.test(currentPassword)) {
        setPasswordMessage(
          '영문,숫자,특수기호로 이루어진 8~20자의 비밀번호를 입력해주세요.'
        );
        setIsPasswordValid(false);
      } else {
        setPasswordMessage('');
        setIsPasswordValid(true);
      }
    }
  };

  const { checkNameAvailability } = useCheckNameAvailability({ name });

  const handleCheckNameAvailability = async () => {
    if (isNameValid) {
      const isAvailable = await checkNameAvailability();
      if (isAvailable === '사용 가능한 닉네임입니다.') {
        setIsNameAvailable(true);
      } else {
        alert(isAvailable);
        setNameMessage('이미 가입되어 있는 닉네임입니다');
      }
    } else {
      alert('닉네임을 정확하게 입력해주세요');
    }
  };

  const onChangeName = (e: { target: { value: string } }) => {
    setIsNameAvailable(false);
    const currentName = e.target.value;
    setName(currentName);
    const nameRegularExpression = new RegExp(
      '^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$'
    );
    if (e.target.value.length === 0) {
      setNameMessage('닉네임을 입력해주세요');
      setIsNameValid(false);
    } else {
      if (!nameRegularExpression.test(currentName)) {
        setNameMessage(
          '영문/숫자/한글로 이루어진 2~10자의 닉네임을 입력해주세요.'
        );
        setIsNameValid(false);
      } else {
        setNameMessage('');
        setIsNameValid(true);
      }
    }
  };

  const getKeywords = async () => {
    await api.get('/survey').then((res) => {
      const fragranceWheelKeywordsArray: KEYWORDTAGSTYPE[] = [];
      const moodKeywordsArray: KEYWORDTAGSTYPE[] = [];
      res.data.map((el: KEYWORDTAGSTYPE) =>
        el.utagtype_id === 1
          ? fragranceWheelKeywordsArray.push(el)
          : moodKeywordsArray.push(el)
      );
      setFragranceWheelKeywords(fragranceWheelKeywordsArray);
      setMoodKeywords(moodKeywordsArray);
    });
  };

  const addOrDeleteKeyword = (el: {
    id: number;
    utag: string;
    utag_kr: string;
    utagtype_id: number;
  }) => {
    if (keywordTagsArray.length > 0) {
      let exists = false;
      keywordTagsArray.map((item) => {
        if (item.id === el.id) {
          exists = true;
        }
      });
      if (exists) {
        addOrDeleteKeywordArray = keywordTagsArray.filter(
          (keyword) => keyword.id !== el.id
        );
        setKeywordTagsArray(addOrDeleteKeywordArray);
      } else if (!exists) {
        setKeywordTagsArray((prevState) => [...prevState, el]);
      }
    } else {
      setKeywordTagsArray((prevState) => [...prevState, el]);
    }
  };

  const signupAccount = async () => {
    const formData = new FormData();
    if (profileImage === '/assets/icon/icon-profile-picture.svg') {
      formData.append('image', '');
    } else {
      formData.append('image', profileImage);
    }
    const data = {
      email: email,
      name: name,
      password: password,
    };
    formData.append(
      'memberForm',
      new Blob([JSON.stringify(data)], { type: 'application/json' })
    );
    const res = await fetchSignup('post', '/signup', formData, {
      'Content-Type': 'multipart/form-data',
      accept: 'application/json',
    });
    if (res === '회원가입이 성공적으로 완료되었습니다.') {
      console.log('계정 생성 성공');
      signupKeyword();
    } else {
      console.log('계정 생성에 실패했습니다.');
      alert('회원가입에 실패했습니다.');
    }
  };

  const signupKeyword = async () => {
    const keyword_data = {
      name: name,
      utags: keywordTagsArray,
    };
    const res = await fetchKeyword('post', '/survey', keyword_data);
    if (res[0].utagId > 0) {
      console.log('키워드 저장 성공');
      alert('회원가입에 성공했습니다.');
      goToLogin();
    } else {
      console.log('키워드 저장에 실패했습니다.');
      alert('회원가입에 실패했습니다.');
    }
  };

  const Signup = () => {
    if (
      keywordTagsArray.length > 0 &&
      isEmailVerified &&
      isNameAvailable &&
      isPasswordValid
    ) {
      signupAccount();
    } else {
      if (!isEmailVerified) {
        alert('이메일을 인증해주세요');
      } else if (!isNameAvailable) {
        alert('닉네임 중복확인을 해주세요');
      } else if (!isPasswordValid) {
        alert('비밀번호를 정확히 입력해주세요');
      } else if (keywordTagsArray.length == 0) {
        alert('키워드를 1개 이상 선택해주세요.');
      }
    }
  };

  useEffect(() => {
    getKeywords();
  }, []);

  return (
    <>
      <Header />
      <Content>
        <PfpArea>
          <PreviewProfileImage
            src={
              previewImage
                ? previewImage
                : '/assets/icon/icon-profile-picture.svg'
            }
          />
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
          <PfpUploadTitle
            htmlFor="profileImageFile"
            style={{ cursor: 'pointer' }}
          >
            {profileImageName !== '/assets/icon/icon-profile-picture.svg'
              ? profileImageName
              : '프로필 사진 업로드'}
          </PfpUploadTitle>
        </PfpArea>
        <InfoArea>
          <RowArea>
            <QuestionRow>이메일</QuestionRow>
            <AnswerArea>
              <AnswerRow
                type="text"
                placeholder="이메일을 입력해주세요."
                onChange={onChangeEmail}
                disabled={isVerifySent}
              />
              <AnswerButton
                disabled={isVerifySent}
                onClick={() => handleSendVerificationEmail()}
              >
                인증
              </AnswerButton>
              <AlertMessage>{emailMessage}</AlertMessage>
            </AnswerArea>
          </RowArea>
          {isVerifySent && (
            <RowArea>
              <QuestionRow>인증번호</QuestionRow>
              <AnswerArea>
                <AnswerRow
                  type="text"
                  placeholder="인증번호를 입력해주세요."
                  onChange={(e) => setVerificationCode(e.target.value)}
                  disabled={isEmailVerified}
                />
                <AnswerButton
                  disabled={isEmailVerified}
                  onClick={() => handleCheckVerificationCode()}
                >
                  인증
                </AnswerButton>
                <AlertMessage>{emailMessage}</AlertMessage>
              </AnswerArea>
            </RowArea>
          )}

          <RowArea>
            <QuestionRow>닉네임</QuestionRow>
            <AnswerArea>
              <AnswerRow
                type="text"
                placeholder="영문/숫자/한글로 이루어진 2~10자의 닉네임을 입력해주세요."
                onChange={onChangeName}
              />
              <AnswerButton
                disabled={isNameAvailable}
                onClick={() => handleCheckNameAvailability()}
              >
                중복확인
              </AnswerButton>
              <AlertMessage>{nameMessage}</AlertMessage>
            </AnswerArea>
          </RowArea>
          <RowArea>
            <QuestionRow>비밀번호</QuestionRow>
            <AnswerArea>
              <AnswerRow
                type="password"
                placeholder="영문,숫자,특수기호로 이루어진 8~20자의 비밀번호를 입력해주세요."
                onChange={onChangePassword}
              />

              <AlertMessage>{passwordMessage}</AlertMessage>
            </AnswerArea>
          </RowArea>
        </InfoArea>

        <KeywordArea>
          <AreaTitle>선호하는 향 계열</AreaTitle>
          <Keywords>
            {fragranceWheelKeywords.map((el) => (
              <KeywordButton
                key={el.id}
                onClick={() => addOrDeleteKeyword(el)}
                style={{
                  color: keywordTagsArray.filter((item) => item.id === el.id)
                    ?.length
                    ? '#FFFFFF'
                    : '#616161',
                  backgroundColor: keywordTagsArray.filter(
                    (item) => item.id === el.id
                  )?.length
                    ? '#E3A6A1'
                    : '#F5D0CD',
                }}
              >
                {el.utag_kr}
              </KeywordButton>
            ))}
          </Keywords>
        </KeywordArea>
        <KeywordArea>
          <AreaTitle>선호하는 분위기</AreaTitle>
          <Keywords>
            {moodKeywords.map((el) => (
              <KeywordButton
                key={el.id}
                onClick={() => addOrDeleteKeyword(el)}
                style={{
                  color: keywordTagsArray.filter((item) => item.id === el.id)
                    ?.length
                    ? '#FFFFFF'
                    : '#616161',
                  backgroundColor: keywordTagsArray.filter(
                    (item) => item.id === el.id
                  )?.length
                    ? '#E3A6A1'
                    : '#F5D0CD',
                }}
              >
                {el.utag_kr}
              </KeywordButton>
            ))}
          </Keywords>
        </KeywordArea>

        <SignupButton onClick={Signup}>가입하기</SignupButton>
      </Content>
    </>
  );
};

export default Signup;
