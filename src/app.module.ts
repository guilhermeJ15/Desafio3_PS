import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { StoreModule } from './modules/store/store.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    
    MongooseModule.forRoot(
      (() => {
        const uri = process.env.MONGO_URI;
        if (!uri) throw new Error('MONGO_URI is not defined in .env');
        return uri;
      })(),
    ),
    StoreModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); 
  }
}
