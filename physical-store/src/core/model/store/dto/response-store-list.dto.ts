import { ResponseStoreByCepDto } from './response-store-by-cep.dto';
import { ResponsePinDto } from './response-pin.dto';

export class ResponseStoreListDto {
  stores: ResponseStoreByCepDto[];
  pins: ResponsePinDto[];
  limit: number;
  offset: number;
  total: number;
}
