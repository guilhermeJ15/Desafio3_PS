import { Model } from 'mongoose';
import { Store } from '../schemas/store.schema';
import { CreateStoreDto } from 'src/core/model/store/dto/create-store.dto';
export declare class StoreRepository {
    private readonly storeModel;
    constructor(storeModel: Model<Store>);
    create(data: CreateStoreDto): Promise<Store>;
    findAll(): Promise<Store[]>;
    findById(id: string): Promise<Store | null>;
    findByState(state: string): Promise<Store[]>;
    update(id: string, data: Partial<CreateStoreDto>): Promise<Store | null>;
    delete(id: string): Promise<Store | null>;
    findAllFiltered(type?: 'PDV' | 'LOJA', limit?: number, offset?: number): Promise<Store[]>;
    findByStateFiltered(state: string, type?: 'PDV' | 'LOJA', limit?: number, offset?: number): Promise<Store[]>;
}
