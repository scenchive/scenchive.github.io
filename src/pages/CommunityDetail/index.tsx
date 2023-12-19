import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderText,
  Title,
  Menu,
  MenuList,
  ContentArea,
  BoardMenu,
  BoardTitle,
  BoardInfoArea,
  UserName,
  UploadTime,
  BoardContent,
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


  const goToHome = () => {
    navigate("/")
  }

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
    if (isReplyOn&& replyComment) {
      if (myToken) {
        axios.post('/comments/board/' + boardId+'/reply/'+isReplyOn, { content: replyComment }, { headers: { 'Authorization': `Bearer ${myToken}` } })
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
  const handleOnKeyPressReply=(e:{key:string})=>{
    if (e?.key==='Enter'){
      writeReplyComment();
    }
  }

  // 댓글 delete api
  const deleteComment = (commentId: number) => {
    if (commentId) {
      if (myToken) {
        axios.delete('/comments/' + commentId, { headers: { 'Authorization': `Bearer ${myToken}` } })
          .then((res) => {
            alert('댓글이 삭제되었습니다.')
            getComment();
          })
          .catch((err) => {
            console.log('err', err)
          })
      }
    } else {
      alert('댓글이 삭제되지 않았습니다. 다시 시도해주세요')
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
                  <ReplyButton onClick={() => setIsReplyOn(isReplyOn !== commentEach?.id ? commentEach?.id : null)}>답글 작성하기</ReplyButton>
                </MinorArea>

              </CommentDetailArea>
              {commentEach?.memberId === userInformation?.userId ?
                <DeleteButton onClick={() => deleteComment(commentEach?.id)}>삭제하기</DeleteButton>
                : null}
            </div>

            {isReplyOn === commentEach?.id
              ? <WriteCommentArea style={{ marginLeft: '30px', marginBottom: "30px" }}>
                <CommentInput
                  placeholder="댓글을 입력해 주세요."
                  onChange={(e) => setReplyComment(e.target.value)}
                  onKeyPress={(e) => handleOnKeyPress}
                  value={replyComment}
                  style={{ marginTop: "30px" }}
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
                    <ReplyButton onClick={() => setIsReplyOn(isReplyOn !== el2?.id ? el2?.id : null)}>답글 작성하기</ReplyButton>
                  </MinorArea>
                </CommentDetailArea>
                {el2?.memberId === userInformation?.userId ?
                  <DeleteButton onClick={() => deleteComment(commentEach?.id)}>삭제하기</DeleteButton>
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
      <Header>
        <HeaderLeft>
          <Title>
            <div className="title__kr">센카이브</div>
            <div className="title__en">Scenchive</div>
          </Title>
          <Menu>
            <MenuList>마이페이지</MenuList>
            <MenuList>필터 추천</MenuList>
            <MenuList onClick={() => navigate("/community")}>게시판</MenuList>
          </Menu>
        </HeaderLeft>
        <HeaderRight>
          {!myToken ? (
            <>
              <HeaderText onClick={() => navigate("/login")}>로그인</HeaderText>
              <HeaderText>|</HeaderText>
              <HeaderText onClick={() => navigate("/signupstep1")}>
                회원가입
              </HeaderText>
            </>
          ) : (
            <img src="/assets/icon/icon_notice.svg" />
          )}
        </HeaderRight>
      </Header>
      <ContentArea>
        <BoardMenu>
          {boardDetail?.boardtype_name === 'fake' ? "정/가품"
            : boardDetail?.boardtype_name === "qna" ? "Q & A"
              : "자유"}
        </BoardMenu>
        <BoardTitle>{boardDetail?.title}</BoardTitle>
        <BoardInfoArea>
          <UserName>{boardDetail?.name}</UserName>
          <UploadTime>{boardDetail?.modified_at}</UploadTime>
        </BoardInfoArea>

        <BoardContent>
          {boardDetail?.body}
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
          {/* {commentList?.filter((el) => el.parentId === null).map((comment, index) =>
            <div>
              <CommentRow key={comment?.id} isLast={index === commentList.length - 1}>
                <UserImage src={comment?.imageUrl ? comment?.imageUrl : "/assets/icon/icon-profile-picture.svg"} />
                <CommentDetailArea>
                  <UserName>{comment?.memberName}</UserName>
                  <CommentDetail>{comment?.content}</CommentDetail>
                  <CommentTime>{comment?.createdAt}</CommentTime>
                </CommentDetailArea>
              </CommentRow>

              {commentList?.map((el2) => el2?.parentId !== null && el2?.parentId === comment?.id).map(
                (comment2, index) => {
                  <div key={index + 'e'}>
                    <div key={index}>{comment2}</div>

                  </div>
                  //    <CommentRow key={comment2?.id+'reply'} 
                  //    isLast={index===commentList.length-1} 
                  //    style={{marginLeft:60}}>
                  //    <UserImage src={comment2?.imageUrl ? comment2?.imageUrl: "/assets/icon/icon-profile-picture.svg"}/>
                  //    <CommentDetailArea>
                  //      <UserName>{comment2?.memberName}</UserName>
                  //      <CommentDetail>{comment2?.content}</CommentDetail>
                  //      <CommentTime>{comment2?.createdAt}</CommentTime>
                  //    </CommentDetailArea>
                  //  </CommentRow>
                })}
            </div>

          )
          } */}

        </CommentArea>
        <CommentArea>

        </CommentArea>
      </ContentArea>
    </Container>
  </>
  );
};

export default CommunityDetail;
