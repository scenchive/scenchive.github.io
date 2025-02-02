import React, { useEffect, useRef, useState } from 'react';
import {
  Card,
  CardText,
  Cards,
  Container,
  Keyword,
  KeywordBox,
  PageTitle,
  MyCollectionNumber,
  AddIcon,
  DeleteButton,
  PerfumeImageContainer,
  NoCollectionWarning,
} from './styles';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../api';
import Header from '../../common/Header';
import Search from '../../common/Search';
import useFetchMyCollection from '../../hooks/user/useFetchMyCollection';
import AddCollectionModal from '../../components/MyCollection/AddCollectionModal/AddCollectionModal';

interface Perfumes {
  perfumeId: number;
  perfumeName: string;
  perfumeImage?: string | null;
  brandDto: {
    brandId: number;
    brandName: string;
    brandName_kr: string | null;
    brandImage: string | null;
  };
}

interface Keyword {
  id: number;
  ptag_name: string;
  ptag_kr: string;
  ptagtype_id: number;
}

const MyCollection = () => {
  const [querySearch, setQuerySearch] = useSearchParams();
  const { getMyCollection, deleteMyCollection, error } = useFetchMyCollection();
  const modalBackground = useRef<HTMLDivElement>(null);

  const option = querySearch.get('option');
  const navigate = useNavigate();
  const keywordIds = querySearch.get('id')?.split(',').map(Number);
  let keywordString = '';
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [perfumes, setPerfumes] = useState<Perfumes[] | []>([]);
  const [keywords, setKeywords] = useState<Keyword[] | []>([]);
  const [perfumesPage, setPerfumesPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const view = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   getKeyword();
  // }, []);

  useEffect(() => {
    keywordIds?.map((el) => (keywordString += `keywordId=${el}&`));
  }, [keywordIds]);

  useEffect(() => {
    if (target) {
      setLoading(true);
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, loading]);

  // useEffect(() => {
  //   if (perfumesPage !== -1) getPerfumes();
  // }, [perfumesPage]);

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

  const fetchMyCollection = async () => {
    try {
      const data = await getMyCollection();
      if (data === '보유한 향수가 없습니다.') {
        setPerfumes([]);
      } else {
        setPerfumes(data);
      }
    } catch (error) {
      console.error('Error fetching collection:', error);
    }
  };

  useEffect(() => {
    fetchMyCollection();
  }, [isModalOpen]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        modalBackground.current &&
        !modalBackground.current.contains(e.target as Node)
      ) {
        if (isModalOpen === true) {
          setIsModalOpen(false);
        }
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [modalBackground]);

  const handleDeleteCollection = async (
    e: React.MouseEvent,
    perfumeId: number,
    brandName: string,
    perfumeName: string
  ) => {
    e.stopPropagation();
    if (!perfumeId || perfumeId === undefined) {
      alert('삭제할 향수를 선택해주세요.');
    } else if (
      window.confirm(`${brandName} ${perfumeName}을 삭제하시겠습니까?`)
    ) {
      const result = await deleteMyCollection(perfumeId);
      alert(result);
      if (result === '향수가 보유 목록에서 삭제되었습니다.') {
        fetchMyCollection();
      } else {
        alert('다시 시도해주세요.');
      }
    }
    return;
  };

  return (
    <Container>
      {isModalOpen === true ? (
        <AddCollectionModal
          ModalBackground={modalBackground}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      ) : null}
      <Header />
      <Search />
      <PageTitle>나의 보유 향수</PageTitle>
      <MyCollectionNumber>
        <span>{perfumes.length}</span>개
      </MyCollectionNumber>
      {perfumes?.length === 0 && (
        <NoCollectionWarning>
          보유한 향수가 없습니다. 향수를 추가해주세요.
        </NoCollectionWarning>
      )}
      <Cards>
        <Card isAdd={true} onClick={() => setIsModalOpen(true)}>
          <AddIcon src="/assets/icon/icon_add_collection.svg" />
        </Card>
        {perfumes?.length > 0 &&
          perfumes?.map((el) => {
            return (
              <Card
                key={el.perfumeId}
                onClick={() =>
                  navigate('/perfumedetail?perfume=' + el.perfumeId)
                }
              >
                <DeleteButton
                  src="/assets/icon/icon_delete_collection.svg"
                  onClick={(e) =>
                    handleDeleteCollection(
                      e,
                      el.perfumeId,
                      el?.brandDto?.brandName,
                      el.perfumeName
                    )
                  }
                />
                <PerfumeImageContainer
                  src={
                    el?.perfumeImage
                      ? el?.perfumeImage
                      : '/assets/image/image_perfume.svg'
                  }
                />
                <CardText>
                  <div className="card-text__brand">
                    {el.brandDto?.brandName_kr ? el.brandDto?.brandName_kr : ''}{' '}
                    {el.brandDto?.brandName_kr && '('}
                    {el.brandDto.brandName}
                    {el.brandDto?.brandName_kr && ')'}
                  </div>

                  <div className="card-text__title">{el?.perfumeName}</div>
                </CardText>
              </Card>
            );
          })}
        <div ref={setTarget} style={{ width: '100%', height: '180px' }} />
      </Cards>
    </Container>
  );
};

export default MyCollection;
