import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setContact('Frederic LOSSIGNOL', 'https://www.linkedin.com/in/flossignol/', 'frederic.lossignol@gmail.com')
    .setTitle('Movements synchronisation service API')
    .setDescription('This API can validate movements send by client each month, by compare balance given by the bank')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe())
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
