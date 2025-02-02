import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  WriteCommentArea,
  CommentInput,
  CommentButton,
  CommentRow,
  UserImage,
  CommentDetailArea,
  UserName,
  CommentDetail,
  MinorArea,
  CommentTime,
  ReplyButton,
  DeleteButton,
  DeletedComment,
} from './styles';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Comment, User } from '../../../common/types';

const CommentList = (props: {
  commentList: Comment[] | undefined;
  userInformation: User | undefined;
  isReplyOn: number | null | undefined;
  setIsReplyOn: React.Dispatch<React.SetStateAction<number | null | undefined>>;
  deleteComment: (commentId: number) => Promise<void>;
  setReplyComment: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleOnKeyPress: (e: { key: string }) => void;
  replyComment: string | undefined;
  writeComment: () => Promise<void>;
  writeReplyComment: () => Promise<void>;
  handleOnKeyPressReply: (e: { key: string }) => void;
}) => {
  return (
    <>
      {props?.commentList?.map((commentEach, index) =>
        commentEach.parentId === null && props?.commentList !== undefined ? (
          <div key={index}>
            {commentEach?.deleted === true ? (
              <CommentRow
                key={commentEach?.id + 'deletedComment'}
                isLast={index === props?.commentList.length - 1}
              >
                <DeletedComment key={commentEach?.id}>
                  삭제된 댓글입니다.
                </DeletedComment>
              </CommentRow>
            ) : (
              <CommentRow
                key={commentEach?.id + 'comment'}
                isLast={index === props?.commentList.length - 1}
              >
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <UserImage
                    src={
                      commentEach?.imageUrl
                        ? commentEach?.imageUrl
                        : '/assets/icon/icon-profile-picture.svg'
                    }
                  />
                  <CommentDetailArea>
                    <UserName>{commentEach?.memberName}</UserName>
                    <CommentDetail>{commentEach?.content}</CommentDetail>
                    <MinorArea>
                      <CommentTime>{commentEach?.createdAt}</CommentTime>
                      <ReplyButton
                        onClick={() =>
                          props?.setIsReplyOn(
                            props?.isReplyOn !== commentEach?.id
                              ? commentEach?.id
                              : null
                          )
                        }
                      >
                        답글 쓰기
                      </ReplyButton>
                    </MinorArea>
                  </CommentDetailArea>
                  {commentEach?.memberId === props?.userInformation?.userId ? (
                    <DeleteButton
                      onClick={() => props?.deleteComment(commentEach?.id)}
                      src="/assets/icon/icon_delete_comment_x.svg"
                    />
                  ) : null}
                </div>

                {props?.isReplyOn === commentEach?.id ? (
                  <WriteCommentArea
                    style={{
                      width: 'calc(100% - 30px)',
                      marginLeft: '30px',
                      marginTop: '20px',
                      marginBottom: '10px',
                    }}
                  >
                    <CommentInput
                      placeholder="답글을 입력해 주세요."
                      onChange={(e) => props?.setReplyComment(e.target.value)}
                      onKeyPress={(e) => props?.handleOnKeyPress}
                      value={props?.replyComment}
                    />
                    <CommentButton onClick={() => props?.writeReplyComment()}>
                      등록
                    </CommentButton>
                  </WriteCommentArea>
                ) : null}
              </CommentRow>
            )}

            {props?.commentList !== undefined &&
              props?.commentList?.map((el2) =>
                el2?.parentId !== null &&
                el2?.parentId === commentEach?.id &&
                props?.commentList !== undefined ? (
                  el2.deleted === true ? (
                    <CommentRow
                      key={el2?.id + 'deletedReply'}
                      isLast={index === props?.commentList.length - 1}
                    >
                      <DeletedComment key={el2?.id}>
                        삭제된 대댓글입니다.
                      </DeletedComment>
                    </CommentRow>
                  ) : (
                    <CommentRow
                      key={el2?.id + 'reply'}
                      isLast={index === props?.commentList.length - 1}
                      style={{ paddingLeft: 60 }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <UserImage
                          src={
                            el2?.imageUrl
                              ? el2?.imageUrl
                              : '/assets/icon/icon-profile-picture.svg'
                          }
                        />
                        <CommentDetailArea>
                          <UserName>{el2?.memberName}</UserName>
                          <CommentDetail>{el2?.content}</CommentDetail>
                          <MinorArea>
                            <CommentTime>{el2?.createdAt}</CommentTime>
                            <ReplyButton
                              onClick={() =>
                                props?.setIsReplyOn(
                                  props?.isReplyOn !== el2?.id ? el2?.id : null
                                )
                              }
                            >
                              답글 쓰기
                            </ReplyButton>
                          </MinorArea>
                        </CommentDetailArea>
                        {el2?.memberId === props?.userInformation?.userId ? (
                          <DeleteButton
                            onClick={() =>
                              props?.deleteComment(commentEach?.id)
                            }
                            src="/assets/icon/icon_delete_comment_x.svg"
                          />
                        ) : null}
                      </div>
                      {props?.isReplyOn === el2?.id ? (
                        <WriteCommentArea
                          style={{ marginLeft: '30px', marginTop: '30px' }}
                        >
                          <CommentInput
                            placeholder="대댓글을 입력해 주세요."
                            onChange={(e) =>
                              props?.setReplyComment(e.target.value)
                            }
                            onKeyPress={props?.handleOnKeyPressReply}
                            value={props?.replyComment}
                          />
                          <CommentButton
                            onClick={() => props?.writeReplyComment()}
                          >
                            등록
                          </CommentButton>
                        </WriteCommentArea>
                      ) : null}
                    </CommentRow>
                  )
                ) : null
              )}
          </div>
        ) : null
      )}
    </>
  );
};

export default CommentList;
