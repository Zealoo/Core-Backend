import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global url prefix
  app.setGlobalPrefix('/api');
  // enable cors policy
  app.enableCors();
  app.use(helmet());
  // global data transformation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // setting fastify swagger
  const config = new DocumentBuilder()
    .setTitle('Zoolea')
    .setDescription('The Zoolea API description')
    .setVersion('1.0')
    .addTag('zoolea')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 5000;
  const host = process.env.HOST || '0.0.0.0';

  await app.listen(port, host);
}
bootstrap();
