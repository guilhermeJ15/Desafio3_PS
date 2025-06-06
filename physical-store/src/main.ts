import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { cleanOldLogs } from './core/utils/log-cleaner';

dotenv.config();

async function bootstrap() {
   // Limpa logs com mais de 4 dias
  cleanOldLogs(4);

  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              // remove propriedades extras
      forbidNonWhitelisted: true,   // lança erro se tiver propriedades extras
      transform: true,              // converte payload para DTO automaticamente
    }),
  );

  // Configuração Swagger
  const config = new DocumentBuilder()
    .setTitle('Physical Store API')
    .setDescription('API para localização de lojas físicas e cálculo de entrega')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  console.log(` Server rodando em http://localhost:${PORT}`);
  console.log(` Swagger disponível em http://localhost:${PORT}/docs`);
}

bootstrap();
