import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { StoreService } from '../services/store.service';
import { CreateStoreDto } from 'src/core/model/store/dto/create-store.dto';
import { UpdateStoreDto } from 'src/core/model/store/dto/update-store.dto';

@ApiTags('store')
@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as lojas' })
  findAll() {
    return this.storeService.findAll();
  }

  @Get('state/:uf')
  @ApiOperation({ summary: 'Buscar lojas por estado com filtros e paginação' })
  getByStateFiltered(
    @Param('uf') uf: string,
    @Query('type') type?: 'PDV' | 'LOJA',
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ) {
    return this.storeService.findByStateFiltered(uf, type, Number(limit), Number(offset));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar loja por ID' })
  findById(@Param('id') id: string) {
    return this.storeService.findById(id);
  }

  @Get('state/:uf')
  @ApiOperation({ summary: 'Buscar lojas por estado' })
  findByState(@Param('uf') uf: string) {
    return this.storeService.findByState(uf);
  }

  @Get('nearest/:cep')
@ApiOperation({ summary: 'Buscar apenas a loja mais próxima pelo CEP' })
async findNearestByCep(@Param('cep') cep: string) {
  return this.storeService.findNearestByCep(cep);
}


  @Post()
  @ApiOperation({ summary: 'Criar nova loja' })
  @ApiResponse({ status: 201, description: 'Loja criada com sucesso.' })
  create(@Body() dto: CreateStoreDto) {
    return this.storeService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar loja existente' })
  @ApiResponse({ status: 200, description: 'Loja atualizada com sucesso.' })
  update(@Param('id') id: string, @Body() dto: UpdateStoreDto) {
    return this.storeService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover loja por ID' })
  remove(@Param('id') id: string) {
    return this.storeService.remove(id);
  }
}
