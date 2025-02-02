import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  PageTitle,
  PerfumeArea,
  PerfumeDummyDiv,
  PreviewPerfumeImage,
  ImageUploadTitle,
  BrandListArea,
  BrandListRow,
  Row,
  RowTitle,
  BrandWarning,
  RowInput,
  AddButton,
} from "./styles";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Search from "../../../components/Search";
import useApi from "../../../hooks/useApi";
import useUserTypeStore from "../../../stores/useUserAuthority";

interface Brand {
  brandId: number | null;
  brandImage: string;
  brandName: string;
  brandName_kr: string;
}

const AddPerfume = () => {
  const { userType } = useUserTypeStore();
  const navigate = useNavigate();
  const imageRef = useRef<any>();
  const [PerfumeImage, setPerfumeImage] = useState<any>();
  const [PerfumeImageName, setPerfumeImageName] = useState<string>();
  const [previewImage, setPreviewImage] = useState<any>();
  const [brandListToggle, setBrandListToggle] = useState<boolean>(false);
  const [brandSearchResultList, setBrandSearchResultList] = useState<Brand[]>();
  const [brandDisabled, setBrandDisabled] = useState<boolean>(true);
  const [brandSearchKeyword, setBrandSearchKeyword] = useState<string>("");
  const [brandName, setBrandName] = useState<string>("");
  const [brandNameKorean, setBrandNameKorean] = useState<string>("");
  const [brandPage, setBrandPage] = useState<number>(0);
  const [PerfumeName, setPerfumeName] = useState<string>("");
  const [PerfumeNameKorean, setPerfumeNameKorean] = useState<string>("");
  const [perfumeId, setPerfumeId] = useState<number>();
  const {
    data: BrandListData,
    loading: BrandListDataLoading,
    error: BrandListDataError,
    fetchApi: fetchBrandSearchResult,
  } = useApi<any>();

  const {
    data: PerfumeListData,
    loading: PerfumeListDataLoading,
    error: PerfumeListDataError,
    fetchApi: fetchPostPerfume,
  } = useApi<any>();

  const getUploadImage = () => {
    if (imageRef.current.files[0]) {
      const file = imageRef.current.files[0];
      setPerfumeImage(file);
      setPerfumeImageName(file.name);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
    } else {
      setPerfumeImage(PerfumeImage);
    }
  };

  const getBrandSearchResult = async () => {
    setBrandName("");
    setBrandNameKorean("");
    const res = await fetchBrandSearchResult(
      "get",
      `/search?name=${encodeURI(brandSearchKeyword)}&page=${brandPage}`
    );
    setBrandSearchResultList(res?.brands);
    setBrandListToggle(true);
  };

  const handlePostAddPerfume = async () => {
    const isEnglish = /^[A-Za-z\s]+$/;
    const isKorean = /^[가-힣\s]+$/;

    if (!PerfumeImage) {
      alert("향수 사진을 업로드해주세요.");
      return;
    }

    if (PerfumeName.length === 0 || PerfumeNameKorean.length === 0) {
      alert("모든 값을 정확히 입력해주세요.");
      return;
    }

    if (!isKorean.test(PerfumeNameKorean)) {
      alert("향수 한글 이름은 한글로 입력해야 합니다.");
      return;
    }

    if (!isEnglish.test(PerfumeName)) {
      alert("향수 영문 이름은 영어로 입력해야 합니다.");
      return;
    }

    const formData = new FormData();
    formData.append("image", PerfumeImage);
    const dto = {
      brandName: brandName,
      perfumeName: PerfumeName,
      perfume_kr: PerfumeNameKorean,
    };
    formData.append(
      "dto",
      new Blob([JSON.stringify(dto)], { type: "application/json" })
    );
    try {
      const res = await fetchPostPerfume("post", "/master/perfume", formData, {
        Authorization: "Bearer " + localStorage.getItem("my-token"),
        "Content-Type": "multipart/form-data",
        accept: "application/json",
      });
      console.log("res", res);
      if (res?.id) {
        setPerfumeId(res?.id);

        if (
          window.confirm(
            `향수를 등록하였습니다.${brandName}(${brandNameKorean}) ${PerfumeNameKorean}(${PerfumeName}) 향수 상세 페이지로 이동하시겠습니까?`
          )
        ) {
          navigate(`/perfumedetail?perfume=${res?.id}`);
        } else {
          setPerfumeName("");
          setPerfumeNameKorean("");
        }
      }
    } catch (error) {
      console.error("향수 등록 중 오류 발생", error);
    }
  };

  useEffect(() => {
    if (userType !== "ROLE_ADMIN") {
      navigate("/");
    }
  }, [userType]);

  useEffect(() => {
    if (brandSearchKeyword.length === 0) {
      setBrandListToggle(false);
    }
    const debounce = setTimeout(() => {
      if (brandSearchKeyword.length > 1) {
        getBrandSearchResult();
      } else {
        setBrandSearchKeyword("");
        setBrandSearchResultList([]);
        setBrandListToggle(false);
      }
    }, 300);
    return () => {
      clearTimeout(debounce);
    };
  }, [brandSearchKeyword]);

  return (
    <Container>
      <Header />
      <Search />
      <PageTitle>향수 추가</PageTitle>

      <PerfumeArea>
        {previewImage ? (
          <PreviewPerfumeImage src={previewImage} />
        ) : (
          <PerfumeDummyDiv>Perfume Image</PerfumeDummyDiv>
        )}

        <input
          type="file"
          id="PerfumeFile"
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
        <ImageUploadTitle htmlFor="PerfumeFile" style={{ cursor: "pointer" }}>
          {PerfumeImageName !== undefined
            ? PerfumeImageName
            : "향수 사진 업로드"}
        </ImageUploadTitle>
      </PerfumeArea>

      <Row>
        <RowTitle style={{ marginBottom: "2px" }}>브랜드 검색</RowTitle>
        <BrandWarning onClick={() => navigate("/admin/addbrand")}>
          브랜드가 없을 경우, 브랜드 등록을 먼저 해주세요
          <img
            style={{ width: "10px", height: "10px", marginLeft: "5px" }}
            src="/assets/icon/icon_link_red.svg"
          />
        </BrandWarning>
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <RowInput
            style={{ width: "220px", marginRight: "8px" }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setBrandSearchKeyword(e.target.value);
            }}
            placeholder="브랜드 한글/영문 이름을 검색하세요."
          />
          <img
            onClick={getBrandSearchResult}
            style={{ cursor: "pointer" }}
            src="/assets/icon/icon_search.svg"
          />
          {brandListToggle && brandSearchResultList && (
            <BrandListArea>
              {brandSearchResultList.map((el, index) => {
                return (
                  <BrandListRow
                    key={"brandlist_" + index}
                    onClick={() => {
                      setBrandListToggle(false);
                      setBrandSearchKeyword("");
                      setBrandName(el?.brandName);
                      setBrandNameKorean(el?.brandName_kr);
                    }}
                  >
                    {el?.brandName_kr}({el?.brandName})
                  </BrandListRow>
                );
              })}
            </BrandListArea>
          )}
        </div>
      </Row>
      <Row>
        <RowTitle>브랜드 한글 이름</RowTitle>
        <RowInput
          disabled={brandDisabled}
          onChange={(e) => setBrandNameKorean(e.target.value)}
          value={brandNameKorean}
          placeholder="브랜드 한글 이름을 입력해주세요."
        />
      </Row>
      <Row>
        <RowTitle>브랜드 영문 이름</RowTitle>
        <RowInput
          disabled={brandDisabled}
          onChange={(e) => setBrandName(e.target.value)}
          value={brandName}
          placeholder="브랜드 영문 이름을 입력해주세요."
        />
      </Row>

      <hr style={{ width: "100px", marginTop: "20px", marginBottom: "20px" }} />
      <Row>
        <RowTitle>향수 한글 이름</RowTitle>
        <RowInput
          onChange={(e) => setPerfumeNameKorean(e.target.value)}
          placeholder="향수 한글 이름을 입력해주세요."
        />
      </Row>
      <Row>
        <RowTitle>향수 영문 이름</RowTitle>
        <RowInput
          onChange={(e) => setPerfumeName(e.target.value)}
          placeholder="향수 영문 이름을 입력해주세요."
        />
      </Row>
      <AddButton onClick={() => handlePostAddPerfume()}>등록</AddButton>
    </Container>
  );
};

export default AddPerfume;
