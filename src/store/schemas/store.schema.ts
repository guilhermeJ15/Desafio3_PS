import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Store extends Document {
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) cep: string;
  @Prop() rua: string;
  @Prop() bairro: string;
  @Prop() localidade: string;
  @Prop() uf: string;
  @Prop() telefone: string;
  @Prop() horario: string;
  @Prop() latitude: number;
  @Prop() longitude: number;
}

export const StoreSchema = SchemaFactory.createForClass(Store);