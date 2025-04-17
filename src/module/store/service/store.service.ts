import { Injectable, NotFoundException } from '@nestjs/common';
import { StoreRepository } from '../repositories/store.repository';
import { ViaCepService } from 'src/core/services/viacep.service';
import { GoogleMapsService } from 'src/core/services/google-maps.service';
import { MelhorEnvioService } from 'src/core/services/melhor-envio.service';

import { ResponseStoreListDto } from 'src/core/store/dto/response-store-list.dto';
import { ResponseStoreByCepDto } from 'src/core/store/dto/response-store-by-cep.dto';
import { ResponseFreteDto } from 'src/core/store/dto/response-frete.dto';
import { ResponsePinDto } from 'src/core/store/dto/response-pin.dto';

@Injectable()
export class StoreService {
  constructor(
    private readonly storeRepository: StoreRepository,
    private readonly viaCepService: ViaCepService,
    private readonly googleMapsService: GoogleMapsService,
    private readonly melhorEnvioService: MelhorEnvioService,
  ) {}

  async findAll() {
    return this.storeRepository.findAll();
  }

  async findById(id: string) {
    const store = await this.storeRepository.findById(id);
    if (!store) throw new NotFoundException('Loja não encontrada');
    return store;
  }

  async findByState(uf: string) {
    return this.storeRepository.findByState(uf.toUpperCase());
  }

  async findByCep(cep: string): Promise<ResponseStoreListDto> {
    const cepInfo = await this.viaCepService.getAddressByCep(cep);
    const originAddress = `${cepInfo.logradouro}, ${cepInfo.localidade} - ${cepInfo.uf}`;
    const { lat, lng } = await this.googleMapsService.getCoordinatesFromAddress(originAddress);

    const stores = await this.storeRepository.findAll();
    const results: ResponseStoreByCepDto[] = [];

    for (const store of stores) {
      const destinationAddress = `${store.address1}, ${store.city} - ${store.state}`;
      const distance = await this.googleMapsService.calculateDistance(originAddress, destinationAddress);

      if (distance <= 50 && store.type === 'PDV') {
        const frete: ResponseFreteDto = {
          prazo: `${store.shippingTimeInDays} dias úteis`,
          price: "R$ 15,00",
          description: "Motoboy",
        };

        results.push({
          name: store.storeName,
          city: store.city,
          postalCode: store.postalCode,
          type: 'PDV',
          distance: `${distance.toFixed(2)} km`,
          value: [frete],
        });
      } else {
        const fretes = await this.melhorEnvioService.getFreight(store.postalCode, cep);
        const valores: ResponseFreteDto[] = fretes.map(frete => ({
          prazo: `${frete.delivery_time} dias úteis`,
          price: `R$ ${frete.price}`,
          description: frete.name,
          codProdutoAgencia: frete.id,
        }));

        results.push({
          name: store.storeName,
          city: store.city,
          postalCode: store.postalCode,
          type: 'LOJA',
          distance: `${distance.toFixed(2)} km`,
          value: valores,
        });
      }
    }

    const pins: ResponsePinDto[] = stores.map(store => ({
      position: {
        lat: parseFloat(store.latitude),
        lng: parseFloat(store.longitude),
      },
      title: store.storeName,
    }));

    return {
      stores: results,
      pins,
      limit: 1,
      offset: 1,
      total: results.length,
    };
  }
}
