import React, { useEffect, useState } from 'react';
import {
  Container,
  Top,
  Main,
  Content,
  Title,
  Keyword,
  Button,
  Keywords,
} from './styles';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../../api';
import Header from '../../../common/Header';
import Search from '../../../common/Search';

interface Keywords {
  id: number;
  ptag: string;
  ptag_kr: string;
  ptagtype_id: number;
}

/**
 * 키워드 선택페이지
 * @author 신정은
 */
const KeywordSearchStep2 = () => {
  const [querySearch, setQuerySearch] = useSearchParams();
  //1 : 계열/분위기/계절 or 2 : TPO
  const option = Number(querySearch.get('option'));
  const navigate = useNavigate();
  const top = ['계열/분위기/계절', 'TPO'];
  const title = ['계절', '장소'];
  const [keywords, setKeywords] = useState<Array<Keywords> | []>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<Array<number>>([]);
  const [keywordCount, setKeywordCount] = useState([0, 0, 0]);

  useEffect(() => {
    if (option) {
      getKeyword();
    }
  }, [option]);

  /**
   * 키워드 가져오는 api 호출 함수
   */
  const getKeyword = () => {
    const opt = option === 1 ? 'type' : 'tpo';
    api.get(`perfumes/recommend/${opt}`, {}).then((res) => {
      setKeywords(res.data);
    });
  };

  /**
   * 키워드 클릭 시 삭제, 추가하는 함수
   * @param {number} target 키워드 id
   * @param {number} type 키워드 ptagtype_id
   */
  const handleClickKeyword = (target: number, type: number) => {
    const temp = [...selectedKeywords];
    //선택된 상태일 경우
    if (isSelected(target)) {
      setSelectedKeywords(temp.filter((el) => el !== target));
      const count = [...keywordCount];
      count[type === 4 ? 2 : type - 1]--;
      setKeywordCount([...count]);
    } else {
      setSelectedKeywords([...temp, target]);
      const count = [...keywordCount];
      count[type === 4 ? 2 : type - 1]++;
      setKeywordCount([...count]);
    }
  };

  /**
   * 클릭한 키워드가 selectedKeywords 배열에 존재하는지를 반환하는 함수
   * @param {number} target 키워드 id
   * @retrun {boolean}
   */
  const isSelected = (target: number) => {
    return selectedKeywords.includes(target);
  };

  /**
   * 항목 당 한 개 이상의 키워드 클릭했는지 확인
   */
  const handleResultButtonClick = () => {
    if (keywordCount[0] > 0 && keywordCount[1] > 0 && keywordCount[2] > 0)
      navigate(
        `/recommendresult?option=${
          option === 1 ? 'type' : 'tpo'
        }&id=${selectedKeywords}`
      );
    else alert('항목 당 한 개 이상의 키워드를 선택해주세요.');
  };

  return (
    <Container>
      <Header />
      <Search />
      <Top>{top[option - 1]}</Top>
      <Main>
        <Content>
          <Title>계열</Title>
          <Keywords>
            {keywords
              .filter((el) => el.ptagtype_id === 1)
              .map((el) => {
                return (
                  <Keyword
                    key={el.id}
                    onClick={() => handleClickKeyword(el.id, 1)}
                    isSelected={isSelected(el.id)}
                  >
                    {el.ptag_kr}
                  </Keyword>
                );
              })}
          </Keywords>
        </Content>
        <Content>
          <Title>분위기</Title>
          <Keywords>
            {keywords
              .filter((el) => el.ptagtype_id === 2)
              .map((el) => {
                return (
                  <Keyword
                    key={el.id}
                    onClick={() => handleClickKeyword(el.id, 2)}
                    isSelected={isSelected(el.id)}
                  >
                    {el.ptag_kr}
                  </Keyword>
                );
              })}
          </Keywords>
        </Content>
        <Content>
          <Title>{title[option - 1]}</Title>
          <Keywords>
            {keywords
              .filter((el) => el.ptagtype_id === (option === 1 ? 4 : 3))
              .map((el) => {
                return (
                  <Keyword
                    key={el.id}
                    onClick={() => handleClickKeyword(el.id, el.ptagtype_id)}
                    isSelected={isSelected(el.id)}
                  >
                    {el.ptag_kr}
                  </Keyword>
                );
              })}
          </Keywords>
        </Content>
      </Main>
      <Button onClick={() => handleResultButtonClick()}>결과</Button>
    </Container>
  );
};

export default KeywordSearchStep2;
