import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MelhorEnvioService {
  private readonly token = process.env.MELHOR_ENVIO_API_TOKEN;
  private readonly apiUrl = process.env.MELHOR_ENVIO_API_URL;

  async getFreight(originCep: string, destinationCep: string) {
    const body = {
      from: { postal_code: originCep },
      to: { postal_code: destinationCep },
      products: [
        {
          width: 11,
          height: 17,
          length: 20,
          weight: 0.3,
          quantity: 1,
        },
      ],
      services: [],
      options: {
        own_hand: false,
        receipt: false,
        insurance_value: 0,
      },
    };

    const headers = {
      Authorization: this.token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const response = await axios.post(`${this.apiUrl}/calculator`, body, { headers });

    return response.data;
  }
}
