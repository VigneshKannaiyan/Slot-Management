import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  //To use the Global Validation Pipe
  app.useGlobalPipes(new ValidationPipe());

  //For swagger documentation
  const swaggerDocument = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'config/swagger.json'), 'utf8'),
  ) as OpenAPIObject;

  SwaggerModule.setup('api-docs', app, swaggerDocument);

  await app.listen(process.env.PORT ?? 8080);
  console.log(`Server Started Running Successfully PORT(${process.env.PORT})`);
}

bootstrap();
