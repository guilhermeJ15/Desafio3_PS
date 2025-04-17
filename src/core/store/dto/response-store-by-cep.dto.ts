import { ResponseFreteDto } from './response-frete.dto';

export class ResponseStoreByCepDto {
  name: string;
  city: string;
  postalCode: string;
  type: 'PDV' | 'LOJA';
  distance: string;
  value: ResponseFreteDto[];
}
