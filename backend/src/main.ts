
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableCors({
    origin: ['https://movie-box-beryl-iota.vercel.app'], // Frontend URL(s)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // if you send cookies/auth headers
  });

  // Serve uploads folder
  app.use('/uploads', express.static(join(__dirname, '..', '..', 'uploads')));

  const config = new DocumentBuilder()
    .setTitle('Movie API')
    .setDescription('Movie app API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, doc);

  await app.listen(4000);
  console.log('Backend running on http://localhost:4000');
}
bootstrap();
