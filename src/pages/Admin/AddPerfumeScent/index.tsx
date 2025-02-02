import React, { useEffect, useState, useRef, SyntheticEvent } from "react";
import {
  Container,
  PageTitle,
  BrandListArea,
  BrandListRow,
  Row,
  RowTitle,
  RowInput,
  SelectedPerfumeImage,
  SelectedPerfumeName,
  TopMiddleBaseSelect,
  NoteTitle,
  NoteList,
  DeleteButton,
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
  perfumeId: number;
  perfumeName: string;
  perfumeImage: string;
}

const AddPerfumeScent = () => {
  const { userType } = useUserTypeStore();
  const navigate = useNavigate();
  const brandListRef = useRef<HTMLDivElement>(null);

  const [perfumeListToggle, setPerfumeListToggle] = useState<boolean>(false);
  const [perfumeSearchResultTotal, setPerfumeSearchResultTotal] =
    useState<number>();
  const [perfumeSearchResultList, setPerfumeSearchResultList] =
    useState<Brand[]>();
  const [perfumeSearchKeyword, setPerfumeSearchKeyword] = useState<string>("");
  const [perfumeName, setPerfumeName] = useState<string>("");
  const [brandName, setBrandName] = useState<string>("");
  const [brandNameKorean, setBrandNameKorean] = useState<string>("");
  const [perfumePage, setPerfumePage] = useState<number>(0);
  const [perfumeId, setPerfumeId] = useState<number | undefined>();
  const [perfumeImage, setPerfumeImage] = useState<string>("");
  const [perfumeImageLoaded, setPerfumeImageLoaded] = useState(true);
  const [noteKorean, setNoteKorean] = useState<string>("");
  const [noteEnglish, setNoteEnglish] = useState<string>("");
  const [topMiddleBase, setTopMiddleBase] = useState<number | undefined>(1);
  const [perfumeTopNoteList, setPerfumeTopNoteList] = useState<string[][]>([]);
  const [perfumeMiddleNoteList, setPerfumeMiddleNoteList] = useState<
    string[][]
  >([]);
  const [perfumeBaseNoteList, setPerfumeBaseNoteList] = useState<string[][]>(
    []
  );
  const {
    data: BrandListData,
    loading: BrandListDataLoading,
    error: BrandListDataError,
    fetchApi: fetchPerfumeSearchResult,
  } = useApi<any>();

  const {
    data: PerfumeListData,
    loading: PerfumeListDataLoading,
    error: PerfumeListDataError,
    fetchApi: fetchPostPerfume,
  } = useApi<{ perfumeId?: number }>();

  const getPerfumeSearchResult = async () => {
    setBrandName("");
    setBrandNameKorean("");
    try {
      const res = await fetchPerfumeSearchResult(
        "get",
        `/search?name=${encodeURI(perfumeSearchKeyword)}&page=${perfumePage}`
      );
      if (res?.perfumes) {
        setPerfumeSearchResultList((prev) =>
          prev ? [...prev, ...res?.perfumes] : res?.perfumes
        );
        setPerfumeListToggle(true);
        setPerfumeSearchResultTotal(res?.perfumesNum);
      } else {
        return;
      }
    } catch (error) {
      setPerfumeSearchResultList([]);
      setPerfumePage(0);
    }
  };

  const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/assets/image/image_perfume.svg";
  };

  const handleAddNote = () => {
    const isEnglish = /^[A-Za-z\s]+$/;
    const isKorean = /^[가-힣\s]+$/;

    if (noteKorean?.length === 0 || noteEnglish?.length === 0) {
      alert("모든 값을 정확히 입력해주세요.");
      return;
    }
    if (!isEnglish.test(noteEnglish)) {
      alert("노트 영문 이름은 영어로 입력해야 합니다.");
      return;
    }
    if (!isKorean.test(noteKorean)) {
      alert("노트한글 이름은 한글로 입력해야 합니다.");
      return;
    }

    let newList: React.SetStateAction<string[][]> = [];
    if (topMiddleBase === 1) {
      if (perfumeTopNoteList?.length > 0) {
        newList = [...perfumeTopNoteList, [noteEnglish, noteKorean, "1"]];
      } else {
        newList = [[noteEnglish, noteKorean, "1"]];
      }
      setPerfumeTopNoteList(newList);
    } else if (topMiddleBase === 2) {
      if (perfumeMiddleNoteList?.length > 0) {
        newList = [...perfumeMiddleNoteList, [noteEnglish, noteKorean, "2"]];
      } else {
        newList = [[noteEnglish, noteKorean, "2"]];
      }
      setPerfumeMiddleNoteList(newList);
    } else if (topMiddleBase === 3) {
      if (perfumeBaseNoteList?.length > 0) {
        newList = [...perfumeBaseNoteList, [noteEnglish, noteKorean, "3"]];
      } else {
        newList = [[noteEnglish, noteKorean, "3"]];
      }
      setPerfumeBaseNoteList(newList);
    }
    setNoteEnglish("");
    setNoteKorean("");
  };

  const handleDelete = (el: string[]) => {
    if (el[2] === "1") {
      const newList = perfumeTopNoteList.filter(
        (el2) => el[0] !== el2[0] || el[1] !== el2[1]
      );
      setPerfumeTopNoteList(newList);
    } else if (el[2] === "2") {
      const newList = perfumeMiddleNoteList.filter(
        (el2) => el[0] !== el2[0] || el[1] !== el2[1]
      );
      setPerfumeMiddleNoteList(newList);
    } else if (el[2] === "3") {
      const newList = perfumeBaseNoteList.filter(
        (el2) => el[0] !== el2[0] || el[1] !== el2[1]
      );
      setPerfumeBaseNoteList(newList);
    }
  };

  const handlePostAddPerfumeScent = async () => {
    if (
      !perfumeId ||
      (perfumeTopNoteList.length === 0 &&
        perfumeMiddleNoteList.length === 0 &&
        perfumeBaseNoteList.length === 0)
    ) {
      alert("향수 모든 정보를 올바르게 입력해주세요.");
      return;
    }
    const data = {
      perfumeId: perfumeId,
      scents: [
        ...perfumeTopNoteList,
        ...perfumeMiddleNoteList,
        ...perfumeBaseNoteList,
      ],
    };

    try {
      const res = await fetchPostPerfume("post", "/master/note", data, {
        Authorization: "Bearer " + localStorage.getItem("my-token"),
        accept: "application/json",
      });
      if (res?.perfumeId) {
        if (
          window.confirm(
            `노트 정보를 등록하였습니다.${brandName}(${brandNameKorean}) ${perfumeName} 향수 상세 페이지로 이동하시겠습니까?`
          )
        ) {
          navigate(`/perfumedetail?perfume=${perfumeId}`);
        } else {
          setPerfumeSearchKeyword("");
          setPerfumeName("");
          setBrandName("");
          setBrandNameKorean("");
          setPerfumePage(0);
          setPerfumeId(undefined);
          setNoteKorean("");
          setNoteEnglish("");
          setPerfumeTopNoteList([]);
          setPerfumeMiddleNoteList([]);
          setPerfumeBaseNoteList([]);
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
    setPerfumePage(0);
    setPerfumeSearchResultList([]);
    setPerfumeListToggle(false);
    if (perfumeSearchKeyword.length === 0) {
      setPerfumeListToggle(false);
    }
    const debounce = setTimeout(() => {
      if (perfumeSearchKeyword.length > 1) {
        getPerfumeSearchResult();
      } else {
        setPerfumeSearchResultList([]);
        setPerfumeListToggle(false);
      }
    }, 300);
    return () => {
      clearTimeout(debounce);
    };
  }, [perfumeSearchKeyword]);

  useEffect(() => {
    const handleScroll = () => {
      if (brandListRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = brandListRef.current;
        const threshold = 5;

        if (scrollTop + clientHeight + threshold >= scrollHeight) {
          if (
            perfumeSearchResultTotal &&
            perfumePage * 10 < perfumeSearchResultTotal
          ) {
            setPerfumePage((prevPage) => prevPage + 1);
          }
        }
      }
    };

    const refCurrent = brandListRef.current;
    refCurrent?.addEventListener("scroll", handleScroll);

    return () => {
      refCurrent?.removeEventListener("scroll", handleScroll);
    };
  }, [perfumePage, perfumeSearchResultTotal, perfumeSearchResultList]);

  useEffect(() => {
    if (perfumePage > 0) {
      getPerfumeSearchResult();
    }
  }, [perfumePage]);

  return (
    <Container>
      <Header />
      <Search />
      <PageTitle>향수 노트 추가</PageTitle>
      <Row>
        <RowTitle style={{ marginBottom: "2px" }}>향수 검색</RowTitle>

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
              setPerfumeSearchKeyword(e.target.value);
            }}
            placeholder="향수 영문 이름을 검색하세요."
            value={perfumeSearchKeyword}
          />
          <img
            onClick={getPerfumeSearchResult}
            style={{ cursor: "pointer" }}
            src="/assets/icon/icon_search.svg"
          />
          {perfumeListToggle && perfumeSearchResultList && (
            <BrandListArea ref={brandListRef}>
              {perfumeSearchResultList.map((el, index) => {
                return (
                  <BrandListRow
                    key={"brandlist_" + index}
                    onClick={() => {
                      setPerfumeListToggle(false);
                      setPerfumeSearchKeyword("");
                      setPerfumeId(el?.perfumeId);
                      setPerfumeImage(
                        el?.perfumeImage
                          ? el?.perfumeImage
                          : "/assets/image/image_perfume.svg"
                      );
                      setPerfumeName(el?.perfumeName);
                      setBrandName(el?.brandName);
                      setBrandNameKorean(el?.brandName_kr);
                    }}
                  >
                    <div
                      style={{
                        width: "inherit",
                        color: "#2e2e2e",
                        fontSize: "10px",
                        fontWeight: "400",
                        marginBottom: "4px",
                      }}
                    >
                      {el?.brandName_kr}({el?.brandName})
                    </div>
                    {el?.perfumeName}
                  </BrandListRow>
                );
              })}
            </BrandListArea>
          )}
        </div>
      </Row>
      <Row>
        {brandNameKorean && brandName && perfumeName ? (
          <>
            <SelectedPerfumeImage src={perfumeImage} onError={handleError} />
            <SelectedPerfumeName>
              {brandNameKorean}({brandName}) <br /> {perfumeName}
            </SelectedPerfumeName>
          </>
        ) : (
          <></>
        )}
      </Row>
      <hr style={{ width: "100px", marginTop: "20px", marginBottom: "20px" }} />

      <Row>
        <RowTitle>탑/미들/베이스 선택</RowTitle>
        <TopMiddleBaseSelect
          defaultValue="1"
          onChange={(e) => setTopMiddleBase(Number(e.target.value))}
        >
          <option value="1">탑노트</option>
          <option value="2">미들노트</option>
          <option value="3">베이스노트</option>
        </TopMiddleBaseSelect>
        <RowTitle>노트 영문 이름</RowTitle>
        <RowInput
          onChange={(e) => setNoteEnglish(e.target.value)}
          placeholder="노트 영문 이름을 입력해주세요."
          value={noteEnglish}
        />
        <RowTitle>노트 한글 이름</RowTitle>
        <RowInput
          onChange={(e) => setNoteKorean(e.target.value)}
          placeholder="노트 한글 이름을 입력해주세요."
          value={noteKorean}
        />

        <AddButton
          style={{
            backgroundColor: "#74d8d7",
            fontSize: "13px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          onClick={handleAddNote}
        >
          추가
        </AddButton>
      </Row>

      <article>
        <NoteTitle>탑노트</NoteTitle>
        {perfumeTopNoteList?.map((el, index) => (
          <NoteList key={"top_" + index}>
            {el[0]}({el[1]})
            <DeleteButton
              onClick={() => {
                alert("이 노트를 삭제하시겠습니까?");
                handleDelete(el);
              }}
              src="/assets/icon/icon_delete_comment_x.svg"
            />
          </NoteList>
        ))}

        <NoteTitle>미들노트</NoteTitle>
        {perfumeMiddleNoteList?.map((el, index) => (
          <NoteList key={"middle_" + index}>
            {el[0]}({el[1]})
            <DeleteButton
              onClick={() => {
                alert("이 노트를 삭제하시겠습니까?");
                handleDelete(el);
              }}
              src="/assets/icon/icon_delete_comment_x.svg"
            />
          </NoteList>
        ))}

        <NoteTitle>베이스노트</NoteTitle>
        {perfumeBaseNoteList?.map((el, index) => (
          <NoteList key={"base_" + index}>
            {el[0]}({el[1]})
            <DeleteButton
              onClick={() => {
                alert("이 노트를 삭제하시겠습니까?");
                handleDelete(el);
              }}
              src="/assets/icon/icon_delete_comment_x.svg"
            />
          </NoteList>
        ))}
      </article>

      <AddButton onClick={() => handlePostAddPerfumeScent()}>
        등록하기
      </AddButton>
    </Container>
  );
};

export default AddPerfumeScent;
