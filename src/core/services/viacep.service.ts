import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ViaCepService {
  async getAddressByCep(cep: string): Promise<any> {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
  }
}
