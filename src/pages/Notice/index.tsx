import React, { useEffect, useState } from "react";
import {
  Container,
  Content,
  Info,
  List,
  ListBox,
  ListContent,
  ListNumber,
  ListTop,
  Lists,
  NoData,
  Top,
} from "./styles";
import Header from "../../components/Header";
import Search from "../../components/Search";
import Pagination from "./Pagination";
import axios from "axios";

interface Notice {
  id: number;
  boardId: number;
  boardTitle: string;
  message: string;
  createdAt: string;
  check: boolean;
}

/**
 * 알림 페이지
 * @author 신정은
 */
const Notice = () => {
  const [token, setToken] = useState<string | null>(null);
  const [notices, setNotices] = useState<Array<Notice> | []>([]);
  const [unread, setUnread] = useState(0);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token !== null) {
      getNotice();
    }
  }, [token]);

  const getToken = () => {
    const token = localStorage.getItem("my-token");
    setToken(token);
  };

  //알림 목록 가져오는 api
  const getNotice = async () => {
    await axios
      .get("/notification", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUnread(res.data.unreadNotifications);
        setCount(res.data.unreadNotifications + res.data.readNotifications);
        //setNotices(res.data.notificationDtoList);
        setNotices([
          {
            id: 6,
            boardId: 8,
            boardTitle: "글제목입니다.",
            message: "댓글입니다.",
            createdAt: "2024-01-21 22:08:39",
            check: false,
          },
          {
            id: 6,
            boardId: 8,
            boardTitle: "글제목입니다.",
            message: "댓글입니다.",
            createdAt: "2024-01-21 22:08:39",
            check: true,
          },
          {
            id: 6,
            boardId: 8,
            boardTitle: "글제목입니다.",
            message: "댓글입니다.",
            createdAt: "2024-01-21 22:08:39",
            check: true,
          },

        ]);
      });
  };

  return (
    <Container>
      <Header />
      <Search />
      <Content>
        <Top>
          <div className="top__title">NOTICE</div>
          <div className="top__detail">
            읽지 않은 알림이 {unread}개 있습니다.
          </div>
        </Top>
        <ListBox>
          <ListTop>
            <div className="list-top__number">번호</div>
            <div className="list-top__content">내용</div>
          </ListTop>
          {notices.length !== 0 ? (
            <>
              <Lists>
                {notices.map((el) => (
                  <List read={el.check}>
                    <ListNumber>{el.id}</ListNumber>
                    <ListContent>
                      <div>{el.boardTitle}</div>
                      <div>"{el.message}"</div>
                    </ListContent>
                  </List>
                ))}
              </Lists>
              <Info>*일주일이 지난 알림은 삭제됩니다.</Info>
            </>
          ) : (
            <NoData>알림이 없습니다.</NoData>
          )}
        </ListBox>
        <Pagination
          count={Math.floor(count / 10) + 1}
          page={page}
          setPage={setPage}
        />
      </Content>
    </Container>
  );
};

export default Notice;
