import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enabling cors for communication with frontend
  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept',
  });

  app.setGlobalPrefix('api/v1');

  // global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      validationError: { target: false },
    }),
  );


  const config = new DocumentBuilder()
    .setTitle('Doctor Appointment System API')
    .setDescription('API for managing doctors and appointments')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  // swagger docs at /api/v1/docs
  SwaggerModule.setup('api/v1/docs', app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  console.log(`\n[server]: is running on http://localhost:${PORT}/api/v1`);
  console.log(`[swagger-docs]: available at http://localhost:${PORT}/api/v1/docs`);
}

bootstrap();