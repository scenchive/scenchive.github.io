import React from "react";
import { Container, Number } from "./styles";

interface Props {
  count: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ count, page, setPage }: Props) => {
  const number = new Array(count).fill(0);
  const handleArrowClick = (dir: number) => {
    if (page + dir >= 0 && page + dir < count) setPage(page + dir);
  };

  return (
    <Container>
      <img
        src="/assets/icon/icon_arrow_left.svg"
        onClick={() => handleArrowClick(-1)}
      />
      {number.map((el, index) => (
        <Number
          onClick={() => setPage(index)}
          selected={page === index}
        >
          {index + 1}
        </Number>
      ))}
      <img
        src="/assets/icon/icon_arrow_right.svg"
        onClick={() => handleArrowClick(1)}
      />
    </Container>
  );
};

export default Pagination;
