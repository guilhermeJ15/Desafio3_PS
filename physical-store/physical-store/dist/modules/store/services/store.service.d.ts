import { StoreRepository } from '../repositories/store.repository';
import { CreateStoreDto } from 'src/core/model/store/dto/create-store.dto';
import { UpdateStoreDto } from 'src/core/model/store/dto/update-store.dto';
import { ViaCepService } from '../../../core/services/viacep.service';
import { GoogleMapsService } from '../../../core/services/google-maps.service';
import { MelhorEnvioService } from '../../../core/services/melhor-envio.service';
import { ResponseStoreByCepDto } from 'src/core/model/store/dto/response-store-by-cep.dto';
export declare class StoreService {
    private readonly repo;
    private readonly viaCep;
    private readonly maps;
    private readonly melhor;
    constructor(repo: StoreRepository, viaCep: ViaCepService, maps: GoogleMapsService, melhor: MelhorEnvioService);
    create(dto: CreateStoreDto): Promise<import("../schemas/store.schema").Store>;
    findAll(): Promise<import("../schemas/store.schema").Store[]>;
    findById(id: string): Promise<import("../schemas/store.schema").Store>;
    findByState(uf: string): Promise<import("../schemas/store.schema").Store[]>;
    findNearestByCep(cep: string): Promise<ResponseStoreByCepDto>;
    update(id: string, dto: UpdateStoreDto): Promise<import("../schemas/store.schema").Store>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
    findAllFiltered(type?: 'PDV' | 'LOJA', limit?: number, offset?: number): Promise<import("../schemas/store.schema").Store[]>;
    findByStateFiltered(uf: string, type?: 'PDV' | 'LOJA', limit?: number, offset?: number): Promise<import("../schemas/store.schema").Store[]>;
}
