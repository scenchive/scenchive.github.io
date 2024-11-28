import styled from '@emotion/styled';
const breakpoint = '565px';
const mediaQuery = () => `@media(max-width:${breakpoint})`;

export const ProfileArea = styled.div`
  label: profile-area;
  display: flex;
  flex-direction: row;
  margin-right: auto;
  margin-top: 30px;
`;

export const ProfileImage = styled.img`
  label: profile-image;
  width: 80px;
  height: 80px;
  max-width: 100px;
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0.1px 0.1px 3px 1px #dddddd;

  ${mediaQuery} {
    width: 65px;
    height: 65px;
  }
`;

export const NameEmailArea = styled.div`
  label: name-email-area;
  display: flex;
  margin-left: 15px;
  align-items: start;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;

  ${mediaQuery} {
    margin-left: 10px;
  }
`;

export const NameEmailAreaTop = styled.div`
  label: name-email-area-top;
  width: -webkit-fill-available;
  display: flex;
  flex-direction: column;

  .email_text {
    color: #616161;
    font-size: 18px;
    font-weight: 400;
    line-height: 17px;
    margin-top: 5px;
    text-align: left;
  }
`;

export const UserInformationArea = styled.div`
  label: user-information-area;
  display: flex;
  flex-direction: row;
  text-align: left;
  .name_text {
    color: #616161;
    font-size: 20px;
    line-height: 17px;
  }
`;

export const ProfileChangeButton = styled.div`
  label: profile-change-button;
  display: block;
  font-family: Noto Sans KR;
  font-size: 1rem;
  color: #a2a2a2;
  margin-top: auto;
  cursor: pointer;
`;

export const ButtonArea = styled.div`
  label: button-area;
  display: flex;
  flex-direction: row;
`;

interface ProfileButton {
  isPink: boolean | undefined;
  isLogin: boolean | undefined;
}

export const Splitter = styled.div<ProfileButton>`
  label: splitter;
  color: #a2a2a2;
  font-size: 1.2rem;
  font-family: Noto Sans KR;
  border: none;
  margin-top: 10px;
  margin-left: 7px;
  margin-right: 7px;

  ${mediaQuery} {
    display: ${(props) => (props?.isLogin === true ? 'none' : 'block')};
  }
`;

export const ProfileButton = styled.div<ProfileButton>`
  label: profile-button;
  height: 20px;
  color: ${(props) => (props?.isPink === true ? '#E3A6A1' : '#A2A2A2')};
  font-size: 1.2rem;
  font-family: Noto Sans KR;
  margin-top: 10px;
  border: none;
  padding: 0px;
  background-color: transparent;
  cursor: pointer;
  word-break: keep-all;
  cursor: pointer;

  ${mediaQuery} {
    display: ${(props) => (props?.isLogin === true ? 'none' : 'block')};
  }
`;

export const SettingIcon = styled.img`
  label: setting-icon;
  width: 14px;
  height: 15px;
  margin-top: 12px;
  margin-right: 3px;
  align-self: center;
  object-fit: contain;
`;
