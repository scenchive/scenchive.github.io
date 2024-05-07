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
