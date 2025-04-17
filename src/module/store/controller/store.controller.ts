import { Controller, Get, Param } from '@nestjs/common';
import { StoreService } from '../service/store.service';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  async findAll() {
    return this.storeService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.storeService.findById(id);
  }

  @Get('/state/:uf')
  async findByState(@Param('uf') uf: string) {
    return this.storeService.findByState(uf);
  }

  @Get('/cep/:cep')
  async findByCep(@Param('cep') cep: string) {
    return this.storeService.findByCep(cep);
  }
}
