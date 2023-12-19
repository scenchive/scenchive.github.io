import React, { useEffect, useState } from "react";
import {
  Container,
  Text,
  Main,
  Box,
  Header,
  Content,
  Title,
  Keyword,
  Button,
} from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

interface Keywords {
  id: number;
  ptag: string;
  ptag_kr: string;
  ptagtype_id: number;
}

const KeywordSearch = () => {
  const [token, setToken] = useState<string | null>(null);
  const [querySearch, setQuerySearch] = useSearchParams();
  //1 : 계열/분위기/계절 or 2 : TPO
  const option = Number(querySearch.get("option"));
  const navigate = useNavigate();
  const header = ["계열/분위기/계절", "TPO"];
  const title = ["계절", "장소"];
  const [keywords, setKeywords] = useState<Array<Keywords> | []>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<Array<number>>([]);

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token && option) {
      getKeyword();
    }
  }, [token, option]);

  const getToken = () => {
    const token = localStorage.getItem("my-token");
    setToken(token);
  };

  /**
   * 키워드 가져오는 api 호출 함수
   * @author 신정은
   */
  const getKeyword = async () => {
    const opt = option === 1 ? "type" : "tpo";
    await axios
      .get(`perfumes/recommend/${opt}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setKeywords(res.data);
      });
  };

  /**
   * 키워드 클릭 시 삭제, 추가하는 함수
   * @author 신정은
   */
  const handleClickKeyword = (target: number) => {
    let temp = [...selectedKeywords];
    //선택된 상태일 경우
    if (isSelected(target)) {
      setSelectedKeywords(temp.filter((el) => el !== target));
    } else {
      setSelectedKeywords([...temp, target]);
    }
  };

  /**
   * 클릭한 키워드가 selectedKeywords 배열에 존재하는지를 반환하는 함수
   * @author 신정은
   * @retrun {boolean}
   */
  const isSelected = (target: number) => {
    return selectedKeywords.includes(target);
  };

  return option === 0 ? (
    <Container>
      <Text>
        키워드를 기반으로 향수를 추천해 드릴게요. <br /> 원하는 분류를 선택해
        주세요.
      </Text>
      <Main>
        <Box
          bgColor="#B592FF"
          onClick={() => {
            navigate("/keywordsearch?option=1");
          }}
        >
          계열/분위기/계절
        </Box>
        <Box
          bgColor="#947AFD"
          onClick={() => {
            navigate("/keywordsearch?option=2");
          }}
        >
          TPO
        </Box>
      </Main>
    </Container>
  ) : (
    <Container>
      <Header>
        <img
          src="/assets/icon/icon_arrow_left.svg"
          onClick={() => {
            navigate("/keywordsearch");
          }}
        />
        {header[option - 1]}
      </Header>
      <Main>
        <Content>
          <Title>계열</Title>
          {keywords
            .filter((el) => el.ptagtype_id === 1)
            .map((el) => {
              return (
                <Keyword
                  onClick={() => handleClickKeyword(el.id)}
                  isSelected={isSelected(el.id)}
                >
                  {el.ptag_kr}
                </Keyword>
              );
            })}
        </Content>
        <Content>
          <Title>분위기</Title>
          {keywords
            .filter((el) => el.ptagtype_id === 2)
            .map((el) => {
              return (
                <Keyword
                  onClick={() => handleClickKeyword(el.id)}
                  isSelected={isSelected(el.id)}
                >
                  {el.ptag_kr}
                </Keyword>
              );
            })}
        </Content>
        <Content>
          <Title>{title[option - 1]}</Title>
          {keywords
            .filter((el) => el.ptagtype_id === (option === 1 ? 4 : 3))
            .map((el) => {
              return (
                <Keyword
                  onClick={() => handleClickKeyword(el.id)}
                  isSelected={isSelected(el.id)}
                >
                  {el.ptag_kr}
                </Keyword>
              );
            })}
        </Content>
      </Main>
      <Button>추천 받기</Button>
    </Container>
  );
};

export default KeywordSearch;
