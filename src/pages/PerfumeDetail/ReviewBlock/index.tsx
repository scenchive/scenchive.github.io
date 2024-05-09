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
import {PerfumeNoteGroup, ReviewInformation} from "../../../common/types"


const ReviewBlock = (
  props: {
    PerfumeNote: PerfumeNoteGroup | null | undefined
    , reviewList: ReviewInformation[] | undefined
  }) => {
  const navigate = useNavigate();

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

      {props?.reviewList && props?.reviewList.length>0
       ? props?.reviewList?.map((el, index) => (
        <ReviewRow key={index}>
          <UserInformationArea>
            <UserProfilePicture src={el.imageUrl ? el.imageUrl : "/assets/icon/icon-profile-picture.svg"} />
            <UserInformation>
              <UserName>{el.name}</UserName> | <UpdatedAt>{el.created_at}</UpdatedAt>
            </UserInformation>
          </UserInformationArea>
          {el.content}
        </ReviewRow>
      )):
      "시향 후기가 없습니다. 시향 후기를 작성해주세요"}

    </ReviewArea>
  );
};

export default ReviewBlock;
