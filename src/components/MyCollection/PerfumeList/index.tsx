import React from 'react';
import RequestPerfumeOrBrand from '../../../common/RequestPerfumeOrBrand';
import { PerfumeListArea, PerfumeListRow } from './styles';

interface Perfume {
  brandId: number | null;
  brandImage: string;
  brandName: string;
  brandName_kr: string;
  perfumeId: number;
  perfumeName: string;
  perfumeImage: string;
}

interface PerfumeListParams {
  brandListRef: React.RefObject<HTMLDivElement>;
  perfumeSearchResultList: Perfume[];
  selectPerfume: (el: Perfume) => void;
}

const PerfumeList = (props: PerfumeListParams) => {
  return (
    <PerfumeListArea ref={props?.brandListRef}>
      <RequestPerfumeOrBrand />
      {props?.perfumeSearchResultList.map((el, index) => {
        return (
          <PerfumeListRow
            key={'perfumelist_' + index}
            onClick={() => {
              props?.selectPerfume(el);
            }}
          >
            <div
              style={{
                width: 'inherit',
                color: '#2e2e2e',
                fontSize: '10px',
                fontWeight: '400',
                marginBottom: '4px',
              }}
            >
              {el?.brandName_kr}({el?.brandName})
            </div>
            {el?.perfumeName}
          </PerfumeListRow>
        );
      })}
    </PerfumeListArea>
  );
};

export default PerfumeList;
