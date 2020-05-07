import { Location } from './location.interface';
import { User } from '../../users/interfaces/user.interface';

export interface AdInfo {
    _id: string,
    title: string,
    description: string,
    photos: string[],
    typeId: number,
    location: Location,
    categoryId: string,
    createdAt: Date,
    lostOrFoundAt?: Date,
    user?: User,
    secretQuestion?: string,
    secretAnswer?: string,
    isApproved: boolean,
    actualTo: Date,
}
