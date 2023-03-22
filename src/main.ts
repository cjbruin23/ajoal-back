import { NestFactory } from '@nestjs/core';
import { auth } from 'express-oauth2-jwt-bearer';
import { AppModule } from './app.module';

async function bootstrap() {
  const audience = process.env.AUDIENCE;
  const issuerBaseURL = process.env.ISSUER_BASE_URL;
  console.log(audience, issuerBaseURL);
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://127.0.0.1:5173'],
  });
  app.use(
    auth({
      issuerBaseURL,
      audience,
    }),
  );
  await app.listen(3000);
}
bootstrap();
