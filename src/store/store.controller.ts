import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StoresService } from './stores.service';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  async createStore(
    @Body() body: { cep: string; name: string; telefone: string; horario: string },
  ) {
    return this.storesService.createStore(body.cep, body.name, body.telefone, body.horario);
  }

  @Get(':cep')
  async findNearby(@Param('cep') cep: string) {
    const lojas = await this.storesService.getNearbyStores(cep);
    if (!lojas.length) {
      return { message: 'Nenhuma loja encontrada em até 100km deste CEP.' };
    }
    return lojas;
  }
}
