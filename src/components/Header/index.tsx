import React, { useEffect, useState } from "react";
import {
  Container,
  HeaderLeft,
  HeaderRight,
  HeaderRightText,
  Logo,
  Menu,
  MenuItem,
  MenuItemSmall,
  MenuSmall,
  MenuSmallTop,
} from "./styles";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useUserTypeStore, { resetUserType } from "../../stores/useUserAuthority";

/**
 * 헤더 공통 컴포넌트입니다.
 *  @author 신정은
 */
const Header = () => {
  const { userType } = useUserTypeStore();
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("my-token");
  const [toggle, setToggle] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const menuItems = [
    {
      name: "마이페이지",
      url: ["/mypage"],
      img: "/assets/icon/icon_mypage.svg",
    },
    {
      name: "필터 추천",
      url: ["/keywordsearchstep1", "/keywordsearchstep2", "/recommendresult"],
      img: "/assets/icon/icon_filter.svg",
    },
    {
      name: "커뮤니티",
      url: ["/community"],
      img: "/assets/icon/icon_board.svg",
    },
    {
      name: "브랜드 추가",
      url: ["/admin/addbrand"],
      img: "/assets/icon/icon_admin.svg",
      visibleFor: "ROLE_ADMIN",
    },
    {
      name: "향수 추가",
      url: ["/admin/addperfume"],
      img: "/assets/icon/icon_admin.svg",
      visibleFor: "ROLE_ADMIN",
    },
  ];

  useEffect(() => {
    tokenValidCheck();
  }, []);

  const tokenValidCheck = () => {
    axios
      .post(
        `${process.env.REACT_APP_API}/token-validation`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data) {
          setIsLoading(false);
          setIsLogin(true);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setIsLogin(false);
        resetUserType();
      });
  };

  const handleMenuClick = () => {
    setToggle(!toggle);
  };

  const filteredMenuItems = menuItems.filter(
    (item) =>
      !item.visibleFor ||
      item.visibleFor !== "ROLE_ADMIN" ||
      userType === "ROLE_ADMIN"
  );

  return (
    <Container isAdmin={userType === "ROLE_ADMIN"}>
      <HeaderLeft onClick={() => handleMenuClick()}>
        <img src="/assets/icon/icon_menu.svg" />
      </HeaderLeft>
      <Logo onClick={() => navigate("/")}>
        <div className="logo__kr">센카이브</div>
        <div className="logo__en">Scenchive</div>
      </Logo>
      <Menu>
        {filteredMenuItems.map((item, index) => {
          return (
            <MenuItem
              key={index}
              selected={item.url.includes(location.pathname)}
              onClick={() => navigate(item.url[0])}
            >
              {item.name}
            </MenuItem>
          );
        })}
      </Menu>
      {toggle && (
        <MenuSmall>
          {!isLoading && !isLogin && (
            <MenuSmallTop>
              <div onClick={() => navigate("/login")}>로그인</div>
              <div>|</div>
              <div onClick={() => navigate("/signup")}>회원가입</div>
            </MenuSmallTop>
          )}
          {filteredMenuItems.map((item, index) => (
            <MenuItemSmall
              onClick={() => navigate(item.url[0])}
              border={index !== filteredMenuItems.length - 1}
              key={index}
            >
              <img src={item.img} />
              <div>{item.name}</div>
            </MenuItemSmall>
          ))}
        </MenuSmall>
      )}
      {!isLoading ? (
        !isLogin ? (
          <HeaderRight>
            <HeaderRightText onClick={() => navigate("/login")}>
              로그인
            </HeaderRightText>
            <HeaderRightText>|</HeaderRightText>
            <HeaderRightText onClick={() => navigate("/signup")}>
              회원가입
            </HeaderRightText>
          </HeaderRight>
        ) : (
          <HeaderRight>
            <img
              src="/assets/icon/icon_notice.svg"
              onClick={() => navigate("/notice")}
            />
          </HeaderRight>
        )
      ) : (
        <HeaderRight />
      )}
    </Container>
  );
};

export default Header;
