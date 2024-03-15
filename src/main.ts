import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('User and product demo.')
    .setDescription('During the internship created basic demo project.')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      bearerFormat: 'Bearer',
      name: 'Authorization',
      scheme: 'Bearer',
      in: 'header',
      description: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWYyN2QzZDZlNTRkNjA3NjIzNzlmN2UiLCJyb2xlcyI6WyJ1c2VyIiwiYWRtaW4iLCJzdXBlci1hZG1pbiIsInNlbGxlciJdLCJmdWxsTmFtZSI6IkdhdXJhbmcgUGF0ZWwiLCJpYXQiOjE3MTA0ODM3MDMsImV4cCI6MTcxMDUwMTcwM30.HscPkTQo0non5TT8F7Y0YW6ANkxSQrNtHrqq5BG-PD8'
    }, 'access_token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
