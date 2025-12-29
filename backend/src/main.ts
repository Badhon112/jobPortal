import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'Origin',
      'X-Requested-With',
    ],
    exposedHeaders: ['Set-Cookie'],
  };
  app.enableCors(corsOptions);
  // swager set up
  const config = new DocumentBuilder()
    .setTitle('Job Portal App')
    .setDescription('Job Portal App API description')
    .setVersion('1.0')
    .addTag('Job Portal')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);

  //App alidation Check
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 5000);

  console.log('----------- Job Portal ----------------');
  console.log('---------------------------------------');
  console.log(`Application is running on port ${process.env.PORT}`);
  console.log('---------------------------------------');
}
bootstrap();
