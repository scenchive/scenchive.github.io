import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Container,
  Main,
  BoardMenu,
  BoardMenuGo,
  BoardTitle,
  BoardInfoArea,
  UserName,
  UploadTime,
  BoardContent,
  BoardImage,
  WriteCommentArea,
  CommentInput,
  CommentButton,
  CommentArea,
  CommentRow,
  UserImage,
  CommentDetailArea,
  CommentDetail,
  MinorArea,
  CommentTime,
  ReplyButton,
  DeleteButton,
  DeletedComment,
} from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../../api";
import Header from "../../components/Header";
import Search from "../../components/Search";
import useApi from "../../hooks/useApi";
import { BoardDetail, Comment, User } from "../../common/types";
import CommentList from "./CommentList";


const CommunityDetail = () => {
  const navigate = useNavigate();
  const { data: checkToken, loading: checkTokenLoading, error: checkTokenError, fetchApi: fetchCheckToken } = useApi<any>();
  const { data: userInformation, loading: userInformationLoading, error: userInformationError, fetchApi: fetchUserInformation } = useApi<User>();
  const { data: boardDetail, loading: boardDetailLoading, error: boardDetailError, fetchApi: fetchBoardDetail } = useApi<BoardDetail>();
  const { data: commentList, loading: commentListLoading, error: commentListError, fetchApi: fetchCommentList } = useApi<Comment[]>();
  const { data: postComment, loading: postCommentLoading, error: postCommentError, fetchApi: fetchPostComment } = useApi<any>();
  const { data: postReplyComment, loading: postReplyCommentLoading, error: postReplyCommentError, fetchApi: fetchPostReplyComment } = useApi<string>();
  const { data: deleteMyComment, loading: deleteMyCommentLoading, error: deleteMyCommentError, fetchApi: fetchDeleteMyComment } = useApi<any>();

  const [myToken, setMyToken] = useState<string | null>();
  const [querySearch, setQuerySearch] = useSearchParams();
  const [boardId, setBoardId] = useState<string | null>();
  // const [boardDetail, setBoardDetail] = useState<BoardDetail>();
  // const [commentList, setCommentList] = useState<Comment[]>();
  const [comment, setComment] = useState<string>();
  const [replyComment, setReplyComment] = useState<string>();
  // const [userInformation, setUserInformation] = useState<User>();
  const [isReplyOn, setIsReplyOn] = useState<number | null>();
  let token = localStorage.getItem("my-token");

  const goToLogin = () => {
    navigate("/login")
  }

  /* 
 * 토큰 유효성 검사 api를 호출합니다.
 * @author 김민지
 */
  const validateToken = useCallback(async () => {
    if (token && token.length > 0) {
      const res = await fetchCheckToken("post", "/token-validation", {});
      if (res?.length > 0) {
        setMyToken(token);
        /* 
        * 게시글 get api를 호출합니다.
        * @author 김민지
        */
        fetchCheckToken("post", "/token-validation", {});
        fetchUserInformation("get", "/profile", {});
      } else if (checkTokenError) {
        goToLogin();
      }
    } else {
      goToLogin();
    }
  }, [token]);

  useEffect(() => {
    validateToken();
  }, [validateToken])


  /* 
  * 댓글 get api를 호출합니다.
  * @author 김민지
  */
  const getComment = () => {
    if (myToken) {
      fetchCommentList('get', '/comments/board/' + boardId, {})
    }
  }

  /* 
  * 댓글 post api를 호출합니다.
  * @author 김민지
  */
  const writeComment = async () => {
    if (comment?.length) {
      if (myToken) {
        const res = await fetchPostComment('post', '/comments/board/' + boardId, { content: comment });
        if (res) {
          alert('댓글이 등록되었습니다.')
          setComment('');
          getComment();
        } else {
          alert("댓글 등록에 실패했습니다.")
        }
      }
    } else {
      alert('댓글을 입력해주세요.')
    }
  }

  // 대댓글 post api
  const writeReplyComment = async () => {
    if (isReplyOn && replyComment) {
      if (myToken) {
        await fetchPostReplyComment('post', '/comments/board/' + boardId + '/reply/' + isReplyOn, { content: replyComment })
        if (postReplyComment) {
          alert("대댓글이 등록되었습니다.");
          setReplyComment('');
          getComment();
        } else {
          alert('대댓글 등록에 실패했습니다.');
        }
      }
    } else {
      alert('댓글을 입력해주세요.')
    }
  }

  const handleOnKeyPress = (e: { key: string }) => {
    if (e?.key === 'Enter') {
      writeComment();
    }
  }

  const handleOnKeyPressReply = (e: { key: string }) => {
    if (e?.key === 'Enter') {
      writeReplyComment();
    }
  }

  // 댓글 delete api
  const deleteComment = useCallback(async (commentId: number) => {
    if (commentId && myToken &&
      window.confirm("정말 삭제하시겠습니까")) {
      await fetchDeleteMyComment('delete', '/comments/' + commentId);
      alert('댓글이 삭제되었습니다.')
      getComment();
    }
  },[])

  useEffect(() => {
    let boardIdProps: string | null = querySearch.get("detail")
    if (boardIdProps !== null && boardIdProps !== "") {
      setBoardId(boardIdProps)
    } else {
      navigate('*')
    }
    setBoardId(boardIdProps);
  }, [])

  useEffect(() => {
    if (myToken) {
      /* 
      * 게시글 내용 및 댓글 get api를 호출합니다.
      * @author 김민지
      */
      fetchBoardDetail("get", "/board/" + boardId, {});
      getComment();
    }
  }, [myToken])

  return (<>
    <Container>
      <Header />
      <Search />
      <Main>
        <BoardMenu onClick={() => { navigate("/community", { state: boardDetail?.boardtype_name }) }}>
          {boardDetail?.boardtype_name === 'fake' ? "정/가품"
            : boardDetail?.boardtype_name === "qna" ? "Q & A"
              : "자유"}
          <BoardMenuGo src={"/assets/icon/icon_community_type_go.svg"} />
        </BoardMenu>
        <BoardTitle>{boardDetail?.title}</BoardTitle>
        <BoardInfoArea>
          <UserName>{boardDetail?.name}</UserName>
          <span style={{ marginLeft: "5px", marginRight: "5px", color: "#DFDFDF", fontSize: "1rem", fontFamily: "Noto Sans KR" }}>|</span>
          <UploadTime>{boardDetail?.modified_at}</UploadTime>
        </BoardInfoArea>

        <BoardContent>
          {boardDetail?.body}
          <BoardImage src={boardDetail?.imageUrl} />
        </BoardContent>

        <WriteCommentArea>
          <CommentInput
            placeholder="댓글을 입력해 주세요."
            onChange={(e) => setComment(e.target.value)}
            onKeyPress={handleOnKeyPress}
            value={comment}
          />
          <CommentButton onClick={() => writeComment()}>등록</CommentButton>
        </WriteCommentArea>
        <CommentArea>
          <CommentList 
          commentList={commentList}
          userInformation={userInformation}
          isReplyOn={isReplyOn}
          setIsReplyOn={setIsReplyOn}
          deleteComment={deleteComment}
          setReplyComment={setReplyComment}
          handleOnKeyPress={handleOnKeyPress}
          replyComment={replyComment}
          writeComment={writeComment}
          writeReplyComment={writeReplyComment}
          handleOnKeyPressReply={handleOnKeyPressReply}
           />
          {/* {renderCommentList()} */}
        </CommentArea>
        <CommentArea>

        </CommentArea>
      </Main>
    </Container>
  </>
  );
};

export default CommunityDetail;
