import { ResponseStoreByCepDto } from './response-store-by-cep.dto';
import { ResponsePinDto } from './response-pin.dto';
export declare class ResponseStoreListDto {
    stores: ResponseStoreByCepDto[];
    pins: ResponsePinDto[];
    limit: number;
    offset: number;
    total: number;
}
