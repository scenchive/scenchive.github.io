import React, { useEffect, useRef, useState } from "react";
import {
  NoteArea,
  ImageNoteUp,
  ImageNoteDown,
  NoteTitle,
  NoteInformation,
  NoteInformationArea,


} from "./styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

interface PerfumeNoteGroup {
  perfumeId: number;
  perfumeName: string;
  brandName: string;
  top: string[];
  middle: string[];
  base: string[];
}

interface ReviewInformation {
  name: string;
  content: string;
  created_at: string;
  imageUrl: string;
}

const NoteInformationBlock = (
  props: {
    PerfumeNote: PerfumeNoteGroup | null | undefined
    , myToken: string | null | undefined
  }) => {
  const navigate = useNavigate();
  const [myToken, setMyToken] = useState<string | null | undefined>(props?.myToken);
  const [perfumeNumber, setPerfumeNumber] = useSearchParams();
  const [querySearch, setQuerySearch] = useSearchParams();
  const [perfumeId, setPerfumeId] = useState<number | null | undefined>();


  return (

      <NoteArea>
        <ImageNoteUp src={"/assets/image/image_note_up.svg"} />
        <NoteInformationArea>
          <NoteTitle style={{marginTop:0}}>
            탑노트
          </NoteTitle>
          <NoteInformation>
            {props.PerfumeNote?.top}
          </NoteInformation>
          <NoteTitle>
            미들노트
          </NoteTitle>
          <NoteInformation>
            {props.PerfumeNote?.middle}
          </NoteInformation>
          <NoteTitle>
            베이스노트
          </NoteTitle>
          <NoteInformation>
            {props.PerfumeNote?.base}
          </NoteInformation>
        </NoteInformationArea>
        <ImageNoteDown src={"/assets/image/image_note_down.svg"}  />
      </NoteArea>

      );
};

export default NoteInformationBlock;
