// PerfumeDetail
export interface PerfumeDetailGroup {
  brandName: string;
  brandName_kr: string;
  id: number;
  perfumeImage: string;
  perfumeName: string;
  brandImage: string;
}

export interface PerfumeRatingGroup {
  perfumeId: number;
  ratingAvg: number;
  longevityAvg: number;
  sillageAvg: number;
  seasonAvg: {
    spring: number;
    summer: number;
    fall: number;
    winter: number;
  };
}

export interface PerfumeNoteGroup {
  perfumeId: number;
  perfumeName: string;
  brandName: string;
  top: string[];
  middle: string[];
  base: string[];
}

export interface ReviewInformation {
  name: string;
  content: string;
  created_at: string;
  imageUrl: string;
}

export interface ShoppingInformation {
  cleanedTitle: string;
  link: string;
  image: string;
  lprice: number;
  mallName: string;
}

// BrandDetail
export interface Perfumes {
  perfumeId: number;
  perfumeName: string;
  perfumeImage: string;
  brandName: string;
  brandName_kr: string;
  brandImage: string;
  ratingAvg: number;
}

export interface Store {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

// Community
export interface BoardType {
  id: number;
  boardtype_name: string;
  title: string;
}

// CommunityDetail
export interface BoardDetail {
  boardtype_name: string;
  body: string;
  imageUrl: string;
  modified_at: string;
  name: string;
  title: string;
}

export interface Comment {
  id: number;
  memberId: number;
  memberName: string;
  content: string;
  createdAt: string;
  deleted: boolean;
  parentId: number | null;
  imageUrl: string;
}

export interface User {
  userId: number;
  email: string;
  name: string;
  imageUrl: string;
}

// MyBoards
export interface MyBoardsBoardType {
  id: number;
  boardtype: string;
  title: string;
}

// MyComments
export interface CommentType {
  commentId: number;
  commentContent: string;
  boardId: number;
  boardTitle: string;
  commentModifiedAt: string;
}

// MyPage
export interface KeywordType {
  id: number;
  utag: string;
  utag_kr: string;
  utagtype_id: number;
}

export interface PerfumeType {
  perfume_id: number;
  perfume_name: string;
  perfumeImage: string;
  brand_name: string;
  brandName_kr: string;
}

// Signup
export interface FRAGRANCEWHEELKEYWORDSTYPE {
  id: number;
  utag: string;
  utag_kr: string;
  utagtype_id: number;
}

export interface MOODKEYWORDSTYPE {
  id: number;
  utag: string;
  utag_kr: string;
  utagtype_id: number;
}

export interface KEYWORDTAGSTYPE {
  id: number;
  utag: string;
  utag_kr: string;
  utagtype_id: number;
}

// WriteReview
export interface WriteReviewPerfumeDetailGroup {
  brandName: string;
  brandName_kr: string;
  id: number;
  perfumeImage: string;
  perfumeName: string;
}

export interface WriteReviewKeywordType {
  id: number;
  ptag: string;
  ptag_kr: string;
  ptagtype_id: number;
}
