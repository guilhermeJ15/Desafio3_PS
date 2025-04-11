import { Module } from '@nestjs/common';
import { StoresModule } from './stores/stores.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [DatabaseModule, StoresModule, LoggerModule],
})
export class AppModule {}
