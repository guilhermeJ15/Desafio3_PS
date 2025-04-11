import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Store } from './schemas/store.schema';
import { haversineDistance } from '../utils/haversine';

@Injectable()
export class StoresService {
  constructor(@InjectModel(Store.name) private storeModel: Model<Store>) {}

  async createStore(cep: string, name: string, telefone: string, horario: string): Promise<Store> {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const data = response.data;

    if (data.erro) {
      throw new Error('CEP inválido');
    }

    // Obter latitude/longitude via API externa ou mockar (exemplo simples aqui)
    const { latitude, longitude } = await this.getLatLong(cep);

    const loja = new this.storeModel({
      name,
      cep,
      rua: data.logradouro,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf,
      telefone,
      horario,
      latitude,
      longitude,
    });

    return loja.save();
  }

  async getNearbyStores(cep: string): Promise<Store[]> {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const data = response.data;

    if (data.erro) throw new Error('CEP inválido');

    const { latitude, longitude } = await this.getLatLong(cep);
    const lojas = await this.storeModel.find();

    const lojasProximas = lojas
      .map((loja) => {
        const distancia = haversineDistance(latitude, longitude, loja.latitude, loja.longitude);
        return { ...loja.toObject(), distancia };
      })
      .filter((loja) => loja.distancia <= 100)
      .sort((a, b) => a.distancia - b.distancia);

    return lojasProximas;
  }

  // Simulador de coordenadas (você pode melhorar isso)
  async getLatLong(cep: string): Promise<{ latitude: number; longitude: number }> {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?postalcode=${cep}&country=Brazil&format=json`);
    const data = response.data[0];

    return {
      latitude: parseFloat(data.lat),
      longitude: parseFloat(data.lon),
    };
  }
}
