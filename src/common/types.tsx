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