import React from 'react';
import { Container, Top, Main, Box } from './styles';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header';
import Search from '../../../components/Search';

const KeywordSearchStep1 = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header />
      <Search />
      <Top>
        <div>
          <span className="top__text--big">“</span>
          &nbsp;키워드를 기반으로 &nbsp;<span>향수</span>를 추천해 드릴게요.
          <span className="top__text--big">”</span>
        </div>
        <div>원하는 분류를 선택해 주세요.</div>
      </Top>
      <Main>
        <Box
          borderColor="#D67070"
          onClick={() => {
            navigate('/keywordsearchstep2?option=1');
          }}
        >
          계열/분위기/계절
        </Box>
        <Box
          borderColor="#CEB172"
          onClick={() => {
            navigate('/keywordsearchstep2?option=2');
          }}
        >
          TPO
        </Box>
      </Main>
    </Container>
  );
};

export default KeywordSearchStep1;
