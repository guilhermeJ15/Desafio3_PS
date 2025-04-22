import { Injectable, NotFoundException } from '@nestjs/common';

import { StoreRepository } from '../repositories/store.repository';
import { CreateStoreDto } from 'src/core/model/store/dto/create-store.dto';
import { UpdateStoreDto } from 'src/core/model/store/dto/update-store.dto';

import { ViaCepService } from '../../../core/services/viacep.service';
import { GoogleMapsService } from '../../../core/services/google-maps.service';
import { MelhorEnvioService } from '../../../core/services/melhor-envio.service';

import { ResponseFreteDto } from 'src/core/model/store/dto/response-frete.dto';

import { ResponseStoreByCepDto } from 'src/core/model/store/dto/response-store-by-cep.dto';


@Injectable()
export class StoreService {
  constructor(
    private readonly repo: StoreRepository,
    private readonly viaCep: ViaCepService,
    private readonly maps: GoogleMapsService,
    private readonly melhor: MelhorEnvioService,
  ) {}

  
  async create(dto: CreateStoreDto) {
    return this.repo.create(dto);
  }

 
  async findAll() {
    return this.repo.findAll();
  }

  
  async findById(id: string) {
    const store = await this.repo.findById(id);
    if (!store) throw new NotFoundException('Loja não encontrada');
    return store;
  }

 
  async findByState(uf: string) {
    return this.repo.findByState(uf.toUpperCase());
  }

  
  async findNearestByCep(cep: string): Promise<ResponseStoreByCepDto> {
    const cepInfo = await this.viaCep.getAddressByCep(cep);
    const origin = `${cepInfo.logradouro}, ${cepInfo.localidade} - ${cepInfo.uf}`;
  
    const stores = await this.repo.findAll();
    let nearest: { store: any; distance: number } | null = null;
  
    for (const store of stores) {
      const dest = `${store.address1}, ${store.city} - ${store.state}`;
      const distance = await this.maps.calculateDistance(origin, dest);
  
      if (!nearest || distance < nearest.distance) {
        nearest = { store, distance };
      }
    }
  
    if (!nearest) throw new NotFoundException('Nenhuma loja encontrada');
  
    const store = nearest.store;
  
    let fretes: ResponseFreteDto[] = [];
  
    if (nearest.distance <= 50 && store.type === 'PDV') {
      fretes.push({
        prazo: `${store.shippingTimeInDays} dias úteis`,
        price: 'R$ 15,00',
        description: 'Motoboy',
      });
    } else {
      const melhor = await this.melhor.getFreight(store.postalCode, cep);
      fretes = melhor.map(f => ({
        prazo: `${f.delivery_time} dias úteis`,
        price: `R$ ${f.price}`,
        description: f.name,
        codProdutoAgencia: f.id,
      }));
    }
  
    return {
      name: store.storeName,
      city: store.city,
      postalCode: store.postalCode,
      type: store.type,
      distance: `${nearest.distance.toFixed(2)} km`,
      value: fretes,
    };
  }
  

  
  async update(id: string, dto: UpdateStoreDto) {
    const updated = await this.repo.update(id, dto);
    if (!updated) throw new NotFoundException('Loja não encontrada');
    return updated;
  }

  
  async remove(id: string) {
    const deleted = await this.repo.delete(id);
    if (!deleted) throw new NotFoundException('Loja não encontrada');
    return { deleted: true };
  }

  async findAllFiltered(type?: 'PDV' | 'LOJA', limit = 10, offset = 0) {
    return this.repo.findAllFiltered(type, limit, offset);
  }

  async findByStateFiltered(uf: string, type?: 'PDV' | 'LOJA', limit = 10, offset = 0) {
    return this.repo.findByStateFiltered(uf.toUpperCase(), type, limit, offset);
  }

  



}


