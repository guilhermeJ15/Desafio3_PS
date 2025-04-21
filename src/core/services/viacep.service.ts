import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ViaCepService {
  async getAddressByCep(cep: string): Promise<any> {
    
    const cleanCep = cep.replace(/\D/g, '');

    const url = `https://viacep.com.br/ws/${cleanCep}/json/`;

    const response = await axios.get(url);

    if (response.data.erro) {
      throw new NotFoundException('CEP não encontrado');
    }

    return response.data;
  }
}
