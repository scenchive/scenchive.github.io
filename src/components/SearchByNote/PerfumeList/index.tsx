import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardText,
  PerfumeImageContainer,
  PerfumeListArea,
  PerfumeListRow,
} from './styles';

interface Perfume {
  brandId: number;
  brandImage: string;
  brandName: string;
  brandName_kr: string;
  perfumeId: number;
  perfumeName: string;
  perfume_kr: string | null;
  perfumeImage: string;
}

interface PerfumeListParams {
  perfume: Perfume;
}

const PerfumeList = (props: PerfumeListParams) => {
  const navigate = useNavigate();
  return (
    <>
      <Card
        key={props.perfume.perfumeId}
        onClick={() =>
          navigate('/perfumedetail?perfume=' + props.perfume.perfumeId)
        }
      >
        <PerfumeImageContainer
          src={
            props.perfume?.perfumeImage
              ? props.perfume?.perfumeImage
              : '/assets/image/image_perfume.svg'
          }
        />
        <CardText>
          <div className="card-text__brand">
            {props.perfume.brandName_kr ? props.perfume.brandName_kr : ''}{' '}
            {props.perfume.brandName_kr && '('}
            {props.perfume.brandName}
            {props.perfume.brandName_kr && ')'}
          </div>

          <div className="card-text__title">{props.perfume?.perfumeName}</div>
        </CardText>
      </Card>
    </>
  );
};

export default PerfumeList;
