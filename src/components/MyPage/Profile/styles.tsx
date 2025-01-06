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

export const ProfileImageArea = styled.div`
  label: profile-image-area;
  width: 75px;
  height: 75px;
  position: relative;
  &:hover > div {
    top: 0;
    opacity: 0.8;
    transition:
      opacity 0.3s ease,
      top 0.3s ease;
  }
`;

export const ProfileImage = styled.img`
  label: profile-image;
  width: 75px;
  height: 75px;
  max-width: 100px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0.1px 0.1px 3px 1px #dddddd;
  cursor: pointer;

  ${mediaQuery} {
    width: 75px;
    height: 75px;
  }
`;

export const ProfileEditIcon = styled.img`
  label: profile-edit-icon;
  position: absolute;
  width: 13px;
  height: 13px;
  top: 5px;
  right: 4px;
  opacity: 70%;
`;

export const ProfileImageChangeWord = styled.div`
  label: profile-image-change-word;
  position: absolute;
  width: 75px;
  height: 75px;
  top: 0;
  left: 0;
  border-radius: 10px;
  font-size: 9.5px;
  background-color: #e3a6a1;
  color: white;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition:
    opacity 0.3s ease,
    top 0.3s ease;
  cursor: pointer;
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
  .name_text {
    color: #616161;
    font-size: 18px;
    line-height: 17px;
    text-align: left;
  }
  .email_text {
    color: #616161;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    margin-top: 4px;
    text-align: left;
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
  .icon_collection {
    width: 13px;
    height: 13px;
    margin-top: 6px;
    margin-right: 4px;
  }
  .icon_settings {
    width: 13px;
    height: 13px;
    margin-top: 5px;
    margin-right: 5px;
  }
`;

interface ProfileButton {
  isPink: boolean | undefined;
  isLogin: boolean | undefined;
}

export const Splitter = styled.div<ProfileButton>`
  label: splitter;
  color: #c8c8c8;
  font-size: 1rem;
  font-family: Noto Sans KR;
  border: none;
  margin-top: 4px;
  margin-left: 7px;
  margin-right: 7px;

  ${mediaQuery} {
    display: ${(props) => (props?.isLogin === true ? 'none' : 'block')};
  }
`;

export const ProfileButton = styled.div<ProfileButton>`
  label: profile-button;
  height: 15px;
  color: ${(props) => (props?.isPink === true ? '#E3A6A1' : '#A2A2A2')};
  font-size: 1.1rem;
  font-family: Noto Sans KR;
  margin-top: 3px;
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
