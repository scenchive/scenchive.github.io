import React, { useEffect, useState } from "react";
import {
  Container,
  HeaderRight,
  HeaderRightText,
  Logo,
  Menu,
  MenuItem,
} from "./styles";
import { useNavigate } from "react-router-dom";

/**
 * 헤더 공통 컴포넌트입니다.
 *  @author 신정은
 */
const Header = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const menuItems = [
    { name: "마이페이지", url: "" },
    { name: "필터 추천", url: "" },
    { name: "커뮤니티", url: "" },
  ];

  useEffect(() => {
    getToken();
  }, []);

  const getToken = () => {
    const token = localStorage.getItem("my-token");
    setToken(token);
  };

  return (
    <Container>
      <Logo onClick={() => navigate("/")}>
        <div className="logo__kr">센카이브</div>
        <div className="logo__en">Scenchive</div>
      </Logo>
      <Menu>
        {menuItems.map((item) => {
          return <MenuItem>{item.name}</MenuItem>;
        })}
      </Menu>
      {!token ? (
        <HeaderRight>
          <HeaderRightText onClick={() => navigate("/login")}>
            로그인
          </HeaderRightText>
          <HeaderRightText>|</HeaderRightText>
          <HeaderRightText onClick={() => navigate("/signupstep1")}>
            회원가입
          </HeaderRightText>
        </HeaderRight>
      ) : (
        <HeaderRight>
          <img src="/assets/icon/icon_notice.svg" />
        </HeaderRight>
      )}
    </Container>
  );
};

export default Header;
