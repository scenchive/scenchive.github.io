import React, { useEffect, useState, useRef, SyntheticEvent } from 'react';
import { Row, RowTitle, RowInput } from './styles';
import PerfumeList from '../PerfumeList';

interface Brand {
  brandId: number | null;
  brandImage: string;
  brandName: string;
  brandName_kr: string;
  perfumeId: number;
  perfumeName: string;
  perfumeImage: string;
}

interface PerfumeSearchProps {
  setPerfumeSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  perfumeSearchKeyword: string;
  getPerfumeSearchResult: () => Promise<void>;
  perfumeListToggle: boolean;
  perfumeSearchResultList: Brand[];
  brandListRef: React.RefObject<HTMLDivElement>;
  selectPerfume: (el: Brand) => void;
}
const PerfumeSearch: React.FC<PerfumeSearchProps> = ({
  setPerfumeSearchKeyword,
  perfumeSearchKeyword,
  getPerfumeSearchResult,
  perfumeListToggle,
  perfumeSearchResultList,
  brandListRef,
  selectPerfume,
}) => {
  return (
    <Row>
      <RowTitle style={{ marginBottom: '2px' }}>향수 검색</RowTitle>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <RowInput
          style={{ width: '220px', marginRight: '8px' }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPerfumeSearchKeyword(e.target.value);
          }}
          placeholder="향수 영문 이름을 검색하세요."
          value={perfumeSearchKeyword}
        />
        <img
          onClick={getPerfumeSearchResult}
          style={{ cursor: 'pointer' }}
          src="/assets/icon/icon_search.svg"
        />
        {perfumeListToggle && perfumeSearchResultList && (
          <PerfumeList
            brandListRef={brandListRef}
            perfumeSearchResultList={perfumeSearchResultList}
            selectPerfume={selectPerfume}
          />
        )}
      </div>
    </Row>
  );
};

export default PerfumeSearch;
