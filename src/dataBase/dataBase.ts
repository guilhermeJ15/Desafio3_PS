import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://guilhermejonatas15:152004cb@cluster0.aq9ry.mongodb.net/'),
  ],
})
export class DatabaseModule {}

