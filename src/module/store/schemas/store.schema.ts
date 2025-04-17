import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Store extends Document {
  @Prop({ required: true }) storeName: string;
  @Prop({ required: true }) takeOutInStore: boolean;
  @Prop({ required: true }) shippingTimeInDays: number;
  @Prop({ required: true }) latitude: string;
  @Prop({ required: true }) longitude: string;
  @Prop({ required: true }) address1: string;
  @Prop() address2?: string;
  @Prop() address3?: string;
  @Prop({ required: true }) city: string;
  @Prop({ required: true }) district: string;
  @Prop({ required: true }) state: string;
  @Prop({ required: true }) type: 'PDV' | 'LOJA';
  @Prop({ required: true }) country: string;
  @Prop({ required: true }) postalCode: string;
  @Prop() telephoneNumber?: string;
  @Prop() emailAddress?: string;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
