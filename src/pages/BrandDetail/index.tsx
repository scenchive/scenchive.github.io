import React, { useEffect, useState, useRef } from 'react';
import { Container, Top, TopText, Text, Lists, List, ListText } from './styles';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/Header';
import Search from '../../components/Search';
import KakaoMapArea from './KakaoMapArea';
import axios from 'axios';
import { Perfumes, Store } from '../../common/types';
import BrandPerfumeListRow from './BrandPerfumeListRow';
import useApi from '../../hooks/useApi';

const BrandDetail = () => {
  const navigate = useNavigate();
  /**
   * useApi 커스텀 훅을 사용하여 데이터를 get, post, delete하는 작업과 관련된 변수들입니다.
   *  @author 김민지
   */
  const {
    data: brandPerfumeList,
    loading: brandPerfumeListLoading,
    error: brandPerfumeListError,
    fetchApi: fetchBrandPerfumeList,
  } = useApi<any>();

  const [querySearch, setQuerySearch] = useSearchParams();
  const [perfumes, setPerfumes] = useState<Array<Perfumes> | null>(null);
  const [num, setNum] = useState(0);
  const [perfumesPage, setPerfumesPage] = useState(0);
  const [toggleStore, setToggleStore] = useState<boolean>(false);
  const [storeList, setStoreList] = useState<Array<Store>>();
  const [isStoreLoading, setIsStoreLoading] = useState<boolean>(true);
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
    rootMargin: '10px',
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

  const getPerfumes = async () => {
    const data = await fetchBrandPerfumeList(
      'get',
      `/brandperfume?name=${querySearch.get('name')}&page=${perfumesPage}`,
      {}
    );
    if (data) {
      setPerfumes((prev) =>
        prev !== null ? [...prev, ...data?.perfumes] : data.perfumes
      );
      setNum(data?.totalBrandPerfumeCount);
    } else {
      setPerfumesPage(-1);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (perfumesPage !== -1) {
      getPerfumes();
    }
  }, [perfumesPage]);

  useEffect(() => {
    if (perfumes && perfumes[0]?.brandName_kr) {
      if (storeList === undefined || storeList?.length !== storeTotalCount) {
        if (perfumes[0]?.brandName_kr === '샤넬') {
          getStoreList('샤넬화장품');
        } else {
          getStoreList(perfumes[0]?.brandName_kr);
        }
      }
    }
  }, [perfumes, storePage]);

  useEffect(() => {
    if (storeList && storeList.length > 0) {
      setStoreTotalCount(storeList.length);
      setIsStoreLoading(false);
    }
  }, [storeList, storeTotalCount]);

  const getStoreList = async (searchQuery: string) => {
    if (perfumes && searchQuery) {
      const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${searchQuery}&page=${storePage}&size=10&sort=accuracy`;
      const result = await axios(url, {
        headers: {
          Authorization: `KakaoAK ${process.env.REACT_APP_KAKAOMAP_REST_API_KEY}`,
        },
      });
      if (result?.data?.documents?.length > 0) {
        const newList = result.data?.documents.filter(
          (el: any) =>
            el?.category_name.includes('화장품') ||
            el?.category_name.includes('향수') ||
            el?.category_name.includes('미용')
        );
        setStoreList((prevState) => {
          if (prevState && prevState.length > 0) {
            return [...prevState, ...newList];
          } else {
            return newList;
          }
        });
        if (
          result?.data?.meta?.total_count === storeList?.length ||
          result?.data?.meta?.pageable === 45 ||
          result?.data?.meta?.is_end === true
        ) {
          return;
        } else {
          setStorePage(storePage + 1);
        }
      } else {
        console.log('오프라인 매장이 없습니다.');
      }
    }
  };

  return (
    <Container>
      <Header />
      <Search />
      <Top>
        {perfumes && perfumes[0]?.brandImage && (
          <img src={perfumes[0].brandImage} />
        )}
        <TopText>
          <div className="top-text__title">{querySearch.get('name')}</div>
          <div className="top-text__sub-title">
            {perfumes && perfumes[0]?.brandName_kr}
          </div>
        </TopText>
      </Top>

      {isStoreLoading !== true &&
        storeList !== undefined &&
        storeList.length > 0 &&
        storeTotalCount && (
          <KakaoMapArea
            toggleStore={toggleStore}
            setToggleStore={setToggleStore}
            storeList={storeList}
            storeTotalCount={storeTotalCount}
            mapNumber={mapNumber}
            setMapNumber={setMapNumber}
          />
        )}

      <Text>총 {num}개</Text>
      <Lists ref={view}>
        {perfumes?.map((el, index) => {
          return (
            <BrandPerfumeListRow
              key={'perfumeListRow_' + index}
              perfumeId={el?.perfumeId}
              index={index}
              perfumeImage={el?.perfumeImage}
              perfumeName={el?.perfumeName}
              brandName={el?.brandName}
              brandNameKR={el?.brandName_kr}
            />
          );
        })}
        {perfumes && (
          <div ref={setTarget} style={{ width: '100%', height: '1px' }} />
        )}
      </Lists>
    </Container>
  );
};

export default BrandDetail;
