import React, { useEffect, useState, useRef } from 'react';
import { Container, Top, TopText, Text, Lists, List, ListText } from './styles';
import { useNavigate, useSearchParams } from 'react-router-dom';

const BrandPerfumeListRow = (props: {
  perfumeId: number;
  index: number;
  perfumeImage: string;
  perfumeName: string;
  brandName: string;
  brandNameKR: string;
}) => {
  const navigate = useNavigate();

  return (
    <List
      onClick={() => navigate(`/perfumedetail?perfume=${props?.perfumeId}`)}
      key={'list_' + props?.index}
    >
      <img src={`${props?.perfumeImage}`} />
      <ListText>
        <div className="list-text__title">{props?.perfumeName}</div>
        <div className="list-text__sub-title">{props?.brandName}</div>
        <div className="list-text__sub-title">{props?.brandNameKR}</div>
      </ListText>
    </List>
  );
};

export default BrandPerfumeListRow;
