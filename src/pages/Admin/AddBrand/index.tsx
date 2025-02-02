import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  PageTitle,
  BrandLogoArea,
  BrandLogoDummyDiv,
  PreviewBrandLogoImage,
  ImageUploadTitle,
  Row,
  RowTitle,
  RowInput,
  AddButton,
} from "./styles";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Search from "../../../components/Search";
import useApi from "../../../hooks/useApi";
import useUserTypeStore from "../../../stores/useUserAuthority";

const AddBrand = () => {
  const { userType } = useUserTypeStore();
  const navigate = useNavigate();
  const imageRef = useRef<any>();
  const [brandLogoImage, setbrandLogoImage] = useState<any>();
  const [brandLogoImageName, setbrandLogoImageName] = useState<string>();
  const [previewImage, setPreviewImage] = useState<any>();
  const [brandName, setBrandName] = useState("");
  const [brandNameKorean, setBrandNameKorean] = useState("");

  const {
    data: brandListData,
    loading: brandListDataLoading,
    error: brandListDataError,
    fetchApi: fetchPostBrand,
  } = useApi<any>();

  const goToBrandDetail = () => {
    navigate(`/branddetail?name=${brandName}`);
  };

  const getUploadImage = () => {
    if (imageRef.current.files[0]) {
      const file = imageRef.current.files[0];
      setbrandLogoImage(file);
      setbrandLogoImageName(file.name);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
    } else {
      setbrandLogoImage(brandLogoImage);
    }
  };

  const handlePostAddBrand = async () => {
    const isEnglish = /^[A-Za-z\s]+$/;
    const isKorean = /^[가-힣\s]+$/;

    if (!brandLogoImage) {
      alert("브랜드 로고 사진을 업로드해주세요.");
      return;
    }

    if (brandName.length === 0 || brandNameKorean.length === 0) {
      alert("모든 값을 정확히 입력해주세요.");
      return;
    }

    if (!isKorean.test(brandNameKorean)) {
      alert("브랜드 한글 이름은 한글로 입력해야 합니다.");
      return;
    }

    if (!isEnglish.test(brandName)) {
      alert("브랜드 영문 이름은 영어로 입력해야 합니다.");
      return;
    }

    const formData = new FormData();
    formData.append("image", brandLogoImage);
    const dto = {
      brandName: brandName,
      brandName_kr: brandNameKorean,
    };
    formData.append(
      "dto",
      new Blob([JSON.stringify(dto)], { type: "application/json" })
    );
    try {
      const res = await fetchPostBrand("post", "/master/brand", formData, {
        Authorization: "Bearer " + localStorage.getItem("my-token"),
        "Content-Type": "multipart/form-data",
        accept: "application/json",
      });

      if (res) {
        if (
          window.confirm(
            `브랜드를 등록하였습니다. ${brandNameKorean}(${brandName}) 브랜드 상세 페이지로 이동하시겠습니까?`
          )
        ) {
          // '예'를 누르면 이 코드가 실행됩니다.
          goToBrandDetail();
        } else {
          // '아니오'를 누르면 이 코드가 실행됩니다.
          setBrandName("");
          setBrandNameKorean("");
        }
      }
    } catch (error) {
      console.error("브랜드 등록 중 오류 발생", error);
    }
  };

  useEffect(() => {
    if (userType !== "ROLE_ADMIN") {
      navigate("/");
    }
  }, [userType]);

  return (
    <Container>
      <Header />
      <Search />
      <PageTitle>브랜드 추가</PageTitle>

      <BrandLogoArea>
        {previewImage ? (
          <PreviewBrandLogoImage src={previewImage} />
        ) : (
          <BrandLogoDummyDiv>Brand Logo Image</BrandLogoDummyDiv>
        )}

        <input
          type="file"
          id="brandLogoFile"
          accept="image/*"
          ref={imageRef}
          onChange={getUploadImage}
          style={{
            width: 0,
            height: 0,
            padding: 0,
            overflow: "hidden",
            border: 0,
          }}
        />
        <ImageUploadTitle htmlFor="brandLogoFile" style={{ cursor: "pointer" }}>
          {brandLogoImageName !== undefined
            ? brandLogoImageName
            : "브랜드 로고 업로드"}
        </ImageUploadTitle>
      </BrandLogoArea>
      <Row>
        <RowTitle>브랜드 한글 이름</RowTitle>
        <RowInput
          onChange={(e) => setBrandNameKorean(e.target.value)}
          placeholder="브랜드 한글 이름을 입력해주세요."
        />
      </Row>
      <Row>
        <RowTitle>브랜드 영문 이름</RowTitle>
        <RowInput
          onChange={(e) => setBrandName(e.target.value)}
          placeholder="브랜드 영문 이름을 입력해주세요."
        />
      </Row>
      <AddButton onClick={() => handlePostAddBrand()}>등록</AddButton>
    </Container>
  );
};

export default AddBrand;
