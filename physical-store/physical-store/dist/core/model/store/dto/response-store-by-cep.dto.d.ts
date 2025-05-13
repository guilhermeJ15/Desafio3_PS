import { ResponseFreteDto } from './response-frete.dto';
export declare class ResponseStoreByCepDto {
    name: string;
    city: string;
    postalCode: string;
    type: 'PDV' | 'LOJA';
    distance: string;
    value: ResponseFreteDto[];
}
