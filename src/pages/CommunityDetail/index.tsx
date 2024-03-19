import React, { useEffect, useRef, useState } from "react";
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
import axios from "axios";
import Header from "../../components/Header";
import Search from "../../components/Search";

interface BoardDetail {
  boardtype_name: string;
  body: string;
  imageUrl: string;
  modified_at: string;
  name: string;
  title: string;
}

interface Comment {
  id: number;
  memberId: number;
  memberName: string;
  content: string;
  createdAt: string;
  deleted: boolean;
  parentId: number | null;
  imageUrl: string;
}

interface User {
  userId: number;
  email: string;
  name: string;
  imageUrl: string;
}

const CommunityDetail = () => {
  const navigate = useNavigate();
  const [myToken, setMyToken] = useState<string | null>();
  const [querySearch, setQuerySearch] = useSearchParams();
  const [boardId, setBoardId] = useState<string | null>();
  const [boardDetail, setBoardDetail] = useState<BoardDetail>();
  const [commentList, setCommentList] = useState<Comment[]>();
  const [comment, setComment] = useState<string>();
  const [replyComment, setReplyComment] = useState<string>();
  const [userInformation, setUserInformation] = useState<User>();
  const [isReplyOn, setIsReplyOn] = useState<number | null>();

  const goToLogin = () => {
    navigate("/login")
  }


  // 게시글 get api
  const getUserInformation = (token: string | null) => {
    if (token) {
      axios.get('/profile', { headers: { 'Authorization': `Bearer ${token}` } })
        .then((res) => {
          setUserInformation(res?.data)
        })
        .catch((err) => {
          console.error('err', err)
        })
    }

  }

  // 게시글 get api
  const getBoard = () => {
    if (myToken) {
      axios.get('/board/' + boardId, { headers: { 'Authorization': `Bearer ${myToken}` } })
        .then((res) => {
          setBoardDetail(res?.data)
        })
        .catch((err) => {
          console.error('err', err)
        })
    }
  }

  // 댓글 get api
  const getComment = () => {
    if (myToken) {
      axios.get('/comments/board/' + boardId, { headers: { 'Authorization': `Bearer ${myToken}` } })
        .then((res) => {
          setCommentList(res?.data)
        })
        .catch((err) => {
          console.error('err', err)
        })
    }

  }

  // 댓글 post api
  const writeComment = () => {
    if (comment) {
      if (myToken) {
        axios.post('/comments/board/' + boardId, { content: comment }, { headers: { 'Authorization': `Bearer ${myToken}` } })
          .then((res) => {
            alert('댓글이 등록되었습니다.')
            setComment('');
            getComment();
          })
          .catch((err) => {
            console.log('err', err)
          })
      }
    } else {
      alert('댓글을 입력해주세요.')
    }
  }

  // 대댓글 post api
  const writeReplyComment = () => {
    if (isReplyOn && replyComment) {
      if (myToken) {
        axios.post('/comments/board/' + boardId + '/reply/' + isReplyOn, { content: replyComment }, { headers: { 'Authorization': `Bearer ${myToken}` } })
          .then((res) => {
            alert('대댓글이 등록되었습니다.')
            setReplyComment('');
            getComment();
          })
          .catch((err) => {
            console.log('err', err)
          })
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
  const deleteComment = (commentId: number) => {
    if (commentId) {
      if (myToken) {
        if (window.confirm("정말 삭제하시겠습니까")) {
          axios.delete('/comments/' + commentId, { headers: { 'Authorization': `Bearer ${myToken}` } })
            .then((res) => {
              alert('댓글이 삭제되었습니다.')
              getComment();
            })
            .catch((err) => {
              console.log('err', err)
              alert('댓글이 삭제되지 않았습니다. 다시 시도해주세요')

            })
        } else {
        }

      }

    }
  }


  const renderCommentList = (): (JSX.Element | null)[] | undefined => {
    const CommentListComponent = commentList?.map((commentEach, index) => commentEach.parentId === null
      ?
      <div key={index}>
        {commentEach?.deleted === true ?
          <CommentRow key={commentEach?.id + 'deletedComment'} isLast={index === commentList.length - 1}>
            <DeletedComment key={commentEach?.id}>삭제된 댓글입니다.</DeletedComment>
          </CommentRow>
          :
          <CommentRow
            key={commentEach?.id + 'comment'}
            isLast={index === commentList.length - 1}>
            <div style={{ display: "flex", flexDirection: "row" }}>

              <UserImage src={commentEach?.imageUrl ? commentEach?.imageUrl : "/assets/icon/icon-profile-picture.svg"} />
              <CommentDetailArea>
                <UserName>{commentEach?.memberName}</UserName>
                <CommentDetail>{commentEach?.content}</CommentDetail>
                <MinorArea>
                  <CommentTime>{commentEach?.createdAt}</CommentTime>
                  <ReplyButton onClick={() => setIsReplyOn(isReplyOn !== commentEach?.id ? commentEach?.id : null)}>답글 쓰기</ReplyButton>
                </MinorArea>

              </CommentDetailArea>
              {commentEach?.memberId === userInformation?.userId ?
                <DeleteButton onClick={() => deleteComment(commentEach?.id)} src="/assets/icon/icon_delete_comment_x.svg" />
                : null}
            </div>

            {isReplyOn === commentEach?.id
              ? <WriteCommentArea style={{ width: "calc(100% - 30px)", marginLeft: '30px', marginTop: "20px", marginBottom: "10px" }}>
                <CommentInput
                  placeholder="답글을 입력해 주세요."
                  onChange={(e) => setReplyComment(e.target.value)}
                  onKeyPress={(e) => handleOnKeyPress}
                  value={replyComment}

                />
                <CommentButton onClick={() => writeReplyComment()}>등록</CommentButton>
              </WriteCommentArea>
              : null
            }
          </CommentRow>

        }
        {commentList?.map((el2) => el2?.parentId !== null && el2?.parentId === commentEach?.id ?
          el2.deleted === true ?
            <CommentRow key={el2?.id + 'deletedReply'} isLast={index === commentList.length - 1}>
              <DeletedComment key={el2?.id}>삭제된 대댓글입니다.</DeletedComment>
            </CommentRow>
            :

            <CommentRow key={el2?.id + 'reply'}
              isLast={index === commentList.length - 1}
              style={{ paddingLeft: 60 }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <UserImage src={el2?.imageUrl ? el2?.imageUrl : "/assets/icon/icon-profile-picture.svg"} />
                <CommentDetailArea>
                  <UserName>{el2?.memberName}</UserName>
                  <CommentDetail>{el2?.content}</CommentDetail>
                  <MinorArea>
                    <CommentTime>{el2?.createdAt}</CommentTime>
                    <ReplyButton onClick={() => setIsReplyOn(isReplyOn !== el2?.id ? el2?.id : null)}>답글 쓰기</ReplyButton>
                  </MinorArea>
                </CommentDetailArea>
                {el2?.memberId === userInformation?.userId ?
                  <DeleteButton onClick={() => deleteComment(commentEach?.id)} src="/assets/icon/icon_delete_comment_x.svg" />
                  : null}
              </div>
              {isReplyOn === el2?.id
                ? <WriteCommentArea style={{ marginLeft: '30px', marginTop: "30px" }}>
                  <CommentInput
                    placeholder="대댓글을 입력해 주세요."
                    onChange={(e) => setReplyComment(e.target.value)}
                    onKeyPress={handleOnKeyPressReply}
                    value={replyComment}

                  />
                  <CommentButton onClick={() => writeReplyComment()}>등록</CommentButton>
                </WriteCommentArea>
                : null
              }

            </CommentRow>
          : null
        )
        }

      </div>
      : null
    );
    return CommentListComponent;

  }

  useEffect(() => {
    let boardIdProps: string | null = querySearch.get("detail")
    if (boardIdProps !== null && boardIdProps!=="") {
      setBoardId(boardIdProps)
    }else{
      navigate('/notfound')
    }


    setBoardId(boardIdProps);
    let token = localStorage.getItem('my-token');
    if (token && token.length > 0) {
      axios.post('/token-validation', {}, { headers: { 'Authorization': `Bearer ${token}` } })
        .then((res) => {
          if (res.data.length > 0) {
            setMyToken(token);
            getUserInformation(token);
          } else {
            goToLogin();
          }
        })
        .catch((err) => {
          goToLogin();
        })
    } else {
      goToLogin();
    }
  }, [])

  useEffect(() => {
    getBoard();
    getComment();
  }, [myToken])

  return (<>
    <Container>
      <Header />
      <Search />
      <Main>
        <BoardMenu onClick={()=>{navigate("/community", {state: boardDetail?.boardtype_name})}}>
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
         <BoardImage src={boardDetail?.imageUrl}/>
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
          {renderCommentList()}
        </CommentArea>
        <CommentArea>

        </CommentArea>
      </Main>
    </Container>
  </>
  );
};

export default CommunityDetail;
