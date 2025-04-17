import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store } from '../schemas/store.schema';

@Injectable()
export class StoreRepository {
  constructor(@InjectModel(Store.name) private readonly storeModel: Model<Store>) {}

  async findAll(): Promise<Store[]> {
    return this.storeModel.find();
  }

  async findById(id: string): Promise<Store | null> {
    return this.storeModel.findById(id);
  }

  async findByState(state: string): Promise<Store[]> {
    return this.storeModel.find({ state });
  }
}
