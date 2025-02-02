// validateNoteInput 함수
export const validateNoteInput = (
  noteEnglish: string,
  noteKorean: string
): boolean => {
  if (!noteKorean || !noteEnglish) {
    alert('모든 값을 정확히 입력해주세요.');
    return false;
  }
  if (!/^[A-Za-z\s]+$/.test(noteEnglish)) {
    alert('노트 영문 이름은 영어로 입력해야 합니다.');
    return false;
  }
  if (!/^[가-힣\s]+$/.test(noteKorean)) {
    alert('노트 한글 이름은 한글로 입력해야 합니다.');
    return false;
  }
  return true;
};

// handleAddNote 함수
export const handleAddNote = (
  noteEnglish: string,
  noteKorean: string,
  topMiddleBase: number | undefined,
  notes: { top: string[]; middle: string[]; base: string[] },
  setNotes: React.Dispatch<React.SetStateAction<any>>,
  setNoteListToggle: (value: React.SetStateAction<boolean>) => void
) => {
  if (!validateNoteInput(noteEnglish, noteKorean)) return;

  const key =
    topMiddleBase === 1 ? 'top' : topMiddleBase === 2 ? 'middle' : 'base';

  // 중복 여부 확인
  if (notes[key].length > 0) {
    const isDuplicate =
      notes[key]?.filter((note) => note.includes(noteKorean)).length > 0
        ? true
        : false;

    if (isDuplicate) {
      alert('이미 추가하신 노트입니다.');
      return;
    }
  }

  setNotes((prevNotes: { [x: string]: any }) => ({
    ...prevNotes,
    [key]: [...prevNotes[key], [noteKorean, noteEnglish]],
  }));
  setNoteListToggle(false);
};

// handleDelete 함수
export const handleDelete = (
  title: keyof typeof notes,
  toBeDeletedIndex: number,
  notes: { top: string[]; middle: string[]; base: string[] },
  setNotes: React.Dispatch<
    React.SetStateAction<{
      top: string[];
      middle: string[];
      base: string[];
    }>
  >
) => {
  if (notes[title] && notes[title].length > 0) {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [title]: prevNotes[title].filter(
        (_, index) => index !== toBeDeletedIndex
      ),
    }));
  }
};
