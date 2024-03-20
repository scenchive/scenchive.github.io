import React, { useEffect, useRef, useState } from "react";
import {
  ReviewArea,
  ReviewHeaderArea,
  ReviewAreaTitle,
  WriteReviewButton,
  ReviewRow,
  UserInformationArea,
  UserProfilePicture,
  UserInformation,
  UserName,
  UpdatedAt,

} from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import {api} from "../../../api";

interface PerfumeNoteGroup {
  perfumeId: number;
  perfumeName: string;
  brandName: string;
  top: string[];
  middle: string[];
  base: string[];
}

interface ReviewInformation {
  name: string;
  content: string;
  created_at: string;
  imageUrl: string;
}

const ReviewBlock = (
  props: {
    PerfumeNote: PerfumeNoteGroup | null | undefined
    , myToken: string | null | undefined
    , reviewList: ReviewInformation[] | undefined
  }) => {
  const navigate = useNavigate();
  const [myToken, setMyToken] = useState<string | null | undefined>(props?.myToken);
  const [perfumeNumber, setPerfumeNumber] = useSearchParams();
  const [querySearch, setQuerySearch] = useSearchParams();
  const [perfumeId, setPerfumeId] = useState<number | null | undefined>();


  return (
    <ReviewArea>
      <ReviewHeaderArea>
        <ReviewAreaTitle>
          다른 사용자들의 시향 후기
        </ReviewAreaTitle>
        <WriteReviewButton onClick={() => navigate(`/writereview?perfume=${props?.PerfumeNote?.perfumeId}`)}>
          작성하기
        </WriteReviewButton>
      </ReviewHeaderArea>

      {props?.reviewList?.map((el, index) => (
        <ReviewRow key={index}>
          <UserInformationArea>
            <UserProfilePicture src={el.imageUrl ? el.imageUrl : "/assets/icon/icon-profile-picture.svg"} />
            <UserInformation>
              <UserName>{el.name}</UserName> | <UpdatedAt>{el.created_at}</UpdatedAt>
            </UserInformation>
          </UserInformationArea>
          {el.content}
        </ReviewRow>
      ))}

    </ReviewArea>
  );
};

export default ReviewBlock;
