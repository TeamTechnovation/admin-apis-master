import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { AppModule } from './app.module';
import { modules } from './modules';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix("api/v1");

  const options = new DocumentBuilder()
    .setTitle("InsightOps")
    .setDescription(
      "A documentation for InsightOps"
    )
    .setVersion("1.0")
    .addTag("InsightOps")
    .build();
  const apppDocument = SwaggerModule.createDocument(app, options, {
    include: modules
  });
  SwaggerModule.setup("api", app, apppDocument);
  app.enableCors()
  await app.listen(4000);
}
bootstrap();
