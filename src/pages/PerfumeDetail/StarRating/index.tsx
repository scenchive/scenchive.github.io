import React, { useEffect, useRef, useState } from 'react';
import { StarRatingArea, StarIcon } from './styles';

const StarRating = (props: { ratesResArr: number[] }) => {
  const STAR_IDX_ARR = ['first', 'second', 'third', 'fourth', 'last'];
  return (
    <StarRatingArea>
      {STAR_IDX_ARR.map((item, idx) => (
        <StarIcon key={'starIcon_' + idx}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 18"
            fill="#FFFFFF"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#4E4538"
            strokeWidth="1"
          >
            <path
              id={`${item}Star`}
              d="M13.5717 16.4207C13.4559 16.4212 13.3429 16.3827 13.2488 16.3108L8.82538 12.8933L4.40197 16.3108C4.30746 16.3838 4.19361 16.4229 4.07687 16.4225C3.96012 16.422 3.84654 16.382 3.75254 16.3083C3.65853 16.2345 3.58898 16.1308 3.55394 16.0121C3.5189 15.8934 3.52018 15.7659 3.55759 15.6481L5.28279 10.2027L0.811577 6.93515C0.714728 6.86445 0.641631 6.7626 0.602968 6.64448C0.564305 6.52636 0.562101 6.39816 0.596679 6.2786C0.631256 6.15905 0.700803 6.05442 0.795158 5.97999C0.889513 5.90556 1.00373 5.86523 1.12112 5.8649H6.63723L8.3019 0.405566C8.33776 0.287701 8.40773 0.184968 8.50178 0.112107C8.59582 0.0392458 8.7091 0 8.82538 0C8.94165 0 9.05493 0.0392458 9.14898 0.112107C9.24302 0.184968 9.31299 0.287701 9.34885 0.405566L11.0135 5.86674H16.5296C16.6472 5.86667 16.7616 5.90672 16.8563 5.98101C16.9509 6.05529 17.0207 6.15992 17.0555 6.27956C17.0903 6.39921 17.0883 6.52758 17.0496 6.64588C17.011 6.76418 16.9379 6.86619 16.8409 6.93698L12.368 10.2027L14.0921 15.6466C14.1201 15.7348 14.1279 15.8287 14.1151 15.9207C14.1022 16.0128 14.069 16.1002 14.0181 16.1758C13.9673 16.2514 13.9003 16.3131 13.8227 16.3557C13.7451 16.3983 13.659 16.4206 13.5717 16.4207Z"
            />
            <clipPath>
              <clipPath id={`${item}StarClip`}>
                <rect width={`${props?.ratesResArr[idx]}`} height="18px" />
              </clipPath>
            </clipPath>
            <use
              clipPath={`url(#${item}StarClip)`}
              href={`#${item}Star`}
              fill="#4C4538"
            />
          </svg>
        </StarIcon>
      ))}
    </StarRatingArea>
  );
};

export default StarRating;
