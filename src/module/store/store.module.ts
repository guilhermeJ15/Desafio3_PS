import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StoreController } from './controller/store.controller';
import { StoreService } from './service/store.service';
import { StoreRepository } from './repositories/store.repository';

import { Store, StoreSchema } from './schemas/store.schema';

import { ViaCepService } from 'src/core/services/viacep.service';
import { GoogleMapsService } from 'src/core/services/google-maps.service';
import { MelhorEnvioService } from 'src/core/services/melhor-envio.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }])
  ],
  controllers: [StoreController],
  providers: [
    StoreService,
    StoreRepository,
    ViaCepService,
    GoogleMapsService,
    MelhorEnvioService,
  ],
})
export class StoreModule {}
