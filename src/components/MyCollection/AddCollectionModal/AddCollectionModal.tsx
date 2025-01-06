import React, { useEffect, useRef, useState } from 'react';
import {
  ModalBackgroundArea,
  ModalArea,
  NameInput,
  ModifyButton,
  CancelButton,
  AlertMessage,
  ModalTitle,
  AddArea,
  NameTitle,
  NameArea,
  SelectedPerfumeArea,
  BrandNameArea,
} from './AddCollectionModal.styles';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../api';
import useCheckNameAvailabilityTokenY from '../../../hooks/user/useCheckNameAvailabilityTokenY';
import useChangeName from '../../../hooks/user/useChangeName';
import useApi from '../../../hooks/useApi';
import PerfumeSearch from '../PerfumeSearch';
import useFetchMyCollection from '../../../hooks/user/useFetchMyCollection';

interface Brand {
  brandId: number | null;
  brandImage: string;
  brandName: string;
  brandName_kr: string;
  perfumeId: number;
  perfumeName: string;
  perfumeImage: string;
}

const AddCollectionModal = (props: {
  ModalBackground: any;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const brandListRef = useRef<HTMLDivElement>(null);
  const [perfumeName, setPerfumeName] = useState<string>('');
  const [brandName, setBrandName] = useState<string>('');
  const [brandNameKorean, setBrandNameKorean] = useState<string>('');
  const { fetchApi: fetchPerfumeSearchResult } = useApi<any>();

  const [name, setName] = useState<string>('');
  const [nameMessage, setNameMessage] = useState<string>();
  const { checkNameAvailabilityTokenY } = useCheckNameAvailabilityTokenY();
  const { changeName } = useChangeName();
  const [perfumeSearchKeyword, setPerfumeSearchKeyword] = useState<string>('');
  const [perfumeListToggle, setPerfumeListToggle] = useState<boolean>(false);
  const [perfumeSearchResultList, setPerfumeSearchResultList] = useState<
    Brand[]
  >([]);
  const [perfumeId, setPerfumeId] = useState<number | undefined>();
  const [perfumeImage, setPerfumeImage] = useState<string>('');
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [perfumeSearchResultTotal, setPerfumeSearchResultTotal] =
    useState<number>();
  const [perfumePage, setPerfumePage] = useState<number>(0);
  const { postMyCollection } = useFetchMyCollection();

  const selectPerfume = (el: Brand) => {
    setPerfumeListToggle(false);
    setPerfumeSearchKeyword('');
    setPerfumeId(el?.perfumeId);
    setPerfumeImage(
      el?.perfumeImage ? el?.perfumeImage : '/assets/image/image_perfume.svg'
    );
    setPerfumeName(el?.perfumeName);
    setBrandName(el?.brandName);
    setBrandNameKorean(el?.brandName_kr);
  };

  useEffect(() => {
    setPerfumePage(0);
    setPerfumeSearchResultList([]);
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

  const getPerfumeSearchResult = async () => {
    try {
      setIsFetching(true);
      const res = await fetchPerfumeSearchResult(
        'get',
        `/search?name=${encodeURI(perfumeSearchKeyword)}&page=${perfumePage}`
      );
      if (res?.perfumes) {
        setPerfumeSearchResultList((prev) =>
          prev ? [...prev, ...res?.perfumes] : res?.perfumes
        );
        setPerfumeListToggle(true);
        setPerfumeSearchResultTotal(res?.perfumesNum);
      }
    } catch (error) {
      setPerfumeSearchResultList([]);
      setPerfumePage(0);
    } finally {
      setIsFetching(false); // Fetch 종료
    }
  };

  const handleAddCollection = async () => {
    if (!perfumeId || perfumeId === undefined) {
      alert('향수를 선택해주세요.');
    } else if (
      window.confirm(`${brandName} ${perfumeName}을 추가하시겠습니까?`)
    ) {
      const result = await postMyCollection(perfumeId);
      alert(result);
      if (result === '향수가 보유 목록에 추가되었습니다.') {
        props.setIsModalOpen(false);
      } else {
        alert('다시 시도해주세요.');
      }
    }
    return;
  };

  return (
    <div style={{ width: '100%', display: 'contents', paddingTop: '100px' }}>
      <ModalBackgroundArea
        isModalOpen={props.isModalOpen}
        ref={props.ModalBackground}
      ></ModalBackgroundArea>
      <ModalArea isModalOpen={props.isModalOpen} ref={props.ModalBackground}>
        <CancelButton
          onClick={() => props.setIsModalOpen(false)}
          src="/assets/icon/icon_modal_x.svg"
        />
        <ModalTitle>보유 향수 추가</ModalTitle>
        <AddArea>
          <NameArea>
            <NameTitle>향수 검색</NameTitle>
            <div style={{ width: '100%', maxWidth: '350px' }}>
              <PerfumeSearch
                setPerfumeSearchKeyword={setPerfumeSearchKeyword}
                perfumeSearchKeyword={perfumeSearchKeyword}
                getPerfumeSearchResult={getPerfumeSearchResult}
                perfumeListToggle={perfumeListToggle}
                perfumeSearchResultList={perfumeSearchResultList}
                brandListRef={brandListRef}
                selectPerfume={selectPerfume}
              />
            </div>
          </NameArea>
          {perfumeName && (
            <SelectedPerfumeArea>
              <BrandNameArea>
                {brandNameKorean}({brandName})
              </BrandNameArea>
              {perfumeName}
            </SelectedPerfumeArea>
          )}
        </AddArea>

        <ModifyButton onClick={() => handleAddCollection()}>
          추가하기
        </ModifyButton>
      </ModalArea>
    </div>
  );
};

export default AddCollectionModal;
