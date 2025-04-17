import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MelhorEnvioService {
  private readonly apiUrl = process.env.MELHOR_ENVIO_API_URL;
  private readonly token = process.env.MELHOR_ENVIO_API_TOKEN;

  async getFreight(originCep: string, destinationCep: string): Promise<any[]> {
    const response = await axios.post(`${this.apiUrl}/api/v2/me/shipment/calculate`, {
      from: { postal_code: originCep },
      to: { postal_code: destinationCep },
      products: [{ weight: 1, width: 11, height: 17, length: 20, insurance_value: 10, quantity: 1 }]
    }, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  }
}
