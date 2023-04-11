import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  
  app.enableCors()

  // session setup
  app.use(
    session({
      secret: 's%3Al3ozSdvQ83TtC5RvJ.CibaQoHtaY0H3QOB1kqR8H2A',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      }
    })
  )
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));

  await app.listen(3000);
}
bootstrap();
