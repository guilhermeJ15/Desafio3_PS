import { Document } from 'mongoose';
export declare class Store extends Document {
    storeName: string;
    takeOutInStore: boolean;
    shippingTimeInDays: number;
    latitude: string;
    longitude: string;
    address1: string;
    address2?: string;
    address3?: string;
    city: string;
    district: string;
    state: string;
    type: 'PDV' | 'LOJA';
    country: string;
    postalCode: string;
    telephoneNumber?: string;
    emailAddress?: string;
}
export declare const StoreSchema: import("mongoose").Schema<Store, import("mongoose").Model<Store, any, any, any, Document<unknown, any, Store, any> & Store & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Store, Document<unknown, {}, import("mongoose").FlatRecord<Store>, {}> & import("mongoose").FlatRecord<Store> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
