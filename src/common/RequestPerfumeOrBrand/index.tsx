import React, { useEffect, useState } from 'react';
import { RequestPerfumeOrBrandArea, BRTag, GoArrow } from './styles';

const RequestPerfumeOrBrand = () => {
  return (
    <RequestPerfumeOrBrandArea
      onClick={() =>
        window.open(
          'https://docs.google.com/forms/d/e/1FAIpQLScKbPZOxKmP1qN1HeU7L_uXRSAfgUVZ-Xdf5ze4BXExmV1IrA/viewform'
        )
      }
    >
      원하는 향수/브랜드가 없다면?
      <BRTag />
      <span>
        향수/브랜드 요청하기
        <GoArrow
          src={'/assets/icon/icon_arrow_right_vivid_pink.svg'}
          alt={'request-perfume-or-brand'}
        />
      </span>
    </RequestPerfumeOrBrandArea>
  );
};

export default RequestPerfumeOrBrand;
