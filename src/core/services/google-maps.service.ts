import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GoogleMapsService {
  private readonly apiKey = process.env.GOOGLE_MAPS_API_KEY;

  async getCoordinatesFromAddress(address: string): Promise<{ lat: number; lng: number }> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address,
    )}&key=${this.apiKey}`;

    const response = await axios.get(url);
    const location = response.data.results[0]?.geometry.location;

    if (!location) {
      throw new Error('Não foi possível obter coordenadas do endereço.');
    }

    return {
      lat: location.lat,
      lng: location.lng,
    };
  }

  async calculateDistance(origin: string, destination: string): Promise<number> {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
      origin,
    )}&destinations=${encodeURIComponent(destination)}&key=${this.apiKey}`;

    const response = await axios.get(url);
    const element = response.data.rows[0]?.elements[0];

    if (!element || element.status !== 'OK') {
      throw new Error('Não foi possível calcular a distância.');
    }

    return element.distance.value / 1000; 
  }
}
