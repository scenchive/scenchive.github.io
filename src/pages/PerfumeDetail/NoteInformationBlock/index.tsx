import React, { useEffect, useRef, useState } from 'react';
import {
  NoteArea,
  ImageNoteUp,
  ImageNoteDown,
  NoteTitle,
  NoteInformation,
  NoteInformationArea,
} from './styles';
import { PerfumeNoteGroup } from '../../../common/types';

const NoteInformationBlock = (props: {
  PerfumeNote: PerfumeNoteGroup | null | undefined;
  myToken: string | null | undefined;
}) => {
  return (
    <NoteArea>
      <ImageNoteUp src={'/assets/image/image_note_up.svg'} />
      <NoteInformationArea>
        <NoteTitle style={{ marginTop: 0 }}>탑노트</NoteTitle>
        <NoteInformation>
          {props.PerfumeNote?.top.map((el, index) => (
            <div
              key={'top_' + index}
              style={{
                marginBottom:
                  index !== props?.PerfumeNote?.top.length ? '10px' : '0px',
              }}
            >
              {el}
            </div>
          ))}
        </NoteInformation>
        <NoteTitle>미들노트</NoteTitle>
        <NoteInformation>
          {props.PerfumeNote?.middle.map((el, index) => (
            <div
              key={'middle_' + index}
              style={{
                marginBottom:
                  index !== props?.PerfumeNote?.top.length ? '10px' : '0px',
              }}
            >
              {el}
            </div>
          ))}
        </NoteInformation>
        <NoteTitle>베이스노트</NoteTitle>
        <NoteInformation>
          {props.PerfumeNote?.base.map((el, index) => (
            <div
              key={'base_' + index}
              style={{
                marginBottom:
                  index !== props?.PerfumeNote?.top.length ? '10px' : '0px',
              }}
            >
              {el}
            </div>
          ))}
        </NoteInformation>
      </NoteInformationArea>
      <ImageNoteDown src={'/assets/image/image_note_down.svg'} />
    </NoteArea>
  );
};

export default NoteInformationBlock;
