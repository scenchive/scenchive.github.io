import React, { useEffect, useState, useRef } from "react";
import { Container, Top, TopText, Text, Lists, List, ListText } from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../api";
import Header from "../../components/Header";
import Search from "../../components/Search";
import KakaoMapArea from "./KakaoMapArea";
import axios from "axios";
import { BrandNameKR } from "../WriteReview/styles";

interface Perfumes {
  perfumeId: number;
  perfumeName: string;
  perfumeImage: string;
  brandName: string;
  brandName_kr: string;
  brandImage: string;
  ratingAvg: number;
}

interface Store {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

const BrandDetail = () => {
  const navigate = useNavigate();
  const [querySearch, setQuerySearch] = useSearchParams();
  const [perfumes, setPerfumes] = useState<Array<Perfumes> | null>(null);
  const [num, setNum] = useState(0);
  const [perfumesPage, setPerfumesPage] = useState(0);
  const [toggleStore, setToggleStore] = useState<boolean>(false);
  const [storeList, setStoreList] = useState<Array<Store>>();
  const [storeTotalCount, setStoreTotalCount] = useState<number>();
  const [storePage, setStorePage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const [mapNumber, setMapNumber] = useState<number>();
  const view = useRef<HTMLDivElement>(null);

  //무한 스크롤 target이 감지되면 호출되는 함수
  const callback = () => {
    if (perfumesPage !== -1) setPerfumesPage(perfumesPage + 1);
  };

  const options = {
    root: view.current,
    threshold: 1.0,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
      callback();
      observer.unobserve(entries[0].target);
    }
  }, options);

  useEffect(() => {
    if (target) {
      setLoading(true);
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, loading]);

  useEffect(() => {
    if (perfumesPage !== -1) {
      getPerfumes();
    }
  }, [perfumesPage]);

  useEffect(() => {
    if (perfumes && perfumes[0]?.brandName_kr) {
      if (storeList && storeTotalCount) {
        if (storeList.length < storeTotalCount) {
          getStoreList(perfumes[0]?.brandName_kr);
        }
      } else {
        getStoreList(perfumes[0]?.brandName_kr);
      }
    }
  }, [storePage, perfumes])

  const getPerfumes = async () => {
    await api
      .get(`/brandperfume?name=${querySearch.get("name")}&page=${perfumesPage}`)
      .then((res) => {
        if (res.data) {
          setPerfumes((prev) =>
            prev !== null ? [...prev, ...res.data?.perfumes] : res.data.perfumes
          );
          setNum(res.data.totalBrandPerfumeCount);
        } else setPerfumesPage(-1);
        setLoading(false);
      });
  };

  const getStoreList = async (brandName_kr: string) => {
    if (perfumes && perfumes[0]?.brandName_kr) {
      const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${brandName_kr}&page=${storePage}`;
      const result = await axios(url, { headers: { 'Authorization': `KakaoAK ${process.env.REACT_APP_KAKAOMAP_REST_API_KEY}` } });
      if (result?.data?.documents?.length > 0) {
        setStoreList(prevState => {
          if (prevState && prevState.length > 0) {
            return [...prevState, ...result.data.documents];
          } else {
            return result.data.documents;
          }
        });
        setStorePage(storePage + 1)
        setStoreTotalCount(result.data.meta.total_count);
      } else {
        console.log('오프라인 매장이 없습니다.')
      }
    }
  }


  return (
    <Container>
      <Header />
      <Search />
      <Top>
        {perfumes && perfumes[0]?.brandImage && (
          <img src={perfumes[0].brandImage} />
        )}
        <TopText>
          <div className="top-text__title">{querySearch.get("name")}</div>
          <div className="top-text__sub-title">
            {perfumes && perfumes[0]?.brandName_kr}
          </div>
        </TopText>
      </Top>


      {storeList && storeTotalCount
        && <KakaoMapArea toggleStore={toggleStore} setToggleStore={setToggleStore} storeList={storeList} storeTotalCount={storeTotalCount} mapNumber={mapNumber} setMapNumber={setMapNumber} />
      }


      <Text>총 {num}개</Text>
      <Lists ref={view}>
        {perfumes?.map((el, index) => {
          return (
            <List
              onClick={() => navigate(`/perfumedetail?perfume=${el.perfumeId}`)}
              key={'list_' + index}
            >
              <img src={`${el.perfumeImage}`} />
              <ListText>
                <div className="list-text__title">{el.perfumeName}</div>
                <div className="list-text__sub-title">{el.brandName}</div>
                <div className="list-text__sub-title">{el.brandName_kr}</div>
              </ListText>
            </List>
          );
        })}
        {perfumes && (
          <div ref={setTarget} style={{ width: "100%", height: "1px" }} />
        )}
      </Lists>
    </Container>
  );
};

export default BrandDetail;
