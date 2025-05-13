import { StoreService } from '../services/store.service';
import { CreateStoreDto } from 'src/core/model/store/dto/create-store.dto';
import { UpdateStoreDto } from 'src/core/model/store/dto/update-store.dto';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    findAll(): Promise<import("../schemas/store.schema").Store[]>;
    getByStateFiltered(uf: string, type?: 'PDV' | 'LOJA', limit?: number, offset?: number): Promise<import("../schemas/store.schema").Store[]>;
    findById(id: string): Promise<import("../schemas/store.schema").Store>;
    findNearestByCep(cep: string): Promise<import("../../../core/model/store/dto/response-store-by-cep.dto").ResponseStoreByCepDto>;
    create(dto: CreateStoreDto): Promise<import("../schemas/store.schema").Store>;
    update(id: string, dto: UpdateStoreDto): Promise<import("../schemas/store.schema").Store>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
