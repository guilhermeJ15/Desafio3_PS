import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Store } from '../schemas/store.schema';
import { CreateStoreDto } from 'src/core/model/store/dto/create-store.dto';

@Injectable()
export class StoreRepository {
  constructor(
    @InjectModel(Store.name) private readonly storeModel: Model<Store>,
  ) {}

  // Create
  async create(data: CreateStoreDto): Promise<Store> {
    return this.storeModel.create(data);
  }

  // Read all
  async findAll(): Promise<Store[]> {
    return this.storeModel.find().exec();
  }

  // Read by ID
  async findById(id: string): Promise<Store | null> {
    return this.storeModel.findById(id).exec();
  }

  // Read by State
  async findByState(state: string): Promise<Store[]> {
    return this.storeModel.find({ state }).exec();
  }

  // Update
  async update(
    id: string,
    data: Partial<CreateStoreDto>,
  ): Promise<Store | null> {
    return this.storeModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  // Delete
  async delete(id: string): Promise<Store | null> {
    return this.storeModel.findByIdAndDelete(id).exec();
  }

  async findAllFiltered(type?: 'PDV' | 'LOJA', limit = 10, offset = 0): Promise<Store[]> {
    const query: any = {};
    if (type) query.type = type;

    return this.storeModel.find(query).skip(offset).limit(limit);
  }

  async findByStateFiltered(state: string, type?: 'PDV' | 'LOJA', limit = 10, offset = 0): Promise<Store[]> {
    const query: any = { state };
    if (type) query.type = type;
  
    return this.storeModel.find(query).skip(offset).limit(limit);
  }
}
