export interface FindAds {
    $or: any[],
    typeId?: number,
    categoryId?: string,
    locationId?: any,
    address?: string,
    isApproved: boolean,
}