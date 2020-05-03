export interface NewAd {
    _id: string;
    title: string;
    address: string;
    categoryName: string;
    typeId: number;
    createdAt: Date;
    photo?: string;
}
